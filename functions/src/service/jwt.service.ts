import jwt, {JwtPayload, SignOptions} from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "elmejordemarte";
const DEFAULT_EXPIRATION = "1h";

export class JwtService {
  static generateToken(
    payload: object
  ): string {
    const options: SignOptions = {
      expiresIn: DEFAULT_EXPIRATION
    };

    return jwt.sign(payload, SECRET_KEY, options);
  }

  static verifyToken(token: string): JwtPayload | string {
    return jwt.verify(token, SECRET_KEY);
  }

  static decodeToken(token: string): JwtPayload | string | null {
    return jwt.decode(token);
  }
}
