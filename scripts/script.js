$(document).ready(function() {
    $('.button-collapse').sideNav({
        menuWidth: 800, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });
    $('.scrollspy').scrollSpy(function() {
        scrollOffset: 400;
    });
    $('.materialboxed').materialbox();
});