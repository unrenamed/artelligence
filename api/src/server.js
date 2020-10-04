import cookieParser from 'cookie-parser';
import express from 'express';
import {
		handleError,
		logError
} from '../../common/errors/error';
import sequelize from './config/db.config';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const db = sequelize;
db.sync()
		.then(_ => console.log('Successfully synchronized with MySQL database!'))
		.catch(err => console.log('[SEQUELIZE ERROR]:', err));

app.use('/api', routes);

app.use(logError);
app.use(handleError);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${ PORT }`));
