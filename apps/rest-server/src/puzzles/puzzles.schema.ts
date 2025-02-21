import { Document, SchemaOptions } from 'mongoose';
import {
  MongooseModule as _MongooseModule,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Puzzle extends Document {
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Prop({
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  imgUrl: string;

  tags: string[] | null;

  uploaderId: string;

  createdAt: Date;
  updatedAt: Date;
}

const PuzzleSchema = SchemaFactory.createForClass(Puzzle);
PuzzleSchema.virtual('readOnlyData').get(function (this: Puzzle) {
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    imgUrl: this.imgUrl,
  };
});

export const MongooseModule = _MongooseModule.forFeature([
  {
    name: Puzzle.name,
    schema: PuzzleSchema,
  },
]);
