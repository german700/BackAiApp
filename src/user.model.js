const dbConn = require("../config/db.config");
const crypto = require("crypto");

const User = function (user) {
  const { name, username, password } = user;
  this.name = name;
  this.username = username;
  this.password = password;
};

User.create = (newUser, result) => {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(newUser.password)
    .digest("hex");
  newUser.password = hashedPassword;
  dbConn.query("INSERT INTO users set ?", newUser, (err, res) => {
    if (err) result(err, null);
    else result(null, res.insertId);
  });
};

User.findByUsername = (username, result) => {
  dbConn.query(
    "SELECT * FROM users WHERE username = ?",
    username,
    (err, res) => {
      if (err || !res) result(err, null);
      else result(null, res[0]);
    }
  );
};

User.checkPassword = (username, password, result) => {
  User.findByUsername(username, (err, user) => {
    if (err || !user) {
      result(err, null);
    } else {
      const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
      const realHashedPassword = user.password;
      result(null, hashedPassword === realHashedPassword);
    }
  });
};

module.exports = User;
