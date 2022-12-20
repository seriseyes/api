import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./schemas/user.schema";
import { AuthGuard } from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

  @Get()
  async all(): Promise<User[]> {
    return await this.userService.all();
  }
}
