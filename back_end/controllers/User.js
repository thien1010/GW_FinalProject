import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const Register = async (req, res, next) => {
  const { fullname, email, password, confPassword } = req.body;

  if (!fullname || !email || !password || !confPassword) {
    return res
      .status(400)
      .json({ messages: "Please fill in all required fields" });
  }

  if (password !== confPassword) {
    return res.status(400).json({ messages: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ messages: "Email is already registered" });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullname: fullname,
      email: email,
      password: hashPassword,
    });

    const { password: _, ...userWithoutPassword } = newUser.toJSON();

    res.json({
      user: userWithoutPassword,
      messages: "Registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};
export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ messages: "Email not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ messages: "Password incorrect" });
    }

    const userId = user.user_id;
    const fullname = user.fullname;
    const accessToken = jwt.sign(
      { userId, fullname, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );
    const refreshToken = jwt.sign(
      { userId, fullname, email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await User.update(
      { refresh_token: refreshToken },
      { where: { user_id: userId } }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        user_id: user.user_id,
        fullname: user.fullname,
        email: user.email,
        password: user.password,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ messages: "Internal Server Error" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await User.findAll({
    where: { refresh_token: refreshToken },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].user_id;
  await User.update(
    { refresh_token: null },
    {
      where: { user_id: userId },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

export const getUserInfo = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    res.json({
      user_id: user.userId,
      fullname: user.fullname,
      email: user.email,
    });
  });
};
