const dateFormat = (
  date,
  m = "numeric",
  d = "long",
  y = "numeric",
  space1 = " ",
  space2 = ", "
) => {
  let d = new Date(date);
  let day = d.toLocaleDateString("en-us", { day: d });
  let month = d.toLocaleDateString("en-us", { month: m });
  let year = d.toLocaleDateString("en-us", { year: y });
  let formattedDate = `${month}${space1}${day}${space2}${year}`;

  return [formattedDate, { date: d, month, day, year }];
};

export default dateFormat;
