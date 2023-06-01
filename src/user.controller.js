const User = require("./user.model");

exports.findByUsername = (req, res) => {
  User.findByUsername(req.params.username, (err, user) => {
    if (err) {
      res.send(err);
      return;
    }
    res.json(user);
  });
};

exports.create = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      error: true,
      message: "Please check the format",
    });
  } else {
    const newUser = new User(req.body);
    User.create(newUser, (err, user) => {
      if (err) {
        res.send(err);
        return;
      }
      res.send({ error: false, message: "User created", data: user });
    });
  }
};

exports.login = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      error: true,
      message: "Please check the format",
    });
  } else {
    console.log(`Params: ${req.body.username}`);
    const { username, password } = req.body;
    User.checkPassword(username, password, (err, loginStatus) => {
      console.log(loginStatus);
      if (err || loginStatus === null)
        return res.send({
          error: true,
          message: "Something went wrong",
          data: { login: false },
        });
      res.send({
        error: false,
        message: "Login request successful",
        data: { login: loginStatus },
      });
    });
  }
};
