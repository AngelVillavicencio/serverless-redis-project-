export default interface Token {
  tokenId: string;
  email: string;
  card_number: number;
  cvv: number;
  expiration_year: string;
  expiration_month: string;
  createdAt: string;
}
