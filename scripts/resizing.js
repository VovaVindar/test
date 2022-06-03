var windowWidth = window.innerWidth;
var resizeTimer;

/* 'Done resizing' effect */
$(window).on('resize', function(e) { // with auto-refresh
   clearTimeout(resizeTimer);

   resizeTimer = setTimeout(function(event) {
      if (windowWidth > 1050 && $(window).width() <= 1050) {
         reloadPage();
      } else if (windowWidth <= 1050 && $(window).width() > 1050) {
         reloadPage();
      }

   
      if($(this).width() != windowWidth) {
         //reloadPage();
         slideSetWidth();
      }     
   }, 300);

});

function reloadPage(){
   windowWidth = $(this).width();  
   console.log("I will refresh the page 😁");
   if (localStorage.getItem('cookies_necessary') != null) {
      sessionStorage.setItem('refreshed_necessary', true);
   }   
   setTimeout(function() {
      location.reload();
   }, 650);
}

document.addEventListener("DOMContentLoaded", function(){
   if (sessionStorage.getItem('refreshed_necessary') == 'true') {
      if (scrollProgress.classList.contains('index')) {
         console.log("%c!!", "background-color: #EB5E00; color: #fff; padding: 2px; border-radius: 3px", "I refreshed the page to update slider, link animations and scroll triggers 😁");
      } else {
         console.log("%c!!", "background-color: #EB5E00; color: #fff; padding: 2px; border-radius: 3px", "I refreshed the page to update link animations 😁");
      }
      if (localStorage.getItem('cookies_necessary') != null) {
         sessionStorage.setItem('refreshed_necessary', false);
      }   
   }
});