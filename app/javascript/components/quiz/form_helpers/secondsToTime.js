const secondsToTime = (seconds) => {
  let time = parseInt(seconds);
  let hours = Math.floor(time / 3600);
  let minutes = 0;

  hours >= 1 ? (time = time - hours * 3600) : (hours = 0);
  minutes = Math.floor(time / 60);
  minutes >= 1 ? (time = time - minutes * 60) : (minutes = 0);
  time < 1 ? (time = 0) : undefined;

  return { hours, minutes, seconds: time };
};

export default secondsToTime;
