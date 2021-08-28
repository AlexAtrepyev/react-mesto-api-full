module.exports = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  function checkMessage(text) {
    if (message.includes(text)) {
      statusCode = 400;
      message = text;
    }
  }

  checkMessage('Некорректный email');
  checkMessage('Некорректная ссылка');
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
};
