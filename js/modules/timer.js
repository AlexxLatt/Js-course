function timer(id, deadline){

        //timer


       

        // эта функция возвращает Объект разницы между настоящим и будущим времени
        function getTimeRamaining(endtime){
            let days, hours, minutes,seconds;
            const t = Date.parse(endtime) - Date.parse(new Date());
    
            if(t<= 0 ){ // часть которая выводит нули если deadline уже прошел а не отрицательное значение 
                days =0;
                hours =0;
                minutes = 0;
                seconds = 0
            }
            else{
    
                days = Math.floor(t/ (1000 *60 *60*24)), // округляем все числа в меньшею степень тк нам нужно точное время в каждой переменной 
                hours = Math.floor((t / (1000*60*60)) % 24), 
                minutes = Math.floor((t/1000/60)%60),
                seconds = Math.floor ((t/1000)%60);
            }
    
                 
            
            return { //возравщаем объект
                "total": t,
                "days": days,
                "hours": hours,
                "minutes": minutes,
                "seconds": seconds
            }
        }
        
        function getZero(num){//функци нужна для того что бы в таймере был еще и 0 если цифра меньше 10
            if(num >= 0 && num <10){
                return `0${num}`;
            }else{
                return num;
            }
        }
    
    
        function secClock(selector, endtime){
            const timer = document.querySelector(selector),
                  // переменные для того что бы в них были наше время 
                  days = timer.querySelector("#days"),
                  hours = timer.querySelector("#hours"),
                  minutes = timer.querySelector("#minutes"),
                  seconds = timer.querySelector("#seconds"),
    
                  timeInterval = setInterval(updateClock,1000); // повторяем метод updateClock каждую секунду
        
            updateClock();// спецальный код что бы не вылизала верстка тк как у нас интервал в 1с то прогрузка таймера тоже 1с этот код решает эту проблему    
            function updateClock() {
                const t = getTimeRamaining(endtime);// получаем разницу во времени для таймера (объект с данными)
                
                // вставляем данные через innerHTML
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
    
                if(t<=0)// проверка на то что заданое время для таймера может быть меньше чем настоящие 
                {
                    clearInterval(timeInterval); //остановка таймера а именно метода timeInterval
                }
            }
    
               
        }
        secClock(id ,deadline); // включаем таймер

}
export default timer;