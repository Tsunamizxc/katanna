import Inputmask from "inputmask";

export default function phone_mask() {
  document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelectorAll('input[type="tel"]').length > 0) {
      let selector = document.querySelectorAll('input[type="tel"]');
      // Можно изменить формат номера  
      let im = new Inputmask("+7 (999) 999 99 99", {
        // Показывается ли маска при наведении на инпут  
        showMaskOnHover: false,
        oncomplete: function () { // Событие, когда ввод завершён  
          selector.forEach(input => input.classList.remove('active-error')); // Удаляем класс, когда заполнено  
        },
        onincomplete: function () { // Событие, когда ввод неполный  
          selector.forEach(input => input.classList.add('active-error')); // Добавляем класс, если ввод неполный  
        }
      });
      im.mask(selector); // Применяем маску для всех найденных элементов  
    }
  });
}
