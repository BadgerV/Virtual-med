export function shortenText(text, maxLength = 50) {
  // Check if text length is greater than the maximum length
  if (text.length > maxLength) {
    // Shorten the text to maxLength characters
    const shortenedText = text.slice(0, maxLength);

    // Add ellipsis at the end
    return shortenedText + " . . . . . . .";
  }

  // If text length is within the limit, return the original text
  return text;
}

export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// check if password is valid
export const isStrongPassword = (password) => {
  if (import.meta.env.MODE !== "production") return true;

  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numbersRegex = /[0-9]/;
  const lengthRegex = /.{12,16}/;

  // if true return boolean true or otherwise if false
  if (
    password.match(uppercaseRegex) &&
    password.match(lowercaseRegex) &&
    password.match(numbersRegex) &&
    password.match(lengthRegex)
  ) {
    return true;
  } else {
    return false;
  }
};

export function convertHashtagsToArray(hashtagsString) {
  // Split the string by comma and space, then map to remove the '#' symbol
  return hashtagsString.split(", ").map((tag) => tag.replace("#", ""));
}
