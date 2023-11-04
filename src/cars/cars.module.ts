import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cars, CarsSchema } from './schemas/cars.schema';
import { SoldCar, SoldCarSchema } from './schemas/soldcars.schema';
import { UserModule } from 'src/user/user.module';
// import { S3Service } from './utils/s3Upload.Utils.';

@Module({
  imports: [
    UserModule, MongooseModule.forFeature([
      { name: Cars.name, schema: CarsSchema },
      { name: SoldCar.name, schema: SoldCarSchema }
    ])
  ],
  providers: [CarsService],
  controllers: [CarsController]
})
export class CarsModule {}
