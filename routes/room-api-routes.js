var db = require("../models");

module.exports = function (app) {
    app.get("/api/rooms", function (req, res) {
        db.Room.findAll().then(function (dbRooms) {
            res.json(dbRooms);
        });
    });

    app.get("/api/rooms/:id", function (req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.StorageArea
        db.Room.findOne({
            where: {
                id: req.params.id
            },
            include: [db.StorageArea]
        }).then(function (dbRoom) {
            res.json(dbRoom);
        });
    });

    app.post("/api/rooms", function (req, res) {
        // Create (add) a new room
        db.Room.create(req.body).then(function (dbRoom) {
            res.json(dbRoom);
        });
    });

};
