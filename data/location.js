const geoip = require('geoip-lite');
const mongoCollections = require("../config/mongoCollections");
const locationLogs = mongoCollections.locationLogs;

async function getLocation(ip){
    if(typeof ip == 'undefined' || typeof ip !== 'string'){
        throw new Error("Argument missing or invalid!");
    }

    let geo = geoip.lookup(ip);
    if(!geo || typeof geo !== 'object') throw new Error("Could not find location for this I.P!");
    let location = geo.ll;
    let latitude = location[0];
    let longitude = location[1];

    let ts = Date.now();
    let dateObj = new Date(ts);
    let date = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();

    let locationDate = year + "-"+ month+ "-" + date;
    let newLocation = {
        "date": locationDate,
        "ip": ip,
        "latitude": latitude,
        "longitude": longitude
    }

    const locationLogsCollection = await locationLogs();
    const insertInfo = await locationLogsCollection.insertOne(newLocation);
    if(!insertInfo) throw new Error("Error: Could not log location!");

    return location;
}

module.exports = {getLocation};
