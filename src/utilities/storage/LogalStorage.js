


export function setStorageObject (items){
 localStorage.setItem('items', JSON.stringify(items));
}

export function getStorageObject (){
    
    return JSON.parse(localStorage.getItem('items'));
}

export function deleteStorageObject (){
    localStorage.setItem('items', JSON.stringify({}));
}




    