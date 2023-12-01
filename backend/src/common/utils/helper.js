// import crypto from "crypto"
import { randomBytes } from "crypto";
import AppError from "./appError.js";

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

export const generateToken = () => {
  return randomBytes(16).toString("hex");
};

export function calculateTotalCost(hourlyPrice, durationInMinutes) {
  // Validate input parameters
  if (
    isNaN(hourlyPrice) ||
    isNaN(durationInMinutes) ||
    durationInMinutes <= 0
  ) {
    throw new Error("Invalid input parameters. Please provide valid numbers.");
  }

  // Calculate total cost
  const hourlyRateInHours = hourlyPrice / 60; // Convert hourly rate to per-minute rate
  const totalCost = hourlyRateInHours * durationInMinutes;

  return totalCost;
}
