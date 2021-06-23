const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { adminValidateToken } = require("../middlewares/AuthMiddleware");

router.post("/addFaculty", adminValidateToken, async (req, res) => {

  const {
    name,
    facultyId,
    password,
    department,
    designation,
    qualification,
    email,
    phoneNumber,
  } = req.body;
  const isFaculty = 1;
  Users.create({
    name,
    facultyId,
    password,
    department,
    isFaculty,
    department,
    designation,
    qualification,
    email,
    phoneNumber,
  });

  res.json("SUCCESS");
});

router.post("/addCoordinator", adminValidateToken, async (req, res) => {
  const { name, facultyId, password, department } = req.body;
  const isCoordinator = 1;

  const { count } = await Users.findAndCountAll({
    where: {
      isCoordinator: 1,
      isDelete: 0,
      department,
    },
  });

  if (count === 0) {
    Users.create({
      name,
      facultyId,
      password,
      department,
      isCoordinator,
      email: facultyId,
    });

    res.json("SUCCESS");
  } else {
    res.json({ error: "Coordinator Already Exists" });
  }
});

router.get("/getFaculty", adminValidateToken, async (req, res) => {
  const faculty = await Users.findAll({
    where: {
      isFaculty: 1,
      isDelete: 0,
    },
  });
  res.json(faculty);
});

router.get("/getFaculty/:id", adminValidateToken, async (req, res) => {
  const id = req.params.id;
  const faculty = await Users.findOne({
    where: {
      id,
    },
  });
  res.json(faculty);
});

router.get("/getCoordinators", adminValidateToken, async (req, res) => {
  const faculty = await Users.findAll({
    where: {
      isCoordinator: 1,
      isDelete: 0,
    },
  });
  res.json(faculty);
});

router.post("/updateFaculty/:id", adminValidateToken, async (req, res) => {
  const id = req.params.id;

  await Users.update(req.body, {
    where: {
      id,
    },
  });

  console.log(req.body);
  res.json("Updated");
});

router.post("/updateCoordinator/:id", adminValidateToken, async (req, res) => {
  const id = req.params.id;
  const { name, facultyId, password, department } = req.body;

  await Users.update(
    { name, facultyId, password, department },
    {
      where: {
        id,
      },
    }
  );

  console.log(req.body);
  res.json("Updated");
});

router.delete("/deleteFaculty/:id", adminValidateToken, async (req, res) => {
  const id = req.params.id;

  await Users.update(
    { isDelete: 1 },
    {
      where: {
        id,
      },
    }
  );

  res.json("Deleted");
});

router.delete(
  "/deleteCoordinator/:id",
  adminValidateToken,
  async (req, res) => {
    const id = req.params.id;

    await Users.update(
      { isDelete: 1 },
      {
        where: {
          id,
        },
      }
    );

    res.json("Deleted");
  }
);

module.exports = router;
