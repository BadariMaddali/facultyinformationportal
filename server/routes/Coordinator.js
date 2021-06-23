const express = require("express");
const router = express.Router();
const { Users, Conferences, Journals } = require("../models");
const { coordinatorValidateToken } = require("../middlewares/AuthMiddleware");
const Sequelize = require('sequelize');


router.post("/addJournals", coordinatorValidateToken, async (req, res) => {

  const journals = req.body;

  await journals.forEach( (journal) => { Journals.create(journal)  } )

  res.json("Journals Added Successfully");
});

router.post("/addConferences", coordinatorValidateToken, async (req, res) => {

  const conferences = req.body;

  await conferences.forEach( (conference) => { Conferences.create(conference)  } )

  res.json("Conferences Added Successfully");
});

router.get("/getFaculty", coordinatorValidateToken, async (req, res) => {
  const department = req.user.department;
  const faculty = await Users.findAll({
    where: {
      department,
      isFaculty: 1,
      isDelete: 0,
    },
  });

  res.json(faculty);
});

router.get("/viewConferences", coordinatorValidateToken, async (req, res) => {
  const department = req.user.department;
  const conferences = await Conferences.findAll({
    where: {
      department,
    },
  });
  res.json(conferences);
});

router.get("/viewFacConfs/:id", coordinatorValidateToken, async (req, res) => {
  const userId = req.params.id;
  const department = req.user.department;
  const conferences = await Conferences.findAll({
    where: {
      department,
      userId,
    },
  });
  // res.json(userId)
  res.json(conferences);
});

router.get(
  "/viewFacJournals/:id",
  coordinatorValidateToken,
  async (req, res) => {
    const userId = req.params.id;
    const department = req.user.department;
    const journals = await Journals.findAll({
      where: {
        department,
        userId,
      },
    });
    // res.json(userId)
    res.json(journals);
  }
);

router.get("/viewJournals", coordinatorValidateToken, async (req, res) => {
  const department = req.user.department;
  const conferences = await Journals.findAll({
    where: {
      department,
    },
  });
  res.json(conferences);
});

router.get(
  "/indexJournalsSummary",
  coordinatorValidateToken,
  async (req, res) => {
    const department = req.user.department;
    const scopusJournals = await Journals.findAll({
      where: {
        department,
        indexing: "SCOPUS",
      },
    });

    const sciJournals = await Journals.findAll({
      where: {
        department,
        indexing: "SCI/ ESCI",
      },
    });

    const nonSciJournals = await Journals.findAll({
      where: {
        department,
        indexing: "Non SCI",
      },
    });

    const doiJournals = await Journals.findAll({
      where: {
        department,
        indexing: "DOI",
      },
    });

    const summary = {
      scopusCount: scopusJournals.length,
      sciCount: sciJournals.length,
      nonSciJournals: nonSciJournals.length,
      doiJournals: doiJournals.length
    };
    res.json(summary);
  }
);

router.get(
  "/indexConferencesSummary",
  coordinatorValidateToken,
  async (req, res) => {
    const department = req.user.department;
    const ieeeConferences = await Conferences.findAll({
      where: {
        department,
        indexing: "IEEE/IET",
      },
    });

    const springerConferences = await Conferences.findAll({
      where: {
        department,
        indexing: "Springer",
      },
    });

    const doiConferences = await Conferences.findAll({
      where: {
        department,
        indexing: "DOI",
      },
    });

    const summary = {
      ieeeCount: ieeeConferences.length,
      springerCount: springerConferences.length,
      doiConferences: doiConferences.length
    };
    res.json(summary);
  }
);


router.get("/getJournalsOnYear/:year", coordinatorValidateToken, async (req, res) => {
  const department = req.user.department;
  const year = req.params.year;

  const journals = await Journals.findAll({
    where: {
      department,
      year
    },
  });
  res.json(journals);
});

router.get("/getConferencesOnYear/:year", coordinatorValidateToken, async (req, res) => {
  const department = req.user.department;
  const year = req.params.year;

  const conferences = await Conferences.findAll({
    where: {
      department,
      year
    },
  });
  res.json(conferences);
});

router.get("/getJournalsOnIndex/:index", coordinatorValidateToken, async (req, res) => {
  const department = req.user.department;
  const indexing = req.params.index;
  const Op = Sequelize.Op;

  const journals = await Journals.findAll({
    where: {
      department,
      indexing:{
        [Op.like]: `${indexing}%`
      }
    },
  });
  res.json(journals);
});

router.get("/getConferencesOnIndex/:index", coordinatorValidateToken, async (req, res) => {
  const department = req.user.department;
  const indexing = req.params.index;

  const conferences = await Conferences.findAll({
    where: {
      department,
      indexing
    },
  });
  res.json(conferences);
});

router.get("/getCoordinatorSummary", coordinatorValidateToken, async (req, res) => {

  const department = req.user.department;

  const journals = await Journals.findAll({
    where: {
      department
    }
  });

  const conferences = await Conferences.findAll({
    where: {
      department
    }
  });

  const faculty = await Users.findAll({
    where: {
      department,
      isFaculty: 1,
      isDelete: 0,
    },
  });


  res.json({
    department,
    journalsCount : journals.length,
    conferencesCount: conferences.length,
    facultyCount: faculty.length
  })

});

module.exports = router;
