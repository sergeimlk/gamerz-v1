import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import UserService from "src/services/UserService";
import RoleModel from "../models/RoleModel";

export class UserController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    const query = UserModel.find({});
    const data = await query.exec();
    res.send(data);
  }

  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body.role) {
        res.status(400).json({
          error: "Role is required",
          message: "Please get available roles from /api/roles endpoint",
        });
        return;
      }

      const role = await RoleModel.findOne({ role: req.body.role }).exec();

      if (!role) {
        const availableRoles = await RoleModel.find()
          .select("role -_id")
          .exec();
        res.status(400).json({
          error: "Invalid role",
          message: "Please use one of the available roles",
          availableRoles: availableRoles.map((r) => r.role),
        });
        return;
      }

      delete req.body.role;
      const userData = { ...req.body, role_id: role._id };

      const userSaved = await this.userService.createUser(userData);
      res.send(userSaved);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    console.log(req.params.id);
  }
}
