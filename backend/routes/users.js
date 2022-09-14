const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUserOnId, updateUser, updateAvatar, getMyUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMyUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUserOnId);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/https?:\/\/[-/\w./~^:?#!@$&'()*+,;=\][]*/),
  }),
}), updateAvatar);

module.exports = router;
