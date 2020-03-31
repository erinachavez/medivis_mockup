/*------------------------------------------------------------------
Table of Contents

- Start Animations
- Navbar Background Fade
- Parallax Titles

------------------------------------------------------------------*/

$(document).ready(function () {
  /* Start Animations --------------------------------------------*/
  $(window).on("load", function() {
    $("body").removeClass("preload");
  });

  /* Navbar Background Fade --------------------------------------*/
  let windowElement = $(window);

  windowElement.on("scroll", function () {
    let scrollPos = windowElement.scrollTop();
    let bgOpacity = 1;

    if (scrollPos <= 100) {
      bgOpacity = scrollPos*0.01;
    }

    $("nav").css("background-color", `rgba(26, 26, 26, ${bgOpacity})`);
  });

  windowElement.trigger("scroll");

  /* Parallax Titles ---------------------------------------------*/
  $(".parallax-title-img").each(function () {
    let parallaxTitleImg = $(this);
    let svg = parallaxTitleImg.find("svg");
    let startPos = 1150;
    let scrollDuration = 400;

    windowElement.on("scroll", function () {
      let y1, y3, y4, negativeMargin, padding;
      let scrollPos = windowElement.scrollTop();
      let scrollDif = scrollPos - startPos;

      if (scrollPos < startPos) {
        y1 = 480;
        y3 = 480;
        y4 = 480;

        negativeMargin = 0;
        padding = 0;
      }
      else if (scrollPos > startPos + scrollDuration) {
        y1 = 0;
        y3 = 520;
        y4 = 400;

        negativeMargin = -250;
        padding = 50;
      }
      else {
        y1 = 480 - (scrollDif*480)/scrollDuration;
        y3 = 480 + (scrollDif*40)/scrollDuration;
        y4 = 480 - (scrollDif*80)/scrollDuration;

        negativeMargin = ((scrollDif*250)/scrollDuration)*-1;
        padding = ((scrollDif*50)/scrollDuration);
      }

      svg.find("polygon").attr("points", `0,${y1} 0,480 1120,${y3} 1120,${y4}`);

      parallaxTitleImg.siblings(".parallax-title").css("margin-top", negativeMargin);
      parallaxTitleImg.siblings(".parallax-title").css("padding-bottom", padding);
    });

    windowElement.trigger("scroll");
  });

  /* Carousels ---------------------------------------------------*/
  $(".carousel").carousel({ interval: 7000 });

  $(".carousel-item", ".show-neighbors").each(function () {
    var slide = $(this);
    var next = slide.next();

    if (!next.length) {
      next = slide.siblings(":first");
    }

    next.children(":first-child")
        .clone()
        .appendTo(slide);

  }).each(function () {
    var slide = $(this);
    var prev = slide.prev();

    if (!prev.length) {
      prev = slide.siblings(":last");
    }

    prev.children(":nth-last-child(2)")
        .clone()
        .prependTo(slide);
  });
});
