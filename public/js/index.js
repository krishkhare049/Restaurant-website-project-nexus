let regist_form = document.getElementById("regist_form");
let login_form = document.getElementById("login_form");
let change_login = document.getElementById("change_login");
let change_signup = document.getElementById("change_signup");


change_signup.addEventListener('click', () => {
    
    // login_form.style.display = 'none';
    // regist_form.style.display = 'flex'
    swiper.slideNext();
});

change_login.addEventListener('click', () => {
    // login_form.style.display = 'flex'
    // regist_form.style.display = 'none';
    swiper.slidePrev();

});

var swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 30,
    // loop: true,

    effect: 'flip',
  
    pagination: {
      el: '.swiper-pagination',
    //   type: 'progressbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  
  
  