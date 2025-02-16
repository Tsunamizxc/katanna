document.addEventListener("DOMContentLoaded", function () {
    let forms = document.querySelectorAll('.form-default');
    // console.log(forms)

    for (let i = 0; i < forms.length; i++) {
        let form = forms[i];
        const responseDiv = form.querySelector('.response');
        const goodAlert = document.querySelector('.good-alert');

        // console.log(responseDiv);
        let nameInput = form.querySelector('[name="project_name"]');
        let namePhone = form.querySelector('[name="project_phone"]');

        nameInput.addEventListener('input', function () {
            if (nameInput.value != "") {
                nameInput.classList.remove('active-error');
            }

        });
        namePhone.addEventListener('input', function () {
            if (namePhone.value != "") {
                namePhone.classList.remove('active-error');
            }
        });


        form.addEventListener('submit', function (e) {
            e.preventDefault(); // предотвращаем стандартное поведение формы  
            const closeForm = document.querySelector('.is-close-btn');

            console.log('тык')

            if (nameInput.value == "") {
                nameInput.classList.add('active-error');
            } else {
                nameInput.classList.remove('active-error');
            };
            if (namePhone.value == "") {
                namePhone.classList.add('active-error');
            } else {
                // namePhone.classList.remove('active-error');
            }
            const formData = new FormData(form); // собираем данные формы  
            if (nameInput.value != "" && !namePhone.classList.contains('active-error')) {
                fetch('../mail.php', { // замените на ваш URL  
                    method: 'POST',
                    body: formData
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Сеть ответила с ошибкой: ' + response.statusText);
                        }
                        return response.text(); // преобразуем ответ в текст  
                    })
                    .then(data => {
                        // console.log('Ответ от сервера:', data); // Логируем ответ  
                        form.reset(); // очистка
                        closeForm.click(); // закрытие формы
                        goodAlert.classList.add('acitve-alert');
                        setTimeout(() => {
                            goodAlert.classList.remove('acitve-alert');

                        }, 3000);
                        const jsonData = JSON.parse(data); // преобразуем строку JSON в объект  
                        // responseDiv.innerHTML = jsonData.project_name; // выводим сообщение на страницу  
                        // alert('Форма успешно отправлена!'); // добавляем alert  
                    })
                    .catch(error => {
                        // responseDiv.innerHTML = error.message;
                        console.log('Ошибка при отправке формы: ' + error.message); // добавляем alert для ошибок  
                      
                    });
            }

        });
    }

});  