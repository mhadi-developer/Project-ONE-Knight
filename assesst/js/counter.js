$(document).ready(function () {
  var counters = $(".counter-card .count");
  var started = false; // to make sure it runs only once

  function startCounting() {
    counters.each(function () {
      var $this = $(this);
      var target = parseInt($this.text(), 10);
      var current = 0;
      var increment = Math.ceil(target / 100); // adjust speed
      var interval = setInterval(function () {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        $this.text(current);
      }, 40);
    });
  }

  function isInViewport(elem) {
    var elementTop = $(elem).offset().top;
    var elementBottom = elementTop + $(elem).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  }

  $(window).on("scroll load", function () {
    if (!started && isInViewport($(".stats-counter"))) {
      started = true;
      startCounting();
    }
  });
});
