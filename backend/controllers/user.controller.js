import CustomError from "../config/errors/CustomError.js";
import { User } from "../models/UserSchema.js";

// Top-level constants
const REFRESH_TOKEN = {
  secret: process.env.AUTH_REFRESH_TOKEN_SECRET,
  cookie: {
    name: "refreshTkn",
    options: {
      sameSite: "None",
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
};

/*
  1. USER PROFILE
*/
export const profile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    console.log(user, "dfsduser");

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/*
  2. LOGOUT USER
*/
export const logout = async (req, res, next) => {
  try {
    // Authenticated user ID attached on `req` by authentication middleware
    const userId = req.userId;
    const user = await User.findById(userId);

    const cookies = req.cookies;
    const refreshToken = cookies[REFRESH_TOKEN.cookie.name];

    user.tokens = user.tokens.filter(
      (tokenObj) => tokenObj.token !== refreshToken
    );
    await user.save();

    const expireCookieOptions = Object.assign(
      {},
      REFRESH_TOKEN.cookie.options,
      {
        expires: new Date(1),
      }
    );

    // Destroy refresh token cookie with `expireCookieOptions` containing a past date
    res.cookie(REFRESH_TOKEN.cookie.name, "", expireCookieOptions);
    res.status(205).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/*
  3. LOGOUT USER FROM ALL DEVICES
*/
export const logoutAllDevices = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    user.tokens = undefined;
    await user.save();

    // Set cookie expiry to past date to mark for destruction
    const expireCookieOptions = Object.assign(
      {},
      REFRESH_TOKEN.cookie.options,
      {
        expires: new Date(1),
      }
    );

    res.cookie(REFRESH_TOKEN.cookie.name, "", expireCookieOptions);
    res.status(205).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/*
  4. UPDATE USER PROFILE
*/
export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the profile",
      error: error.message,
    });
  }
};

/**
 * Fetch All Cart Items with Populated Product Details
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const getAllCartItems = async (req, res) => {
  try {
    const { userId } = req;

    const userCart = await User.findById(userId).populate("cart.product")
    .select("cart product");
    console.log(userCart);

    if (!userCart) {
      CustomError("user Not found", 404);
    }

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: userCart,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while fetching the cart",
    });
  }
};
