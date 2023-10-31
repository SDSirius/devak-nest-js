import { ArrayMinSize, IsArray, IsString, IsNumber, Max, Min, MaxLength } from 'class-validator';
import { CarMessagesHelper } from '../helpers/messages.helper';

export class RegisterCarsDto {

    @IsString({message: CarMessagesHelper.CAR_NAME_INVALID})
    name:string;

    @IsString({message: CarMessagesHelper.CAR_BRAND_NOT_VALID})
    brand:string;

    @IsNumber({},{message: CarMessagesHelper.CAR_VALUE_NEEDED + "não é number"})
    // @Min(4,{message: CarMessagesHelper.CAR_VALUE_NEEDED + "min"})
    // @Max(100000,{message: CarMessagesHelper.CAR_VALUE_NEEDED + "max"})
    value:number;

    @IsNumber({},{message: CarMessagesHelper.CAR_VALUE_NEEDED})
    @Min(1,{message: CarMessagesHelper.CAR_VALUE_NEEDED})
    kilometers:number;

    @IsString({message: CarMessagesHelper.CAR_MODEL_NOT_VALID})
    yearModel:string;
    
    @IsString({message: CarMessagesHelper.CAR_COLOR_NOT_VALID})
    color:string;
    
    @IsString({message: CarMessagesHelper.CAR_PLATE_NEEDED})
    @MaxLength(7,{message: CarMessagesHelper.CAR_PLATE_NEEDED + "mais do que 7 digitos"})
    plate:string;

    // @IsArray()
    // @IsString({ each: true })
    // @ArrayMinSize(1)
    // photos:string[];
    
}