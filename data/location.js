const geoip = require('geoip-lite');

function getLocation(ip){
    if(typeof ip == 'undefined' || typeof ip !== 'string'){
        throw new Error("Argument missing or invalid!");
    }

    let geo = geoip.lookup(ip);
    if(!geo || typeof geo !== 'object') throw new Error("Could not find location for this I.P!");
    let location = geo.ll;

    return location;
}

module.exports = {getLocation};
