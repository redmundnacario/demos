// returns bool
export const getClassListIncludes = function(ElementId, className){
    return document.getElementById(ElementId).classList.value.includes(className);
};



// set innerHTML
export const setInnerHtml = function(ElementId, InputString){
    document.getElementById(ElementId).children[0].innerHTML = InputString;
};