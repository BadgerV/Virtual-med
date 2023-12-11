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

export function convertDateStringToISOString(inputDate) {
  // Extract date and time components
  const [dayOfWeek, dayNumber, month, time, year] = inputDate.split(" ");

  // Convert day of week to number (0-6)
  const dayNumberIndex = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ].indexOf(dayOfWeek);

  // Convert month to numerical format
  const monthNumber = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  }[month];

  // Convert time to 24-hour format
  let hour, minute;

  if (time.endsWith("pm")) {
    [hour, minute] = time.slice(0, -2).split(":");
    hour = parseInt(hour) + 12;
  } else {
    [hour, minute] = time.slice(0, -2).split(":");
  }

  // Combine date and time components
  const momentJSFormatDate = `${year}-${monthNumber}-${dayNumber}T${hour}:${minute}:00Z`;

  const parsedDate = moment(momentJSFormatDate);

  // Check if the parsed date is valid
  if (!parsedDate.isValid()) {
    console.error(`Invalid date format: ${inputDate}`);
    return null;
  }

  // Format the date to ISO format
  const outputDate = parsedDate.toISOString();

  return outputDate;
}


export function parseDateWithMoment(dateString) {
  // Define the moment format
  const momentFormat = 'dddd, Do MMMM h:mma YYYY';

  // Parse the date string using moment
  const momentObject = moment(dateString, momentFormat);

  // Check if parsing was successful
  if (!momentObject.isValid()) {
    throw new Error("Invalid date format");
  }

  // Extract and convert date parts from the moment object
  const dateObject = new Date(momentObject.year(), momentObject.month(), momentObject.date(), momentObject.hour(), momentObject.minute());

  return dateObject;
}

export function formatDate(dateString) {
  const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-NG', options).format(new Date(dateString));

  const day = new Intl.DateTimeFormat('en-NG', { day: 'numeric' }).format(new Date(dateString));
  const month = new Intl.DateTimeFormat('en-NG', { month: 'long' }).format(new Date(dateString));
  const year = new Intl.DateTimeFormat('en-NG', { year: 'numeric' }).format(new Date(dateString));
  const time = new Intl.DateTimeFormat('en-NG', { hour: 'numeric', minute: 'numeric' }).format(new Date(dateString));

  const formattedString = `${day}th ${month} ${year} | ${time}`;
  return formattedString;
}


export function truncateString(inputString, maxLength) {
  if (
    typeof inputString !== "string" ||
    typeof maxLength !== "number" ||
    maxLength <= 0
  ) {
    return "Invalid input";
  }

  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    return inputString.substring(0, maxLength) + "...";
  }
}
