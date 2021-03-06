//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    let lightbox = new SimpleLightbox('#portfolio a.portfolio-box', {
        "showCounter": false
    });


    let working = false;

    $(window).scroll(function() {
        var divTop = $('#portfolio').offset().top,
            divHeight = $('#portfolio').outerHeight(),
            wHeight = $(window).height(),
            windowScrTp = $(this).scrollTop();
        if (windowScrTp > (divTop+divHeight-wHeight-100)){
            if (!working) {
                working = true;
                loadMorePosts();
            }
        }
     });

    function loadMorePosts() {
      var _this = this;
      var $blogContainer = $("#portfolio");
      var nextPage = parseInt($blogContainer.attr("data-page")) + 1;
      $(this).addClass("loading");

      $.get("/page" + nextPage + "/", function (data) {
        var htmlData = $.parseHTML(data);
        var $articles = $(htmlData).find(".portfolio-post");
        $blogContainer.attr("data-page", nextPage);
        $blogContainer.find('.row').append($articles);
        if ($blogContainer.attr("data-totalPages") == nextPage) {
          $(".loadMore").remove();
          // End of pages reached? Stop listening to scroll event.
          $(window).off('scroll');
        }
        $(_this).removeClass("loading");

        lightbox.refresh();

        working = false;
      });
    }

});
