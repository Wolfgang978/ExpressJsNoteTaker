const express = require('express');
const Routes = require('./routes/index')
const apiRoutes = require('./routes/api')

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', Routes)

app.use('/', apiRoutes)
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
