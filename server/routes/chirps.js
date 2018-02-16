const express = require("express");
const chirpStore = require("../chirpsstore");

let router = express.Router();

// Build the api

// create api requiests
// The get route gets the chirp by its id. If there is no id option sent then it will get all chirps
router.get("/:id", (req, res, next) => {
    let currentId = req.params.id;
    // If the current id exists send the chirp found at said id. If not send all the chirps that we have.
    if(currentId){
        res.send(chirpStore.GetChirp(currentId));
    } else {
        res.send(chirpStore.GetChirps());
    }
});

// This route will post the chirp object.
router.post("/", (req, res, next) => {
    if(!Object.keys(req).length === 0){
        chirpsStore.CreateChirp(req.body);
        res.sendStatus(200);
    } else {
        res.send("What are you doing? This is empty!");
        res.sendStatus(400);
    }
});

// The put route will update a chirp at the given id
router.put("/:id", (req, res, next) => {
    let currentId = req.params.id;

    if(currentId){
        // res.send(chirpStore.GetChirp(currentId));
        chirpStore.UpdateChirp();
    } else {
        res.send("That won't work!");
        res.sendStatus(400);
    }

});

// This route deletes a chirp by its id. An id must be sent. If not then we will send a status error code.
router.delete("/:id", (req, res, next) => {
    let currentId = req.params.id;

    if(currentId){
        // res.send(chirpStore.GetChirp(currentId));
        chirpStore.DeleteChirp(currentId);
    } else {
        res.send("Stop it! You can't delete something that doesn't exit! >:{");
        res.sendStatus(400);
    }
});