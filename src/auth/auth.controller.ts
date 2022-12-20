import {
  BadRequestException,
  Body, ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res, UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { RegisterDto } from "./models/RegisterDto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authService: AuthService
  ) {
  }

  @Post("register")
  async register(@Body() model: RegisterDto) {
    return this.userService.create(model);
  }

  @Post("login")
  async login(
    @Body("username") username: string,
    @Body("password") password: string,
    @Res({passthrough: true}) response: Response
  ) {
    const user = await this.userService.findOne({username});
    if (!user) throw new NotFoundException("User not found");
    console.log(password, user.password);
    if (!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException("Invalid credentials");
    }

    const jwt = await this.jwtService.signAsync({username});
    response.cookie('token', jwt, {httpOnly: true});

    return user;
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async user(@Req() request: Request) {
    const username = await this.authService.getUsername(request);
    return this.userService.findOne({username});
  }

  @UseGuards(AuthGuard)
  @Get("logout")
  async logout(@Res({passthrough: true}) response: Response) {
    response.clearCookie('token');
    return {message: "Success"};
  }
}
