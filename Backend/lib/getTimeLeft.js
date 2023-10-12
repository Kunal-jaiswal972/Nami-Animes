export function getTimeLeft(date) {
  const currentDate = new Date();
  const targetDate = new Date(date);

  const timeDifference = targetDate - currentDate;
  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  
  const timeLeftString = `${daysLeft} days, ${hoursLeft} hours`;
  return timeLeftString;
}
