//========================== СТИЛИЗАЦИЯ CHECKBOX ========================

$(".check-label").on("click", function () {
    let isChecked = $(this).children("input").prop("checked");
    if (isChecked) {
        $(this).find(".fakecheck").addClass("checked");
    } else {
        $(this).find(".fakecheck").removeClass("checked");
    }
});

//=================== Маска номера телефона ============

 $('input[type="tel"]').inputmask({
  "mask": "+7 (999) 999 - 99 - 99",
  "placeholder": "+7 (   )     -    -   ",
  "showMaskOnHover": false,
  "showMaskOnFocus": true
});


//========================== ФУНКЦИОНАЛ ГАЛЕРЕИ КАТАЛОГА ========================

$(".catalog__item-pagination img").on("click", function () {

  let currentLink = $(this).attr('src');
  $(this).closest('.catalog__item').find('.catalog__item-img').attr('src', currentLink);
});



  
//========================== ФУНКЦИОНАЛ СЛАЙДЕР ГАЛЕРЕИ ========================


if (document.querySelectorAll('.projectsSwiper').length) {

    const projectsSwiper= new Swiper('.projectsSwiper', {
        slidesPerView: 1,
        speed: 600,
        centeredSlides: true,
        effect: "coverflow",
        initialSlide: 1,
        keyboard: {
            enabled: true,
            onlyInViewport: false,
          },
        coverflowEffect: {       
            rotate: 0,            
            depth: 230,         
            stretch: 200,         
            modifier: 1,        
            scale: 0.9,              
            slideShadows: true,   
        },                         
    
        navigation: {
            nextEl: ".projectsSwiper-silder-next",
            prevEl: ".projectsSwiper-silder-prev",
        },
        pagination: {
            el: ".projectsSwiper-pagination",
            clickable: true,
        },

        breakpoints: {
          640: {
            // При ширине ≥ 640px применяются настройки по умолчанию (уже указаны выше)
          },
          // При ширине < 640px
          0: {
            effect: 'slide',
            centeredSlides: false,
            coverflowEffect: null,
            slidesPerView: 1,
            spaceBetween: 16,
          }
        }
    })
}


//========================== ФУНКЦИОНАЛ СЛАЙДЕР "КАК МЫ РАБОТАЕМ" ========================

if (document.querySelectorAll('.stepsSwiper').length) {
  const stepsSwiper = new Swiper(".stepsSwiper", {
    slidesPerView: 'auto',
    spaceBetween: 32,
    speed: 600,

    navigation: {
      nextEl: ".stepsSwiper-button-next",
      prevEl: ".stepsSwiper-button-prev",
    },

    pagination: {
      el: ".stepsSwiper-pagination",
    },
    breakpoints: {
      641: {
        slidesPerView: 'auto',
        spaceBetween: 32
      }, 
      0: {
        slidesPerView: 1,
        spaceBetween: 16
      },
    }
  });
}


//========================== ФУНКЦИЛГАЛ ПОЛЗУНКА СТОИМОСТИ ========================

function formatPrice(price) {
    // Convert to string and split by thousands with dots
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₽";
}
  
  /**
   * Initialize the price range slider
   */
function initPriceRangeSlider() {
    const minSlider = $("#min-slider");
    const maxSlider = $("#max-slider");
    const minPrice = $("#min-price");
    const maxPrice = $("#max-price");
    const sliderFill = $(".slider-fill");
    
    // Min and max values for the slider
    const minValue = parseInt(minSlider.attr("min"));
    const maxValue = parseInt(maxSlider.attr("max"));
    const step = parseInt(minSlider.attr("step"));
    
    // Update the slider fill and price displays
    function updateSlider() {
      const minVal = parseInt(minSlider.val());
      const maxVal = parseInt(maxSlider.val());
      
      // Calculate percentage positions for the track fill
      const minPercent = ((minVal - minValue) / (maxValue - minValue)) * 100;
      const maxPercent = ((maxVal - minValue) / (maxValue - minValue)) * 100;
      
      // Update the fill element's position and width
      sliderFill.css({
        left: minPercent + "%",
        width: (maxPercent - minPercent) + "%"
      });
      
      // Update price displays with formatted prices
      minPrice.text(formatPrice(minVal));
      maxPrice.text(formatPrice(maxVal));
    }
    
    // Handle min slider input
    minSlider.on("input", function() {
      let minVal = parseInt($(this).val());
      let maxVal = parseInt(maxSlider.val());
      
      // Ensure min doesn't exceed max - step
      if (minVal + step > maxVal) {
        $(this).val(maxVal - step);
      }
      
      updateSlider();
    });
    
    // Handle max slider input
    maxSlider.on("input", function() {
      let minVal = parseInt(minSlider.val());
      let maxVal = parseInt($(this).val());
      
      // Ensure max doesn't go below min + step
      if (maxVal - step < minVal) {
        $(this).val(minVal + step);
      }
      
      updateSlider();
    });
    
    updateSlider();
}

