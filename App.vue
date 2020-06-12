<template>
    <div id="app">
      <router-view/>  

      <custom-alert></custom-alert>
      <loading></loading>
      <book-appointment-board></book-appointment-board>
      <add-task-note-borad></add-task-note-borad>
      <edit-appointment-board></edit-appointment-board>
      <custom-prompt></custom-prompt>

    </div>
</template>
<script>
import customAlert from './components/template/alert_custom.vue'
import loading from './components/template/loading_animated_component.vue'
import bookAppointmentBoard from './components/global_component/new_appointment_board.vue'
import addTaskNoteBorad from './components/global_component/new_task_note_board.vue'
import editAppointmentBoard from './components/global_component/edit_appointment_board.vue'
import customPrompt from './components/global_component/prompt_finished.vue'

import {mapActions,mapMutations} from 'vuex'
export default {
    data(){
        return{
   
        }
    },
    methods:{
      ...mapActions([
          'getColorConfig'
      ]),
      ...mapMutations([
        'setColorConfig'
      ])

    },
    components:{
      'custom-alert':customAlert,
      'loading':loading,
      'book-appointment-board':bookAppointmentBoard,
      'edit-appointment-board':editAppointmentBoard,
      'add-task-note-borad':addTaskNoteBorad,
  
      'custom-prompt':customPrompt,
    },
    computed:{
    
    },
    mounted(){


      const mobileHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty('--mobile-height', `${window.innerHeight}px`)
      }
      window.addEventListener('resize', mobileHeight);
      mobileHeight();//preventing 100vh get over the screen
    
    }
}
</script>
<style>



:root{
    --dark-blue:#002130;
    --light-blue:#D2E0E9;
    --normal-blue:#4579A0;
    --brown:#A35D22;

    --gray-background:#F9F9F9;
    --gray-border:#C7C7C7;
    --normal-gray:#9D9D9D;
    --light-gray:#EBEBEB;
    --dark-gray:#707070;

    --dark-green:#45A04E;
    --light-green:#81DA84;

    --normal-red:#E33A3A;
    --dark-red:#A04545;

    --white:#ffffff;
    --black:#000000;

    --mobile-height:100%
}
*,*::before,*::after{
    box-sizing: border-box;
    font-family: "Segoe UI",'Microsoft JhengHei','Apple LiGothic Medium';
}
body,html{
    
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;

    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
     -khtml-user-select: none; 
       -moz-user-select: none; 
        -ms-user-select: none; 
            user-select: none; 


}

.fade-enter-active,.fade-leave-active{
    transition: opacity 0.5s;
}
.fade-enter,.fade-leave-to{
    opacity: 0;

}
.fade-enter-to,.fade-leave{
    opacity: 1;

}


.btn:active{
  opacity: 0.8;
}

@media screen and (min-width: 2750px){
html{
  font-size: calc(20.5px + 0.25vw);
} 
}
@media screen and (min-width: 2250px) and (max-width: 2750px){
html{
  font-size: calc(17.5px + 0.15vw);
} 
}
@media screen and (min-width: 1850px) and (max-width: 2250px)  {
html{
  font-size: 17.5px;
}
}
@media screen and (max-width: 1680px){
html{
  font-size: 16px;
}
}
@media screen and (max-width: 1370px){
html{
  font-size: 14.75px;
}
}
@media screen and (max-width: 650px){

.roll-up-enter-active,.roll-up-leave-active{
    transition:0.75s ease-in-out;


}
.roll-up-enter,.roll-up-leave-to{
    transform: translateY(200%)

}
.roll-up-enter-to,.roll-up-leave{
    transform: translateY(0%)

}
}

@media screen and (max-width: 550px){
html{
  font-size: 13px;
}

}
</style>
