import { IsOptional, IsString, Length, IsNumber } from "class-validator";
import { CarMessagesHelper } from "../helpers/messages.helper";

export class UpdateCarDto {
    @IsOptional()
    @IsString({ message: CarMessagesHelper.CAR_NAME_INVALID })
    name?: string;

    @IsOptional()
    @IsString({ message: CarMessagesHelper.CAR_BRAND_NOT_VALID })
    brand?: string;

    @IsOptional()
    @IsString({ message: CarMessagesHelper.CAR_NAME_INVALID })
    yearModel?: string;

    @IsOptional()
    @IsString({ message: CarMessagesHelper.CAR_NAME_INVALID })
    color?: string;

    @IsOptional()
    @IsNumber({},{ message: CarMessagesHelper.CAR_VALUE_NEEDED + "não é number" })
    value?: number;

    @IsOptional()
    @IsNumber({},{ message: CarMessagesHelper.CAR_VALUE_NEEDED + "kilometers não é number"  })
    kilometers?: number;

    @IsOptional()
    @IsString({ message: CarMessagesHelper.CAR_PLATE_NEEDED })
    @Length(7, 7, { message: CarMessagesHelper.CAR_PLATE_NEEDED  })
    plate?: string;

    @IsOptional()
    @IsString({message: CarMessagesHelper.CAR_PIC_NEDDED})
    file?: any;
}
