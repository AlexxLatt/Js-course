import {getRes} from "../services/services";

function cards(){

    //Используем классы для карточек 
    
    class MenuCard{ // класс для карточек

        constructor(src,alt,title,descr,price,parentSelectot, ...classes){ // параметры которые мы будем вводить при создании объекта по этой обложке (класса)

            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transafer = 27; // курс для валюты можно просто так поставить без внешних данных из конструктора
            this.classes = classes; // массив конструктора для новых знач 
            this.parent = document.querySelector(parentSelectot);// элемент куда наша карточка будет добавлена
            this.changeToUAH(); // при запуске будет запущена эта функция которая поменяет значение у this.price перемножив  this.price с this.transafer


        }

        changeToUAH(){ // конвертируем валюты 
            this.price = this.price * this.transafer
        }

        render(){  // метод для верстки наших данных  на сайт
            const element = document.createElement("div");// создаем элемент
            if(this.classes.length === 0){ // если нет классов
                this.element = "menu__item" // то мы берем класс menu__item
                element.classList.add(this.element); // и добавляем в наш  элемент
            }
            else{
                this.classes.forEach (className => element.classList.add(className)); // перебор массива а так же мы каждый элемент переименовываем под className и добавляем в div
            }
     
            element.innerHTML = `          
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;  // здесь с помощью innerHTML мы создали структуры с классами и тегами и поместили наши данные в них
            


            this.parent.append(element); // добавляем карточку в нутрь класса (в конец класса)

        };
    }



    getRes("http://localhost:3000/menu") // делаем запрос по url(server-json) на db.json 
    .then((data) =>{// делаем fetch в которой лямбда функция 
        data.forEach(({img,altimg,title,descr,price}) => {//тут идет деструктаризация объекта на нужные нам свойства через forEach тк объект не один
            new MenuCard(img,altimg,title,descr,price,'.menu .container').render(); // теперь мы обращаемся к классу MenuCard И вставляем полученые данные в переменные и после запускаем метод render()
        })
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

export default cards;