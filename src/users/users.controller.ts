import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CurrentUser } from 'src/models/current.user';
import { RegistrationReqModel } from 'src/models/registration.req.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  async userRegistration(@Body() reqPayload: RegistrationReqModel) {
    return await this.userService.userRegistration(reqPayload);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    let token = await this.userService.getJwtToken(req.user as CurrentUser);
    let secretData = {
      token,
      refreshToken: '',
    };
    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return { msg: 'success' };
  }

  @Get('transactions')
  @UseGuards(AuthGuard('jwt'))
  async transactions() {
    return ['car wash', 'car repair', 'car insurance'];
  }
}
