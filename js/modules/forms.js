import { closeModal } from "./modal";
import { openModal } from "./modal";
import {postData} from "../services/services";
 
function forms(formSelector ,modalTimerId) {

    const forms = document.querySelectorAll(formSelector);
    
    const message = { // эти текста будут выводиться на сайт при нажатии на кнопку и при разном расскладе загрузки данных
        loading : "img/form/spinner.svg",
        success : 'Спасибо мы скоро с вами свяжемся!',
        failure : 'Что-то пошло не так...',
        null : " "
    };

   

    forms.forEach(item => bindpostData(item));





    function bindpostData (form){

        form.addEventListener("submit", (e)=>{ // событие срабатывает каждый раз когда  мы пытаемся отправить какую-то форму
                                              // если кнопка задана тегом button то у нее уже есть отправка формы  submit
            e.preventDefault();

            const statusMassage = document.createElement('img');// создали элемент
            statusMassage.src = message.loading;// пометели эту часть как загрузку
            statusMassage.style.cssText=`
                display: block;
                margin: 0 auto;
            `;  
           
            form.insertAdjacentElement("afterend",statusMassage)//добавили форму в конец наш элемент  
            
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
 
            
            postData('http://localhost:3000/requests', json)//Метод postData (url, данные из объекта)      
            .then(data => {// если все сработает то мы выводим форму с success текстом  
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {// если не сработает то выводит ошибку с формой (что то пошло не так )
                console.error('Error during request:', error);
                showThanksModal(message.failure);
            }).finally(() => {//здесь мы очищаем форму
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

    function showThanksModal(message){ // функция на появления доп модал окна с надписью о отправленных данных 
        const prevModalDialog = document.querySelector(".modal__dialog")// это элемент 1 модального окна с 2 input-(ами)
        prevModalDialog.classList.add('hide');// мы прячем его тк мы не хотим его видеть после нажатия на кнопку 
        prevModalDialog.classList.remove("show");//при повторном внесении данных что бы окно не оставалось
        openModal(".modal",modalTimerId);// открываем родителя окона .modal__dialog

        const thanksModal = document.createElement("div");// создаем 2 модальное окно
        thanksModal.classList.add("modal__dialog");// даем ему класс
        thanksModal.innerHTML=` 
            <div class="modal__content">
              <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            
            </div>

        
        `;// даем ему содержимое ввиде крестика и тектса который будет выводиться через аргумент функции

        document.querySelector('.modal').append(thanksModal);// Добавляем новое окно в наш родительский класс для модальных окон
        setTimeout(()=>{

            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal(".modal");
        },4000); // через 4с окно удалиться из кода а так же у 1 окна уберется тег hide и добавиться show ну родительский класс для модальных окон закроется
    }




}
export default forms;