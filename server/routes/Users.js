const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  if (password === user.password) {
    const accessToken = sign({ user }, "thefacultyinformationsystem");

    res.json({ token: accessToken, user });
  } else {
    res.json({ error: "Username or password is incorrect" });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.post("/updatePassword/:id", validateToken, async (req, res) => {
  const id = req.params.id;

  await Users.update(req.body, {
    where: {
      id,
    },
  });

  res.json("Password Updated Successfully");

});

// router.post("/login", async (req, res) => {
//   const user = req.body;
//   await Users.create(user);
//   res.json(user);
// });

module.exports = router;
