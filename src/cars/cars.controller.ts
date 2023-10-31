import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Request } from '@nestjs/common';
import { CarsService } from './cars.service';
import { GetCarsDto } from './dtos/getcars.dto';
import { RegisterCarsDto } from './dtos/registercars.dto';
import { UpdateCarDto } from './dtos/updatecars.dto';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';


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

        return result.map(car => ({
            id: car._id.toString(),
            user : car.user.toString(),
            name: car.name,
            brand: car.brand,
            yearModel: car.yearModel,
            value:car.value,
            color:car.color,
            plate:car.plate,
            kilometers:car.kilometers,
            // photos: car.photos,
        }) as GetCarsDto);
    }

    @Get("user/:id")
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    async getCarsByUser(@Param() params){
        const { id } = params;

        const result = await this.carService.getCarsByUser( id);

        return result.map(car => ({
            id: car._id.toString(),
            user : car.user.toString(),
            name: car.name,
            brand: car.brand,
            yearModel: car.yearModel,
            color:car.color,
            sold: car.sold ? car.sold:"Disponivel",
            // photos: car.photos,
        }) );
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    async getCarById(@Param() params){
        const { id } = params;

        return await this.carService.getCarById(id);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    async registerCar(@Request() req, @Body() dto: RegisterCarsDto){
        const { userId } = req?.user;
        await this.carService.insertCar(userId, dto);
        return "Carro Registrado com sucesso!"
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteSoldCar(@Request() req, @Param() params){
        const { userId } = req?.user;
        const { id } = params;
        await this.carService.deleteSoldCar(userId, id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateCarDetails(@Request() req, @Param() params, @Body() dto: UpdateCarDto){
        const { userId } = req?.user;
        const { id } = params;
        await this.carService.updateCar(id, userId, dto);
    }

    @Get("filters/:filtro")
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    async getFilter(@Param('filtro') filtro: string) {
        const result = await this.carService.getFilterByCategory(filtro);
        return result;
      }
}
