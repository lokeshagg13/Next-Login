import { getSession } from "next-auth/react";
import { addUser } from "../../../controllers/userController";

async function handler(req, res) {
  try {
    if (req.method !== "POST") return;

    const session = await getSession({ req });
    if (session) {
      res.status(500).json({
        message: "Signup is possible only while a user is logged out",
      });
      return;
    }

    const { name, email, password } = req.body;
    if (
      !name ||
      name.trim === "" ||
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim() === ""
    ) {
      res.status(400).json({ message: "Invalid User Data" });
      return;
    }
    await addUser(req.body);
    res.status(201).json({ message: "Signed up successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default handler;
