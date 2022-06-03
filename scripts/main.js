

var preloader = document.getElementById('preloader');

document.addEventListener('DOMContentLoaded', function(){

   // preloader
   setTimeout(function(){
      var fadeEffect = setInterval(function () {
         if (!preloader.style.opacity) {
            preloader.style.opacity = 1;
         }

         if (preloader.style.opacity >= 0.1) {
            preloader.style.opacity -= 0.1;
         } else {
            clearInterval(fadeEffect);
            preloader.style.visibility = "hidden";
            preloader.style.zIndex = "-100";
            preloader.style.display = "none";

            preloader.remove();
         }
      }, 30);
   }, 400);
});

/* Remove focus outline for mouse users */
document.addEventListener("mousedown", () => {
   document.body.classList.add("using-mouse");
   document.body.classList.remove("using-keyboard");
 })
 
document.addEventListener("keydown", (event) => {
   const key = event.key;
   if (key == "Tab" || key == "Shift" || key == "Enter") {
      document.body.classList.add("using-keyboard");
      document.body.classList.remove("using-mouse");
   }   
})

/* Open links */
function linkOpen(url, type, cond) {
   if (cond != 'convert') {
      if (type == 'blank') {
         window.open(url); // new tab
      } else if (type == 'curr') {
         window.location.assign(url); // current tab
      }
   } else {
      if (window.innerWidth > 915) {
         window.location.assign(url);
      }
   }     
}

/* Scroll to top */
function goTo(value) {
   window.scrollTo({
      top: value,
      behavior: "smooth"
   });
}

/* Click to copy */
var origTimer,
origTarget,
tooltipKeyDown = false;

function saveTarget(target) {
   origTarget = target
}

function copy(target) {
   clearTimeout(origTimer);

   var element = document.getElementById(target);
   if (origTarget != null && element != origTarget) {
      if (!tooltipKeyDown) {
         origTarget.setAttribute("data-tooltip", "Click to copy!");
      }
   }
   var range = document.createRange(); 

   window.getSelection().removeAllRanges();
   range.selectNode(element);  
   window.getSelection().addRange(range);

   try {  
     document.execCommand('copy');   
   } catch(err) {  
   }
   
   setTimeout(function() {
      window.getSelection().removeAllRanges();
   }, 360);

   saveTarget(element)
   
   element.setAttribute("data-tooltip", " Copied!  🎉 "); 
   if (document.body.classList.contains("using-mouse")) {
      origTimer = setTimeout(function() {
         element.setAttribute("data-tooltip", "Click to copy!");
      }, 2500);  
   }    
}

/* Links animation by Aaron Iker */
if (window.innerWidth > 1050) {
   document.querySelectorAll('.link-roll').forEach(link => {
      link.innerHTML = '<div><span>' + link.textContent.trim().split('').join('</span><span>') + '</span></div>';
      link.querySelectorAll('span').forEach(s => s.innerHTML = s.textContent == ' ' ? '&nbsp;' : s.textContent);
   
      if (!link.classList.contains('link-line')) { // add line or not
         link.insertAdjacentHTML('beforeend', '<div></div>');
      } else {
         link.insertAdjacentHTML('beforeend', '<div><svg preserveAspectRatio="none" viewBox="0 0 192 5"><path d="M191.246 4H129C129 4 127.781 4.00674 127 4C114.767 3.89447 108.233 1 96 1C83.7669 1 77.2327 3.89447 65 4C64.219 4.00674 63 4 63 4H0.751923" /></svg></div>');
      }
   });
}

function buildAfterLoad() {
   if (window.innerWidth > 1050) {
      document.querySelectorAll('.afterload.link-roll').forEach(link => {
         link.innerHTML = '<div><span>' + link.textContent.trim().split('').join('</span><span>') + '</span></div>';
         link.querySelectorAll('span').forEach(s => s.innerHTML = s.textContent == ' ' ? '&nbsp;' : s.textContent);
   
         if (!link.classList.contains('link-line')) { // add line or not
            link.insertAdjacentHTML('beforeend', '<div></div>');
         } else {
            link.insertAdjacentHTML('beforeend', '<div><svg preserveAspectRatio="none" viewBox="0 0 192 5"><path d="M191.246 4H129C129 4 127.781 4.00674 127 4C114.767 3.89447 108.233 1 96 1C83.7669 1 77.2327 3.89447 65 4C64.219 4.00674 63 4 63 4H0.751923" /></svg></div>');
         }
      });
   }
}

/* Keyboard navigation */
// 'Enter' triggering for divs
var focusableKeyDown = false,
focusable,
tooltip = document.getElementsByClassName('tooltip');

function checkTabIndex() {
   focusable = document.getElementsByClassName('focusable');

   for (i = 0; i < focusable.length; i++) {
      focusable[i].addEventListener('focus', function() {
         focusableKeyDown = true;
      });
      focusable[i].addEventListener('blur', function() {
         focusableKeyDown = false;
      });
   }
}
// and for contact details
var currFocused;

for (i = 0; i < tooltip.length; i++) {
   tooltip[i].addEventListener('focus', function(event){
      if (document.body.classList.contains("using-keyboard")) {
         tooltipKeyDown = true;
         document.activeElement.setAttribute("data-tooltip", "'Enter' to copy!");
         currFocused = document.activeElement;
      } else {
         currFocused = document.activeElement;
         document.activeElement.setAttribute("data-tooltip", "Click to copy!");
      }
   })
   tooltip[i].addEventListener('blur', function(e){
      tooltipKeyDown = false;
      currFocused.setAttribute("data-tooltip", "Click to copy!");
   })
}
// click when 'enter'
window.addEventListener("keydown", function(event){
   if (event.key == 'Enter' || event.keyCode == 13) {
      if (focusableKeyDown || tooltipKeyDown) { 
         document.activeElement.click();
      }
   }
});


/* Check if user is using a mobile device */
var checkDevice = false;

window.mobileAndTabletCheck = function() {
   (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) checkDevice = true;})(navigator.userAgent||navigator.vendor||window.opera);
};

/* Add Google Tag Manager 
function insertAnalytics() {
   consentType = localStorage.getItem('cookies_necessary');

   var mainDomain = false;
   if (location.hostname == 'www.blackster-capital.com') {
      mainDomain = true;
   }

   if (mainDomain && (consentType == 'all' || consentType == 'analytics')) {
      var tag1 = document.createElement('script');
      //tag2 = document.createElement('script');

      //tag1.setAttribute('async','');
      //tag1.src= "https://www.googletagmanager.com/gtag/js?id=G-Z2QQP8X506";

      tag1.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-5BX3G5J');`;

      //tag2.innerHTML = "window.dataLayer = window.dataLayer || [];  function gtag(){dataLayer.push(arguments);}  gtag//('js', new  Date());  gtag('config', 'G-Z2QQP8X506', { 'anonymize_ip': true, 'allow_display_features': false });";

      document.getElementsByTagName('head')[0].appendChild(tag1);
      //document.getElementsByTagName('head')[0].appendChild(tag2);
   }
} */