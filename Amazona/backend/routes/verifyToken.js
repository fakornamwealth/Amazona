import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).send(`You good? Token not valid!`);
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send(`You be thief? You are not authenticated!`);
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if ((req.user.id = req.params.id || req.user.isAdmin)) {
      next();
    } else {
      res.status(403).send(`Not allowed! arindin`);
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send(`Not allowed! You be Admin?`);
    }
  });
};

// refresh token function
const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.JWT_SEC_REFRESH, (err, payload) => {
      if (err) return reject(console.log("Bad Request"));
      const userId = payload.aud;
      userId;

      resolve(refreshToken);
    });
  });
};

export {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyRefreshToken,
};
