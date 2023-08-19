"use strict"

const swiper = new Swiper('.features__slider', {
  effect: 'flip',
  speed: '1000',
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },

  pagination: {
    el: '.features__slider-pagination',
    clickable: true,
    type: 'bullets',
    renderBullet: function (index, ClassName) {
      return `<span class="${ClassName}" width="39" height="15"></span>`;
    },
  },

  // Change the pagination view on the slider when changing slides
  on: {
    slideChange: function () {
      addBulletsStyle(bullets, swiper.visibleSlidesIndexes[0]);
    },
  }
});

// Change the pagination view on the slider

const bullets = swiper.pagination.bullets;
addBulletsStyle(bullets, swiper.visibleSlidesIndexes[0]);


function addBulletsStyle (bullet, id) {
  bullet.forEach((elem, ind) => {
   
    if(id < ind) {
      elem.style.transform = 'rotate(180deg)';
    } 
    if (id > ind){
      elem.style.transform = 'rotate(0)';
    }
  })
}

//animation immerse

const immerseBG = document.querySelector('.immerse');
const immerseTitle = document.querySelector('.immerse__title');

if(immerseBG) {
  window.addEventListener('scroll', () => {
    animOnScroll(immerseBG, 'animate', immerseTitle);
  })
}

//animation registr btn

const regBtns = document.querySelectorAll('.registration');

regBtns.forEach((regBtn) => {
  if(regBtn) {
    window.addEventListener('scroll', () => {
      animOnScroll(regBtn, 'animate');
    })
  }
})

//animation begin

function animOnScroll(item, activeClass, ...allElements) {
  const animItemHeight = item.offsetHeight;
  const animItemOffset = offset(item).top;
  const animStart = 100;
  
  let animItemPoint = window.innerHeight - animItemHeight / animStart;

  if(animItemHeight > window.innerHeight) {
    animItemPoint = window.innerHeight - window.innerHeight / animStart;
  }

  if((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
    item.classList.add(activeClass);
    addActiveClass(allElements, activeClass);
    
  } else {
    item.classList.remove(activeClass);
    removeActiveClass(allElements, activeClass);
  }
} 

function offset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.scrollX  || document.documentElement.scrollLeft,
    scrollTop = window.scrollY  || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function addActiveClass(allEl, activeClass) {
  if(allEl) {
      allEl.forEach(el => {
      el.classList.add(activeClass);
    })
  } 
}

function removeActiveClass(allEl, activeClass) {
  if(allEl) {
      allEl.forEach(el => {
      el.classList.remove(activeClass);
    })
  } 
}

// burger 

const burgerBtn = document.querySelector('.burger-btn');
const burgerMenu = document.querySelector('.burger');
const body = document.querySelector('#body');


burgerBtn.addEventListener('click', (e)=> {
  burgerBtn.classList.toggle(`${burgerBtn.classList[0]}--close`);
  burgerMenu.classList.toggle(`${burgerMenu.classList[0]}--active`);
  body.classList.toggle('lock');
})

body.addEventListener('click', (e)=> {
  if (e.target.classList.value == 'lock') {
    body.classList.remove('lock');
    burgerBtn.classList.remove(`${burgerBtn.classList[0]}--close`);
    burgerMenu.classList.remove(`${burgerMenu.classList[0]}--active`);
  }
})

// popup

const popupEl = document.querySelector('#popup');
const popupBtns = document.querySelectorAll('[data-popup]');

if(popupEl && popupBtns) {
  popupBtns.forEach(popupBtn => {
    popup(popupEl, popupBtn);
  })
}

function popup(popup, btn) {
  hide(popup);

  btn.addEventListener('click' , () => {
    const popupClose = document.querySelector('.popup__close');
    popup.classList.add(`${popup.classList[0]}--active`);
    show(popup);

    popup.addEventListener('click', (e) => {
      if (e.target == popup || e.target.classList[0] == popupClose.classList[0] ||
        e.target.classList[0] == popupClose.children[0].classList[0] || e.target.parentNode.classList[0] == popupClose.children[0].classList[0]) {
        popup.classList.remove(`${popup.classList[0]}--active`);
        hide(popup);
      }
    })
  })
}

function hide (elem) {
  elem.style.overflow = 'hidden';
  elem.style.maxHeight = '0';
}

function show (elem) {
  elem.style.overflow = 'visible';
  elem.style.maxHeight = '100%';
}






