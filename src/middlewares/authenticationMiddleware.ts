/* eslint-disable operator-linebreak */
import { NextFunction, Request, Response } from "express";
import AppError from "./errorHandlingMiddleware";
import User from "../user/user.repositroy";
import passportJwt from "passport-jwt";
import passport from "passport";
import { IUser } from "../user/user.interface";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        process.env.JWT_SECRET || "jwt-ultra-secure-and-ultra-long-key",
    },
    async function (jwtToken, done) {
      try {
        const user: IUser = await User.findById(jwtToken.id);
        if (user) {
          return done(undefined, user, jwtToken);
        }
        return done(undefined, false);
      } catch (err) {
        return done(err, false);
      }
      // function (err, user) {
      //   if (err) {
      //     return done(err, false);
      //   }
      //   if (user) {
      //     return done(undefined, user, jwtToken);
      //   } else {
      //     return done(undefined, false);
      //   }
      // });
    }
  )
);

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", function (err, user: IUser, info) {
    if (err) {
      throw new AppError("Token Failed.You are not authorised", 401);
    }
    if (!user) {
      throw new AppError("Token Failed.You are not authorised", 401);
    } else {
      req.user = user;
      return next();
    }
  })(req, res, next);
};

// exports.restrictTo = (req: Request, res: Response, next: NextFunction) => {
//   {
//     if (!req.user.isAdmin) {
//       return next(new AppError("User does not have access", 403));
//     }
//     next();
//   }
// };
