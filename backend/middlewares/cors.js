const cors = require('cors');

const options = {
  origin: [
    'http://localhost:3000',
    'https://nazarov.front.nomorepartiesxyz.ru',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const handlerCors = (params) => {
  cors(params);
};

module.exports = {
  options,
  handlerCors,
};
