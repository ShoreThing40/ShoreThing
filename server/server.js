const express = require('express');
const path = require('path');
const trailRouter = require('./routes/trailRouter');
// const trailController = require('./controllers/trailController');

// const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;


app.use(express.json());

// // need to know if we're serving any opening CSS, JS scripts like a main.js, etc.
// app.use(express.static(path.join(__dirname, '../assetstylescriptsfolder'), {
//   setHeaders: (res) => {
//     res.setHeader('Content-Type', 'application/javascript');
//   }
// }));
// need to know where we're serving our opening webpage from
// app.get('/', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../clientviewfolder/index.html'));
// });

// app.use(bodyParser.urlencoded({ extended: true }));


// app.use('/auth', authRouter);
app.use('/trails', trailRouter);

// global error handling
app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => res.sendStatus(500).send('Internal Server Error:', err));

app.listen(PORT, () => {
  console.log('Server is listening on Port', PORT);
});
