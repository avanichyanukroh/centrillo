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

function watchlogOutButton() {

  $('#logOutButton').click(function() {
    
    event.preventDefault();

    localStorage.removeItem('user');

    window.location.href = '/users/login';
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

//changes dropdown arrow icon direction after expanding or collapsing
function watchArrowToggle() {

    $(".arrowToggle").click(function() {

    $(this).children().toggleClass("fa-angle-down fa-angle-up");
    });
}

$(watchlogOutButton);
$(watchNavCollapseToggle);
$(watchArrowToggle);
