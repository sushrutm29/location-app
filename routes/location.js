const express = require('express');
const router = express.Router();
const data = require('../data');
const locationData = data.location;

router.get('/', async (req, res) =>{
    try {
        res.status(200).render('pages/locationSearch', {title: "Location Search", partial:undefined});
    } catch (error) {
        res.status(404).render('pages/error404');
    }
});

router.post('/', async (req, res) =>{
    try {
        if(!req.body.ip) throw new Error("Please enter I.P.!");
        let ip = req.body.ip;
        let location = await locationData.getLocation(ip);
        let latitude = location[0];
        let longitude = location[1];

        res.status(200).render('pages/locationFound', {title: 'Location Found!', latitude: latitude, longitude: longitude, found: true});
    } catch (error) {
        res.status(400).render('pages/locationFound', {title: error.message, found: false});
    }
});

router.get('/result', async (req, res) =>{
    try {
        res.status(200).render('pages/locationFound', {title: 'Location Found!', latitude: latitude, longitude: longitude});
    } catch (error) {
        res.status(404).render('pages/error404');
    }
})

module.exports = router;