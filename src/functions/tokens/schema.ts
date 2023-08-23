export default {
  type: "object",
  properties: {
    email: { type: "string" },
    card_number: { type: "number" },
    cvv: { type: "number" },
    expiration_month: { type: "string" },
    expiration_year: { type: "string" },
  },
  required: [
    "email",
    "card_number",
    "cvv",
    "expiration_month",
    "expiration_year",
  ],
} as const;
