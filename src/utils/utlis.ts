const validateEmail = (email: string) => email.match(/^\w+([\\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
export const Utils = {
  validateEmail,
}