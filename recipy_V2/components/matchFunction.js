export default matchFunction = (ingredient, list) => {
    let result = [];
    let check = false;
    for(let i = 0; i < list.length; i++){
        for(let j = 0; j < ingredient.length; j++){
            if(ingredient[j] != list[i].name[j]){
                check = false;
                break;
            } else {
                check = true;
            }
        }
        if(check){
           result.push(list[i]); 
           check = false; 
        }
    }
    return result;
}