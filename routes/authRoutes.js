import express from "express";
import {
  fetchRegisterUser,
  fetchLoginUser,
  fetchCurrentUser,
  fetchLogoutUser,
  fetchUpdateSubUser,
  fetchUpdateUserAvatar,
} from "../controllers/authControllers.js";
import {
  userSignInSchema,
  usersSignUpSchema,
  userUpdateSub,
} from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../midllewares/authentic.js";
import upload from "../midllewares/upload.js";

const authRouter = express.Router();
authRouter.post(
  "/register",
  upload.single("avatarURL"),
  validateBody(usersSignUpSchema),
  fetchRegisterUser
);
authRouter.post(
  "/login",
  validateBody(userSignInSchema),
  fetchLoginUser
);
authRouter.get("/current", authenticate, fetchCurrentUser);
authRouter.post("/logout", authenticate, fetchLogoutUser);
authRouter.patch(
  "/",
  authenticate,
  validateBody(userUpdateSub),
  fetchUpdateSubUser
);
authRouter.patch(
  "/avatars",
  upload.single("avatarURL"),
  authenticate,
  fetchUpdateUserAvatar
);

export default authRouter;
