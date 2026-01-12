const router = require("express").Router();
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const { registerValidation,loginValidation,updateUserValidation} = require("../validations/user.validation");
router.post("/register",registerValidation,validate,userController.register);
router.post("/login",loginValidation,validate,userController.login);
router.get("/me", auth, userController.getMyProfile);

router.get("/", auth, userController.getUsers);
router.get("/:id", auth, userController.getUserById);
router.put("/:id",auth,updateUserValidation,validate,userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

router.get("/:userId/profile", auth, userController.getUserFullProfile);



module.exports = router;
