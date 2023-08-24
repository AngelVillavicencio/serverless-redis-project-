import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import TokenService from "src/service/tokenService";
import { v4 } from "uuid";
import initializeRedis from "@libs/db-redis";

const createTokenHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  try {
    const id = v4();
    const tokenService = new TokenService();
    const client = await initializeRedis();

    const {
      body: { card_number, email, cvv, expiration_year, expiration_month },
    } = event;
    const token_response: { status: string; token: string; error: string } =
      await tokenService.createToken(client, {
        tokenId: id,
        email: email,
        card_number: card_number,
        cvv: cvv,
        expiration_year: expiration_year,
        expiration_month: expiration_month,
        createdAt: new Date().toISOString(),
      });

    if (token_response.status == "400") {
      return formatJSONResponse({
        status: 400,
        message: token_response.error,
      });
    }
    return formatJSONResponse({
      status: 201,
      token: token_response.token,
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e,
    });
  }
};

export const main = middyfy(createTokenHandler);
