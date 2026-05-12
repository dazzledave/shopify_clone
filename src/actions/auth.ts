"use server";

import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export const register = async (values: any) => {
  const { email, password, name } = values;

  if (!email || !password || !name) {
    return { error: "Missing fields" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "User already exists" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "User created" };
};

export const login = async (values: any) => {
  const { email, password } = values;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/auth/login" });
};
