import { randomBytes } from "crypto";

/**
 * Generates a random string of the specified length.
 *
 * @param {number} length - The length of the random string to generate.
 * @return {string} - The generated random string.
 */
export function generateRandomString(length) {
  return randomBytes(length).toString("hex");
}
export function isNullOrEmpty(str) {
  if (str === undefined) {
    return true;
  } else if (str === null) {
    return true;
  } else if (str.trim() == "") {
    return true;
  } else {
    return false;
  }
  // return stringValue === "null" || stringValue === "" || stringValue === undefined || stringValue === null;
}

import crypto from "crypto"

export const generateToken = () => {
  return crypto.randomBytes(20).toString("hex"); // Adjust the length as needed
};
