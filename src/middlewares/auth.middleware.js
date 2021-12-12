import jwt from "jsonwebtoken";

export function isAuth(req, res, next) {
  // Get the token from  header
  const token = req.headers.authorization;
  try {
    // Check if the token is valid
    const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = user;
  } catch (error) {
    // If the token is not valid, return an error
    return res.status(401).json({ error: "Not Unauthorized" });
  }
  next();
}

// Middleware to check if the user is admin
export function isAdmin(req, res, next) {
  // Get the token from the Authorization header
  let token = req.headers.authorization;
  try {
    // Check the token to verify if it is valid
    const user = jwt.verify(token);
    // check if the user is admin then allow the request to access the protected route
    if (user.role === "admin") {
      req.user = user;
      return next();
    }
    // If the user is not admin, return an error in the response
    return res.status(401).json({ error: "not authorized!" });
  } catch (error) {
    // If the token is not valid, return an error in the response
    return res.status(401).json({ error: "not authorized!" });
  }
}
