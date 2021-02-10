const express = require('express');
const path = require('path');
const trailRouter = require('./routes/trailRouter');
const authRouter = require('./routes/authRouter')


const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

/// PARSERS ///
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// // need to know where we're serving our opening webpage from
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../clientviewfolder/index.html'));
// });



/// ROUTES ///
app.use('/auth', authRouter);
app.use('/trails', trailRouter);





// catch all handler
app.use((req, res) => res.sendStatus(404));
// global error handling
app.use((err, req, res, next) => res.sendStatus(500).send('Internal Server Error:', err));




app.listen(PORT, () => {
  console.log('Server is listening on Port', PORT);
});
