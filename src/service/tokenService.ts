//import { DocumentClient } from "aws-sdk/clients/dynamodb";
import isValidToken from "src/helpers/createToken";
import Token from "../model/token";
import { esCodigoValido, generarCodigoAleatorio } from "src/helpers";

export default class TokenService {
  constructor() {}

  async createToken(
    client,
    card: Token
  ): Promise<{ status: string; token: string; error: string }> {
    try {
      const isCardValid = isValidToken(card);
      if (!isCardValid.valid) {
        return {
          status: "400",
          token: "",
          error: isCardValid.status,
        };
      }

      // create token

      const token_created = generarCodigoAleatorio();
      await client.set(token_created, JSON.stringify(card), {
        EX: 10,
      });

      return {
        status: "200",
        token: token_created,
        error: "",
      };
    } catch (e) {
      console.log("error!!", e);
    }
  }

  async getCard(
    client,
    token: string
  ): Promise<{
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
    const isCardValid = esCodigoValido(token);

    if (!isCardValid) {
      return {
        status: "400",
        response: "",
        error: "Formato incorrecto",
      };
    }

    const info = await client.get(token);

    if (!info) {
      const info_of_token = {
        status: "404",
        response: "",
        error: "El token expiró!",
      };
      return info_of_token;
    }

    const infoObj = JSON.parse(info);
    const info_of_token = {
      status: "200",
      response: {
        card_number: infoObj.card_number,
        expiration_year: infoObj.expiration_year,
        expiration_month: infoObj.expiration_month,
        email: infoObj.email,
      },
      error: "",
    };
    return info_of_token;
  }
}
