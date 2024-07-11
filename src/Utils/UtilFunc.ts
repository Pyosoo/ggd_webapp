export const ResetData = () => {
  localStorage.removeItem("Nickname");

  // score
  localStorage.removeItem("Totalscore");
  localStorage.removeItem("YearOfScore");
  localStorage.removeItem("MonthOfScore");
  localStorage.removeItem("HourOfScore");
  localStorage.removeItem("BoonOfScore");
  localStorage.removeItem("DateOfScore");
};
