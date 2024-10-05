import { discounts_day, top_discounts } from './discounts.js';
import { getCountdownMessage, startCountdown } from './countdown.js';

$(document).ready(function () {
    function createDiscountCard(item, isDiscountsDay) {
        const countdownMessage = item.expiry_date ? getCountdownMessage(item.expiry_date, item.id) : '';

        return `
            <div class="${isDiscountsDay ? '' : 'swiper-slide'}">
                <div class="discount-card">
                    <div class="discount-card__img">
                        <img src="${item.img}" alt="${item.company}" class="card-img">
                        <div class="countdown">
                            ${countdownMessage}
                        </div>
                    </div>
                    <div class="discount-card__content">
                        <div class="discount-card__info">
                            <h3 class="discount-card__title">${item.company}</h3>
                            <p class="discount-card__promotion">${item.promotion}</p>
                        </div>
                        <div class="discount-card__info">
                            <div class="discount-card__cashback">
                                <p class="discount-card__type">${item.type}</p>
                                <div class="discount-card__btns">
                                    <div class="discount-card__btn">Кешбэк</div>
                                    <div class="discount-card__btn-solid">${item.cashback_percentage}</div>
                                </div>
                            </div>
                            <p class="discount-card__category">${item.category_market}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderDiscounts(containerSelector, discounts) {
        const container = $(containerSelector);
        const cards = discounts.map(item => createDiscountCard(item, containerSelector === '.discounts-day')).join('');
        container.append(cards);

        if (containerSelector === '.discounts-day') {
            const offersContainer = container.parent('.discounts-day__wrapper').find('.discounts-day__offers');
            const offersCount = discounts.length;
            offersContainer.text(`${offersCount} предложения`);
        }

        discounts.forEach(item => {
            if (item.expiry_date) {
                const countdownElement = $(`#countdown-timer-${item.id}`);
                startCountdown(item.expiry_date, item.id);
            }
        });
    }

    renderDiscounts('.top-discounts__cards', top_discounts);
    renderDiscounts('.discounts-day', discounts_day);

    const swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.custom-next-arrow',
            prevEl: '.custom-prev-arrow',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    });

    let secondSwiper = null;

    function initSwiperOnMobile() {
        const swiperContainer = $('.second-swiper');
        const swiperWrapper = swiperContainer.find('.baner__nav');
        const swiperSlides = swiperWrapper.find('.top-discounts__list');

        if ($(window).width() <= 420 && !secondSwiper) {

            swiperWrapper.addClass('swiper-wrapper');
            swiperSlides.addClass('swiper-slide');

            secondSwiper = new Swiper('.second-swiper', {
                slidesPerView: 2,
                spaceBetween: 12,
                breakpoints: {
                    420: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    }
                },
                navigation: false,
                pagination: false,
            });
        } else if ($(window).width() > 420 && secondSwiper) {
            secondSwiper.destroy(true, true);
            secondSwiper = null;

            swiperWrapper.removeClass('swiper-wrapper');
            swiperSlides.removeClass('swiper-slide');
        }
    }

    initSwiperOnMobile();

    $(window).resize(initSwiperOnMobile);
    

    $('.faq__header').off().on('click', function() {
        const answer = $(this).next('.faq__answer');
        const showBtn = $(this).find('.faq__show-btn');

        if (answer.is(':hidden')) {
            answer.removeAttr('hidden');
            showBtn.addClass('rotated');
        } else {
            answer.attr('hidden', true);
            showBtn.removeClass('rotated');
        }
    });
});