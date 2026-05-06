const swiper = new Swiper(".nta_main-slider__swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // Autoplay
  autoplay: {
    delay: 4000, // 4 секунды
    disableOnInteraction: false, // продолжать автоплей после взаимодействия пользователя
  },
});

const swiper_dop = new Swiper(".nta_dop-wrapper__slider", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // Autoplay
  autoplay: {
    delay: 4000, // 4 секунды
    disableOnInteraction: false, // продолжать автоплей после взаимодействия пользователя
  },
});

// обработка формы Логина в личном кабинете
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".nta_login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.querySelector(".nta_email label");
  const passwordError = document.querySelector(".nta_password label");

  if (!form || !emailInput || !passwordInput || !emailError || !passwordError) {
    return;
  }

  // Функция проверки email
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Функция показа ошибки
  function showError(input, errorLabel) {
    input.classList.add("error");
    errorLabel.classList.add("show");
  }

  // Функция скрытия ошибки
  function hideError(input, errorLabel) {
    input.classList.remove("error");
    errorLabel.classList.remove("show");
  }

  // Функция проверки, было ли поле уже затронуто
  function isTouched(input) {
    return input.value.length > 0 || input === document.activeElement;
  }

  // Валидация при вводе (только для затронутых полей)
  emailInput.addEventListener("input", function () {
    if (isTouched(this)) {
      if (validateEmail(this.value)) {
        hideError(this, emailError);
      } else {
        showError(this, emailError);
      }
    }
  });

  passwordInput.addEventListener("input", function () {
    if (isTouched(this)) {
      if (this.value.length > 0) {
        hideError(this, passwordError);
      } else {
        showError(this, passwordError);
      }
    }
  });

  // Основная валидация при отправке формы
  form.addEventListener("submit", function (event) {
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
      console.log("Форма валидна, отправляем данные...");
      // form.submit();
    }
  });

  // Валидация при потере фокуса
  emailInput.addEventListener("blur", function () {
    if (this.value && !validateEmail(this.value)) {
      showError(this, emailError);
    }
  });

  passwordInput.addEventListener("blur", function () {
    if (this.value === "") {
      showError(this, passwordError);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector(".nta_main-menu");

  if (!menu) return;

  // Функция для установки активного элемента
  function setActiveMenuItem(clickedLink) {
    // Удаляем активные классы со всех элементов
    document.querySelectorAll(".nta_main-menu li").forEach((item) => {
      item.classList.remove("active");
    });
    document.querySelectorAll(".nta_main-menu a").forEach((link) => {
      link.classList.remove("active");
    });
    document.querySelectorAll(".nta_podmenu li").forEach((item) => {
      item.classList.remove("nta_active");
    });

    // Добавляем активный класс к кликнутой ссылке
    clickedLink.classList.add("active");

    // Если это ссылка в подменю
    const parentLi = clickedLink.closest("li");
    if (parentLi && parentLi.parentElement.classList.contains("nta_podmenu")) {
      parentLi.classList.add("nta_active");

      // Находим родительский элемент с подменю и делаем его активным
      const parentPodmenu = clickedLink.closest(".nta_active-podmenu");
      if (parentPodmenu) {
        parentPodmenu.classList.add("active");
        parentPodmenu.querySelector(":scope > a").classList.add("active");
      }
    } else {
      // Если это обычная ссылка в основном меню
      const parentLi = clickedLink.parentElement;
      if (parentLi) {
        parentLi.classList.add("active");
      }
    }

    // Сохраняем активный элемент в localStorage
    const activeHref = clickedLink.getAttribute("href");
    if (activeHref && activeHref !== "#") {
      localStorage.setItem("activeMenuItem", activeHref);
    }
  }

  // Функция для восстановления активного элемента из localStorage
  function restoreActiveMenuItem() {
    const activeHref = localStorage.getItem("activeMenuItem");
    if (activeHref) {
      const activeLink = document.querySelector(
        `.nta_main-menu a[href="${activeHref}"]`,
      );
      if (activeLink) {
        setActiveMenuItem(activeLink);
      }
    }
  }

  // Обработчик клика для всех ссылок меню
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      const href = (e.target.getAttribute("href") || "").trim();
      const isPlaceholderLink =
        href === "" || href === "#" || href.startsWith("javascript:");

      // Блокируем переход только для ссылок-заглушек, чтобы меню могло
      // раскрывать подменю без перезагрузки страницы.
      if (isPlaceholderLink) {
        e.preventDefault();
      }

      setActiveMenuItem(e.target);
    }
  });

  // Обработчик для закрытия подменю при клике вне меню
  document.addEventListener("click", function (e) {
    if (!menu.contains(e.target)) {
      document.querySelectorAll(".nta_podmenu").forEach((podmenu) => {
        podmenu.style.opacity = "0";
        podmenu.style.visibility = "hidden";
      });
    }
  });

  // Восстанавливаем активный элемент при загрузке страницы
  restoreActiveMenuItem();

  // Дополнительно: обработка ховера для подменю (если нужно сохранить ховер-эффекты)
  document.querySelectorAll(".nta_active-podmenu").forEach((podmenuItem) => {
    const link = podmenuItem.querySelector(":scope > a");
    const podmenu = podmenuItem.querySelector(".nta_podmenu");

    podmenuItem.addEventListener("mouseenter", function () {
      if (podmenu) {
        podmenu.style.opacity = "1";
        podmenu.style.visibility = "visible";
        // podmenu.style.transform = "translateY(100px)";
      }
    });

    podmenuItem.addEventListener("mouseleave", function () {
      if (podmenu && !podmenu.matches(":hover")) {
        podmenu.style.opacity = "0";
        podmenu.style.visibility = "hidden";
        // podmenu.style.transform = "translateY(100px)";
      }
    });

    // Обработка ховера на самом подменю
    if (podmenu) {
      podmenu.addEventListener("mouseenter", function () {
        this.style.opacity = "1";
        this.style.visibility = "visible";
        // this.style.transform = "translateY(100px)";
      });

      podmenu.addEventListener("mouseleave", function () {
        this.style.opacity = "0";
        this.style.visibility = "hidden";
        // this.style.transform = "translateY(100px)";
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("open-mobile-menu");
  const menu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".mobile-menu__close");

  if (!openBtn || !menu || !closeBtn) return;

  const body = document.body;
  let scrollY = 0;

  const openMenu = () => {
    scrollY = window.scrollY;

    menu.classList.add("is-open");
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    menu.classList.remove("is-open");
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.width = "";
    body.style.overflow = "";
    window.scrollTo(0, scrollY);

    menu.querySelectorAll(".mobile-menu__item.is-active").forEach((item) => {
      item.classList.remove("is-active");

      const toggle = item.querySelector(".mobile-menu__toggle");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  };

  const closeAllDropdowns = () => {
    menu.querySelectorAll(".mobile-menu__item.is-active").forEach((item) => {
      item.classList.remove("is-active");

      const toggle = item.querySelector(".mobile-menu__toggle");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  };

  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  menu.addEventListener("click", (e) => {
    const toggle = e.target.closest(".mobile-menu__toggle");
    const linkInsideDropdown = e.target.closest(".mobile-menu__dropdown a");
    const regularLink = e.target.closest(
      ".mobile-menu__item > .mobile-menu__link, .mobile-menu__row > .mobile-menu__link, .mobile-menu__login",
    );

    if (toggle) {
      const currentItem = toggle.closest(".mobile-menu__item");
      const isActive = currentItem.classList.contains("is-active");

      closeAllDropdowns();

      if (!isActive) {
        currentItem.classList.add("is-active");
        toggle.setAttribute("aria-expanded", "true");
      }

      return;
    }

    if (linkInsideDropdown || regularLink) {
      closeMenu();
    }
  });

  // открытие/закрытие дерева в библиотеке
  const triggers = document.querySelectorAll(".library-tree__trigger");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const parentItem = trigger.closest(".library-tree__item");
      const content = parentItem.querySelector(
        ":scope > .library-tree__content",
      );

      if (!content) return;

      trigger.classList.toggle("is-open");
      content.classList.toggle("is-open");
    });
  });
});
