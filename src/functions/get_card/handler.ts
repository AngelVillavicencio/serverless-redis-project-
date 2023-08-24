import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import TokenService from "src/service/tokenService";
import initializeRedis from "@libs/db-redis";

const getCardHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  try {
    const tokenService = new TokenService();

    const {
      queryStringParameters: { token },
    } = event;

    const client = await initializeRedis();

    const token_response: {
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
    } = await tokenService.getCard(client, token);

    if (token_response.status == "400") {
      return formatJSONResponse({
        status: 400,
        message: token_response.error,
      });
    }

    if (token_response.status == "404") {
      return formatJSONResponse({
        status: 404,
        message: token_response.error,
      });
    }
    return formatJSONResponse({
      status: 201,
      response: token_response.response,
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e,
    });
  }
};

export const main = middyfy(getCardHandler);
