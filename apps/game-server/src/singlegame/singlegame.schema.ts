import { Document, SchemaOptions } from 'mongoose';
import {
  MongooseModule as _MongooseModule,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Singlegame extends Document {}

const SinglegameSchema = SchemaFactory.createForClass(Singlegame);

export const MongooseModule = _MongooseModule.forFeature([
  {
    name: Singlegame.name,
    schema: SinglegameSchema,
  },
]);
