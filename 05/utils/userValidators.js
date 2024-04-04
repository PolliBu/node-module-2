import Joi from "joi";

import { joiValidator } from "./joiValidator.js";
import { PASSWD_REGEX } from "../constants/regex.js";
import { userRoles } from "../constants/userRoles.js";

export const createUserDataValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(30).required(),
      year: Joi.number()
        .min(1900)
        .max(new Date().getFullYear() - 18),
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
      role: Joi.string().valid(...Object.values(userRoles)),
    })
    .validate(data)
);

export const updateUserDataValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(30),
      year: Joi.number()
        .min(1900)
        .max(new Date().getFullYear() - 18),
      role: Joi.string().valid(...Object.values(userRoles)),
    })
    .validate(data)
);
