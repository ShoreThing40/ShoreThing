const db = require('../../models/TrailModel');

module.exports = {
  //define functions below
  // write this out more, req.body 
  getInterests: function (req, res, next) {
    const text = `SELECT * FROM Interested`;
    db.query(text)
      .then(trailInts => {
        console.log('ALL interested trails');
        res.locals.trailInts = trailInts.rows;
        return next();
      })
      .catch(err => {
        console.log('reach catch', err);
        next({ error: err });
      })
  },

  //add an interested trail
  postInterest: function (req, res, next) {
    const { user_id, trail_url } = req.body;
    const text = `INSERT INTO Interested (user_id, trail_url) VALUES ($1, $2) RETURNING *`;

    db.query(text, [user_id, trail_url])
      .then(trailInts => {
        console.log('Interested trails:',trailInts);
        res.locals.trailInts = trailInts.rows;
        return next();
      })
      .catch(err => {
        console.error(err);
        next({ error: 'post interest ' + err });
      });
  },

  //add a visited trail
  postVisit: function (req, res, next) {
    const { user_id, trail_url } = req.body;
    const text = `INSERT INTO Visited (user_id, trail_url) VALUES ($1, $2) RETURNING *`;

    db.query(text, [user_id, trail_url])
      .then(trailVisits => {
        console.log('Visited trails:', trailVisits);
        res.locals.trailVisits = trailVisits.rows;
        return next();
      })
      .catch(err => {
        console.log(err)
        next({ error: err });
      });
  },

  //increment number of times visited
  updateVisit: function (req, res, next) {
    const { vis_id, user_id, visits } = req.body;
    visits += 1;
    const text = `UPDATE Visited
    SET visits = ${visits}
    WHERE vis_id = ${vis_id}
    RETURNING * WHERE user_id = ${user_id}`;

    db.query(text)
      .then(trailVisits => {
        console.log('Updated trail');
        res.locals.trailVisits = trailVisits.rows;
        return next();
      })
      .catch(err => {
        next({ error: err })
      });
  },
  
};
