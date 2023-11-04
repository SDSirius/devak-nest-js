import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { RegisterCarsDto } from './dtos/registercars.dto';
import { UpdateCarDto } from './dtos/updatecars.dto';
import { CarMessagesHelper } from './helpers/messages.helper';
import { Cars, CarsDocument } from './schemas/cars.schema';
import { SoldCar ,SoldCarDocument } from './schemas/soldcars.schema';
import * as AWS from 'aws-sdk';


@Injectable()
export class CarsService {
    private readonly logger = new Logger(CarsService.name);
    private clientS3: AWS.S3;

    constructor(
        @InjectModel(Cars.name) private readonly carModel: Model<CarsDocument>,
        @InjectModel(SoldCar.name) private readonly soldModel: Model<SoldCarDocument>,
        private readonly userService: UserService,
        
    ){
        this.clientS3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
          });
    }

    async getAllCars(){
        return await this.carModel.find(); //testado 
    }

    async getCarsByUser(userId:String){
        try {
            this.logger.debug('getCarsByUser - ' + userId);
            const cars = await this.carModel.find({user: userId});
            const soldCars = await this.soldModel.find({user: userId});
            const allcars =[];
            for (const car of cars) {
                allcars.push(car)
            }
            for (const car of soldCars) {
                allcars.push(car)
            }
    
            return allcars
            
        } catch (error) {
            console.log(error)
        }
    }

    async getCarById(carId:string ){
        return await this.carModel.findOne({_id: carId});
    }

    async insertCar(userId: string, dto: RegisterCarsDto, urlphoto:string ) {
        try {
            console.log(urlphoto);
            console.log(dto);
            const user = await this.userService.getUserById(userId);
    
            this.logger.debug('registrando Carro no sistema do usuario - ' + user.name);
            
            const existingPlate = await this.carModel.findOne({plate: dto.plate});

    
            if (!existingPlate){

                const Car = {
                    user,
                    ...dto,
                    photo: urlphoto,
                };
        
                const createdCar = new this.carModel(Car);
                return await createdCar.save();
            }else{
                throw new BadRequestException(CarMessagesHelper.CAR_PLATE_ALREADY_IN_USE);
            }
        } catch (error) {
            console.log(error)
        }

    }

    async handleImg (photo:any){
        try {
            console.log(photo)
            const upPhotoParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key:Date.now().toString() + "-" + photo.originalName,
                body: photo.buffer,
                ACL: "public-read"
            }

            return new Promise((resolve, reject) =>{
                this.clientS3.upload(upPhotoParams, (error, data) =>{
                    if (error) {
                        reject(error)
                    }
                    resolve({ imageUrl: data.Location})
                })
            }
        )

        }catch (error) {
        console.error(`Erro ao fazer upload da imagem: ${error}`);
        }
    }
      


    async deleteSoldCar(userId:String, carId:string){
        try {
            const car = await this.carModel.findOne({_id: carId});
            if (!car){
                throw new BadRequestException(CarMessagesHelper.UPDATE_CAR_NOT_FOUND);
            }
            console.log(car)
            this.logger.debug(`delete CarByUser - ${userId} - ${car.name}`);
            const soldCar ={
                user:car.user,
                name:car.name,
                brand:car.brand,
                value:car.value,
                kilometers:car.kilometers,
                yearModel:car.yearModel,
                color:car.color,
                plate:car.plate,
                photo:car.photo,
                sold:true
            }
            await this.soldModel.create(soldCar);
            return await this.carModel.deleteOne({user: userId, _id: carId});
            
        } catch (error) {
            console.log(error)
        }
    }

    async updateCar(carId:string, userId:string, dto: any, urlphoto:string){
        try {
            const user = await this.userService.getUserById(userId);
            const car = await this.carModel.findOne({user, _id: carId});
            this.logger.debug(`update -  ${car.name} de ${user.name}(${user.email}) `);

            console.log(car)

            if(!car){
                throw new BadRequestException(CarMessagesHelper.UPDATE_CAR_NOT_FOUND);
            }
            
            const newCarSpecs: UpdateCarDto = {};

            if (dto.name) newCarSpecs.name = dto.name;
            else newCarSpecs.name = car.name;

            if (dto.brand) newCarSpecs.brand = dto.brand;
            else newCarSpecs.brand = car.brand;

            if (dto.yearModel) newCarSpecs.yearModel = dto.yearModel;
            else newCarSpecs.yearModel = car.yearModel;

            if (dto.color) newCarSpecs.color = dto.color;
            else newCarSpecs.color = car.color;

            if (dto.plate) newCarSpecs.plate = dto.plate;
            else newCarSpecs.plate = car.plate;

            if (dto.kilometers) newCarSpecs.kilometers = dto.kilometers;
            else newCarSpecs.kilometers = car.kilometers;

            if (dto.value) newCarSpecs.value = dto.value;
            else newCarSpecs.value = car.value;

            if (urlphoto) newCarSpecs.photo = urlphoto;
            else newCarSpecs.photo = car.photo;
            // car.photo = dto.photo;
            console.log("============================================================================================")
            

            console.log(newCarSpecs)

            await this.carModel.findByIdAndUpdate({_id: carId}, newCarSpecs);
            
        } catch (error) {
            console.log(error)
        }
    }

    async getFilterByCategory(filter: string) {
        try {
          const filterParams = await this.carModel.distinct(filter);
          this.logger.debug(`filter ${filter} tem ${filterParams.length} distinções`);
          return filterParams;
        } catch (error) {
          console.error(error);
        }
      }

    
    async getCarsByFilter(filters: any){
        try {
            type FilterQuery = {
                name?: string;
                brand?: string;
                yearModel?: string;
                value?: any;
                kilometers?: any;
                color?: string;
            };
            const query: FilterQuery = {};
            let cars;
              
            const filterAttributes = [
                'name', 'brand', 'yearModel', 'color'
            ];
            
            for (const attr of filterAttributes) {
                if (filters[attr]) {
                    query[attr] = { $regex: filters[attr], $options: 'i' };
                }
            }

            if (filters.value) {
                const value = Number(filters.value);
                if (!isNaN(value)) {
                    const tolerance = 500; 
                    query.value = { $gte: value - tolerance, $lte: value + tolerance };
                }
            }

            if (filters.kilometers) {
                const kilometers = Number(filters.kilometers);
                if (!isNaN(kilometers)) {
                    const tolerance = 10000; // Escolha uma tolerância adequada
                    query.kilometers = { $gte: kilometers - tolerance, $lte: kilometers + tolerance };
                }
            }

            cars = await this.carModel.find(query);
            if (!cars) {
                throw new BadRequestException(CarMessagesHelper.UPDATE_CAR_NOT_FOUND);
            }

            this.logger.debug(`Filtros Aplicados! Retornando ${cars.length} resultados!`)
            return cars;
        } catch (error) {
            console.log(error);
        }
    }

}
