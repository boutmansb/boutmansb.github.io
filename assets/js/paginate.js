$(".loadMore").click(loadMorePosts);

function loadMorePosts() {
  var _this = this;
  var $blogContainer = $("#portfolio");
  var nextPage = parseInt($blogContainer.attr("data-page")) + 1;
  $(this).addClass("loading");

  $.get("/page" + nextPage, function (data) {
    var htmlData = $.parseHTML(data);
    var $articles = $(htmlData).find(".portfolio-post");
    $blogContainer.attr("data-page", nextPage);
    $blogContainer.find('.row').append($articles);
    if ($blogContainer.attr("data-totalPages") == nextPage) {
      $(".loadMore").remove();
    }
    $(_this).removeClass("loading");

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });
  });
}