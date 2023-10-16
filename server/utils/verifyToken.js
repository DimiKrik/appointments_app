import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import mongoose from "mongoose";
import User from '../models/User.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }

  jwt.verify(token, process.env.JWT, (err, decodedUser) => {
    if (err) {
      return next(createError(403, "Token not valid"));
    }
    req.user = decodedUser;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized as a user!"));
    }
  });
};

export const verifyTechnician = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isTechnician || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized as a technician!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user && req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized as an admin!"));
      }
    });
  };