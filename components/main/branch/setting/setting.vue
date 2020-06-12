<template>
    <div class="setting-conatiner">
        <title-header>
            <span slot="title">Setting</span>
        </title-header>       
        <div class="body">

            <div class="profile-block block">

                <div class="caption">Profile</div>
                <section class="rows-container username">

                    <input-row :modeInput="false" defaultValue="meisken" :showing="username.showing" @click="username.showing = !username.showing">
                        <div slot="title">username:</div>
                        <span slot="middle" class="current-value-style">{{userProfile.username}}</span> 
                    </input-row>
                    <transition name="roll-down">
                        <span class="editing" v-if="username.showing" >
                            <input-row :modeInput="true"  v-for="(title,index) in username.titles" :key="index" :errText="username.errorTexts[index]">
                                <div slot="title">{{title}}:</div>
                                <input type="text" v-model="username.inputingValues[index]" slot="middle" class="input" @input="usernameFormatCheck" maxlength="15">
                            </input-row>

                            <button-row @submit="updateUsername" @cancel="wipeInputingData('username')"></button-row>
                        </span>  
                    </transition>

                </section>

                <section class="rows-container password">

                    <input-row :modeInput="false" :showing="password.showing" @click="password.showing = !password.showing">
                        <div slot="title">password:</div>
                    </input-row>      
                     
                    <transition name="roll-down">
                        <span class="editing" v-if="password.showing">

                            <input-row :modeInput="true"  v-for="(title,index) in password.titles" :key="index" :errText="password.errorTexts[index]">
                                <div slot="title">{{title}}:</div>
                                <input type="password"  v-model="password.inputingValues[index]" slot="middle" class="input" maxlength="20" @input="passwordFormatCheck(index)">
                            </input-row>      

                            <button-row @submit="updatePassword" @cancel="wipeInputingData('password')"></button-row>
                        </span>  
                    </transition>   

                </section>

                <section class="rows-container email">

                    <input-row :modeInput="false" :showing="email.showing" @click="email.showing = !email.showing">
                        <div slot="title">email:</div>
                        <span slot="middle" class="current-value-style">{{userProfile.email}}</span> 
                    </input-row>      
                     
                    <transition name="roll-down">
                        <span class="editing" v-if="email.showing">

                            <input-row :modeInput="true" v-for="(title,index) in email.titles" :key="index" :errText="email.errorTexts[index]">
                                <div slot="title">{{title}}:</div>
                                <input :type="index == 0 ? 'password' : 'text'" v-model="email.inputingValues[index]" slot="middle" class="input" @input="emailFormatCheck(index)">
                            </input-row>

   
                            <button-row @submit="updateEmail" @cancel="wipeInputingData('email')"></button-row>
                        </span>  
                    </transition>   

                </section>

            </div>

            <div class="style-block block">
                <div class="caption">Style</div>
                <section class="rows-container style">

                    <input-row :modeInput="false" :showing="color.showing" @click="color.showing = !color.showing">
                        <div slot="title">color:</div>
                        <span slot="middle" class="current-value-style colors">
                            <div v-for="(color,index) in colorBoxs" :key="index" :style="{ 'background': color}"></div>
                        </span> 
                    </input-row>      
                     
                    <transition name="roll-down">

                        <span class="editing" v-if="color.showing">

                            <input-row :modeInput="true" v-for="(title,index) in color.titles" :key="index" :errText="color.errorTexts[index]">
                                <div slot="title">{{ title }}:</div>
                                <input type="color" v-model="color.inputingValues[index]" slot="middle" class="input color-input" maxlength="7">
                            </input-row>

                            <button-row @submit="updateColorConfig()" @cancel="wipeInputingData('color')"></button-row>
                        </span>  

                    </transition>   

                </section>                
            </div>


            <nav class="nav">
                <div>Profile</div>
                <div>Style</div>
            </nav>

        </div>
    </div>
</template>

<script>
import titleHeader from '../../components/title_header.vue'
import inputRow from './components/input_row.vue'

import btnRow from './components/btn_row.vue'
import {mapState,mapActions,mapMutations} from 'vuex'


import firebase from 'firebase'
import db from '../../../../firebase/firebaseinit.js'
function rowStuffing(showing, ...titles ){
    this.showing = showing;
    this.inputingValues = new Array([...titles].length);


    this.errorTexts = new Array([...titles].length);


    this.titles = [...titles]
}





