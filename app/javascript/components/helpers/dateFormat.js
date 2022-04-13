const dateFormat = (
  date,
  m = "long",
  d = "numeric",
  y = "numeric",
  space1 = " ",
  space2 = ", "
) => {
  console.log(m, d, y, date, space1, space2);
  let dt = new Date(date);
  let day = dt.toLocaleDateString("en-us", { day: d });
  let month = dt.toLocaleDateString("en-us", { month: m });
  let year = dt.toLocaleDateString("en-us", { year: y });
  let formattedDate = `${month}${space1}${day}${space2}${year}`;

  return [formattedDate, { date: dt, month, day, year }];
};

export default dateFormat;
