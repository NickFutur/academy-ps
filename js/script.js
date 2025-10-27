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