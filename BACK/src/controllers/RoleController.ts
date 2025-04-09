import { Request, Response } from "express";
import RoleService from "../services/RoleService";

export class RoleController {
  roleService: RoleService;

  constructor(roleService: RoleService) {
    this.roleService = roleService;
  }

  async getRoles(_: Request, res: Response): Promise<void> {
    const data = await this.roleService.findAll();
    res.send(data);
  }
}
