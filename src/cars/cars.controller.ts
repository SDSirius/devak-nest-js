import { Body, Controller, Delete, Query, Get, HttpCode, HttpStatus, Param, Post, Put, Request,UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { CarsService } from './cars.service';
import { RegisterCarsDto } from './dtos/registercars.dto';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { uploadToS3 }  from './utils/uploadToS3.util'
import { UpdateCarDto } from './dtos/updatecars.dto';


@Controller('cars')
export class CarsController {

    constructor(
        private readonly carService:CarsService,
    ){}
    
    @Get(':term?')
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    async getAllCars(@Param('term') term?: string) {
        if (term) {
            return await this.carService.find(term);
            
        } else {
            return await this.carService.getAllCars();
        }
    }

    @Get("user/:id")
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    async getCarsByUser(@Param() params){
        const { id } = params;
        return await this.carService.getCarsByUser( id);
    }

    @Get('id/:id')
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    async getCarById(@Param() params){
        const { id } = params;
        return await this.carService.getCarById(id);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async registerCar(@Request() req, @Body() dto: any, @UploadedFile() file: any) {
        const folderName = process.env.CAR_FOLDER_NAME
        const urlfile = await uploadToS3(file, folderName);
        const { userId } = req.user;
        await this.carService.insertCar(userId, dto as RegisterCarsDto, urlfile as string);
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
    async updateCarDetails(@Request() req, @Param() params, @Body() dto: any,@UploadedFile() file?: any){
        let urlFile = " ";
        if (file) {
            const folderName = process.env.CAR_FOLDER_NAME;
            const result = await uploadToS3(file, folderName);
    
            if (typeof result === 'string') {
                urlFile = result;
            } 
        } else {
            urlFile = dto.file;
        }
        const { userId } = req?.user;
        const { id } = params;
        await this.carService.updateCar(id, userId, dto as UpdateCarDto, urlFile as string);
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
    async getFilteredCars(@Body() filters: any) {
        return await this.carService.getCarsByFilter(filters);
    }
}
