const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "thefacultyinformationsystem");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

const adminValidateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "thefacultyinformationsystem");
    const user = validToken.user;

    if (validToken) {
      if (user.isAdmin) {
        req.user = validToken;
        return next();
      } else {
        return res.json({ error: "You must be an admin to perform this task" });
      }
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

const coordinatorValidateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "thefacultyinformationsystem");
    const user = validToken.user;

    if (validToken) {
      if (user.isCoordinator) {
        req.user = validToken.user;
        return next();
      } else {
        return res.json({
          error: "You must be a Coordinator to perform this task",
        });
      }
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

const facultyValidateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "thefacultyinformationsystem");
    const user = validToken.user;

    console.log(user)

    if (validToken) {
      if (user.isFaculty) {
        req.user = validToken.user;
        return next();
      } else {
        return res.json({
          error: "You must be a Faculty to perform this task",
        });
      }
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = {
  validateToken,
  adminValidateToken,
  coordinatorValidateToken,
  facultyValidateToken
};
