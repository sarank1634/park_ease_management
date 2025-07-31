import jwt from "jsonwebtoken"

const SECRET = process.env.SECRET_KEY || "your-secret-key"; // store this in .env

export function signToken(payload: any): string {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): any | null {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
