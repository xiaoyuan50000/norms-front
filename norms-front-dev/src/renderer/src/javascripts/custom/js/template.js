(function($) {
    'use strict';
    $(function() {
      let body = $('body');
      // let contentWrapper = $('.content-wrapper');
      // let scroller = $('.container-scroller');
      // let footer = $('.footer');
      let sidebar = $('.sidebar');
  
      //Add active class to nav-link based on url dynamically
      //Active class can be hard coded directly in html file also as required
  
      function addActiveClass(element) {
        // console.log(current);
        
        if (current === "") {
          //for root url
          if (element.attr('href').indexOf("/overview") !== -1) {
            element.parents('.nav-item').last().addClass('active');
            if (element.parents('.sub-menu').length) {
              element.closest('.collapse').addClass('show');
              element.addClass('active');
            }
          }

          // if (element.attr('href').indexOf("/homepage") !== -1) {
          //   element.parents('.nav-itemh').last().addClass('active');
          //   if (element.parents('.sub-menu').length) {
          //     element.closest('.collapse').addClass('show');
          //     element.addClass('active');
          //   }
          // }
        } else {
          //for other url
          if (element.attr('href').indexOf(current) !== -1) {
            element.parents('.nav-item').last().addClass('active');
            if (element.parents('.sub-menu').length) {
              element.closest('.collapse').addClass('show');
              element.addClass('active');
            }
            if (element.parents('.submenu-item').length) {
              element.addClass('active');
            }
          }

        }
      }
  
      let current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
      $('.nav li a', sidebar).each(function() {
        let $this = $(this);
        addActiveClass($this);
      })
  
      //Close other submenu in sidebar on opening any
  
      sidebar.on('show.bs.collapse', '.collapse', function() {
        sidebar.find('.collapse.show').collapse('hide');
      });
  
  
      //Change sidebar
  
      $('[data-toggle="minimize"]').on("click", function() {
        body.toggleClass('sidebar-icon-only');
      });
  
      
    });
  })(jQuery);