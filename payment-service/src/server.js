import cookieParser from 'cookie-parser';
import express from 'express';
import {
		handleError,
		logError
} from '../../common/errors/error';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', routes);

app.use(logError);
app.use(handleError);

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => console.log(`Server running on port ${ PORT }`));
