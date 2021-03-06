var Library = require("../models/library.model.js");

var User = require("../models/user.model.js");


exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Нет контента"
    });
  }

  // get user id to save lib
  User.getUserByUsername(req.user.username, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error while getting user"
      });
    }
    else {
      let user = data

      const library = new Library({
        id_user: user.id.toString(),
        name: req.body.name.toString(),
        description: req.body.description.toString() || null,
      });

      if (req.file)
        library.image = req.file.path
      else
        library.image = null

      Library.create(library, (err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Произошла ошибка во время выполнения кода"
          });
        }
        else res.send(data);
      });
    }
  });
}

exports.getAll = (req, res) => {
  Library.getLibraries(req.params.libId, (err, data) => {
    if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
              message: `Cant find lib with id ${req.params.libId}`
          });
      } else {
        res.status(500).send({
          message: err.message || "Error while getting libs"
        });
      }
    }
    else {
      // res.setHeader('Access-Control-Allow-Origin', '*');
      // res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
      res.send(data);
    }
  });
};
