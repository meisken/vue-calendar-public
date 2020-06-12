<template>
    <div class="container" v-enter-pressed-handler="commitRegister">

        <h1 class="title">Register</h1>

        <div class="input-container">
            <input-area placeholderText="" @receivedData="replaceData($event)" inputTitle="username"></input-area>
            <input-area placeholderText="" @receivedData="replaceData($event)" inputTitle="email"></input-area>
            <input-area placeholderText="" @receivedData="replaceData($event)" inputTitle="password"></input-area>
        </div>
        <div class="errMsg" v-if="errMsg != ''">{{ errMsg }}</div>
        <custom-btn class="register-btn" @onClick="commitRegister"><span slot="btn-name">sign up</span></custom-btn>
        <span class="no-account-text" @click="$router.push('/login')">did you have account? click here</span>
 
  
        
    </div>
</template>

<script>

import btnTemplate from '../../template/vue-btton-template.vue'
import inputTemplate from '../component/input_and_title.vue'
import enterHandler from './directives/enter_pressed_handle.js'
import {mapState} from 'vuex'
export default {
    directives:{
        'enter-pressed-handler':enterHandler
    },
    components:{
        'custom-btn':btnTemplate,

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
                username:'',
                password:'',
                email:'',
            },
            errMsg:''
        
        }
    },
    methods:{
        replaceData(inputValue){
    
            if(inputValue.type == 'username'){
                this.user.username = inputValue.data;
        
                if(this.user.username.length > 15){
                    this.errMsg = "Username can't be more than 15 character"
                }else if(this.user.username.length == 0){
                    this.errMsg = "Username can't be emtpy"
                }else{
                    this.errMsg = '';
                }

            }

            if(inputValue.type == 'email'){
                this.user.email = inputValue.data;
                if(this.user.email.length == 0){

                    this.errMsg = "Email can't be empty";
                }else if( !(this.user.email.includes('@') )){
                    this.errMsg = "The email address is badly formatted.";
                }else{
                    this.errMsg = '';
                }
            }

            if(inputValue.type == 'password'){
                this.user.password = inputValue.data;
                if(this.user.password.length == 0){

                    this.errMsg = "Password can't be empty";
                }else if( this.user.password.length < 8 ){
                    this.errMsg = "Password must be as least 8 character";
                }else{
                    this.errMsg = '';
                }
            }            


        },//convert received data to local data



        commitRegister(){

            if(this.errMsg == ''){
                this.$store.dispatch('register',this.user).then(({state,msg}) => {
                    this.errMsg = '';
                    this.$router.push('/login');
                
                }).catch(({state,msg}) => {
                    this.errMsg = msg;
                });
            }


        }
    }
}
</script>

<style scoped>
.container{
    color: white;
    margin-left: 5vw;
    width: 21.5rem;
    margin-bottom: 5%;
}
.title{
    font-weight: 400;
    font-size: 2.5rem;
}
.input-container{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 14.25rem;
}
.errMsg{
    margin-top: 0.5rem;
    color: red;
    font-size: 1.075rem;
}
.register-btn{
    margin-top: 2.5rem;
    margin-bottom: 3.5rem;
    padding: 0.1rem 0 0.2rem 0;

    width: 100%;

    color: white;
    font-size: 1.25rem;

    background: var(--normal-blue);
    border-radius: 1px;
    
    transition: 0.2s linear;
}
.register-btn:hover{
    background: white;
    color: var(--normal-blue);
}
.no-account-text{
   
    cursor: pointer;
    font-size: 1.15rem;
    
}
.no-account-text:hover{
    border-bottom: 1px solid white;
}
@media screen and (max-width:1368px){
.container{

    width: 23.5rem;
   
}
.errMsg{

    font-size: 1.2rem;
}  
}
@media screen and (max-width:1024px){
.container{

    margin:0 3vw ;
    width: 40%;
    min-width: 23.5rem;


}  

}
@media screen and (max-width:768px){
.container{



    height: 90%;
}   
.errMsg{

    font-size: 1.225rem;
} 
}
@media screen and (max-width:650px){
.container{


    width: 100%;
    min-width: 0rem;
    height: 100%;

}
.title{

    font-size: 2.75rem;
}
.errMsg{

    font-size: 1.425rem;
}
.register-btn{
    padding: 0.2rem 0 0.3rem 0;
    font-size: 1.35rem;
}
.no-account-text{
   

    font-size: 1.35rem;
     border-bottom: 0.5px solid white;
    
}
}
</style>