const db = require('../../models/TrailModel');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {

  createPassword: function (req, res, next) {
    const { password, username } = req.body;
    console.log(req.body)
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) { 
        return next(err);
      }
      req.body = { hash, username }
      return next();
    });
  },

  checkPassword: function (req, res, next) {
    // console.log('getting username')
    const { password, username, location } = req.body;
    const text = `SELECT * FROM Users WHERE username='${username}'`;
    let data;
      db.query(text)
        .then(user => {
          // console.log('comparing passwords')
          data = user;
          bcrypt.compare(password, data.rows[0].user_pw, function(err, res) {
            if (err) return next(err);
            res.locals.result = data;
            return next();
          });
        })
        .catch(err => next({ error: err }))
  },

  storeUserInfo: function (req, res, next) {
    const { username, hash } = req.body;
    const text = `INSERT INTO Users VALUES (DEFAULT, '${username}', '${hash}')`;
    db.query(text)
    .then(() => next())
    .catch(err => next({ error: err }));
  }
}