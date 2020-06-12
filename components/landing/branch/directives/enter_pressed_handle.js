export default{
    bind(el,binding){

        el.enterPressedHandle = function(e){
            if(e.keyCode == 13){
                binding.value();
            }
        }


        window.addEventListener('keyup',el.enterPressedHandle)
    },
    unbind(el,binding){
        window.removeEventListener('keyup',el.enterPressedHandle);
    }
}