function slider({container,slide,prevArrow,nextArrow,totalCounter,currentCounter,wrapper,field}){
    //  Sliders

    let offset = 0;
	let slideIndex = 1;

	const slides = document.querySelectorAll(slide),//НАШИ СЛАЙДЫ 
        slider  = document.querySelector(container),// СЛАЙД
		prev = document.querySelector(prevArrow),// КНОПКА НАЗАД
		next = document.querySelector(nextArrow),// КНОПКА ВПЕРЕД
		total = document.querySelector(totalCounter),// СКОЛЬКО ВСЕГО СЛАЙДОВ
		current = document.querySelector(currentCounter),// НА КАКОМ СЛАЙДЕ МЫ НАХОДИМСЯ 
		slidesWrapper = document.querySelector(wrapper),// РОДИТЕЛЬСКИЙ КЛАСС
		width = window.getComputedStyle(slidesWrapper).width,// МЫ ВЗЯЛ ШИРИНУ ИЗ РОДИТЕЛЬСКОГО КЛАССА
		slidesField = document.querySelector(field);// WRAPPER ПОД РОДИТЕЛЬСКИМ КЛАССОМ ДЛЯ ПРОКРУТКИ СЛАЙДОВ 

	if (slides.length < 10) {// ЗДЕСЬ ЕСЛИ КОЛ-ВО СЛАЙДОВ МЕНЬШЕ 10 ТО МЫ ПИШЕМ ПЕРЕД ЦИФРОЙ 0
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else { // В ДРУГОМ СЛУЧАЕ МЫ ПИШЕМ КОЛ-ВО СЛАЙДОВ БЕЗ 0
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	slidesField.style.width = 100 * slides.length + "%";// ДАЕМ ЭЛЕМЕНТУ WRAPPER ШИРИНУ ИЗ РОДИТЕЛЬСКОГО КЛАССА
	slidesField.style.display = "flex"; // СТАВИМ ДИСПЛЕЙ ФЛЕКС
	slidesField.style.transition = "0.5s all";// АНИМАЦИЮ ДЕЛАЕМ ПЛАВНОЙ 

	slidesWrapper.style.overflow = "hidden";// СВОЙСТО КОТОРОЕ ДАЕТ НАМ ВИДЕТЬ СЛАЙД ТОЛЬКО В НЕМ 

	slides.forEach((slide) => { // ДЕЛАЕМ ШИРИНУ СЛАЙДОВ КОТОРОЯ НАМ НУЖНА 
		slide.style.width = width;
	});


    function Delpx (item){
        return +item.replace(/\D/g,"");
    };


    slider.style.position = "relative";// ДАЕМ РОД КЛАССУ ПОЗИШН РЕЛАТИВ 

    const indicators = document.createElement("ol"),//  СОЗДАЕМ РОД КЛАСС ПОД  ТОЧКИ НАВИГАЦИИ СЛАЙДА 
        dots = [];
    // indicators.classList.add("carousel-indicators");
    indicators.style.cssText =`

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

    slider.append(indicators);// ВСТАВЛЯЕМ В КОНЕЦ СЛАЙДОВ

    for(let i = 0;  i<slides.length ; i++)
    {
        const dot = document.createElement("li");// ТУТ НАШИ ТОЧКИ
        dot.setAttribute("data-slide-to",i+1); // ЭТОТ АТРУБУТ НУЖЕН ЧТО БЫ ПЕРЕХОДИТЬ ПОТОМ НА НУЖНЫЙ СЛАЙД
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

        if(i == 0){// ДАЕМ ПЕРВОЙ ТОЧКИ ПОДСВЕЧЕВАНИЕ 
            dot.style.opacity = 1;
        }

        indicators.append(dot);// ВСТАВЛЯЕМ ТОЧКИ В РОД КЛАСС
        dots.push(dot);// ТОЧКИ ЗАПИХИВАЕМ В МАССИВ ЧТО БЫ ПОТОМ МОЖНО БЫЛО ВЗЯТЬ НУЖНУЮ ПО ИНДЕКСУ
    }


    function dotsEnum (item){
        item.forEach(dot => dot.style.opacity = '.5');// перебираем все точки и ставим opacity = '.5'
        item[slideIndex-1].style.opacity = "1";// сдесь точку берем по индексу и делаем opacity = '1'
    };

	next.addEventListener("click", () => { 
		if (offset == Delpx(width) * (slides.length - 1)) { // тут регуляроное выражение на то что мы удаляем все кроме цифр также СДЕСЬ ЕСЛИ offset РАВЕН  НА КОЛ ВО СЛАЙДОВ - 1 УМНОЖЕННОЕ НА 500 
			offset = 0; //  ТО offset равен 0 переход от последного к превому слайду 
		} else {
			offset += Delpx(width); // иначе мы просто плюсуем + 500
		}

		slidesField.style.transform = `translateX(-${offset}px)`; // слайд едет в право

		if (slideIndex == slides.length) { // код с текством и щечиком
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) { // ставим 04 елси слайдов меньше 10
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




    dots.forEach(dot=> { // сдесь при клике мы должны переходить на нужный слайд
        dot.addEventListener('click',(e)=>{ 
            const slideTo = e.target.getAttribute("data-slide-to"); // БЕРЕМ АТРИБУТ У ТОЧКИ


            slideIndex = slideTo;// ОТДАЕМ ЕГО В ИНДЕКС
            offset = Delpx(width) * (slideTo - 1);// 500 УМНОЖАЕМ НА SLIDE TO
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

export default slider;