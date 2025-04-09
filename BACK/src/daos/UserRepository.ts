import UserModel, { IUser } from "../models/UserModel";
import { AbstractCrudRepository } from "./AbstractCrudRepository";

class UserRepository extends AbstractCrudRepository<IUser> {
  constructor() {
    super(UserModel);
  }

  async createUser(user: IUser): Promise<IUser> {
    const userSaved = await user.save();
    return userSaved;
  }
}

export default UserRepository;
