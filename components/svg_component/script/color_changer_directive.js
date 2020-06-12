export default {
    bind(el,binding){
       

        changeColorEvent(el,binding.value);
    },
    update(el,binding){
        changeColorEvent(el,binding.value);
    },
}
function changeColorEvent(element,bindingValue){
    /*element.style.stroke = bindingValue;*/
    element.style.fill = bindingValue;
    console.log(element,bindingValue);
}