const db = require('../../models/TrailModel');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {

  createPassword: function (req, res, next) {
    const { username, password, location } = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) return next(err);
      req.body = { username, hash, location }
      return next();
    });
  },

  checkPassword: function (req, res, next) {
    // console.log('getting username')
<<<<<<< HEAD
    const {username, password, location } = req.body;
=======
    const { username, password } = req.body;
>>>>>>> ad4f1cd3f7a814edee55fc4af803260a38d925e7
    const text = `SELECT * FROM Users WHERE (username=$1)`;
    let data;
      db.query(text, [username])
        .then(user => {
          data = user;
          bcrypt.compare(password, data.rows[0].user_pw, function(err, user) {
            if (err) return next(err);
<<<<<<< HEAD
            res.locals.result = user;
            return next();
=======
              res.locals.result = { bool: user, location: data.rows[0].home_zip };
              return next();
>>>>>>> ad4f1cd3f7a814edee55fc4af803260a38d925e7
          });
        })
        .catch(err => next({ error: err }))
  },

  storeUserInfo: function (req, res, next) {
<<<<<<< HEAD
    const {username, hash, location } = req.body;
=======
    const { username, hash, location } = req.body;
>>>>>>> ad4f1cd3f7a814edee55fc4af803260a38d925e7
    const text = `INSERT INTO Users (username, user_pw, home_zip) VALUES ($1, $2, $3)`;
    db.query(text, [username, hash, location ])
    .then(() => next())
    .catch(err => next({ error: err }));
  }
}