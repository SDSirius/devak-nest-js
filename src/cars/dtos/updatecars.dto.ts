import { IsArray, IsNumber, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import { CarMessagesHelper } from "../helpers/messages.helper";

export class UpdateCarDto {

    @MinLength(2, {message: CarMessagesHelper.CAR_NAME_INVALID})
    @IsString({message: CarMessagesHelper.CAR_NAME_INVALID})
    name: string;

    @MinLength(2, {message: CarMessagesHelper.CAR_BRAND_NOT_VALID})
    @IsString({message: CarMessagesHelper.CAR_BRAND_NOT_VALID})
    brand:string;

    @MinLength(2, {message: CarMessagesHelper.CAR_NAME_INVALID})
    @IsString({message: CarMessagesHelper.CAR_BRAND_NOT_VALID})
    yearModel:string;

    @MinLength(2, {message: CarMessagesHelper.CAR_NAME_INVALID})
    @IsString({message: CarMessagesHelper.CAR_BRAND_NOT_VALID})
    color:string;

    @IsNumber({},{message: CarMessagesHelper.CAR_VALUE_NEEDED + "não é number"})
    value:number;

    @IsNumber({},{message: CarMessagesHelper.CAR_VALUE_NEEDED})
    @Min(1,{message: CarMessagesHelper.CAR_VALUE_NEEDED})
    kilometers:number;

    @IsString({message: CarMessagesHelper.CAR_PLATE_NEEDED})
    @MaxLength(7,{message: CarMessagesHelper.CAR_PLATE_NEEDED + "mais do que 7 digitos"})
    plate:string;



    // @IsArray({message: CarMessagesHelper.CAR_PICTURES_INVALID})
    // @IsString({ each: true })
    // @ArrayMinSize(1)
    // photos:string[];
}



// import { Type } from "class-transformer";
// 

// import { RegisterCarsDto } from "./registercars.dto";

// export class UpdateCarDto extends RegisterCarsDto {
//     @IsArray({message: CarMessagesHelper.UPDATE_CAR_NOT_FOUND})
//     @Type(() => UpdateCarObjectDto)
//     @ValidateNested({each:true})
//     objects: Array<UpdateCarObjectDto>
// }

// export class UpdateCarObjectDto {
//     @IsNotEmpty({message: CarMessagesHelper.CAR_NAME_INVALID})
//     name:string;

//     

// }