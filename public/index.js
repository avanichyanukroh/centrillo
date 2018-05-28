function getLoginPage() {

  const settings = {

    url: "/users/login",
    type: 'GET',
    success: function(data) {
      console.log(data);
    }
  };

  $.ajax(settings);
}

function watchLoginButton() {

  $('#loginButton').click(function() {
    
    event.preventDefault();

    window.location.href = '/users/login';
    //getLoginPage();
  });
};

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



$(watchLoginButton);
$(watchNavCollapseToggle);
$(watchArrowToggle);
