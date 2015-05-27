$(document).ready(function () {
    getUser();
});

/**
 * Get json user information
 */
function getUser() {
    $.ajax({
        url: "http://jsonplaceholder.typicode.com/users",
        success: function (data) {
            var user = data[Math.floor(Math.random() * data.length)];
            console.log(user);
            showUser(user);
        },
        error: function () {
            console.log('ERROR');
        }
    });

}

/**
 * Fill the user information into the container
 */
function showUser(user) {
    if (user.address.geo) {
        showPosition(user.address.geo);
    }

    $("#name").html(user.name);
    $("#username").html(" (" + user.username + ")");
    $("#phone").html(user.phone);
    $("#website").html(user.website);
    $("#email").html(user.email);
    $("#companyName").html(user.company.name);
    $("#phone").html(user.phone);
    $("#address").html(user.address.city + ", " + user.address.street + ", " + user.address.suite + ", " + user.address.zipcode);
}

/**
 * Show the map position
 */
function showPosition(position) {
    var latlon = position.lat + "," + position.long;

    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&zoom=13&size=300x200&sensor=false";
    document.getElementById("mapholder").innerHTML = "<img src='" + img_url + "'>";
}

/**
 * Manage the reload button trigger action
 */
$('#reload').on('click', function (e) {
    e.preventDefault(); // preventing default click action
    getUser();
});

/**
 * Fill the gallery into the modal
 */
function showGallery(photos) {
    var linksContainer = $('#photos'), baseUrl;

    // Add the demo images as links with thumbnails to the page:
    $.each(photos, function (index, photo) {
        baseUrl = photo.url;
        $('<li/>')
                .addClass('col-lg-2 col-md-2 col-sm-3 col-xs-4')
                .append($('<img>').prop('src', photo.thumbnailUrl).addClass('img-responsive'))
                .appendTo(linksContainer);
    });
    
    $('#gallery').modal('show');
}

/**
 * Manage the gallery button trigger action
 */
$('#galerybtn').on('click', function (e) {
    e.preventDefault(); // preventing default click action
    $.ajax({
        url: "http://jsonplaceholder.typicode.com/photos",
        success: function (data) {
            console.log(data);
            showGallery(data);
        },
        error: function () {
            console.log('ERROR');
        }
    });
});