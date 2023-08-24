//import { DocumentClient } from "aws-sdk/clients/dynamodb";
import isValidToken from "src/helpers/createToken";
import Token from "../model/token";
import { generateUniqueToken } from "src/helpers";
import { validateToken } from "src/helpers/validateToken";

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

  async getCard(token: string): Promise<{
    status: string;
    response:
      | {
          card_number: number;
          expiration_year: string;
          expiration_month: string;
          email: string;
        }
      | string;
    error: string;
  }> {
    const isCardValid = validateToken(token);

    if (!isCardValid) {
      return {
        status: "400",
        response: "",
        error: "Formato incorrecto ",
      };
    }

    // create token

    const info_of_token = {
      status: "200",
      response: {
        card_number: 12122,
        expiration_year: "2022",
        expiration_month: "09",
        email: "villavicencio@gmail.com",
      },
      error: "",
    }; //await getCard(16); // obtener de la base de datos

    return info_of_token;
  }
}
