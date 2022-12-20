import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Exclude } from "class-transformer";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true})
  username: string;
  @Prop({required: true})
  email: string;
  @Prop({required: true})
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