$(document).ready(function() {
    initPriceRangeSlider();
});




//========================== ФУНКЦИЛГАЛ FAQ ========================

$(".faq__item").on("click", function () {
    const $content = $(this).find('.faq__item-answer');
    const $header = $(this).find('.faq__item-question');
    
    if ($header.hasClass('open')) {
        $content.slideUp();
        $header.removeClass('open');
    } else {
        $(".faq__item").find('.faq__item-answer').slideUp();
        $(".faq__item").find('.faq__item-question').removeClass('open');

        $content.slideDown();
        $header.addClass('open');
    }
});


//========================== Реализация функционала меток на фото ====================


$(document).ready(function () {
  $(".advantages__block-dot").each(function () {
      let dot = $(this).find(".dot");
      let info = $(this).find(".advantages__block-dot-info");

      let dotOffset = dot.position(); // Получаем позицию .dot относительно родителя
      let dotHeight = dot.outerHeight();
      let infoHeight = info.outerHeight();

      // Смещаем блок вверх, чтобы его центр был чуть выше точки
      let topOffset = dotOffset.top - infoHeight / 2 + 75; // 10px - небольшой запас

      info.css({
          top: topOffset + "px",
          left: dotOffset.left + "px",
          transform: "translateX(-50%)",
      });
  });
});



//========================== Реализация функционала popup окон ====================



function openPopup(popup) {
  $('.popup').fadeOut();
  $('.overlay').fadeIn();
  $('html').css('overflow', 'hidden');
  popup.fadeIn();
}

function closePopup(closeBtn) {
  $('.overlay').fadeOut();
  closeBtn.parent().fadeOut();
  $('html').css('overflow-y', 'auto');
}
$(document).on('click', '.popup_close', function(e) {
  closePopup($(this));
});

$('.popup-callme-btn').click(function() {
  openPopup($('.popup-callme'));
});

$('.popup-catalog-btn').click(function() {
  openPopup($('.popup-catalog'));
});

$('.popup-project-btn').click(function() {
  let projectTitle = $(this).closest('article').find('h3').text();
  $('.popup-project h2 span').text(projectTitle);
  openPopup($('.popup-project'));
});


$(document).ready(function() {
  $(document).mouseup(function(e) {
      var container = $('.popup');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
          container.fadeOut();
          $('.overlay').fadeOut();
          $('html').css('overflow-y', 'auto');
      }
  });


  $(document).on('keydown', function(e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      $('.popup').fadeOut();
      $('.overlay').fadeOut();
      $('html').css('overflow-y', 'auto');
    }
  });
});

$('form button').click(function(e) {
  e.preventDefault();
});


$('.popup-catalog form button').click(function() {
  openPopup($('.popup-thanks-catalog'));
});

$('.popup-project form button').click(function() {
  openPopup($('.popup-thanks'));
});

$('.popup-callme form button').click(function() {
  openPopup($('.popup-thanks'));
});






//========================== Stycky Header ====================

let minScroll;
minScroll = $('.header__inner').outerHeight();
const headerHeight = $('header').outerHeight();
$(window).on('scroll', function(e) {
  let y = $(this).scrollTop();

  if (y > minScroll) {  
    $('.header__sticky').addClass('fixed');
  } else {
    $('.header__sticky').removeClass('fixed');
  }

});




//========================== Функционал бургер меню ====================

$("#burger_menu").click(function() {
  // $(this).toggleClass('open');
  $('.overlay-header').fadeIn();
  $(".header__adaptive-menu").toggleClass("open");
  $('html').css('overflow', 'hidden');
});

$(document).mouseup(function(e) {
  var container = $(".header__adaptive-menu");
  var burger = $("#burger_menu");
  
  if (container.hasClass("open") 
      && !container.is(e.target) 
      && container.has(e.target).length === 0
      && !burger.is(e.target) 
      && burger.has(e.target).length === 0) {
    container.removeClass("open");
   
    $('html').css('overflow-y', 'auto');
    $('.overlay-header').fadeOut();
  }
});

$(document).on('click', '.header__adaptive-menu nav ul li', function(e) {
  $('.header__adaptive-menu').removeClass('open');
  $('.overlay-header').fadeOut();
  $('html').css('overflow-y', 'auto');
});