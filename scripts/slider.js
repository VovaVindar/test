/* Slider by Claudia Conceicao
(https://codepen.io/cconceicao/pen/PBQawy)
modified by Vova Vindar */

var slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    slides = sliderItems.getElementsByClassName('slide'),
    slideSize,
    indicator = document.getElementById('indicator');

var accNum = 0;

/* For indicator clicks */
function changeAccNum(nextSlide) {
  accNum = nextSlide;
}

/* Resizing width bug fix */
slideSetWidth();
function slideSetWidth() {
  for (i = 0; i < slides.length; i++) {
    slides[i].style.width = slides[0].offsetHeight + "px";
  }

  slideSize = slides[0].offsetHeight;
  var origAccNum = accNum;
  if (accNum = 3) {
    changeAccNum(accNum - 1);
    indicator.click();
  } else {
    changeAccNum(accNum + 1);
    indicator.click();
  }

  setTimeout(function() {
    changeAccNum(origAccNum);
    indicator.click();
  }, 450)
}

slide(slider, sliderItems);
function slide(wrapper, items) {
  var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 60,
      slidesLength = slides.length,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0;

  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  wrapper.classList.add('loaded');
  
  // Mouse events
  items.onmousedown = dragStart;
  
  // Touch events
  items.addEventListener('touchstart', dragStart, {passive: true});
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction, {passive: true});

  // Indicator click
  indicator.addEventListener('click', accordionSlide);

  
  
  // Transition events
  items.addEventListener('transitionend', transitionEnded);
  
  function dragStart (e) {
    e = e || window.event;
    if (!checkDevice) {
      e.preventDefault();
    }
    posInitial = items.offsetLeft;
    
    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }

    //}
  }

  function dragAction (e) {
    e = e || window.event;
    
    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = (items.offsetLeft - posX2) + "px";
  }
  
  function dragEnd (e) {
    posFinal = items.offsetLeft;

    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = (posInitial) + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }
  
  function shiftSlide(dir, action) {
    items.classList.add('shifting');
    
    if (allowShift) {
      if (!action) { posInitial = items.offsetLeft; }

      if (dir == 1) {
        items.style.left = (posInitial - slideSize) + "px";
        index++;      
      } else if (dir == -1) {
        items.style.left = (posInitial + slideSize) + "px";
        index--;      
      }

      checkIndex();
    };
    
    allowShift = false;
  }

  function accordionSlide() {
   if (accNum != index && allowShift){
      items.classList.add('shifting');

      items.style.left = -((accNum + 1) * slideSize) + "px";
      index = accNum;

      allowShift = false;
      checkIndex();
   }
  }
    
  function checkIndex(){
    if (index == -1) {
      items.style.left = -(1 * slideSize) + "px"; // switch to make endless
      index = 0;
    } else if (index == slidesLength) {
      items.style.left = -(slidesLength * slideSize) + "px"; // switch to make endless
      index = 4;
    }

    //accordion(index);
    slideIndicator(index);
  }
  
  function transitionEnded(){
    items.classList.remove('shifting');
    allowShift = true;
  }
}

function slideIndicator(id) {
  for (var i = 0; i < 5; i++) {
    indicator.children[i].classList.remove('active');
  } 

  indicator.children[id].classList.add('active');
}