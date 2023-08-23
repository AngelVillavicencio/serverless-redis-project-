import Token from "src/model/token";
import {
  validateCard,
  validateEmail,
  validateExpirationMonth,
  validateExpirationYear,
} from ".";
const isValidToken = (info: Token) => {
  const { email, card_number, cvv, expiration_year, expiration_month } = info;

  // validar numero de tarjeta
  const isValidNumberCard = validateCard(card_number);
  if (!isValidNumberCard.valid) {
    return { status: "Número de tarjeta no válida", valid: false };
  }
  // validar CVV
  if (
    isValidNumberCard.type == "Visa" ||
    isValidNumberCard.type == "Mastercard"
  ) {
    if (!(cvv >= 100 && cvv <= 999))
      return { status: "Número CVV no válido", valid: false };
  }
  if (isValidNumberCard.type == "American Express") {
    if (!(cvv >= 1000 && cvv <= 9909))
      return { status: "Número CVV no válido", valid: false };
  }

  // validar año

  if (!validateExpirationYear(expiration_year).valid)
    return { status: "El año es inválido", valid: false };

  // validar mes

  if (!validateExpirationMonth(expiration_month).valid)
    return { status: "El mes es inválido", valid: false };

  // validar email
  if (!validateEmail(email).valid)
    return { status: "El correo es inválido", valid: false };

  return { status: "Todo válido", valid: true };
};

export default isValidToken;
