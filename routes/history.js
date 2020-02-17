const express = require('express');
const router = express.Router();
const data = require('../data');
const historyData = data.history;

router.get('/', async (req, res)=>{
    try {
        res.status(200).render('pages/locationHistory', {title: "Location History Search"})
    } catch (error) {
        res.status(404).render('pages/error404');
    }
});

router.post('/', async (req, res)=>{
    try {
        let searchParams = req.body;
        let locations = [];
        if(!searchParams.nLocations && !searchParams.minDate && !searchParams.maxDate) throw new Error("Please enter at least one search parameter!");
        if(searchParams.nLocations){
            if(searchParams.nLocations < 0) throw new Error("Please enter positive value for number of locations!");
            locations = await historyData.getLastNLocations(searchParams.nLocations);
        }else{
            locations = await historyData.getLastNLocations(0);
        }

        if(searchParams.minDate){
            locations = locations.filter(location => {
                let fullDate = location.date;
                let splitDate = fullDate.split('-');
                let splitminDate = searchParams.minDate.split('-');

                return (new Date(splitminDate[0], splitminDate[1], splitminDate[2]) <= new Date(splitDate[0], splitDate[1], splitDate[2]));
            });
        }

        if(searchParams.maxDate){
            locations = locations.filter(location => {
                let fullDate = location.date;
                let splitDate = fullDate.split('-');
                let splitmaxDate = searchParams.maxDate.split('-');

                return (new Date(splitmaxDate[0], splitmaxDate[1], splitmaxDate[2]) >= new Date(splitDate[0], splitDate[1], splitDate[2]));
            });
        }
        if(locations.length == 0){
            throw new Error("No locations found!");
        }
        res.status(200).render('pages/historyResult', {title: "Location History", locations: locations, found: true});

    } catch (error) {
        res.status(400).render('pages/historyResult', {title: error.message, found: false});
    }
});

module.exports = router;