import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "../auth/models/RegisterDto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async all(): Promise<User[]> {
    return this.userModel.find();
  }

  async create(user: RegisterDto): Promise<User> {
    if (user.password !== user.password_verify) {
      throw new BadRequestException("Passwords do not match");
    }

    const hashed = await bcrypt.hash(user.password, 12);
    return this.userModel.create({
      username: user.username,
      password: hashed,
      email: user.email
    });
  }

  async findOne(condition): Promise<User> {
    return this.userModel.findOne(condition);
  }
}
