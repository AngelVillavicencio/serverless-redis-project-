import { v4 } from "uuid";
enum CardType {
  Visa = "Visa",
  Mastercard = "Mastercard",
  Amex = "American Express",
  Unknown = "Unknown",
}

interface ValidationResult {
  valid: boolean;
  type: CardType;
}

export function validateCard(cardNumber: number): ValidationResult {
  const cleanedCardNumber = cardNumber.toString().replace(/\D/g, "");

  if (!/^[0-9]{13,16}$/.test(cleanedCardNumber)) {
    return { valid: false, type: CardType.Unknown };
  }

  const digits = Array.from(cleanedCardNumber, Number);
  const reversedDigits = digits.slice().reverse();

  let sum = 0;
  let doubleNext = false;

  for (let i = 0; i < reversedDigits.length; i++) {
    let digit = reversedDigits[i];

    if (doubleNext) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    doubleNext = !doubleNext;
  }

  if (sum % 10 === 0) {
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cleanedCardNumber)) {
      return { valid: true, type: CardType.Visa };
    } else if (/^5[1-5][0-9]{14}$/.test(cleanedCardNumber)) {
      return { valid: true, type: CardType.Mastercard };
    } else if (/^3[47][0-9]{13}$/.test(cleanedCardNumber)) {
      return { valid: true, type: CardType.Amex };
    } else {
      return { valid: false, type: CardType.Unknown };
    }
  } else {
    return { valid: false, type: CardType.Unknown };
  }
}

enum EmailDomain {
  Gmail = "gmail.com",
  Hotmail = "hotmail.com",
  Yahoo = "yahoo.es",
  Unknown = "unknown",
}

interface EmailValidationResult {
  valid: boolean;
  domain: EmailDomain;
}

export function validateEmail(email: string): EmailValidationResult {
  const cleanedEmail = email.trim().toLowerCase();

  if (/^.{5,100}$/.test(cleanedEmail)) {
    const domainMatch = cleanedEmail.match(/@(.+)$/);
    if (domainMatch) {
      const domain = domainMatch[1];
      if (
        domain === EmailDomain.Gmail ||
        domain === EmailDomain.Hotmail ||
        domain === EmailDomain.Yahoo
      ) {
        return { valid: true, domain: domain as EmailDomain };
      }
    }
  }

  return { valid: false, domain: EmailDomain.Unknown };
}

interface ExpirationDateValidationResult {
  valid: boolean;
  errorMessage?: string;
}

export function validateExpirationYear(
  expirationYear: string
): ExpirationDateValidationResult {
  const currentYear = new Date().getFullYear();

  if (!/^\d{4}$/.test(expirationYear)) {
    return {
      valid: false,
      errorMessage: "El año de expiración debe tener 4 dígitos.",
    };
  }

  const year = parseInt(expirationYear, 10);

  if (year < currentYear || year > currentYear + 5) {
    return {
      valid: false,
      errorMessage:
        "El año de expiración es inválido o excede el límite de 5 años.",
    };
  }

  return { valid: true };
}

export function validateExpirationMonth(
  expirationMonth: string
): ExpirationDateValidationResult {
  const month = parseInt(expirationMonth, 10);

  if (!/^\d{2}$/.test(expirationMonth)) {
    return {
      valid: false,
      errorMessage: "El mes de expiración debe tener 2 dígitos.",
    };
  }

  if (month < 1 || month > 12) {
    return {
      valid: false,
      errorMessage: "El mes de expiración debe estar en el rango de 1 a 12.",
    };
  }

  return { valid: true };
}

const caracteresPermitidos: string =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const codigoLength: number = 16;

export function generarCodigoAleatorio(): string {
  let codigo: string = "";
  for (let i = 0; i < codigoLength; i++) {
    codigo += caracteresPermitidos.charAt(
      Math.floor(Math.random() * caracteresPermitidos.length)
    );
  }
  return codigo;
}

export function esCodigoValido(codigo: string): boolean {
  if (codigo.length !== codigoLength) {
    return false;
  }

  const formatoValido: RegExp = /^[a-zA-Z0-9]+$/;
  if (!formatoValido.test(codigo)) {
    return false;
  }

  return true;
}
