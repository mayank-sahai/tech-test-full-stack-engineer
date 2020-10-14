/** ********************** Require Node modules ********************* */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const helmet = require('helmet');

/** ********************** Require Local modules ********************* */
const dbPool = require('./db');
const routers = require('./routes');
const { logger } = require('./utils');
const swaggerDocument = require('./swagger.json');
const { errorHandler, responseHandler } = require('./middlewares');

/** ********************** Varaiable Listing ********************* */
const app = express();
const router = express.Router();

const env = process.env.NODE_ENV || 'development';

app.use(cors());

// Router Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use('/api', router);

routers(router);

// Swagger configuration
if (env === 'development') {
  const options = {
    explorer: true,
  };

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
  logger.info('Swagger running on http://localhost:4000/api-docs');
}

app.use(responseHandler);
app.use(errorHandler);

// Server Start
const server = app.listen('4000', (error) => {
  if (error) logger.error('Error while Application startup', error);
  else logger.info(`Application connected to ${env} environment at 4000 port`);
});
