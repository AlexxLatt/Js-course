/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  //Calc

  const result = document.querySelector(".calculating__result span");
  let sex, height, weight, age, ratio;
  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    sex = localStorage.setItem('sex', 'female');
  }
  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    sex = localStorage.setItem('ratio', 1.375);
  }
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute('id') === localStorage.getItem("sex")) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-ratio') === localStorage.getItem("ratio")) {
        elem.classList.add(activeClass);
      }
    });
  }
  initLocalSettings('#gender', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active');
  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "_____";
      return;
    }
    if (sex === "female") {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }
  calcTotal();
  function getStaticInformation(parentSelectot, activeClass) {
    const elements = document.querySelectorAll(`${parentSelectot} div`);
    elements.forEach(elem => {
      elem.addEventListener('click', e => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem('ration', +e.target.getAttribute("data-ratio"));
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem('sex', e.target.getAttribute("id"));
        }
        console.log(ratio, sex);
        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }
  getStaticInformation('#gender', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
  function getDynamicInforamtion(selector) {
    const input = document.querySelector(selector);
    if (input.value.match(/\D/g)) {
      input.style.border = '1px solid red';
    } else {
      input.style.border = 'none';
    }
    input.addEventListener('input', () => {
      switch (input.getAttribute("id")) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }
  getDynamicInforamtion("#height");
  getDynamicInforamtion("#weight");
  getDynamicInforamtion("#age");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards() {
  //Используем классы для карточек 

  class MenuCard {
    // класс для карточек

    constructor(src, alt, title, descr, price, parentSelectot, ...classes) {
      // параметры которые мы будем вводить при создании объекта по этой обложке (класса)

      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.transafer = 27; // курс для валюты можно просто так поставить без внешних данных из конструктора
      this.classes = classes; // массив конструктора для новых знач 
      this.parent = document.querySelector(parentSelectot); // элемент куда наша карточка будет добавлена
      this.changeToUAH(); // при запуске будет запущена эта функция которая поменяет значение у this.price перемножив  this.price с this.transafer
    }

    changeToUAH() {
      // конвертируем валюты 
      this.price = this.price * this.transafer;
    }
    render() {
      // метод для верстки наших данных  на сайт
      const element = document.createElement("div"); // создаем элемент
      if (this.classes.length === 0) {
        // если нет классов
        this.element = "menu__item"; // то мы берем класс menu__item
        element.classList.add(this.element); // и добавляем в наш  элемент
      } else {
        this.classes.forEach(className => element.classList.add(className)); // перебор массива а так же мы каждый элемент переименовываем под className и добавляем в div
      }

      element.innerHTML = `          
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`; // здесь с помощью innerHTML мы создали структуры с классами и тегами и поместили наши данные в них

      this.parent.append(element); // добавляем карточку в нутрь класса (в конец класса)
    }
  }

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getRes)("http://localhost:3000/menu") // делаем запрос по url(server-json) на db.json 
  .then(data => {
    // делаем fetch в которой лямбда функция 
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      //тут идет деструктаризация объекта на нужные нам свойства через forEach тк объект не один
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // теперь мы обращаемся к классу MenuCard И вставляем полученые данные в переменные и после запускаем метод render()
    });
  });

  // new MenuCard(
  //     "img/tabs/vegy.jpg",
  //     "vegy",
  //     'Меню "Фитнес"',
  //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //     120,
  //     '.menu .container'

  // ).render(); // здесь мы дали данные для рендера и получили новую карточку 
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);
  const message = {
    // эти текста будут выводиться на сайт при нажатии на кнопку и при разном расскладе загрузки данных
    loading: "img/form/spinner.svg",
    success: 'Спасибо мы скоро с вами свяжемся!',
    failure: 'Что-то пошло не так...',
    null: " "
  };
  forms.forEach(item => bindpostData(item));
  function bindpostData(form) {
    form.addEventListener("submit", e => {
      // событие срабатывает каждый раз когда  мы пытаемся отправить какую-то форму
      // если кнопка задана тегом button то у нее уже есть отправка формы  submit
      e.preventDefault();
      const statusMassage = document.createElement('img'); // создали элемент
      statusMassage.src = message.loading; // пометели эту часть как загрузку
      statusMassage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement("afterend", statusMassage); //добавили форму в конец наш элемент  

      // const request = new XMLHttpRequest();// поключаем серверную часть 
      // request.open("POST","server.php"); // сделали метотод POST отправка данных  в server.php

      // request.setRequestHeader("Content-type","multipart/form-data")// установка заголовка запроса в объекте 
      //ВАЖНО!!!!!!!!!! строчка ↑↑↑ не работает вместе с new FormData
      // тк  FormData уже делает заголовки для данных 

      // request.setRequestHeader("Content-type","aplication/json");// это заголовок для JSON файла 

      const formData = new FormData(form); // сделали из нашей формы тип FormData благодяря этому можно эти данные сразу отправить 
      // !ВАЖНО В форме в input-(ах) должны быть поля name иначе будет ошибка 
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      // const object = {};

      // formData.forEach(function(value,key){
      //     object[key] = value;
      // });//это мы перебрали объект FormData для того что бы преобразовать его в простой объект для JSON

      // const json = JSON.stringify(object);

      // request.send(formData);//отправка данных через FormData                                         

      // request.send(json); //отправка данных через JSON

      // fetch("server.php",{

      //     method: "POST",
      //     // headers:{ "Content-type":"aplication/json"

      //     // },
      //     body: formData

      //  }).then(data => data.text())
      //  .then(data =>{

      //     console.log(data);
      //     showThanksModal(message.success);
      //     form.reset();// сбрасываем значения в input полях после отправки формы
      //     statusMassage.remove();

      //  }).catch(()=>{
      //     showThanksModal(message.failure);
      //  }).finally(()=>{
      //     form.reset();// сбрасываем значения в input полях после отправки формы
      //  });

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json) //Метод postData (url, данные из объекта)      
      .then(data => {
        // если все сработает то мы выводим форму с success текстом  
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        // если не сработает то выводит ошибку с формой (что то пошло не так )
        console.error('Error during request:', error);
        showThanksModal(message.failure);
      }).finally(() => {
        //здесь мы очищаем форму
        form.reset();
      });

      // request.addEventListener("load",()=>{ // событие при загрузки наших данных на сервер

      //     if(request.status === 200){// код 200 говорит что все прошло успешно 
      //         console.log(request.response);
      //         showThanksModal(message.success)
      //         form.reset();// сбрасываем значения в input полях после отправки формы
      //         statusMassage.remove();

      //     }
      //     else{
      //         showThanksModal(message.failure);
      //     }

      // });
    });
  }

  function showThanksModal(message) {
    // функция на появления доп модал окна с надписью о отправленных данных 
    const prevModalDialog = document.querySelector(".modal__dialog"); // это элемент 1 модального окна с 2 input-(ами)
    prevModalDialog.classList.add('hide'); // мы прячем его тк мы не хотим его видеть после нажатия на кнопку 
    prevModalDialog.classList.remove("show"); //при повторном внесении данных что бы окно не оставалось
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimerId); // открываем родителя окона .modal__dialog

    const thanksModal = document.createElement("div"); // создаем 2 модальное окно
    thanksModal.classList.add("modal__dialog"); // даем ему класс
    thanksModal.innerHTML = ` 
            <div class="modal__content">
              <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            
            </div>

        
        `; // даем ему содержимое ввиде крестика и тектса который будет выводиться через аргумент функции

    document.querySelector('.modal').append(thanksModal); // Добавляем новое окно в наш родительский класс для модальных окон
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
    }, 4000); // через 4с окно удалиться из кода а так же у 1 окна уберется тег hide и добавиться show ну родительский класс для модальных окон закроется
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
  // закрытие окна
  const modalTriger = document.querySelector(modalSelector);
  modalTriger.classList.toggle("show");
  document.body.style.removeProperty("overflow");
}
function openModal(modalSelector, modalTimerId) {
  // открытие окна
  const modalTriger = document.querySelector(modalSelector);
  modalTriger.classList.add('show');
  modalTriger.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval();
  }
  clearInterval(modalTimerId); // когда откроется окно больше оно не будет вылезать по таймеру
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  //Modal

  const modalTriger = document.querySelector(modalSelector);
  const btns = document.querySelectorAll(triggerSelector);
  btns.forEach(btn => {
    //перебрали кнопки и дали им при клике событие openModal()
    btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));
  });
  modalTriger.addEventListener("click", event => {
    if (event.target === modalTriger || event.target.getAttribute("data-close") == '') {
      // здесь мы закрываем окно если мы нажмем мышкой на класс .modal или если мы нажмем на крестик у каторого есть data атрибут data-close и он равен "" (это нужно ради значения thue для проверки)
      closeModal(modalSelector);
    }
  });
  document.addEventListener("keydown", e => {
    if (e.code === "Escape" && modalTriger.classList.contains('show')) {
      // при нажатии на Escape окно закрывается 
      closeModal(modalSelector);
    }
  });
  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)
      // высота прокрутки сайта + количество пикселей, которые видны на экране без прокрутки >= высоты всей страницы, включая ту часть, которая не видна из-за прокрутки
      {
        openModal(modalSelector, modalTimerId);
        window.removeEventListener('scroll', showModalByScroll); // удаление функции что бы она не повторилась 1 раз 
      }
  }

  window.addEventListener('scroll', showModalByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
  container,
  slide,
  prevArrow,
  nextArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field
}) {
  //  Sliders

  let offset = 0;
  let slideIndex = 1;
  const slides = document.querySelectorAll(slide),
    //НАШИ СЛАЙДЫ 
    slider = document.querySelector(container),
    // СЛАЙД
    prev = document.querySelector(prevArrow),
    // КНОПКА НАЗАД
    next = document.querySelector(nextArrow),
    // КНОПКА ВПЕРЕД
    total = document.querySelector(totalCounter),
    // СКОЛЬКО ВСЕГО СЛАЙДОВ
    current = document.querySelector(currentCounter),
    // НА КАКОМ СЛАЙДЕ МЫ НАХОДИМСЯ 
    slidesWrapper = document.querySelector(wrapper),
    // РОДИТЕЛЬСКИЙ КЛАСС
    width = window.getComputedStyle(slidesWrapper).width,
    // МЫ ВЗЯЛ ШИРИНУ ИЗ РОДИТЕЛЬСКОГО КЛАССА
    slidesField = document.querySelector(field); // WRAPPER ПОД РОДИТЕЛЬСКИМ КЛАССОМ ДЛЯ ПРОКРУТКИ СЛАЙДОВ 

  if (slides.length < 10) {
    // ЗДЕСЬ ЕСЛИ КОЛ-ВО СЛАЙДОВ МЕНЬШЕ 10 ТО МЫ ПИШЕМ ПЕРЕД ЦИФРОЙ 0
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    // В ДРУГОМ СЛУЧАЕ МЫ ПИШЕМ КОЛ-ВО СЛАЙДОВ БЕЗ 0
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }
  slidesField.style.width = 100 * slides.length + "%"; // ДАЕМ ЭЛЕМЕНТУ WRAPPER ШИРИНУ ИЗ РОДИТЕЛЬСКОГО КЛАССА
  slidesField.style.display = "flex"; // СТАВИМ ДИСПЛЕЙ ФЛЕКС
  slidesField.style.transition = "0.5s all"; // АНИМАЦИЮ ДЕЛАЕМ ПЛАВНОЙ 

  slidesWrapper.style.overflow = "hidden"; // СВОЙСТО КОТОРОЕ ДАЕТ НАМ ВИДЕТЬ СЛАЙД ТОЛЬКО В НЕМ 

  slides.forEach(slide => {
    // ДЕЛАЕМ ШИРИНУ СЛАЙДОВ КОТОРОЯ НАМ НУЖНА 
    slide.style.width = width;
  });
  function Delpx(item) {
    return +item.replace(/\D/g, "");
  }
  ;
  slider.style.position = "relative"; // ДАЕМ РОД КЛАССУ ПОЗИШН РЕЛАТИВ 

  const indicators = document.createElement("ol"),
    //  СОЗДАЕМ РОД КЛАСС ПОД  ТОЧКИ НАВИГАЦИИ СЛАЙДА 
    dots = [];
  // indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `

        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;


    `; //ПИШЕМ CSS СВОЙСТВА РОД КЛАССА

  slider.append(indicators); // ВСТАВЛЯЕМ В КОНЕЦ СЛАЙДОВ

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li"); // ТУТ НАШИ ТОЧКИ
    dot.setAttribute("data-slide-to", i + 1); // ЭТОТ АТРУБУТ НУЖЕН ЧТО БЫ ПЕРЕХОДИТЬ ПОТОМ НА НУЖНЫЙ СЛАЙД
    dot.style.cssText = `

        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;

        `; // CSS  СВОЙСТВА 

    if (i == 0) {
      // ДАЕМ ПЕРВОЙ ТОЧКИ ПОДСВЕЧЕВАНИЕ 
      dot.style.opacity = 1;
    }
    indicators.append(dot); // ВСТАВЛЯЕМ ТОЧКИ В РОД КЛАСС
    dots.push(dot); // ТОЧКИ ЗАПИХИВАЕМ В МАССИВ ЧТО БЫ ПОТОМ МОЖНО БЫЛО ВЗЯТЬ НУЖНУЮ ПО ИНДЕКСУ
  }

  function dotsEnum(item) {
    item.forEach(dot => dot.style.opacity = '.5'); // перебираем все точки и ставим opacity = '.5'
    item[slideIndex - 1].style.opacity = "1"; // сдесь точку берем по индексу и делаем opacity = '1'
  }
  ;
  next.addEventListener("click", () => {
    if (offset == Delpx(width) * (slides.length - 1)) {
      // тут регуляроное выражение на то что мы удаляем все кроме цифр также СДЕСЬ ЕСЛИ offset РАВЕН  НА КОЛ ВО СЛАЙДОВ - 1 УМНОЖЕННОЕ НА 500 
      offset = 0; //  ТО offset равен 0 переход от последного к превому слайду 
    } else {
      offset += Delpx(width); // иначе мы просто плюсуем + 500
    }

    slidesField.style.transform = `translateX(-${offset}px)`; // слайд едет в право

    if (slideIndex == slides.length) {
      // код с текством и щечиком
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    if (slides.length < 10) {
      // ставим 04 елси слайдов меньше 10
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
    dotsEnum(dots);
  });
  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = Delpx(width) * (slides.length - 1);
    } else {
      offset -= Delpx(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
    dotsEnum(dots);
  });
  dots.forEach(dot => {
    // сдесь при клике мы должны переходить на нужный слайд
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute("data-slide-to"); // БЕРЕМ АТРИБУТ У ТОЧКИ

      slideIndex = slideTo; // ОТДАЕМ ЕГО В ИНДЕКС
      offset = Delpx(width) * (slideTo - 1); // 500 УМНОЖАЕМ НА SLIDE TO
      slidesField.style.transform = `translateX(-${offset}px)`;
      dotsEnum(dots);
      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }
    });
  });
  //Slider 2
  // showSlides(slideIndex); // метод что бы с запуска сайта слайды были в на индексе 1

  // if(slides.length <10){ // cдесь если слайдов меньше  чем 10 то в верху будет 04 а не 4
  //     total.textContent =`0${slides.length}`;
  // }else{

  //     total.textContent = slides.length;

  // }

  // function showSlides(n){ // свойство каторое скрывает все слайды кроме слайда по индексу
  //     if(n>slides.length){ // если мы тыкнем дальше максимального слайда придем к начальному
  //         slideIndex = 1;
  //     }
  //     if(n<1){ // тут наоборт к максимальному
  //         slideIndex = slides.length;
  //     }
  //     slides.forEach(item=> item.style.display = "none" ); // скрываем слайды

  //     slides[slideIndex-1].style.display = "block";// оставдяем слайд с индексом -1 тк у нас слайды начинаются с 0 

  //     if(slides.length <10){ // здесь если число слайда меньше будет писаться 01...02 
  //        current.textContent =`0${slideIndex}`;
  //     }else{

  //         total.textContent = slideIndex;

  //     }
  // }

  // function plusSlides(n){// тут мы делаем свойство которое будет принимать индекс 
  //     showSlides(slideIndex +=n)
  // }

  // prev.addEventListener("click", ()=> {// стрелка назад убавляет индекс на 1
  //     plusSlides(-1);        
  // });

  // next.addEventListener("click", ()=> { // стрелка вперед прибовляет индекс на 1
  //     plusSlides(1);        
  // });

  //Slider 2
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  //tabs
  const tabs = document.querySelectorAll(tabsSelector),
    //
    tabsContent = document.querySelectorAll(tabsContentSelector),
    //
    tabsParent = document.querySelector(tabsParentSelector); //

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.style.display = 'none';
    });
    tabs.forEach(tab => {
      tab.classList.remove(activeClass);
    });
  }
  function showTabContent(i = 0) {
    tabsContent[i].style.display = "block";
    tabs[i].classList.add(activeClass);
  }
  hideTabContent();
  showTabContent();
  console.dir(tabs);
  tabsParent.addEventListener("click", event => {
    const target = event.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
  //timer

  // эта функция возвращает Объект разницы между настоящим и будущим времени
  function getTimeRamaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    if (t <= 0) {
      // часть которая выводит нули если deadline уже прошел а не отрицательное значение 
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      // округляем все числа в меньшею степень тк нам нужно точное время в каждой переменной 
      hours = Math.floor(t / (1000 * 60 * 60) % 24), minutes = Math.floor(t / 1000 / 60 % 60), seconds = Math.floor(t / 1000 % 60);
    }
    return {
      //возравщаем объект
      "total": t,
      "days": days,
      "hours": hours,
      "minutes": minutes,
      "seconds": seconds
    };
  }
  function getZero(num) {
    //функци нужна для того что бы в таймере был еще и 0 если цифра меньше 10
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function secClock(selector, endtime) {
    const timer = document.querySelector(selector),
      // переменные для того что бы в них были наше время 
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000); // повторяем метод updateClock каждую секунду

    updateClock(); // спецальный код что бы не вылизала верстка тк как у нас интервал в 1с то прогрузка таймера тоже 1с этот код решает эту проблему    
    function updateClock() {
      const t = getTimeRamaining(endtime); // получаем разницу во времени для таймера (объект с данными)

      // вставляем данные через innerHTML
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      if (t <= 0)
        // проверка на то что заданое время для таймера может быть меньше чем настоящие 
        {
          clearInterval(timeInterval); //остановка таймера а именно метода timeInterval
        }
    }
  }

  secClock(id, deadline); // включаем таймер
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRes: () => (/* binding */ getRes),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  // сдесь мы создаем функцию в которой через fetch будем отправлять данные на db.json
  let res = await fetch(url, {
    // async и await нужен что бы мы подождали (await) отправки данных
    method: "POST",
    // метод (отправки)
    headers: {
      'Content-Type': 'application/json' // заголовок 
    },

    body: data // то что отправляем
  });

  return await res.json(); //возвращает Объект 
};

const getRes = async url => {
  // создали функцию в которой есть fetch и аргумент в виде url 
  const res = await fetch(url); // создали промис из fetch

  if (!res.ok) {
    // показывает что промис выдал сбой в подключении
    throw new Error(`Could not fetch ${url}, status ${res.status}`); // ошибка где есть url и код ошибки throw (возвращает то что там было)
  }

  return await res.json(); // сдесь если не произошло сбоев то мы возращаем полученый json и сразу парсим его в объект 
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");








window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)(".modal", modalTimerId), 3000); // тамер для окна с интервалом открытия в 3с

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimerId);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(".timer", "2024-06-11");
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])("form", modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"
  });

  // fetch("http://localhost:3000/menu")
  // .then(data => data.json())
  // .then(res => console.log(res));
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map