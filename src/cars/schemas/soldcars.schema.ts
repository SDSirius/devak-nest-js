import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Cars } from "./cars.schema";

export type SoldCarDocument = HydratedDocument<SoldCar>;

@Schema()
export class SoldCar extends Cars{

    @Prop({required: true})
    sold:boolean;
    
}

export const SoldCarSchema = SchemaFactory.createForClass(SoldCar);