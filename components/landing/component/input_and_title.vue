<template>
    <div class="wrapper"  v-input-area-typing>   
        <div class="title">{{inputTitle}}:</div>
        <input :type="inputType" class="input-area" :placeholder="placeholderText" required v-model="getValue">
    </div>
</template>

<script>
export default {
    props:['placeholderText','inputTitle'],
    computed:{
        inputType(){
            return this.inputTitle == "password" ? 'password' : 'text';
        },

    },
    data(){
        return{
            getValue:''
        }
    },
    watch:{
       getValue(){
            this.$emit('receivedData',{type:this.inputTitle,data:this.getValue});//emit value inside the input area
       }
    },
    directives:{
        'input-area-typing':{
            bind(el,binding){
                el.children[1].addEventListener('focus',styleChangerIn);
                el.children[1].addEventListener('focusout',styleChangerOut);
   

                function styleChangerIn(){
                    el.style.setProperty('--main-color','var(--light-blue)');
                    el.style.opacity = 1;
                }//change input border and title color
                 function styleChangerOut(){
                    el.style.setProperty('--main-color','white');
                    el.style.opacity = 0.75;
                }//change input border and title color to default     
            },

        },

    }      
}
</script>

<style scoped>
.wrapper{
    opacity: 0.75;

    --main-color:white;
}
.title{
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 0.35rem;
    color: var(--main-color);
}
.input-area{
    background: transparent;
    border: 1px solid var(--main-color);
    outline: none;

    color: white;
    width: 100%;
    

    font-weight: 400;
    font-size: 1.25rem;

    padding: 0.1rem ;

    border-radius: 0;
}
.input-area:focus{
    
}
@media screen and (max-width: 1368px){
.input-area{

    padding: 0.1125rem ;
}
}
@media screen and (max-width: 550px){
.title{
    font-size: 1.65rem
}
.input-area{
    font-size: 1.35rem;
    padding: 0.15rem ;
}
}
</style>