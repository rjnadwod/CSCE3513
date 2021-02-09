"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlankString = (toCheck) => {
    return ((toCheck == null) || (toCheck.trim() === ""));
};
exports.formatDate = (dateToFormat) => {
    let hours = (dateToFormat.getHours() % 12);
    if (hours === 0) {
        hours = 12;
    }
    return (("0" + (dateToFormat.getMonth() + 1)).slice(-2) + "/"
        + ("0" + dateToFormat.getDate()).slice(-2) + "/"
        + dateToFormat.getFullYear() + " "
        + ("0" + hours).slice(-2) + ":"
        + ("0" + dateToFormat.getMinutes()).slice(-2) + " "
        + ((dateToFormat.getHours() <= 12) ? "AM" : "PM"));
};
exports.isValidUUID = (uuid) => {
    const match = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-5][0-9a-fA-F]{3}-[089ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i
        .exec(uuid);
    return (match != null);
};
//# sourceMappingURL=helper.js.map