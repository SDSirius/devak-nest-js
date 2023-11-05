import { IsString, IsNumber, Min, Length } from 'class-validator';
import { CarMessagesHelper } from '../helpers/messages.helper';

export class RegisterCarsDto {

    @IsString({message: CarMessagesHelper.CAR_NAME_INVALID})
    name:string;

    @IsString({message: CarMessagesHelper.CAR_BRAND_NOT_VALID})
    brand:string;

    @IsString({ message: CarMessagesHelper.CAR_VALUE_NEEDED + "não é number" })
    value:string;

    @IsString({ message: CarMessagesHelper.CAR_VALUE_NEEDED + "kilometers não é number"  })
    kilometers:string;

    @IsString({message: CarMessagesHelper.CAR_MODEL_NOT_VALID})
    yearModel:string;
    
    @IsString({message: CarMessagesHelper.CAR_COLOR_NOT_VALID})
    color:string;
    
    @IsString({ message: CarMessagesHelper.CAR_PLATE_NEEDED })
    @Length(7, 7, { message: CarMessagesHelper.CAR_PLATE_NEEDED  })
    plate:string;

    // @IsString({message: CarMessagesHelper.CAR_PIC_NEDDED})
    file:any;

    views:number;
    
}