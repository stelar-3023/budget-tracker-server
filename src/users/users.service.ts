import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entity/users.entity';
import { RegistrationReqModel } from 'src/models/registration.req.model';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegistrationRespModel } from 'src/models/registration.resp.model';
import { CurrentUser } from 'src/models/current.user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private user: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  // validations for user
  private async registrationValidation(
    regModel: RegistrationReqModel,
  ): Promise<string> {
    if (!regModel.email) {
      return 'Email is required';
    }

    const emailRule =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!emailRule.test(regModel.email.toLowerCase())) {
      return 'Email is not valid';
    }
    // check if email already exists
    const user = await this.user.findOne({ email: regModel.email });
    if (user != null && user.email) {
      return 'User already exists';
    }
  }
  private async bcryptPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  public async userRegistration(
    regModel: RegistrationReqModel,
  ): Promise<RegistrationRespModel> {
    let result = new RegistrationRespModel();

    const errorMessage = await this.registrationValidation(regModel);
    if (errorMessage) {
      result.message = errorMessage;
      result.status = false;

      return result;
    }
    // user object
    let newUser = new Users();
    newUser.name = regModel.name;
    newUser.email = regModel.email;
    newUser.password = await this.bcryptPassword(regModel.password);
    newUser.created_at = new Date();
    newUser.updated_at = new Date();
    newUser.deleted_at = null;

    // insert user
    await this.user.insert(newUser);
    result.status = true;
    result.message = 'User registered successfully';
    return result;
  }

  // validate the user
  public async validateLoginCredentials(
    email: string,
    password: string,
  ): Promise<CurrentUser> {
    let user = await this.user.findOne({ email: email });

    if (user == null) {
      return null;
    }

    const isvalidPassword = await bcrypt.compare(password, user.password);
    if (!isvalidPassword) {
      return null;
    }

    let currentUser = new CurrentUser();
    currentUser.id = user.id;
    currentUser.name = user.name;
    currentUser.email = user.email;

    return currentUser;
  }
  // get jwt token
  public async getJwtToken(currentUser: CurrentUser): Promise<string> {
    let payload = {
      ...currentUser,
    };
    return await this.jwtService.signAsync(payload);
  }

  // get user by id
  public async getUserById(id: string): Promise<Users> {
    return await this.user.findOne({ id: id });
  }

  // get user by email
  public async getUserByEmail(email: string): Promise<Users> {
    return await this.user.findOne({ email: email });
  }


}
