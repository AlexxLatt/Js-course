const postData = async (url, data) => {// сдесь мы создаем функцию в которой через fetch будем отправлять данные на db.json
    let res = await fetch(url, {  // async и await нужен что бы мы подождали (await) отправки данных
        method: "POST",// метод (отправки)
        headers: {
            'Content-Type': 'application/json' // заголовок 
        },
        body: data // то что отправляем
    });

    return await res.json();//возвращает Объект 
};

    
const getRes = async (url) => { // создали функцию в которой есть fetch и аргумент в виде url 
    const res = await fetch(url)// создали промис из fetch

    if(!res.ok){// показывает что промис выдал сбой в подключении
        throw new Error(`Could not fetch ${url}, status ${res.status}`);// ошибка где есть url и код ошибки throw (возвращает то что там было)
    }
    
    return await res.json();// сдесь если не произошло сбоев то мы возращаем полученый json и сразу парсим его в объект 
};


export {postData};
export {getRes};