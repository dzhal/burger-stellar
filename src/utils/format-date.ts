const formatDate = (date: string) => {
  const msToDay = 1000 * 60 * 60 * 24;
  const orderDate = new Date(date);
  const currentDate = new Date(Date.now());
  const orderHours = orderDate.getHours();
  const orderMinutes =
    orderDate.getMinutes() < 10
      ? `0${orderDate.getMinutes()}`
      : orderDate.getMinutes();
  const GMT =
    orderDate.getTimezoneOffset() < 0
      ? `+${orderDate.getTimezoneOffset() / -60}`
      : `-${orderDate.getTimezoneOffset() / -60}`;
  const daysDiff = Math.round(
    (Date.parse(currentDate.toString()) - Date.parse(orderDate.toString())) /
      msToDay
  );
  const getPluralDayForm = (days: number) =>
    days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 10 || days % 100 >= 20)
      ? "дня"
      : "дней";
  const diff =
    daysDiff === 0
      ? "Сегодня"
      : daysDiff === 1
      ? "Вчера"
      : `${daysDiff} ${getPluralDayForm(daysDiff)} назад`;
  return `${diff} ${orderHours}:${orderMinutes} i-GMT${GMT}`;
};
export default formatDate;
