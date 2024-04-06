new Swiper(".swiper-container", {
    pagination: {
        el: ".swiper-plugin-pagination",
        clickable: true,
        bulletClass: "swiper-plugin-pagination__item",
        bulletActiveClass: "is-active"
    },
    plugins: [SwiperPluginPagination]
});
