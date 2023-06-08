import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import { connectDB } from './config/db.js';
import { notFoundError, internalError } from './middleware/errorHandler.js';

const app = express();

app.use(bodyParser.json());

connectDB();

app.use('/', routes);

app.use(notFoundError);
app.use(internalError);

const port = process.env.PORT || 3535;
app.listen(port, () => console.log(`Server running on port ${port}`));
