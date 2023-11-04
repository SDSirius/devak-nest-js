import { Body, Controller, Delete, Query, Get, HttpCode, HttpStatus, Param, Post, Put, Request,UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { CarsService } from './cars.service';
import { GetCarsDto } from './dtos/getcars.dto';
import { RegisterCarsDto } from './dtos/registercars.dto';
import { UpdateCarDto } from './dtos/updatecars.dto';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
// import { FormDataRequest } from 'nestjs-form-data';


@Controller('cars')
export class CarsController {

    constructor(
        private readonly carService:CarsService
    ){}
    
    @Get()
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    async getAllCars( ){

        const result = await this.carService.getAllCars();

        return result
        // .map(car => ({
        //     id: car._id.toString(),
        //     user : car.user.toString(),
        //     name: car.name,
        //     brand: car.brand,
        //     yearModel: car.yearModel,
        //     value:car.value,
        //     color:car.color,
        //     plate:car.plate,
        //     kilometers:car.kilometers,
        //     photo: car.photo,
        // }) as GetCarsDto);
    }

    @Get("user/:id")
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    async getCarsByUser(@Param() params){
        const { id } = params;

        const result = await this.carService.getCarsByUser( id);

        return result
        // .map(car => ({
        //     id: car._id.toString(),
        //     user : car.user.toString(),
        //     name: car.name,
        //     brand: car.brand,
        //     yearModel: car.yearModel,
        //     color:car.color,
        //     photo: car.photo,
        //     sold: car.sold ? car.sold: "Disponivel",
        // }) );
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    async getCarById(@Param() params){
        const { id } = params;

        return await this.carService.getCarById(id);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('photo'))
    async registerCar(@Request() req, @Body() dto: RegisterCarsDto, @UploadedFile() photo: any) {
        console.log(dto);
        console.log(req?.user);
        console.log(photo);
        const urlPhoto = await this.carService.handleImg(photo)
        console.log(urlPhoto)
        const { userId } = req.user;
        await this.carService.insertCar(userId, dto, urlPhoto as string);
        return "Carro Registrado com sucesso!";
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteSoldCar(@Request() req, @Param() params){
        const { userId } = req?.user;
        const { id } = params;
        await this.carService.deleteSoldCar(userId, id);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('photo'))
    async updateCarDetails(@Request() req, @Param() params, @Body() dto: any,@UploadedFile() photo: any){
        console.log(dto)
        const urlphoto = await this.carService.handleImg(photo)
        const { userId } = req?.user;
        const { id } = params;
        await this.carService.updateCar(id, userId, dto, urlphoto as string);
    }

    @Get("filters/:filtro")
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    async getFilter(@Param('filtro') filtro: string) {
        const result = await this.carService.getFilterByCategory(filtro);
        return result;
    }

    @Post('filters')
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    async getFilteredMovies(@Body() filters: any) {
        const result = await this.carService.getCarsByFilter(filters);
    
        return result;
    //     .map(car => ({
    //     id: car._id.toString(),
    //     user : car.user.toString(),
    //     name: car.name,
    //     brand: car.brand,
    //     yearModel: car.yearModel,
    //     value:car.value,
    //     color:car.color,
    //     plate:car.plate,
    //     kilometers:car.kilometers,
    //     photo: car.photo,
    // }) as GetCarsDto);
    }


}
