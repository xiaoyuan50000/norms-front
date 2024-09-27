
(function ($) {
  'use strict';
  $(function () {
    let body = $('body');
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        let clientWidth = entry.contentRect.width / 1600;

        clientWidth = clientWidth < 1 ? clientWidth : 1

        // body.css("zoom", clientWidth)
        // let size2 = 100 / clientWidth + '%';
        // $('body').css('transform', 'scale(' + clientWidth + ')');
        // $('body').css('transform-origin', '0 0');
        // $('body').css('width', size2);
        $('body').css('height', '100%');
        $('body').css('overflow', 'auto');
      }
    });

    resizeObserver.observe(document.querySelector("html"));
  });
})(jQuery);