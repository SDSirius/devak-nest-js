import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/user/schemas/user.schema";

export type CarsDocument = HydratedDocument<Cars>;

@Schema()
export class Cars {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;

    @Prop({required: true})
    name:string;

    @Prop({required: true})
    brand:string;

    @Prop({required: true})
    yearModel:string;

    @Prop({required: true})
    value:string;

    @Prop({required: true})
    kilometers:string;

    @Prop({required: true})
    color:string;

    @Prop({required: true})
    plate:string;

    @Prop({required: true})
    file:string;

    @Prop({type: Number, default: 0})
    views: number;


}

export const CarsSchema = SchemaFactory.createForClass(Cars);