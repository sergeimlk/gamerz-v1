import { IRole } from "src/models/RoleModel";
import RoleRepository from "../daos/RoleRepository";

class RoleService {
  private readonly ROLES = ["Guest", "Player", "Moderator", "Admin"];

  roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;

    this.areRolesSaved().then((bool) => {
      if (!bool) {
        this.roleRepository.setRoles(this.ROLES);
      }
    });
  }

  private async areRolesSaved(): Promise<boolean> {
    const existingRoles = await this.roleRepository.findAll();
    const targetRoles = new Set<string>(this.ROLES);

    for (const obj of existingRoles) {
      if (!targetRoles.has(obj.role)) {
        break;
      }
      targetRoles.delete(obj.role);
    }
    return targetRoles.size === 0;
  }

  async findAll(): Promise<Array<IRole>> {
    return await this.roleRepository.findAll();
  }
}

export default RoleService;
