// показать процесс загрузки
export function renderLoading(popupSelector, isLoading) {
  const formSubmit = document.querySelector(popupSelector).querySelector('.form__submit');
  isLoading ? formSubmit.textContent = 'Сохранение...' : formSubmit.textContent = 'Сохранить';
}