export default {
    data(){
        const currentUser = firebase.auth().currentUser; 
        const collection = db.collection('user-profile').doc(currentUser.uid);
        return{
            username:new rowStuffing(false,'new username'),
            password:new rowStuffing(false,'old password','new password','confirm password'),
            email:new rowStuffing(false,'password','new email','confirm email'),
            color:new rowStuffing(false,'primary color','secondary color','tertiary color','fourth color'),
            colorBoxs:[],

            currentUser,
            collection



        }
    },
    watch:{

    },
    methods:{
        ...mapActions([
            'getColorConfig',
            'getUserProfile'
        ]),

        ...mapMutations([
            'setColorConfig',
            'loading',
            'showPrompt'
        ]),
        wipeInputingData(wipingArea){
                if(wipingArea == 'username'){
                    this.getUserProfile();
                    
                    this.username.inputingValues[0] = '';
                    this.username.showing = false;
                }
                if(wipingArea == 'password'){
                    
                    this.password.inputingValues.map((inputingValue,index) => {
                        this.password.inputingValues[index] = '';
                    });
                    this.password.showing = false;
                }
                if(wipingArea == 'email'){

                    this.email.inputingValues.map((inputingValue,index)=> {
                        this.email.inputingValues[index] = '';
                    });

                    this.email.showing = false;
                }
                if(wipingArea == 'color'){

                    this.color.showing = false;
                }
        },
        endingAction(success,msg,showingArea){
            
   
            this.loading();
            this.showPrompt({success,msg});

            if(success){
                if(showingArea == 'username'){
                    this.getUserProfile();
                    
                    this.username.inputingValues[0] = '';
                    this.username.showing = false;
                }
                if(showingArea == 'password'){
                    
                    this.password.inputingValues.map((inputingValue,index) => {
                        this.password.inputingValues[index] = '';
                    });
                    this.password.showing = false;

                    firebase.auth().signOut();
                    this.$router.push('/');
                }
                if(showingArea == 'email'){
                    this.getUserProfile();

                    this.email.inputingValues.map((inputingValue,index)=> {
                        this.email.inputingValues[index] = '';
                    });

                    this.email.showing = false;
                }
                if(showingArea == 'color'){
                    this.setupColor();
                    this.color.showing = false;
                }
            }

        },

        usernameFormatCheck(){
       

            if(this.username.inputingValues[0].length == 0){

                this.username.errorTexts[0] = "can't be empty"

            }else if(this.username.inputingValues[0].length > 15){

                this.username.errorTexts[0] = "must be < 15 character"
            }else{

                this.username.errorTexts[0] = ""

            }//username format check
        },

        updateUsername(){
 

            let updated = new Promise((resolve,reject) => {

                if(this.username.errorTexts.every(errText => errText == '' )){
                    this.loading();
                    let username = this.username.inputingValues[0];
    
                    this.collection.update({

                        username:username,

                    }).then(() => {
   
                        this.endingAction(true,'username is updated','username');
                        resolve();

                    }).catch(err => {

                        this.endingAction(false,'connect database error','username');
                        console.log(err);
                        reject(err);

                    })                
                }else{
                    reject();
                }

            });

            return updated            
        },

        passwordFormatCheck(index){
        
            let newPassword = this.password.inputingValues[1];     
            let comfirmPassword = this.password.inputingValues[2];   


            if(index == 0){
                this.password.errorTexts[0] = ""
            }
            if(index == 1){

                if(newPassword.length == 0){

                    this.password.errorTexts[1] = "can't be empty"

                }else{
                    this.password.errorTexts[1] = ""
                }
            }

            
            if(newPassword != comfirmPassword){

                this.password.errorTexts[2] = 'not match'
            }else{
                this.password.errorTexts[2] = ""
            }
            
        },
        updatePassword(){
     
            
            let oldPassword = this.password.inputingValues[0];
            let newPassword = this.password.inputingValues[1];

            let update = new Promise((resolve,reject) => {
                
                 
                if(this.password.errorTexts.every(errText => errText == '' )){
            
                    this.loading();
                    firebase.auth().signInWithEmailAndPassword(this.currentUser.email, oldPassword ).then(() => {

                        this.currentUser.updatePassword(newPassword).then(() => {
                            
                            this.endingAction(true,'new password is updated','password');

                            resolve();

                        }).catch(err => {
                            console.log(err)
                            reject(err);
                            this.endingAction(false,'update password fail','password');
                        });

                    }).catch(err => {
                        
                        this.endingAction(false,'old password incorrect','password');
                       
                        
                      
                        console.log(err);
                        reject(err);
                    })
                }else{
                
                    reject('inputed value error');
                }


            
            })

            return update;
            


        },

        emailFormatCheck(index){
            let newEmail = this.email.inputingValues[1];
            let comfirmEmail = this.email.inputingValues[2];
            if(index == 1){
                if(!(newEmail.includes('@'))){
                    this.email.errorTexts[1] = "bad format"
                }else{
                    this.email.errorTexts[1] = ""
                }
            }
            if(comfirmEmail != newEmail){
                this.email.errorTexts[2] = "not match"
            }else{
                this.email.errorTexts[2] = ""
            }
        },
        updateEmail(){
            let password = this.email.inputingValues[0] ;
            let newEmail = this.email.inputingValues[1] ;
            let update = new Promise((resolve,reject) => {
                           
                if(this.email.errorTexts.every(errText => errText == '' )){
            
                    this.loading();

                    firebase.auth().signInWithEmailAndPassword(this.currentUser.email, password ).then(() => {

                        this.currentUser.updateEmail(newEmail).then(() => {
                             
                            
                            this.collection.update({
                                email:newEmail
                            }).then(() => {
                                this.endingAction(true,'new email is updated','email'); 
                                resolve();
                            }).catch(err => {
                                this.endingAction(false,'connect database error','email');               
                                console.log(err);
                                reject(err);
                            })
                            
                        }).catch(err => {
                            
                            this.endingAction(false,'connect database error','email');               
                            console.log(err);
                            reject(err);
                        })

                    }).catch(err => {
                        
                        this.endingAction(false,'password incorrect','email');
                        
                        console.log(err);
                        reject(err);
                    })




                }else{
                
                    reject('inputed value error');
                }


            
            })

            return update;
        },


        setupColor(){
            this.getColorConfig().then(colorConfig => {
                let {brown,darkBlue,lightBlue,normalBlue} = colorConfig;
                this.colorBoxs = [normalBlue,darkBlue,lightBlue,brown];
                this.color.inputingValues = [normalBlue,darkBlue,lightBlue,brown];
                this.setColorConfig();
            });
        },

        updateColorConfig(){

            let updated = new Promise((resolve,reject) => {
                this.loading();
                let colors = this.color.inputingValues;
 
                this.collection.collection('user-color-config').doc(this.colorConfig.ref).update({

                    normalBlue:colors[0],
                    darkBlue:colors[1],
                    lightBlue:colors[2],
                    brown:colors[3],

                }).then(() => {
  
                    this.endingAction(true,'color config is updated','color');
                    resolve();

                }).catch(err => {
                    
                    this.endingAction(false,'connect database error','color');
                    console.log(err);
                    reject(err);

                })
            });

            return updated
        },

    },
    components: {
        'title-header':titleHeader,
        'input-row':inputRow,//there is input for edit value

        'button-row':btnRow,//cancel and submit
   

    },
    computed:{
        ...mapState([
            'colorConfig',
            'userProfile'
        ])
    },
    mounted(){
      
        //console.log(eval('this.color.showing'))


        this.setupColor();

        this.getUserProfile();

        /*
        const doc = document.documentElement;
    
        let colorNames = ['--dark-blue','--light-blue','--normal-blue','--brown'];
        for(let i = 0; i < 4; i++){
            this.colorConfig.push(window.getComputedStyle(doc).getPropertyValue(colorNames[i]));
            
        }
        console.log(this.colorConfig);
        */
        
    }
}
</script>

