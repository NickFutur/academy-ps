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