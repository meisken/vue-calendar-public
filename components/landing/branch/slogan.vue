<template>
    <div class="slogan-area">
        <h1 class="slogan">The time is always right to do what is right</h1>
        <span class="details">Time waits for no one. Catch the beauty of the moment. and living in efficient life</span>
        <div class="btn-wrapper">
            <custom-btn class="sign-up btn" @onClick="linkTo('/register')"><span slot="btn-name">sign up</span></custom-btn>
            <custom-btn class="sign-in btn" @onClick="linkTo('/login')"><span slot="btn-name">sign in</span></custom-btn>
        </div>
    </div>
</template>

<script>
import btnTemplate from '../../template/vue-btton-template.vue'
export default {
    components:{
        'custom-btn':btnTemplate 
    },
    methods:{
        linkTo(path){
   
            this.$router.push(path);
        }
    }
}
</script>

<style scoped>
.slogan-area{
    width: 40%;
    min-width: 30rem;
    max-width: 37.5rem;
    height: 22.5rem;

    color: white;
    margin-left: 4vw;

}
.slogan{
    margin: 0;
    padding: 0;

    font-weight: 500;
    font-size: 2.75rem;

    max-width: 30rem;
    margin-bottom: 1rem;
}
.details{
    opacity: 0.8;
    font-size: 1.5rem;
    font-weight: 300;

}
.btn-wrapper{
    margin-top: 2rem;
    display: flex;
}
.btn{
   padding: 0.1rem 3rem 0.2rem 3rem;
   border-radius: 2px;
   font-size: 1.35rem;
   font-weight: 400;

   transition:  0.2s linear background-color,0.2s linear color;

   
}
.btn.sign-up{
    background: var(--normal-blue);
    color: white;
    margin-right: 2.25rem;

}
.btn.sign-up:hover{
    background: white;
    color: var(--normal-blue);
}
.btn.sign-in{
    border: 1px solid var(--light-blue);
    color: var(--light-blue);
}
.btn.sign-in:hover{

    background: white;
    color: var(--normal-blue);
}
@media screen and (max-width:700px) {
.slogan-area{
    width: 100%;
    min-width: 0rem;
    height: 71.5%;

    margin-left: 0;

  

    padding: 0 2.5vw;


}
.slogan{

}
.details{
    display: block;
    max-width: 70%;
}
.btn-wrapper{

    margin-top: 2.5rem;
    flex-direction: column;

}
.btn{
   padding: 0.2rem 0rem 0.3rem 0rem;
   width: 50%;

   font-size: 1.35rem;
   margin-bottom: 0rem;


}
.btn.sign-up{

    margin-right: 0;

}


}
@media screen and (max-width:650px) {
.slogan-area{

    height: 80%;
    min-height: 0px;
    
   
    padding: 0 5vw;
    display: grid;
    grid-template-rows: minmax(0,auto) minmax(30%,auto)  36.5%;

}

.slogan{

    font-size: 2.9rem;
    margin-bottom: 0rem;
 


    max-width:100% ;

}
.details{
   
    font-size: 1.65rem;

    max-width:100% ;



}
.btn-wrapper{
    margin-top: 5%;
    flex-direction: column;
    justify-content: space-between;
}
.btn{

   width: 100%;
   font-size: 1.5rem;
   
   

}
}
@media screen and (max-width:450px) {
.slogan-area{

    height: 85%;
    grid-template-rows: minmax(0,auto) minmax(30%,auto)  32.5%;
}
.slogan{

    font-size: 2.775rem;
    margin-bottom: 0rem;
 


    max-width:95% ;


}

.details{
    font-size: 1.5rem;
    margin-top: 1.25rem;



}
}
</style>