<style scoped>

.setting-conatiner{
    
    background: var(--gray-background);
    height: 100vh;
    width:var(--router-component-width);
    overflow-x: hidden;
    overflow-y: auto;
}
.body{

    margin: 3rem auto;
    max-width:768px ;
    background: var(--white);
    width: 100%;
    min-height: 40rem;
    padding:0.75rem 1rem;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);

    border-radius: 12px;
    position: relative;

    color: var(--black);

    position: relative;
}

.block{
    border-bottom: 1px solid var(--gray-border);
}
.caption{
    font-size: 1.725rem;
    padding-bottom: 0.5rem;
}


.rows-container{
    padding:  1rem 0.25rem;
    border-top: 1px solid var(--gray-border);

 

}
.rows-container,.editing{
    display: grid;
    grid-template-columns: 1fr;


    grid-row-gap: 1rem;
}
.input{
    font-size: 1.15rem;
    color: var(--black);
    outline: none;
    width: 16.5rem;
    
}
.input::placeholder{
    opacity:0.45;
}
.current-value-style{
    font-size: 1.25rem;
    border:none;
    background: none;
    cursor: pointer;
}

.style-block{
    margin-top: 2rem;
}

.color-input{
    padding: 0;
    border: none;

    cursor: pointer;


}
.colors{
    display: flex;
}
.colors div{
    width: 1.325rem;
    height: 1.325rem;

    margin-right: 1rem;
}

.nav{

    position: absolute;

    left: -10%;
    top: 2.5%;
    text-align: right;

    display: grid;
    grid-auto-rows: minmax(2rem,auto);
    grid-row-gap:0.75rem; 
    align-items: center;

    font-size: 1.375rem;
    font-weight: 300;
    color:var(--gray-border);


    display: none;
}
.nav div{
    cursor: pointer;
}
.roll-down-enter-active,.roll-down-leave-active{
    transition: 0.5s;
    overflow: hidden;
}
.roll-down-enter,.roll-down-leave-to{
    max-height: 0;
}
.roll-down-enter-to,.roll-down-leave{
    max-height:7.5rem;
}

@media screen and (max-width: 768px){

.body{
    border-top: 1px solid var(--gray-border);
    margin: 0rem auto;
    max-width:768px ;

    width: 100%;
    min-height: var(--mobile-height,100vh);
    padding:0.75rem 0rem;
    box-shadow:none;

    border-radius: 0px;

    padding-bottom: 15vh;
}   
.caption{
    font-size: 1.75rem;
    padding-left: 0.25rem;
}
.input{
    font-size: 1.15rem;
    border: 1.5px solid var(--gray-border);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;

    
} 
}

@media not all and (hover:hover) {
.setting-conatiner{


    height: var(--mobile-height,100vh);
  
}
}



</style>