
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

function validateEmail(email: string) {
  return emailRegex.test(email);
}


export const Utils = {
  validateEmail,
}