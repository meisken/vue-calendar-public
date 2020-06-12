export default {
  
           
        bind(el,binding){
            console.log();
            bindEventListener(el,binding.value);
            
        },
        update(el,binding) {
            bindEventListener(el,binding.value);
        },
        unbind(el){
            el.removeEventListener('mousemove', this.event);
            el.removeEventListener('mouseout', this.event);
        }
   
}
function bindEventListener(element,bindingValue){

    element.addEventListener('mousemove', mouseHovering);
    element.addEventListener('mouseout', mouseouted);

    function mouseHovering(){
        /*element.style.stroke = bindingValue[1];*/
        element.children[0].style.fill = bindingValue[1];
    }
    function mouseouted(){
        /*element.style.stroke = bindingValue[0];*/
        element.children[0].style.fill = bindingValue[0];
    }    

}