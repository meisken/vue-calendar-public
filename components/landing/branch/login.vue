<template>
    <div class="container" v-enter-pressed-handler="commitLogin">

        <h1 class="title">Login</h1>

        <div class="input-container">
            <input-area placeholderText="" @receivedData="replaceData($event)" inputTitle="email"></input-area>
            <input-area placeholderText="" @receivedData="replaceData($event)" inputTitle="password" class="password-area"></input-area>
        </div>
        <div class="errMsg" v-if="errMsg != ''">{{ errMsg }}</div>
       
        <custom-btn class="login-btn" @onClick="commitLogin"><span slot="btn-name">log in</span></custom-btn>
        <span class="no-account-text" @click="$router.push('/resetPassword')">did you forget the password? click here</span>
        <!-- <go-back-arrow class="go-back-btn" @iconClicked="$router.push('/')"></go-back-arrow>-->
  
        
    </div>
</template>

<script>
import arrow from '../../svg_component/arrow-circle-fill.vue'
import btnTemplate from '../../template/vue-btton-template.vue'
import inputTemplate from '../component/input_and_title.vue'
import enterHandler from './directives/enter_pressed_handle.js'
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    directives:{
        'enter-pressed-handler':enterHandler
    },
    components:{
        'custom-btn':btnTemplate,
       // 'go-back-arrow':arrow,
        'input-area':inputTemplate
 
    },
    computed:{
        ...mapState([
            'loading'
        ]),
    },
    data(){
        return{
            user:{
                email:'',
                password:'',
            },
            errMsg:'',
            
        }
    },
    methods:{
        ...mapActions([
  
            'login'
        ]),
        ...mapMutations([
    
        ]),
        replaceData(inputValue){
          
        
            switch(inputValue.type){
              
                case 'email' :  this.user.email = inputValue.data;break;
                case 'password' : this.user.password = inputValue.data;break;
            }
 
        },//convert received data to local data
        commitLogin(){
     
            this.login(this.user).then(({state,msg}) => {
                this.errMsg = '';
                this.$router.push('/home');


              
            }).catch(({state,msg}) => {
                this.errMsg = msg;
            });
        
        },
        resetPassword(){
            
        }
    }
}
</script>

<style scoped>
.container{
    color: white;
    margin-left: 5vw;
    width: 21.5rem;
    margin-bottom: 4.25%;
   
}
.title{
    font-weight: 400;
    font-size: 2.5rem;
}
.input-container{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 9.25rem;

    
}
.errMsg{
    margin-top: 0.5rem;
    color: red;
    font-size: 1.075rem;
}
.login-btn{
    margin-top: 2.5rem;
    margin-bottom: 3.25rem;
    padding: 0.1rem 0 0.2rem 0;

    width: 100%;

    color: white;
    font-size: 1.25rem;

    background: var(--normal-blue);
    border-radius: 1px;
    
    transition: 0.2s linear;
}
.login-btn:hover{
    background: white;
    color: var(--normal-blue);
}
.no-account-text{
   
    cursor: pointer;
    
}
.no-account-text:hover{
    border-bottom: 1px solid white;
}
.go-back-btn{
    cursor: pointer;

    margin-top: 4.25rem;
    --icon-color:white;
    opacity: 0.6;
    width: 2.25rem;

}
.go-back-btn:hover{
    opacity:1;
    --icon-color:var(--normal-blue);
}
@media screen and (max-width:1368px){
.container{

    width: 23.5rem;

}

}
@media screen and (max-width:1024px){
.container{

    margin:0 3vw ;
    width: 40%;
    min-width: 23.5rem;
    margin-bottom: 10vh;
}   
}
@media screen and (max-width:768px){
.container{


    margin-bottom: 10vh;
}    
.errMsg{

    font-size: 1.115rem;
}
}
@media screen and (max-width:650px){
.container{


    width: 100%;
    height: 100%;
    min-width: 0rem;
    margin-bottom: 0vh;
}
.title{

    font-size: 2.75rem;
}
.input-container{

    height: 11rem;
    
}
.errMsg{

    font-size: 1.2rem;
}
.login-btn{
    margin-top: 2.75rem;
    margin-bottom: 3rem;
    padding: 0.2rem 0 0.3rem 0;
    font-size: 1.35rem;
}
.no-account-text{
   

    font-size: 1.35rem;
     border-bottom: 0.5px solid white;
    
}
.go-back-btn{


    margin-top: 3.75rem;
 
    opacity: 0.7;
    width: 2.75rem;

}
}
</style>