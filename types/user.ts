export interface User {
  _id: string;
  pseudo: string;
  email: string;
  avatar?: string;
  status?: "online" | "offline" | "idle" | "dnd";
}
