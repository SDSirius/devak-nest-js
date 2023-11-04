import { Body, Controller, Delete, Query, Get, HttpCode, HttpStatus, Param, Post, Put, Request,UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { CarsService } from './cars.service';
import { GetCarsDto } from './dtos/getcars.dto';
import { RegisterCarsDto } from './dtos/registercars.dto';
import { UpdateCarDto } from './dtos/updatecars.dto';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { uploadToS3 }  from './utils/uploadToS3.util'


@Controller('cars')
export class CarsController {

    constructor(
        private readonly carService:CarsService,
    ){}
    
    @Get()
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    async getAllCars( ){
        return await this.carService.getAllCars();
    }

    @Get("user/:id")
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    async getCarsByUser(@Param() params){
        const { id } = params;
        return await this.carService.getCarsByUser( id);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    async getCarById(@Param() params){
        const { id } = params;
        return await this.carService.getCarById(id);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async registerCar(@Request() req, @Body() dto: RegisterCarsDto, @UploadedFile() file: any) {
        const folderName = process.env.CAR_FOLDER_NAME
        const urlfile = await uploadToS3(file, folderName);
        const { userId } = req.user;
        await this.carService.insertCar(userId, dto, urlfile as string);
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
    @UseInterceptors(FileInterceptor('file'))
    async updateCarDetails(@Request() req, @Param() params, @Body() dto: any,@UploadedFile() file: any){
        const folderName = process.env.CAR_FOLDER_NAME
        const urlfile = await uploadToS3(file, folderName);
        const { userId } = req?.user;
        const { id } = params;
        await this.carService.updateCar(id, userId, dto, urlfile as string);
    }

    @Get("filters/:filtro")
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    async getFilter(@Param('filtro') filtro: string) {
        return await this.carService.getFilterByCategory(filtro);
    }

    @Post('filters')
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    async getFilteredMovies(@Body() filters: any) {
        return await this.carService.getCarsByFilter(filters);
    }
}
