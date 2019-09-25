const mongoose = require('mongoose');
var Task = mongoose.model('Task');

module.exports = {
    find: function (req, res) {
        Task.find({}, function (err, tasks) {
            if (err) {
                console.log("Returned error", err);
                res.json({ message: "Error", error: err });
            } else {
                console.log("Success!", tasks);
                res.json(tasks);
            }
        })
    },

    findOne: function (req, res) {
        Task.findOne({ _id: req.params.id }, function (err, task) {
            if (err) {
                console.log("Returned error", err);
                res.json({ message: "Error", error: err });
            } else {
                console.log("Found it!");
                res.json(task);
            }
        })
    },

    create: function (req, res) {
        console.log("POST /tasks");
        console.log(req.body);
        var task = new Task({
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed
        });

        task.save(function (err) {
            if (err) {
                res.json({ message: "Error", error: err })
            } else {
                res.json({ message: "Success", data: task })
            }
        })
    },

    update: function (req, res) {
        var obj = {};
        if (req.body.title) {
            obj['title'] = req.body.title;
        }
        if (req.body.description) {
            obj['description'] = req.body.description;
        }
        if (req.body.completed != null) {
            obj['completed'] = req.body.completed;
        }
        obj['updated_at'] = Date.now();
        Task.update({ _id: req.params.id }, {
            $set: obj
        }, function (err, task) {
            if (err) {
                res.json({ message: "Error", error: err })
            } else {
                res.json({ message: "Success", data: task })
            }
        });
    },

    remove: function (req, res) {
        Task.remove({ _id: req.params.id }, function (err) {
            if (err) {
                res.json({ message: "Error", error: err })
            } else {
                res.json({ message: "Success" })
            }
        });
    },
}
