const dateFormat = (
  date,
  month = "numeric",
  day = "long",
  year = "numeric",
  space1 = " ",
  space2 = ", "
) => {
  let d = new Date(date);
  let date = d.toLocaleDateString("en-us", { day: day });
  let month = d.toLocaleDateString("en-us", { month: month });
  let year = d.toLocaleDateString("en-us", { year: year });
  let formattedDate = `${month} ${date}, ${year}`;

  return formattedDate;
};

export default dateFormat;
