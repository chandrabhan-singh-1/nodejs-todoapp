// import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

// export const getAllUsers = async (req, res) => {};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    // if (!user)
    //   return res.status(404).json({
    //     success: false,
    //     message: "Invalid Email or Password!",
    //   });

    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password!", 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // if (!isMatch)
    //   return res.status(404).json({
    //     success: false,
    //     message: "Invalid Email or Password!",
    //   });

    if (!isMatch) {
      return next(new ErrorHandler("Invalid Email or Password!", 400));
    }
    sendToken(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    // if (user) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "User already exists.",
    //   });
    // }
    if (user) {
      return next(new ErrorHandler("User Already Exists!", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    sendToken(user, res, "Registered Successfully", 201);

    // Below code is wrapped in sendToken() in features.js of utils folder

    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // res
    //   .status(201)
    //   .cookie("token", token, {
    //     httpOnly: true,
    //     maxAge: 15 * 60 * 1000,
    //   })
    //   .json({
    //     success: true,
    //     message: "Registerd Successfully!",
    //   });
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res) => {
  try {
    // Below commented code is wrapped in a isAuthenticated() in auth.js of middlewares folder.

    // const { token } = req.cookies;

    // console.log(token);
    // if (!token)
    //   return res.status(404).json({
    //     success: false,
    //     message: "Login First",
    //   });

    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await User.findById(decoded._id);

    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
    });
};

// export const updateUser = async (req, res) => {
//   const { id } = req.params; //Use this method when you give dynamic routing/URL

//   const user = await UserAPI.findById(id);
//   // console.log(req.params);
//   res.json({
//     success: true,
//     message: "User Updated!",
//   });
// };

// export const deleteUser = async (req, res) => {
//   const { id } = req.params;

//   const user = await UserAPI.findById(id);
//   await user.remove();

//   req.json({
//     success: true,
//     message: "User Deleted!",
//   });
// };
