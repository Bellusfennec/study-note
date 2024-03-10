function monthsEnding(month: string) {
  if (month.at(-1) === "т") return month + "а";
  return month.slice(0, -1) + "я";
}

export function timePassed(data: string) {
  if (!data) return "";
  const date = new Date(data);
  const dateNow = new Date();
  const day = date.getDay();
  const month = date.getMonth() + 1;
  const fullMonth = monthsEnding(date.toLocaleString("default", { month: "long" }));
  const fullYear = date.getFullYear();
  const yearDif = dateNow.getFullYear() - fullYear;
  if (yearDif === 0) {
    const dayDif = dateNow.getDay() - day;
    if (dayDif === 0) {
      const hourDif = dateNow.getHours() - date.getHours();
      if (hourDif === 0) {
        const minutesDif = dateNow.getMinutes() - date.getMinutes();

        if (minutesDif >= 0 && minutesDif < 5) return "1 минуту назад";
        if (minutesDif >= 5 && minutesDif < 10) return "5 минут назад";
        if (minutesDif >= 10 && minutesDif < 30) return "10 минут назад";
        return "30 минут назад";
      }
      return `${date.getHours()}:${date.getMinutes()}`;
    }
    return `${day} ${fullMonth}`;
  }
  return fullYear + "." + month + "_" + date.getDate();
}
