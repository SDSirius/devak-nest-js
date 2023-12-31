import { IsString, IsNumber, Length } from 'class-validator';
import { CarMessagesHelper } from '../helpers/messages.helper';

export class RegisterCarsDto {

    @IsString({ message: CarMessagesHelper.CAR_NAME_INVALID })
    name: string;

    @IsString({ message: CarMessagesHelper.CAR_BRAND_NOT_VALID })
    brand: string;

    @IsNumber({},{ message: CarMessagesHelper.CAR_VALUE_NEEDED + " não é number" })
    value:number;

    @IsNumber({},{ message: CarMessagesHelper.CAR_VALUE_NEEDED + " RegisterCarsDto = > kilometers " })
    kilometers:number;

    @IsString({ message: CarMessagesHelper.CAR_MODEL_NOT_VALID })
    yearModel: string;

    @IsString({ message: CarMessagesHelper.CAR_COLOR_NOT_VALID })
    color: string;

    @IsString({ message: CarMessagesHelper.CAR_PLATE_NEEDED })
    @Length(7, 7, { message: CarMessagesHelper.CAR_PLATE_NEEDED })
    plate: string;

    // @IsString({ message: CarMessagesHelper.CAR_PIC_NEDDED })
    file: any;

    views: number;

}
