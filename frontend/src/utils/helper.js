import moment from "moment";

export function generateTimeSlots(
  startTime,
  endTime,
  intervalMinutes = 60,
  year
) {
  const timeSlots = [];
  let currentSlot = new Date(startTime);
  const endDateTime = new Date(endTime);

  while (currentSlot < endDateTime) {
    timeSlots.push({
      start: new Date(currentSlot),
      end: new Date(currentSlot.getTime() + intervalMinutes * 60000),
      year: year, // Include the year in the time slots
    });

    currentSlot = new Date(currentSlot.getTime() + intervalMinutes * 60000);
  }

  return timeSlots;
}

export function formatCustomDate(date) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Add 'st', 'nd', 'rd', or 'th' to day of the month
  const daySuffix = (dayOfMonth) => {
    if (dayOfMonth >= 11 && dayOfMonth <= 13) {
      return "th";
    }
    switch (dayOfMonth % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Convert hours to 12-hour format and determine 'am' or 'pm'
  const amPm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  const formattedDate = `${dayOfWeek}, ${dayOfMonth}${daySuffix(
    dayOfMonth
  )} ${month}, ${formattedHours}:${
    (minutes < 10 ? "0" : "") + minutes
  }${amPm}, ${year}`;

  return formattedDate;
}

export function organizeByDayAndDate(dateStringArray) {
  const resultObject = {};

  dateStringArray.forEach((dateString) => {
    const [, day, date, time, year] =
      dateString.match(/(\w+), (\d+[a-z]{2} \w+), (\d+:\d+[apm]+), (\d+)/i) ||
      [];

    if (day && date && time && year) {
      const dayAndDate = `${day}, ${date}`;

      if (!resultObject[dayAndDate]) {
        resultObject[dayAndDate] = { times: [], year: null };
      }

      resultObject[dayAndDate].times.push(time);
      resultObject[dayAndDate].year = year;
    }
  });

  //   console.log(resultObject);

  return resultObject;
}

export function convertDateStringToISOString(dayAndDate, time, year) {
  // Combine day, date, time, and year to create a new date string
  const dateString = `${dayAndDate} ${year} ${time}`;

  function convertDateFormat(inputDate) {
    // Define the input format
    const inputFormat =
      /^([A-Za-z]+), (\d+)(st|nd|rd|th) ([A-Za-z]+) (\d{4}) (\d+:\d{2}[ap]m)$/;

    // Extract components from the input date string
    const [, day, dayNumber, suffix, month, year, time] =
      inputDate.match(inputFormat);

    // Create a new Date object with the extracted components
    const parsedDate = new Date(`${month} ${dayNumber}, ${year} ${time}`);

    // Adjust the time to Nigeria timezone (UTC+1)
    parsedDate.setHours(parsedDate.getHours() + 1);

    // Format the date to the ISO format
    const outputDate = parsedDate.toISOString();

    return outputDate;
  }

  const result = convertDateFormat(dateString);

  console.log(result)

  return result;
}

// Example usage
