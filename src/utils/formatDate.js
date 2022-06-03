
export function formatDate(created) {
    const date = new Date(parseInt(created));
    const dateNow = new Date();

    const yearDelta = dateNow.getFullYear() - date.getFullYear();
    if (yearDelta > 0) {
        return `${date.toLocaleString("default", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })}`;
    };

    const monthDelta = dateNow.getMonth() - date.getMonth();
    if (monthDelta > 0) {
        return `${date.toLocaleString("default", {
            day: "numeric",
            month: "long"
        })}`;
    }

    const dayDelta = dateNow.getDate() - date.getDate();
    if (dayDelta > 0) return `${dayDelta} days ago`;

    const hourDelta = dateNow.getHours() - date.getHours();
    if (hourDelta > 0) {
        return `${date.toLocaleString("default", {
            hour: "numeric",
            minute: "numeric"
        })}`;
    };
    const minuteDelta = dateNow.getMinutes() - date.getMinutes();
    if (minuteDelta >= 30) return "30 minutes ago";
    if (minuteDelta >= 10) return "10 minutes ago";
    if (minuteDelta >= 5) return "5 minutes ago";
    return "1 minute ago";
}
