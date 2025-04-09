import express from "express";
import UserModel from "../models/UserModel";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({}, "pseudo email");
    res.json(
      users.map((user: { _id: any; pseudo: any; email: any }) => ({
        _id: user._id,
        pseudo: user.pseudo,
        email: user.email,
        status: "online",
        avatar: `/placeholder.svg?height=40&width=40`,
      }))
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { pseudo } = req.query;
    const result = await UserModel.deleteMany({ pseudo });
    res.json({
      message: `Users with pseudo ${pseudo} deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).json({ error: "Failed to delete users" });
  }
});

export default router;
