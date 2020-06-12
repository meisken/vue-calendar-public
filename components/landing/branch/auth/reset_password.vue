<template>
    <div class="container" v-enter-pressed-handler="sendEmail">

        <h1 class="title">Reset Password</h1>

        <div class="input-container">
            <input-area placeholderText="" @receivedData="replaceData($event)" inputTitle="email"></input-area>
        </div>
        <div class="errMsg" v-if="errMsg != ''">{{ errMsg }}</div>
       
        <custom-btn class="reset-btn" @onClick="sendEmail"><span slot="btn-name">reset</span></custom-btn>
        <div class="description">Please provide the email address you used when you signed up for your account. We will send you an email that will allow you to reset your password.</div>

        <go-back-arrow class="go-back-btn" @iconClicked="$router.push('/')"></go-back-arrow>
  
        
    </div>
</template>

<script>
import arrow from '../../../svg_component/arrow-circle-fill.vue'
import btnTemplate from '../../../template/vue-btton-template.vue'
import inputTemplate from '../../component/input_and_title.vue'
import enterHandler from '../directives/enter_pressed_handle.js'
import {bus} from '../../../../main.js'
import {mapState} from 'vuex'
import firebase from 'firebase'
export default {
    directives:{
        'enter-pressed-handler':enterHandler
    },
    components:{
        'custom-btn':btnTemplate,
        'go-back-arrow':arrow,
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
          
            },
            errMsg:'',
            
        }
    },
    methods:{
        replaceData(inputValue){
          
            switch(inputValue.type){
              
                case 'email' :  this.user.email = inputValue.data;break;
            }
 
        },//convert received data to local data
        sendEmail(){
            this.$store.commit('loading');//call loading animation
            
            firebase.auth().sendPasswordResetEmail(this.user.email).then(() => {
                this.$store.commit('loading');//stop loading animation
                bus.$emit('customAlert',{msg:"Email sended successful.Did you receive the email?if not,click again or waiting for a while"});
        
            }).catch(err => {
                this.$store.commit('loading');//stop loading animation
                this.errMsg = err.message;
            })
        },//in order to send to resetting password email to user 
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
    height: auto;

    
}
.errMsg{
    margin-top: 0.5rem;
    color: red;
    font-size: 1.075rem;
}
.reset-btn{
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
.reset-btn:hover{
    background: white;
    color: var(--normal-blue);
}
.description{
    font-size: 1.2rem;
    font-weight: 300;
    opacity: 0.825;
}
.go-back-btn{
    cursor: pointer;

    margin-top: 3rem;
    --icon-color:white;
    opacity: 0.6;
    width: 2.25rem;

}
.go-back-btn:hover{
    opacity:1;
    --icon-color:var(--normal-blue);
}

@media screen and (max-width:700px){
.container{

    margin:0 3vw ;
    width: 47.5%;
    
    height: 90%;
}    
.errMsg{

    font-size: 1.115rem;
}
.description{
    font-size: 1.275rem;
 
}

}
@media screen and (max-width:650px){
.container{


    width: 100%;
     height: 100%;

}
.title{

    font-size: 2.75rem;
}
.input-container{

    
}
.errMsg{

    font-size: 1.2rem;
}
.reset-btn{
    margin-top: 2.75rem;
    margin-bottom: 3rem;
    padding: 0.2rem 0 0.3rem 0;
    font-size: 1.35rem;
}
.description{
    font-size: 1.325rem;
 
}
.go-back-btn{


    margin-top: 3.75rem;
 
    opacity: 0.7;
    width: 2.75rem;

}
}
</style>