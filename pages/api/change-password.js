import { getSession } from "next-auth/react";
import { updateUserPassword } from "../../controllers/userController";

async function handler(req, res) {
  try {
    if (req.method !== "PATCH") return;

    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({
        message: "User is not logged in",
      });
      return;
    }

    const email = session.user.email;

    const { currentPassword, newPassword } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !currentPassword ||
      currentPassword.trim() === "" ||
      !newPassword ||
      newPassword.trim() === "" ||
      currentPassword === newPassword
    ) {
      res.status(400).json({ message: "Invalid User Data" });
      return;
    }

    const updatedUser = await updateUserPassword({ email: email, ...req.body });
    res.status(201).json({
      message: "Password updated successfully",
      updatedUser: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default handler;
