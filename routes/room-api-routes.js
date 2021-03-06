var db = require("../models");

module.exports = function (app) {
    // get a specific room by id
    app.get("/api/rooms/:id", function (req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Item
        db.Room.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Item]
        }).then(function (dbRoom) {
            res.json(dbRoom);
        });
    });

    // create a new room
    app.post("/api/rooms", function (req, res) {
        // Create (add) a new room
        db.Room.create(req.body).then(function (dbRoom) {
            res.json(dbRoom);
        });
    });

};
