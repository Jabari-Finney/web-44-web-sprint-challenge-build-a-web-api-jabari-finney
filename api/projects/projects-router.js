const Adopter = require('./projects-model');
const express = require('express');
const router = express.Router();

// Write your "projects" router here!
 router.get('/api/projects', (req, res) => {
    Adopter.find(req.query)
        .then(adopters => {
            res.status(200).json(adopters);
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json([{}])
        })
 })



 module.exports = router