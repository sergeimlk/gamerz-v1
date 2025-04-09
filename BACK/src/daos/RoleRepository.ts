import RoleModel, { IRole } from "../models/RoleModel";
import { AbstractCrudRepository } from "./AbstractCrudRepository";

class RoleRepository extends AbstractCrudRepository<IRole> {
  constructor() {
    super(RoleModel);
  }

  async setRoles(roles: Array<string>): Promise<void> {
    try {
      for (const role of roles) {
        const roleModel = new RoleModel({ role });
        await roleModel.save();
      }
    } catch (error) {
      throw new Error(`[DB][Error] Failed to save data in database. \n${error}`);
    }
  }

  async deleteAll(): Promise<void> {
    try {
      await RoleModel.deleteMany({});
    } catch (error) {
      throw new Error(`[DB][Error] Failed to delete data from database. \n${error}`);
    }
  }
}

export default RoleRepository;
