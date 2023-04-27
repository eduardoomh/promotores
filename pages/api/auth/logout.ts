import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default function logoutHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { chamosa_token } = req.cookies;
  if (!chamosa_token) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const serialized = serialize("chamosa_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialized);
  return res.status(200).json({
    message: "Logout successful",
  });
}