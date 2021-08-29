const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserMe,
  getUserById,
  patchUser,
  patchAvatar,
} = require('../controllers/users');
const regex = require('../utils/regex');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regex),
  }),
}), patchAvatar);

module.exports = router;
