const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const sequelize = require('./configs/db.config');

const { handleError, logError } = require('./utils/error');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const db = sequelize;
db.sync()
    .then(result => console.log('Successfully synchronized with MySQL database!'))
    .catch(err => console.log('[SEQUELIZE ERROR]:', err));

app.use('/', routes);

app.use(logError);
app.use(handleError);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
