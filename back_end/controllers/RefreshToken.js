import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401); // No refresh token provided

    const user = await User.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!user) return res.sendStatus(403); // No user with this refresh token

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error) return res.sendStatus(403); // Invalid refresh token

        const userId = user.user_id;
        const fullname = user.fullname;
        const email = user.email;
        const accessToken = jwt.sign(
          { userId, fullname, email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "24h" }
        );

        res.json({
          user: {
            user_id: user.user_id,
            fullname: user.fullname,
            email: user.email,
            password: user.password,
          },
          accessToken,
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500); // Internal server error
  }
};
