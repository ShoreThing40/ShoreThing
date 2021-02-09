const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DB_HOST });

/*
CREATE TABLE Users (
  userid SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  password VARCHAR,
  homeZip int,
  photoUrl VARCHAR
);

INSERT INTO Users

C

CREATE TABLE Interested (
  interestid SERIAL PRIMARY KEY,
  userid NOT NULL,
  trailUrl //this would be the api for the specific trail
)

*/

module.exports =  {
  query: (text, params, callback) => {
    console.log('executed query:', text);
    return pool.query(text, params, callback)
  }
};
