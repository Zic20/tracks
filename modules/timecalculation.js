const getTimeDifference = (firstTime, secondTime) => {
  let startTime = new Date();
  let endTime = new Date();

  startTime.setHours(firstTime.split(":")[0], firstTime.split(":")[1], 0);
  endTime.setHours(secondTime.split(":")[0], secondTime.split(":")[1], 0);

  let hoursDifference = endTime.getHours() - startTime.getHours();
  let minutesDifference = endTime.getMinutes() - startTime.getMinutes();

  if (hoursDifference < 1) {
    if (minutesDifference > 0) {
      return `${minutesDifference}  ${minutesDifference > 1 ? "mins" : "min"}`;
    }
    return "";
  } else {
    if (minutesDifference > 0) {
      if (hoursDifference > 0 && minutesDifference > 0) {
        return `${hoursDifference} ${
          hoursDifference > 1 ? "hrs" : "hr"
        }  ${minutesDifference} ${minutesDifference > 1 ? "mins" : "min"}`;
      }
      return "";
    } else {
      if (minutesDifference < 0) {
        if (hoursDifference > 0) {
          hoursDifference -= 1;
          minutesDifference += 60;
        }
      }

      let hourString = `${
        hoursDifference > 0
          ? hoursDifference + `${hoursDifference > 1 ? "hrs" : "hr"}`
          : ""
      }`;

      let minutesString = `${
        minutesDifference > 0
          ? minutesDifference + `${minutesDifference > 1 ? "mins" : "min"}`
          : ""
      }`;
      return `${hourString} ${minutesString}`;
    }
  }
};

const validateTimeInputs = (startTime, endTime) => {
  let firstTime = new Date();
  let secondTime = new Date();
  firstTime.setHours(startTime.split(":")[0], startTime.split(":")[1], 0);
  secondTime.setHours(endTime.split(":")[0], endTime.split(":")[1], 0);
  return secondTime.getHours > firstTime.getHours();
};

const validateDateInputs = (startDate, endDate) => {
  let firstDate = new Date(startDate);
  let secondDate = new Date(endDate);
  return secondDate.getMilliseconds() > firstDate.getMilliseconds();
};

const convertTime = (time) => {
  let convertedTime = time.split(":");

  if (convertedTime[0] < 12) {
    if (convertedTime[0] === "00") {
      return `12:${convertedTime[1]} AM`;
    }
    return `${time} AM`;
  }

  return `${convertedTime[0] - 12}:${convertedTime[1]} PM`;
};

const convertTimeToString = (time) => {
  let convertedTime = time.split(":");
  const modifiedHour = `${convertedTime[0] > 1 ? "hrs" : "hr"}`;
  const modifiedMinute = `${convertedTime[1] > 1 ? "mins" : "min"}`;

  if (convertedTime[0] > 0) {
    if (convertedTime[1] > 0) {
      return `${convertedTime[0]}  ${modifiedHour} ${convertedTime[1]} ${modifiedMinute}`;
    }
    return `${convertedTime[0]} ${modifiedHour}`;
  }

  if (convertedTime[1] > 0) {
    return `${convertedTime[1]} ${modifiedMinute}`;
  }

  return "";
};

function convertDate(date) {
  date = new Date(date);
  let month =
    date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  date = `${date.getFullYear()}-${month}-${date.getDate()}`;
  return date;
}

export function totalTime(dataset) {
  let totalHours = 0;
  let totalMinutes = 0;
  dataset.forEach((data) => {
    let time = data.split(":");
    totalHours += +time[0];
    totalMinutes += +time[1];
  });

  if (totalMinutes > 60) {
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = Math.abs(totalMinutes / 60);
  }

  return `${totalHours}:${totalMinutes}`;
}

export {
  validateTimeInputs,
  validateDateInputs,
  getTimeDifference,
  convertTime,
  convertTimeToString,
  convertDate,
};
