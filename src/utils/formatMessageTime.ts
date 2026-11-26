const TIME = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" });
const DAY_AND_TIME = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

export function formatMessageTime(isoDate: string, now: Date = new Date()): string {
    const date = new Date(isoDate);
    const isToday = date.toDateString() === now.toDateString();

    return (isToday ? TIME : DAY_AND_TIME).format(date);
}
