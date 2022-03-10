import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Param,
  UseGuards,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CurrentUser } from 'src/models/current.user';
import { RegistrationReqModel } from 'src/models/registration.req.model';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

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

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }


  
  @Get('transactions')
  @UseGuards(AuthGuard('jwt'))
  async transactions() {
    return ['car wash', 'car repair', 'car insurance'];
  }
}
