//import { DocumentClient } from "aws-sdk/clients/dynamodb";
import isValidToken from "src/helpers/validateToken";
import Token from "../model/token";
import { generateUniqueToken } from "src/helpers";

export default class TokenService {
  private Tablename: string = "TodosTable";

  constructor() {}

  async createToken(
    card: Token
  ): Promise<{ status: string; token: string; error: string }> {
    const isCardValid = isValidToken(card);
    if (!isCardValid.valid) {
      return {
        status: "400",
        token: "",
        error: isCardValid.status,
      };
    }

    // create token

    const token_created = generateUniqueToken(16);

    return {
      status: "200",
      token: token_created,
      error: "",
    };
  }
}
