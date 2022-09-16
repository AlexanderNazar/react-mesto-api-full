const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const NotFoundError = require('../Errors/NotFoundError');

const BadRequestError = require('../Errors/BadRequestError');

const ConflictError = require('../Errors/ConflictError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUserOnId = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Некорректно передан id пользователя: ${err.message}`));
      } else next(err);
    });
};

const getMyUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Некорректно передан id пользователя: ${err.message}`));
      } else next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.status(201).send({
          user: {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
          },
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким Email уже существует'));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError(`Введены некорректные данные: ${err.message}`));
          } else next(err);
        });
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError('Попытка внести изменения в данные несуществующего пользователя');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Введены некорректные данные: ${err.message}`));
      } else next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError('Попытка внести изменения в данные несуществующего пользователя');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Введены некорректные данные: ${err.message}`));
      } else next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwtForAutorization', token, {
        domain: 'https://nazarov.back.nomorepartiesxyz.ru/',
        maxAge: 604800,
        httpOnly: true,
        sameSite: false,
      });

      res.send({ message: 'Вход выполнен успешно!' });
    })
    .catch(next);
};

const loggout = (req, res, next) => {
  try {
    res.clearCookie('jwtForAutorization');
  } catch (err) {
    throw new Error('Невозможно удалить куки');
  }

  res.send({ message: 'cookie удалены' });

  next();
};

module.exports = {
  getUsers, getUserOnId, createUser, updateUser, updateAvatar, login, getMyUser, loggout,
};
