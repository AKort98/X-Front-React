
export const getTimeOfTweet = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export const getDayOfTweet = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getUTCMonth()]; // Months are 0-based
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${month} ${day}, ${year}`;
}

export const time = (timestamp) => {
    const dateofTweet = new Date(timestamp);
    const currentTimestamp = new Date(); // Current time
    const differenceInMilliseconds = currentTimestamp - dateofTweet;
    const differenceInMinutes = Math.floor(
        differenceInMilliseconds / (1000 * 60),
    );
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    if (differenceInHours > 24) {
        return differenceInDays + "d"
    }

    if (differenceInDays > 1) {
        return differenceInDays + "d";
    }
    if (differenceInMinutes > 60) {
        return differenceInHours + "h";
    }
    if (differenceInMinutes < 1) {
        return "now";
    }
    return differenceInMinutes + "m";
};

export const getDayandMonth = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const monthNames = [
        "Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getUTCMonth()]; // Months are 0-based
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${month} ${day}`;
}

