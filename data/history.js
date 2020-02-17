const mongoCollections = require("../config/mongoCollections");
const locationLogs = mongoCollections.locationLogs;

async function getLastNLocations(n){
    if(typeof n == 'undefined') throw new Error("Argument missing or invalid!");

    const locationLogsCollection = await locationLogs();

    const allLogs = await locationLogsCollection.find({}).toArray();

    if(!allLogs) throw new Error("Error fetching location logs!");
    if(n > allLogs) n=0;
    const requiredLogs = allLogs.slice(-1*n);

    return requiredLogs;
}

module.exports = {getLastNLocations};