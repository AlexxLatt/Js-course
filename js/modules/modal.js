function closeModal(modalSelector){ // закрытие окна
    const  modalTriger = document.querySelector( modalSelector);
    modalTriger.classList.toggle("show"); 
    document.body.style.removeProperty("overflow");
}
function openModal(modalSelector, modalTimerId){// открытие окна
    const  modalTriger = document.querySelector( modalSelector);
    modalTriger.classList.add('show');
    modalTriger.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if(modalTimerId){
        clearInterval();
    }

    clearInterval(modalTimerId); // когда откроется окно больше оно не будет вылезать по таймеру
}

function modal(triggerSelector, modalSelector, modalTimerId){
     //Modal

     const  modalTriger = document.querySelector( modalSelector);
     const btns = document.querySelectorAll(triggerSelector);
 
   
 
     
 
     
 
 
     btns.forEach(btn => { //перебрали кнопки и дали им при клике событие openModal()
         btn.addEventListener("click", () =>  openModal(modalSelector, modalTimerId));
         });
 
 
 
 
     modalTriger.addEventListener("click", (event) => {
         if (event.target === modalTriger || event.target.getAttribute("data-close") == '') { // здесь мы закрываем окно если мы нажмем мышкой на класс .modal или если мы нажмем на крестик у каторого есть data атрибут data-close и он равен "" (это нужно ради значения thue для проверки)
             closeModal(modalSelector);
         }
     });
     
 
 
     document.addEventListener("keydown", (e)=>{
 
         if(e.code ==="Escape" && modalTriger.classList.contains('show')){ // при нажатии на Escape окно закрывается 
             closeModal(modalSelector);
 
         }
 
 
     });
 
     
 
 
     function showModalByScroll(){
         if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight ) // высота прокрутки сайта + количество пикселей, которые видны на экране без прокрутки >= высоты всей страницы, включая ту часть, которая не видна из-за прокрутки
         {
             openModal(modalSelector,modalTimerId);
             window.removeEventListener('scroll', showModalByScroll); // удаление функции что бы она не повторилась 1 раз 
 
         }
     }
 
 
     window.addEventListener('scroll', showModalByScroll);

}
export default modal;
export {closeModal};
export {openModal};