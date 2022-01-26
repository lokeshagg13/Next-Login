import mongoose, { connect } from "mongoose";
import userModel from "../models/user";
import { compare, hash } from "bcryptjs";

export async function addUser(userData) {
  const { name, email, password } = userData;
  let connection;
  try {
    connection = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    throw new Error("Error connecting to the DB");
  }

  const searchedUser = await userModel.findOne({ email: email });
  if (searchedUser) {
    throw new Error(
      "You are already registered. Login using your current credentials"
    );
  }

  const hashedPassword = await hash(password, 12);

  try {
    await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
  } catch (error) {
    throw new Error("Error adding user data to the DB");
  }

  await connection.disconnect();
}

export async function searchUser(userData) {
  const { email, password } = userData;
  let connection;
  try {
    connection = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    throw new Error("Error connecting to the DB");
  }

  const searchedUser = await userModel.findOne({ email: email });
  if (!searchedUser) {
    throw new Error("User is not registered");
  }

  const passwordVerification = await compare(password, searchedUser.password);
  if (!passwordVerification) {
    throw new Error("Invalid Password");
  }

  await connection.disconnect();
  return searchedUser;
}

export async function updateUserPassword(userData) {
  const { email, currentPassword, newPassword } = userData;
  let connection;
  try {
    connection = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    throw new Error("Error connecting to the DB");
  }

  const searchedUser = await userModel.findOne({ email: email });
  if (!searchedUser) {
    throw new Error("User is not registered");
  }

  const passwordVerification = await compare(
    currentPassword,
    searchedUser.password
  );
  if (!passwordVerification) {
    throw new Error("The Current Password is not valid");
  }

  const hashedNewPassword = await hash(newPassword, 12);

  let updatedUser;
  try {
    updatedUser = await userModel.updateOne(
      { email: email },
      { $set: { password: hashedNewPassword } }
    );
  } catch (error) {
    throw new Error("Error updating the password in the Database");
  }

  await connection.disconnect();
  return updatedUser;
}
