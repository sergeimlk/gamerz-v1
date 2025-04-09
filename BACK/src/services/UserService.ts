import UserModel, { IUser } from "../models/UserModel";
import UserRepository from "../daos/UserRepository";
import "dotenv/config";
import AuthenticationService from "./AuthenticationService";

class UserService {
  findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).exec();
  }

  findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).exec();
  }

  userRepository: UserRepository;
  authenticationService: AuthenticationService;

  constructor(
    UserRepository: UserRepository,
    AuthenticationService: AuthenticationService
  ) {
    this.userRepository = UserRepository;
    this.authenticationService = AuthenticationService;
  }

  async createUser(user: Partial<IUser>) {
    const password = (await this.authenticationService.encryptPassword(
      user
    )) as string;
    if (!password) {
      throw new Error("[Error] Failed to encrypt password");
    }
    user.password = password;
    const newUser = new UserModel(user);
    const userSaved = await this.userRepository.createUser(newUser);
    return userSaved;
  }
}

export default UserService;
