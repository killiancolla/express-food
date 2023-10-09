import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      firstname: user.firstname,
      mail: user.mail,
      role: user.role,
      flag: user.flag,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    // console.log("auto", authorization);
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(403).send({ message: "Invalid Token" });
      }
      // console.log("decode", decode);
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: "Token is not found" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    // console.log("admin");
    next();
    return;
  }
  return res.status(401).send({ message: "Admin Token is not valid" });
};

export const isDoctor = (req, res, next) => {
  if (req.user && req.user.role === "doctor") {
    next();
    return;
  }
  return res.status(401).send({ message: "Coach Token is not valid" });
};

export const isTec = (req, res, next) => {
  if (req.user && req.user.role === "tec") {
    next();
    return;
  }
  return res.status(401).send({ message: "Tec Token is not valid" });
};
