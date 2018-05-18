  


  $('.dropdown').on('shown.bs.dropdown', function () {
    let menu = $(this).find('.dropdown-menu');
    let menuLeft = menu.offset().left;
    let menuWidth = menu.outerWidth();
    let documentWidth = $("").outerWidth();
    if (menuLeft + menuWidth > documentWidth) {
      menu.offset({'left': documentWidth - menuWidth});
    }
  });

//changes nav bars icon to window close icon
function watchNavCollapseToggle() {

    $("#navCollapse").click(function() {

    $(this).toggleClass("fa-window-close fa-bars");

    });
}

//collapse nav bars icon upon selecting 

//changes dropdown arrow icon direction after expanding or collapsing
function watchArrowToggle() {

    $(".arrowToggle").click(function() {

    $(this).children().toggleClass("fa-angle-down fa-angle-up");

    });
}

function watchCategoryItemDisplay() {
  $(".list-group-item").click(function() {
    event.preventDefault();

    let displaySelectedCategory = $(this).attr("id");

    $(".allTaskList").css("display", "none");
    $(`.${displaySelectedCategory}`).css("display", "block");

  console.log(displaySelectedCategory);

  });

}

$(watchNavCollapseToggle);
$(watchArrowToggle);
$(watchCategoryItemDisplay);