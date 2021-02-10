
INSERT INTO Users(username, user_pw, home_zip, photo_url) VALUES ('max&colin', 'pass123', 10304, 'someUrl');
-- INSERT INTO public.users (first_name, last_name, user_name, user_password, user_email, user_location) VALUES ('Ali', 'Rahman', 'arahman', 'password', 'arahman@gmail.com', 'California');


CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  user_pw VARCHAR,
  home_zip INT,
  photo_url VARCHAR
);

CREATE TABLE Interested (
  int_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  trail_url VARCHAR NOT NULL
);

CREATE TABLE Visited (
  vis_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  trail_url VARCHAR NOT NULL,
  visits INT DEFAULT 1
);