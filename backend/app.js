const express = require('express');

require('dotenv').config();

const { PORT = 3000 } = process.env;

const mongoose = require('mongoose');

const { celebrate, Joi, errors } = require('celebrate');

const app = express();

const cookieParser = require('cookie-parser');

const cors = require('./middlewares/cors');

const userRouter = require('./routes/users');

const cardRouter = require('./routes/cards');

const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');

const NotFoundError = require('./Errors/NotFoundError');

const handleError = require('./middlewares/handleError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/https?:\/\/[-/\w./~^:?#!@$&'()*+,;=\][]*/),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use(auth);

app.use('/users', userRouter);

app.use('/cards', cardRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT);
