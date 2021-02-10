const { request, response } = require('express');
const db = require('../../models/TrailModel');
const bcrypt = require('bcrypt')

const saltRounds = 10;

module.exports = {

  createPassword: function (req, res, next) {
    const {password, username, location } = req.body;

    bcrypt.hash {password, saltRounds, function(err, hash){
      if (err) {
        return newxt(err);
      }
      // opposite of restructuring, hash instead of password 
      request.body = { hash, username }
      return next();
    }}
  },

  checkPassword: function (req, res, next) {
    console.log('checking password')
    const { password, username } = req.body;
    const text = `SELECT *  FROM Users WHERE username='${username}'`;
      db.query(text)
        .then(user => {
          console.log('comparing passwords')
          bcrypt.compare(password, res.rows[0].user_pw, function(err, res){
            if (err) return next(err);
             res.locals.result = user.rows;
             return next();
          });
        })
        .catch(err => next({error: err}))
  },   

  storeUserInfo: function(req, res, next) {
    const { username, hash, location } = req.body;
    // parameterize your query string, vulnerable to SQL injection 
    const text = `INSERT INTO User VALUES (DEFAULT, '${username}', '${hash}', ${location});`
    db.query(text)
    .then(() => next()) 
    .catch(err => next({error: err }));
  }
}