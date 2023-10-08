
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

function validateEmail(email: string) {
  return emailRegex.test(email);
}

type TruncateType = {
  text: string
  longText: number
  start?: number
}
function truncateText(props: TruncateType) {
  const {
    text,
    longText,
    start = 0,
  } = props
  return text?.length > longText ? text.substring(start, longText) + "..." : text;
}


export const Utils = {
  validateEmail,
  truncateText
}