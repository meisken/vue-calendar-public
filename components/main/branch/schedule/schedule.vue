<template>
    <div class="schedule-container">
        <title-header>
            <span slot="title">home</span>
        </title-header>
        <section class="content">
                
           <div class="schedule-board">
               <schedule-board></schedule-board>
           </div>

           <aside class="function-pieces-container">
               <div class="function-pieces-wrapper">
                    <div class="search-field">
                        <serach-piece></serach-piece>
                    </div>

                    <div class="date-selector-area">

                        <div class="date-selector-mobile"><!-- not ready yet-->
                        
                            <div class="inputDateWrapper">
                                <input type="date" v-model="currentDate" ref="dateSelector" class="dateSelector" :data-today-name="dayNames[currentDateSplitted.dayNameNum]" @change="$refs.calendar.emitDate()">
                                <calendar-icon class="calendar-icon" @iconClicked="$refs.calendar.initializeDate()"></calendar-icon>                          
                            </div>                          
                        </div>

                        <calendar @dayChanged="changeInputDateValue($event)" ref="calendar" class="calendar"></calendar>
                    </div>

                    <div class="notes-board">
                        <note-and-to-do></note-and-to-do>
                    </div>
               </div>
           </aside>


        </section>

    </div>
</template>

<script>
import titleHeader from '../../components/title_header.vue'
import calendarTemplate from '../../../template/calendar.vue'
import noteAndToDoPiece from './components/notes_to_do_piece.vue'
import scheduleBoard from './components/schedule_borad.vue'
import serachPiece from './components/serach_piece.vue'
import calendarIcon from '../../../svg_component/calendar_square.vue'

import {mapState,mapActions,mapMutations,mapGetters} from 'vuex'
import {bus} from '../../../../main.js'

import db from '../../../../firebase/firebaseinit.js'
import firebase from 'firebase'
export default {
    components:{
        'title-header':titleHeader,
        'calendar':calendarTemplate,
        'note-and-to-do':noteAndToDoPiece,
        'schedule-board':scheduleBoard,
        'serach-piece':serachPiece,
        'calendar-icon':calendarIcon
    },
    computed:{
        ...mapState([
            'timeTableData',

            

        ]),
        ...mapGetters([
          

        ]),

    },
    data(){
        return{

            dayNames:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            currentDate:null,
            currentDateSplitted:{},
        }
    },
    watch:{
        currentDate(value){
     
            if(value != null || value != undefined || value != '' ){

                let toDateFormat = new Date(value);
                
                let [year,month,day,dayNameNum] = [toDateFormat.getFullYear(),toDateFormat.getMonth(),toDateFormat.getDate(),toDateFormat.getDay()];
                this.currentDateSplitted = {year,month,day,dayNameNum};

                this.$refs.calendar.changeDay(year,month,day);    
            
                         
            }

        }//change the calendar when input[type:date].value is changed
    },
    methods:{
        ...mapActions([
            'getUserTimetable'
        ]),
        ...mapMutations([
    
            'emitCurrentDay'
        ]),

        changeInputDateValue({year,month,day}){

            this.fetchTimetable(year,month,day);
   
            this.emitCurrentDay({year,month,day});

            month += 1;
            if(month < 10){
                month = '0' + month.toString();
            }
            if(day < 10){
                day = '0' + day.toString();
            }
            this.currentDate = year + '-' + month + '-' + day;
      

        },//change input[type:date].value when the calendar is changed 
        fetchTimetable(year,month,day){
            let startDate = new Date(year,month,day);
            let nextDate = new Date(year,month,day + 1);

            this.getUserTimetable({startTimeLine:startDate, endTimeLine: nextDate});
        },  
        updateTimeTable(){
            let {year,month,day} = this.currentDateSplitted;
            this.fetchTimetable(year,month,day);           
        }
        
    },
    mounted(){
       
        bus.$on('addedAppointment',this.updateTimeTable );
    },
    beforeDestroy(){
        bus.$off('addedAppointment',this.updateTimeTable);        
    }
}
</script>

<style scoped>

.schedule-container{
    max-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    
    width:var(--router-component-width);

    background: var(--gray-background);

}
.content{


    width: 100%;
    max-width: 1370px;
    margin: 2rem auto;
   
    
    display: grid;
    grid-template-columns: 3fr 19rem;
    grid-column-gap:2vw; 
    padding: 0 1rem;

}

.function-pieces-wrapper{
    
    display: grid;
    grid-template-columns: repeat(1,1fr);
    grid-row-gap: 2rem;
    padding-top: 0.5rem;
   
}
.schedule-board{

 


  
    
}
.search-field{

    height: 2rem;
    width: 100%;
   
}
.date-selector-area{

    

}
.date-selector-mobile{
    display: none;
}
.calendar-icon{

}
.inputDateWrapper{

}
.showDefaultBtn{

}



.notes-board{

    width: 100%;
    height: 10rem;

}
@media screen and (max-width: 1065px){
.content{

/*
    width: 100%;
    
    margin: 2rem auto;
*/
    max-width: 700px;
    display: flex;
    flex-direction: column-reverse;

    padding: 0rem;
    
    box-shadow: 0 3px 6px rgba(0,0,0,0.16)

}  
.calendar{
    display: none;
}
.function-pieces-wrapper{
    
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    grid-row-gap: 0rem;
    padding-top: 0rem;
   
}
.date-selector-area{

    

}
.inputDateWrapper{
    cursor: pointer;
    display: flex;
    background: var(--white);
    border: 1px solid var(--gray-border);
}
.date-selector-mobile{
    display: block;
}

.dateSelector{
    width: 100%;
    position: relative;

    outline: none;
    border: none;
    background: none;

    cursor: text;
    font-size: 1.2rem;
}
.dateSelector::after{
    content: attr(data-today-name);
    position: absolute;
    right: 1.95rem;
}
.calendar-icon{
    padding: 0.6rem;
    width: 2.575rem;
    height: 2.5rem;
    border-left: 1px solid var(--gray-border);

    --icon-color:var(--gray-border);
    
}



.dateSelector::-webkit-clear-button {
    display: none
}
.dateSelector::-webkit-inner-spin-button{
    display: none
}
.dateSelector::-webkit-calendar-picker-indicator{
    cursor: pointer;
    opacity:1;

}
.notes-board{
    display: none;
}
}
@media screen and (max-width: 768px){
.content{



    margin: 0.05rem auto;

    max-width: 100%;


} 
.function-pieces-wrapper{
    

    grid-template-columns: 1fr 1fr;

   
}

}
@media screen and (max-width: 500px){
.function-pieces-wrapper{
    

    grid-template-columns: 1fr;
    grid-auto-rows: minmax(3rem,auto)

   
}  
.inputDateWrapper{

    height:3rem;
    
}
.dateSelector{
    font-size: 1.25rem;
}
.calendar-icon{

    padding:2.25% 0.6rem;
    width: 2.575rem;
    height: 100%;

    
}
}
@media not all and (hover:hover) {
.schedule-container{


    max-height: var(--mobile-height,100vh);
  
}
}
</style>