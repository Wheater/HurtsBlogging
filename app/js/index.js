$(document).ready(function(){
  $('#sidebar-toggle').click( function(e){
    e.preventDefault();
    $('.sidebar').toggleClass('toggle-menu');
    $('.front-page').toggleClass('toggle-menu');
    $('#sidebar-toggle').toggleClass('toggle-menu');
  });
});