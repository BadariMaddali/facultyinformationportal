const express = require("express");
const router = express.Router();
const { Journals, Conferences, Users } = require("../models");
const { facultyValidateToken } = require("../middlewares/AuthMiddleware");

router.post("/addJournal", facultyValidateToken, async (req, res) => {
  const journal = { ...req.body, userId: req.user.id, department:req.user.department };
  Journals.create(journal);

  res.json("Added Journal Successfully");
});

router.post("/updateProfile", facultyValidateToken, async (req, res) => {
  const id = req.user.id;

  await Users.update(req.body, {
    where: {
      id,
    },
  });

  res.json("User profile Updated Successfully!");
});

router.get("/getFaculty", facultyValidateToken, async (req, res) => {
  const id = req.user.id;

  const user = await Users.findOne({
    where: {
      id,
    },
  });

  res.json(user);
});

router.post("/updateJournal/:id", facultyValidateToken, async (req, res) => {
  const id = req.params.id;

  await Journals.update(req.body, {
    where: {
      id,
    },
  });

  res.json("Updated Succesfully");
});

router.get("/getJournal/:id", facultyValidateToken, async (req, res) => {
  const id = req.params.id;

  const journal = await Journals.findOne({
    where: {
      id,
    },
  });
  res.json(journal);
});

router.get("/getConference/:id", facultyValidateToken, async (req, res) => {
  const id = req.params.id;

  const conference = await Conferences.findOne({
    where: {
      id,
    },
  });
  res.json(conference);
});

router.get("/viewJournals", facultyValidateToken, async (req, res) => {
  const journals = await Journals.findAll({
    where: {
      userId: req.user.id
    }
  });
  res.json(journals);
});

router.post("/addConference", facultyValidateToken, async (req, res) => {
  const conference = { ...req.body, userId: req.user.id, department:req.user.department };
  Conferences.create(conference);

  res.json("Added Conference Successfully");
});

router.post("/updateConference/:id", facultyValidateToken, async (req, res) => {
  const id = req.params.id;

  await Conferences.update(req.body, {
    where: {
      id,
    },
  });

  res.json("Updated Succesfully");
});

router.get("/viewConferences", facultyValidateToken, async (req, res) => {
  const conferences = await Conferences.findAll({
    where: {
      userId: req.user.id
    }
  });
  res.json(conferences);
});

router.get("/getFacSummary", facultyValidateToken, async (req, res) => {

  const facultyName = req.user.name;

  const journals = await Journals.findAll({
    where: {
      userId: req.user.id
    }
  });

  const conferences = await Conferences.findAll({
    where: {
      userId: req.user.id
    }
  });

  res.json({
    facultyName,
    journalsCount : journals.length,
    conferencesCount: conferences.length
  })

});

module.exports = router;
