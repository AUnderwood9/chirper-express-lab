const fs = require('fs');
let chirps = { nextid: 0 };

if(fs.existsSync('chirps.json')) {
    chirps = JSON.parse(fs.readFileSync('chirps.json'));
}

let getChirps = () => {
    return new Promise((resolve, reject) => {
        resolve(Object.assign({}, chirps));
    });
}

let getChirp = id => {
    return new Promise((resolve, reject) => {
        resolve(Object.assign({}, chirps[id]));
    });
}

let createChirp = (chirp) => {
    return new Promise((resolve, reject) => {
        let idAdded = chirps.nextid;
        chirps[chirps.nextid++] = chirp;
        writeChirps();
        let newResult = {
            idAdded: idAdded,
            chirpAdded: chirp
        };
        resolve(newResult);
    });
};

let updateChirp = (id, chirp) => {
    return new Promise((resolve, reject) => {
        chirps[id] = chirp;
        writeChirps();
        resolve("Chirp Updated");
    });
}

let deleteChirp = id => {
    return new Promise((resolve, reject) => {
        delete chirps[id];
        writeChirps();
        resolve("Chirp Deleted");
    });
    
}

let writeChirps = () => {
    fs.writeFileSync('chirps.json', JSON.stringify(chirps));
};

module.exports = {
    CreateChirp: createChirp,
    DeleteChirp: deleteChirp,
    GetChirps: getChirps,
    GetChirp: getChirp,
    UpdateChirp: updateChirp
}