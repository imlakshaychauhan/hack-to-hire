export const getDelay = (scheduled, actual) => {
    const scheduledTime = new Date(scheduled);
    const actualTime = new Date(actual);
    const delay = (actualTime - scheduledTime) / (1000 * 60);
    const hours = Math.floor(delay / 60);
    const minutes = (delay % 60).toFixed(2);
    return `${hours ? `${hours} hour ` : ""}${minutes} minutes`;
};

export const formatTime = (time) => new Date(time).toLocaleString();
