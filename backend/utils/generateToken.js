import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userID, res) => {
    const token = jwt.sign({userID}, ENV_VARS.JWT_SECRET, {expiresIn: '15d'}); // this is the token

    // put token into the cookies
    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // age can't be string, has to be in milliseconds (15days in ms = 15days*24hrs*60min*60sec*1000ms)
        httpOnly: true,  // makes sure cookie only accessable by browser (can't get access to it through JS - prevents XSS attacks (cross-site scripting attacks))
        sameSite: "strict", // prevents CSRF attacks (cross-site request forgery attacks)
        secure: ENV_VARS.NODE_ENV !== "development", // true if https (when deploy application), false if http (when in localhost)
    });

    return token;
};