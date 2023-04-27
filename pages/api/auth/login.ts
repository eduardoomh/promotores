import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { UserDataI } from "../../../interfaces/user.interfaces";
import User from "../../../database/models/User";
import { compare } from "../../../utils/HashHelpers";
import { db } from "../../../database/connection";

type Data =
  | { message: string }
  | UserDataI
  | UserDataI[]


export default async function loginHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email, password } = req.body;
  await db.connect()
  const foundUser = await User.findOne({ email })

  if (!foundUser) {
    await db.disconnect()
    return res.status(401).json({ message: "El correo o la contraseña son inválidas, intente de nuevo." });
  }

  const comparePassword = await compare(password, foundUser?.password)
  if (!comparePassword) {
    await db.disconnect()
    return res.status(401).json({ message: "El correo o la contraseña son inválidas, intente de nuevo." });
  }

  try {
    // expire in 30 days
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        _id: foundUser._id,
        name: foundUser.name,
        email,
        role: foundUser.role
      },
      "chamosa_secret_key"
    );

    const serialized = serialize("chamosa_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json(foundUser);
  } catch (error) {
    console.log(error)
    await db.disconnect()
    return res.status(401).json({ message: "El correo o la contraseña son inválidas, intente de nuevo." });

  }

}