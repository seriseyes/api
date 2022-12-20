import { Injectable } from '@nestjs/common';
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService
  ) {}

  async getUsername(request: Request): Promise<string> {
    const cookie = request.cookies['token'];
    const data = await this.jwtService.verifyAsync(cookie);
    return data.username;
  }
}
