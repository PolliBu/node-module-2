import Router from "express";

import {
  createUser,
  deleteUser,
  getOneUser,
  getUsersList,
  updateUser,
} from "../controllers/userControllers.js";
import {
  checkCreateUserData,
  checkUpdateUserData,
  checkUserId,
} from "../middlewares/userMiddlewares.js";

const router = Router();

/**
 * REST api (Create, Read, Update, Delete)
 * POST, GET, PATCH (PUT), DELETE
 *
 * POST         /users
 * GET          /users
 * GET          /users/<userId>
 * PATCH (PUT)  /users/<userId>
 * DELETE       /users/<userId>
 */
// router.post('/', createUser);
// router.get('/', getUsersList);
// router.get('/:id', checkUserId, getOneUser);
// router.patch('/:id', checkUserId, getOneUser);
// router.delete('/:id', checkUserId, getOneUser);

router.route("/").post(checkCreateUserData, createUser).get(getUsersList);

router.use("/:id", checkUserId);
router
  .route("/:id")
  .get(getOneUser)
  .patch(checkUserId, checkUpdateUserData, updateUser)
  .delete(checkUserId, deleteUser);

export { router };
