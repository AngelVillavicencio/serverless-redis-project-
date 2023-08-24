export const validateToken = (token: string) => {
  const formatoRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{16}$/;
  return formatoRegex.test(token);
};
