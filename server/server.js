const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes');


let app = express();


app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.listen(3000);