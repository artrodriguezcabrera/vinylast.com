(function ($) {
  "use strict";

  $(".bg-color").each(function () {
    var color = $(this).data("bg-color");
    if (color) $(this).css("background-color", color);
  });

  if ($.fn.slick && $(".slider-activation").length) {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    $(".slider-activation").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: !reduce,
      autoplaySpeed: 6000,
      dots: false,
      infinite: true,
      fade: false,
      centerPadding: 0,
      prevArrow:
        '<span class="slider-navigation slider-navigation-prev"><i class="fa fa-caret-left"></i></span>',
      nextArrow:
        '<span class="slider-navigation slider-navigation-next"><i class="fa fa-caret-right"></i></span>',
    });
  }

  $(".hamburger-trigger").on("click", function (e) {
    e.preventDefault();
    $(".hamburger-area").addClass("is-visible");
    $(this).addClass("open");
  });

  $(".btn-close-search").on("click", function (e) {
    e.preventDefault();
    $(".hamburger-area").removeClass("is-visible");
    $(".hamburger-trigger").removeClass("open");
  });

  $(".hamburger-area .responsive-manu a").on("click", function () {
    $(".hamburger-area").removeClass("is-visible");
    $(".hamburger-trigger").removeClass("open");
  });
})(jQuery);
