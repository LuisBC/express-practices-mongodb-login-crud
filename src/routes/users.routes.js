import { Router } from "express";
const router = Router();

import {
  renderSignInForm,
  renderSignUpForm,
  signup,
  signin,
  logout,
} from "../controllers/users.controllers";

router.get("/users/signup", renderSignUpForm);
router.post("/users/signup", signup);
router.get("/users/signin", renderSignInForm);
router.post("/users/signin", signin);
router.get("/users/logout", logout);

export default router;
