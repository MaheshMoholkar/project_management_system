export function formatDateToCustom(date: Date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function formatDateRange(start: string, end: string): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const startDate = new Date(start);
  const endDate = new Date(end);

  const formattedStart = `${
    months[startDate.getUTCMonth()]
  }-${startDate.getUTCDate()}, ${startDate.getUTCFullYear()}`;
  const formattedEnd = `${
    months[endDate.getUTCMonth()]
  }-${endDate.getUTCDate()}, ${endDate.getUTCFullYear()}`;

  return `${formattedStart} to ${formattedEnd}`;
}
