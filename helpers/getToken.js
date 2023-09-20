import jwt from "jsonwebtoken";

export function getToken(fields) {
  return jwt.sign(fields, "RANDOM-TOKEN", { expiresIn: "24h" });
}
