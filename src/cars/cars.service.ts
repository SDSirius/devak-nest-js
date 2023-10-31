import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { RegisterCarsDto } from './dtos/registercars.dto';
import { UpdateCarDto } from './dtos/updatecars.dto';
import { CarMessagesHelper } from './helpers/messages.helper';
import { Cars, CarsDocument } from './schemas/cars.schema';
import { SoldCar ,SoldCarDocument } from './schemas/soldcars.schema';


@Injectable()
export class CarsService {
    private readonly logger = new Logger(CarsService.name);

    constructor(
        @InjectModel(Cars.name) private readonly carModel: Model<CarsDocument>,
        @InjectModel(SoldCar.name) private readonly soldModel: Model<SoldCarDocument>,
        private readonly userService: UserService

    ){}
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

    async insertCar(userId:string, dto:RegisterCarsDto){
        try {
            const user = await this.userService.getUserById(userId);
    
            this.logger.debug('registrando Carro no sistema do usuario - ' + user.name);
            
            const existingPlate = await this.carModel.findOne({plate: dto.plate});
            console.log(existingPlate)
    
            if (!existingPlate){
                const Car = {
                    ...dto,
                    user,
                    // link: generateLink()
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
                sold:true

            }
            await this.soldModel.create(soldCar);
            return await this.carModel.deleteOne({user: userId, _id: carId});
            
        } catch (error) {
            console.log(error)
        }
    }

    async updateCar(carId:string, userId:string, dto: UpdateCarDto){
        try {
            const user = await this.userService.getUserById(userId);
            const car = await this.carModel.findOne({user, _id: carId});
            this.logger.debug(`update -  ${car.name} de ${user.name}(${user.email}) `);
    
            if(!car){
                throw new BadRequestException(CarMessagesHelper.UPDATE_CAR_NOT_FOUND);
            }
    
            car.name = dto.name? dto.name :car.name;
            car.brand = dto.brand? dto.brand :car.brand;
            car.yearModel = dto.yearModel? dto.yearModel :car.yearModel;
            car.color = dto.color? dto.color :car.color;
            car.plate = dto.plate? dto.plate :car.plate;
            car.kilometers = dto.kilometers? dto.kilometers :car.kilometers;
            car.value = dto.value? dto.value :car.value;
            // car.photos = dto.photos;

            await this.carModel.findByIdAndUpdate({_id: carId}, car);
            
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
          throw error; // Você pode querer lidar com o erro de forma diferente, como lançar uma exceção personalizada
        }
      }
}
