import { Types } from "mongoose";

import { HttpError } from "../utils/httpError.js";
import { catchAsync } from "../utils/catchAsync.js";
import {
  createUserDataValidator,
  updateUserDataValidator,
} from "../utils/userValidators.js";
import { User } from "../models/userModel.js";

export const checkCreateUserData = catchAsync(async (req, res, next) => {
  const { value, errors } = createUserDataValidator(req.body);

  if (errors) throw new HttpError(400, "Invalid user data..", errors);

  const userExists = await User.exists({ email: value.email });

  if (userExists)
    throw new HttpError(409, "User with that email already exists..");

  req.body = value;

  next();
});

export const checkUpdateUserData = (req, res, next) => {
  const { value, errors } = updateUserDataValidator(req.body);

  if (errors) throw new HttpError(400, "Invalid user data..", errors);

  req.body = value;

  next();
};

export const checkUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) throw new HttpError(404, "User not found..");

  const user = await User.findById(id);

  if (!user) throw new HttpError(404, "User not found..");

  req.user = user;

  next();
});
