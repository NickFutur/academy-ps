const swiper = new Swiper('.nta_main-slider__swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // Autoplay
    autoplay: {
        delay: 4000, // 4 секунды
        disableOnInteraction: false, // продолжать автоплей после взаимодействия пользователя
    },
});

const swiper_dop = new Swiper('.nta_dop-wrapper__slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // Autoplay
    autoplay: {
        delay: 4000, // 4 секунды
        disableOnInteraction: false, // продолжать автоплей после взаимодействия пользователя
    },
});


// обработка формы Логина в личном кабинете
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.nta_login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.querySelector('.nta_email label');
    const passwordError = document.querySelector('.nta_password label');

    // Функция проверки email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Функция показа ошибки
    function showError(input, errorLabel) {
        input.classList.add('error');
        errorLabel.classList.add('show');
    }

    // Функция скрытия ошибки
    function hideError(input, errorLabel) {
        input.classList.remove('error');
        errorLabel.classList.remove('show');
    }

    // Функция проверки, было ли поле уже затронуто
    function isTouched(input) {
        return input.value.length > 0 || input === document.activeElement;
    }

    // Валидация при вводе (только для затронутых полей)
    emailInput.addEventListener('input', function () {
        if (isTouched(this)) {
            if (validateEmail(this.value)) {
                hideError(this, emailError);
            } else {
                showError(this, emailError);
            }
        }
    });

    passwordInput.addEventListener('input', function () {
        if (isTouched(this)) {
            if (this.value.length > 0) {
                hideError(this, passwordError);
            } else {
                showError(this, passwordError);
            }
        }
    });

    // Основная валидация при отправке формы
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let isValid = true;

        // Проверка email
        if (!emailInput.value || !validateEmail(emailInput.value)) {
            showError(emailInput, emailError);
            isValid = false;
        } else {
            hideError(emailInput, emailError);
        }

        // Проверка пароля
        if (!passwordInput.value) {
            showError(passwordInput, passwordError);
            isValid = false;
        } else {
            hideError(passwordInput, passwordError);
        }

        // Если форма валидна, можно отправить данные
        if (isValid) {
            console.log('Форма валидна, отправляем данные...');
            // form.submit();
        }
    });

    // Валидация при потере фокуса
    emailInput.addEventListener('blur', function () {
        if (this.value && !validateEmail(this.value)) {
            showError(this, emailError);
        }
    });

    passwordInput.addEventListener('blur', function () {
        if (this.value === '') {
            showError(this, passwordError);
        }
    });
});




document.addEventListener('DOMContentLoaded', function () {
    const menu = document.querySelector('.nta_main-menu');

    // Функция для установки активного элемента
    function setActiveMenuItem(clickedLink) {
        // Удаляем активные классы со всех элементов
        document.querySelectorAll('.nta_main-menu li').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.nta_main-menu a').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelectorAll('.nta_podmenu li').forEach(item => {
            item.classList.remove('nta_active');
        });

        // Добавляем активный класс к кликнутой ссылке
        clickedLink.classList.add('active');

        // Если это ссылка в подменю
        const parentLi = clickedLink.closest('li');
        if (parentLi && parentLi.parentElement.classList.contains('nta_podmenu')) {
            parentLi.classList.add('nta_active');

            // Находим родительский элемент с подменю и делаем его активным
            const parentPodmenu = clickedLink.closest('.nta_active-podmenu');
            if (parentPodmenu) {
                parentPodmenu.classList.add('active');
                parentPodmenu.querySelector(':scope > a').classList.add('active');
            }
        } else {
            // Если это обычная ссылка в основном меню
            const parentLi = clickedLink.parentElement;
            if (parentLi) {
                parentLi.classList.add('active');
            }
        }

        // Сохраняем активный элемент в localStorage
        const activeHref = clickedLink.getAttribute('href');
        if (activeHref && activeHref !== '#') {
            localStorage.setItem('activeMenuItem', activeHref);
        }
    }

    // Функция для восстановления активного элемента из localStorage
    function restoreActiveMenuItem() {
        const activeHref = localStorage.getItem('activeMenuItem');
        if (activeHref) {
            const activeLink = document.querySelector(`.nta_main-menu a[href="${activeHref}"]`);
            if (activeLink) {
                setActiveMenuItem(activeLink);
            }
        }
    }

    // Обработчик клика для всех ссылок меню
    menu.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            setActiveMenuItem(e.target);
        }
    });

    // Обработчик для закрытия подменю при клике вне меню
    document.addEventListener('click', function (e) {
        if (!menu.contains(e.target)) {
            document.querySelectorAll('.nta_podmenu').forEach(podmenu => {
                podmenu.style.opacity = '0';
                podmenu.style.visibility = 'hidden';
            });
        }
    });

    // Восстанавливаем активный элемент при загрузке страницы
    restoreActiveMenuItem();

    // Дополнительно: обработка ховера для подменю (если нужно сохранить ховер-эффекты)
    document.querySelectorAll('.nta_active-podmenu').forEach(podmenuItem => {
        const link = podmenuItem.querySelector(':scope > a');
        const podmenu = podmenuItem.querySelector('.nta_podmenu');

        podmenuItem.addEventListener('mouseenter', function () {
            if (podmenu) {
                podmenu.style.opacity = '1';
                podmenu.style.visibility = 'visible';
                podmenu.style.transform = 'translateY(8px)';
            }
        });

        podmenuItem.addEventListener('mouseleave', function () {
            if (podmenu && !podmenu.matches(':hover')) {
                podmenu.style.opacity = '0';
                podmenu.style.visibility = 'hidden';
                podmenu.style.transform = 'translateY(-10px)';
            }
        });

        // Обработка ховера на самом подменю
        if (podmenu) {
            podmenu.addEventListener('mouseenter', function () {
                this.style.opacity = '1';
                this.style.visibility = 'visible';
                this.style.transform = 'translateY(8px)';
            });

            podmenu.addEventListener('mouseleave', function () {
                this.style.opacity = '0';
                this.style.visibility = 'hidden';
                this.style.transform = 'translateY(-10px)';
            });
        }
    });
});