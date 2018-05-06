  


  $('.dropdown').on('shown.bs.dropdown', function () {
    var menu = $(this).find('.dropdown-menu');
    var menuLeft = menu.offset().left;
    var menuWidth = menu.outerWidth();
    var documentWidth = $(body).outerWidth();
    if (menuLeft + menuWidth > documentWidth) {
      menu.offset({'left': documentWidth - menuWidth});
    }
  });


function watchNavCollapseToggle() {

    $("#navCollapse").click(function() {

    $(this).toggleClass("fa-window-close");

    });
}

$(watchNavCollapseToggle);