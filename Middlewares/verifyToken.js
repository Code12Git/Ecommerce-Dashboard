import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "Please give a Token" });
  }
};

export default verifyToken;
