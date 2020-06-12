<template>
    <transition name="roll-up">
        <div class="back-board" v-if="doesEditAppointmentShow">
            <div class="container">

                <header class="head">
                    <div class="title">edit appointment </div>
                    <cross-icon class="cross icon" @iconClicked="endingAction()"></cross-icon>
                </header>

                <section class="typing-title row">
                    <input type="text" class="typing-title" placeholder="type your title..." v-model="title">
                </section>

                <section class="details row">
                    <details-icon class="icon details"></details-icon>
                    <textarea class="details" v-model="details"></textarea>
                </section>

                <section class="start time row">
                    <clock-icon class="icon time"></clock-icon>
                    <input :type="regular ? 'time':'datetime-local'"  class="time" v-model="time.start">
                </section>

                <section class="end time row">
                    <clock-icon class="icon time"></clock-icon>
                    <input :type="regular ? 'time':'datetime-local'" class="time" v-model="time.end">
                </section>

                <section class="days row" v-if="regular">
                    <calendar-icon class="icon days"></calendar-icon>
                    <div class="days">
                        <span class="days" @click="selectingDays(index)" v-for="({day,wasSelected},index) in  dayNames" :key="index" :class="{ 'selected': wasSelected }">{{ day }}</span>
                    </div>
                </section>
  

                <section class="error row" v-if="errorText != ''">
                    <error-icon class="icon error"></error-icon>
                    <div class="error">{{ errorText }}</div>
                </section>           

 

       
                <footer class="floor ">
                    <div class="btn-container">
                        <div class="save btn" @click="formatChecker">save</div>
                        <div class="cancel btn" @click="endingAction()">cancel</div>
                        
                    </div>
                </footer>
        
            </div>

        </div>
    </transition>
</template>

<script>

import crossIcon from '../svg_component/cross_normal.vue'
import detailsIcon from '../svg_component/detail_article.vue'
import clockIcon from '../svg_component/time_for_lane.vue'
import calendarIcon from '../svg_component/calendar_reschedule.vue'
import errorIcon from '../svg_component/error_exclamation.vue'

import {mapState,mapMutations,mapActions} from 'vuex'
import db from '../../firebase/firebaseinit.js'
import firebase from 'firebase'
import {bus} from '../../main.js'
export default {
    components:{
        'cross-icon':crossIcon,
        'details-icon':detailsIcon,
        'clock-icon':clockIcon,
        'calendar-icon':calendarIcon,
        'error-icon':errorIcon
    },
    computed:{
        ...mapState([
            'doesNewTaskBoardShow',
            'enableEditTask',
            'doesEditAppointmentShow',
  
        ]),
    },
    filters:{

    },   
    data(){
        return{

            title:'',
            details:'',
            ref:'',
            time:{
                start:'',
                end:''
            },


            errorText:'',

            regular:false,

            dayNames:[{ day:'SUN', wasSelected:false },{ day:'MON', wasSelected:false },
                      { day:'TUE', wasSelected:false },{ day:'WED', wasSelected:false },
                      { day:'THU', wasSelected:false },{ day:'FRI', wasSelected:false },
                      { day:'SAT', wasSelected:false }],

            detailTyping:false,


      
        }
    },
    methods:{
        ...mapMutations([
           'toggleNewTaskStatus',
           'loading',
           'showPrompt',
           'toggleEditAppointmentStatus'
        ]),
        ...mapActions([
            'getUserTask'
        ]),

        initializeData(){

            this.title = '';
            this.details = '';
            this.ref = '';
            this.time = {
                start:'',
                end:''
            };
            this.dayNames.map(day => {
                day.wasSelected = false
            });      
        },
        selectingDays(index){

            this.dayNames[index].wasSelected = !this.dayNames[index].wasSelected ;
     
        },
        formatChecker(){
            this.errorText = '';
            if(this.title.length > 25){
                this.errorText = 'title only can be 25 character'
                return
            }

            if(this.title.length <= 0){
                this.errorText = 'title can not be empty'
                return                
            }

    
            if(this.time.start == ''){
                this.errorText = 'start time can not be empty'
                return                  
            }
           
            if(this.time.end == ''){
                this.errorText = 'end time can not be empty'
                return                  
            }

            if(this.regular && this.dayNames.every(day => day.wasSelected == false)){
                this.errorText = 'days can not be empty'
                return                     
            }

            
            this.updateAppointment()
            
        },

        updateAppointment(){

            this.loading();
            let currentUser = firebase.auth().currentUser;

            let destination =  this.regular ? 'user-timetable-regular' : 'user-timetable';
            
            let start = this.time.start;
            let end = this.time.end;

            if(!this.regular ){
                start = new Date(this.time.start);
                end = new Date(this.time.end);
            }

            db.collection('user-profile').doc(currentUser.uid).collection(destination).doc(this.ref).update({
                title:this.title,
                content:this.details,
                startTime:start,
                endTime:end,
                isItRegular:this.regular,
            }).then(() => {
       
                this.endingAction(true);
            }).catch(err => {
            
                this.endingAction(false);
                console.log(err)
            });



         
        },
        endingAction(doesItSuccess){

      
            this.initializeData();
            this.toggleEditAppointmentStatus();

            if(doesItSuccess != null){
                
                this.loading();
                this.emitStatus(doesItSuccess);

            }

        },

        emitStatus(doesItSuccess){
            let msg = '';
            if(doesItSuccess){
                msg = 'updated appointment';
                bus.$emit('addedAppointment');
            }else{
                msg = 'update appointment failed ';
            }

            this.showPrompt({success:doesItSuccess,msg:msg});
        },


        fetchData({ref,isItRegular}){

            let currentUser = firebase.auth().currentUser;
            this.regular = isItRegular;
            this.ref = ref;
            let destination =  this.regular ? 'user-timetable-regular' : 'user-timetable';
            db.collection('user-profile').doc(currentUser.uid).collection(destination).doc(ref).get().then(data => {
       
                let {title,content,startTime,endTime} = data.data();

                this.title = title;
                this.details = content;
                
                if(this.regular){

                    this.time = {

                        start:startTime,
                        end:endTime
                    }

                    this.dayNames.map((dayName,index)=> {
                        data.data().days.forEach(day => {
                            if(index == day){
                                dayName.wasSelected = true;
                            }
                        })
                    })



                }else{
                
                    let htmlDate = (seconds) => {
                        let year,month,day,hour,minutes;
                        let date = new Date( seconds * 1000);

                        year = date.getFullYear();
                        month = this.$options.filters.plusZero((date.getMonth() + 1));
                        day = this.$options.filters.plusZero( date.getDate() );
                        hour =  this.$options.filters.plusZero( date.getHours()) ;
                        minutes = this.$options.filters.plusZero( date.getMinutes());

                        
                        let result =  year + '-' + month + '-' + day + 'T' + hour + ':' + minutes;


                        return result
                    }
            
                    let start = htmlDate(startTime.seconds);
                    let end = htmlDate(endTime.seconds);

        
                    this.time = {

                        start:start,
                        end:end
                    }
                }


            }).catch(err => {
                console.log(err);
            });            
        }

    },
    created(){
      
        this.initializeData();
        bus.$on('injectAppointmentData',this.fetchData);
    },
    beforeDestroy(){
        bus.$off('injectAppointmentData',this.fetchData);
    }
}
</script>
 
<style scoped>
.back-board{
    position:fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);


    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 100;
}
.container{
    width: 32.5rem;
    background: var(--white);

    border-radius: 4px;


    --middle-font:1.25rem;
    --big-font:1.5rem;
    --huge-font:1.75rem;
}

.container.animation{
    animation: shake 0.75s;
}
@keyframes shake{
    0%{
        transform: translateX(0%);
    }
    12.5%{
        transform: translateX(1.25%);
    }
    25%{
        transform: translateX(-1.25%);
    }
    37.5%{
        transform: translateX(2.5%);
    }
    50%{
        transform: translateX(-2.5%);
    }
    62.5%{
        transform: translateX(2.5%);
    }
    75%{
        transform: translateX(-1.25%);
    }

    100%{
        transform: translateX(0%);
    }
}

.head{
  
    padding: 0.75rem 0.75rem 0.75rem 0.5rem;
    display: grid;
    grid-template-columns: 1fr 1.45rem;
    align-items: center;

    
    width: 100%;
}
.title{
    font-size: var(--huge-font);
    font-weight: 400;
    color: var(--normal-blue);
    margin: 0;
    padding: 0;
  
}
.icon.cross{
       
    width:1.45rem;
  
    --icon-color: var(--black);
    cursor: pointer;


}
.icon.cross:hover{
    --icon-color: var(--normal-blue);
}



section.row{
    display: grid;
    grid-template-columns: 2.5rem 1fr;
    grid-column-gap: 0.5rem;
    padding:1rem 1.25rem 1rem 0.75rem;

    border-top:1px solid var(--gray-border);
    

}
.icon{
    height: 1.85rem;
    width: 1.85rem;
    --icon-color: var(--dark-gray);

}
.row.typing-title{

}

input.typing-title{
    grid-column: 1 / 3;

    border: none;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    outline: none;
    font-size:var(--big-font);
}
input.typing-title::placeholder{
    opacity: 0.6;
}

.row.details{

}
.icon.details{




}
textarea.details{
    height: 6rem;
    font-size: var(--middle-font);

    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    outline: none;

    border: 1px solid var(--gray-border);
}
.row.time{
    
}
.icon.time{

}
input.time{
    font-size:var(--middle-font);
    padding: 0.125rem 0.25rem;
    cursor: text;


    border: 1px solid var(--gray-border);
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    outline: none;

    border-radius: 0;
}
div.days{
    display: flex;
    align-items: center;
}
span.days{
    margin-right: 0.75rem;
    font-size: var(--middle-font);
    font-weight: 500;
    color: var(--gray-border);
    cursor: pointer;
}

span.days.selected{
    color: var(--normal-blue);
}

.icon.error{
    --icon-color: var(--normal-red);
}
div.error{

    font-size: var(--middle-font);
    color:  var(--normal-red);
}

.floor{

    display: flex;
    justify-content: flex-end;
    padding: 1rem 0;
    border-top: 1px solid var(--gray-border);
    border-bottom: 1px solid var(--gray-border)
  
}
.btn-container{

    display: flex;
    padding: 0 0.75rem;
    width: 100%;
  
}

.btn{
    width: 50%;
    padding: 0.15rem 0;
    
    display: flex;
    justify-content: center;
    align-items: center;

    justify-self: center;
    font-size: 1.15rem;

    cursor: pointer;
    transition: 0.25s;

}
.btn:hover{
    background: var(--light-blue) !important;
    border:1px solid  var(--light-blue) !important;
    color:var(--normal-blue) !important;
}
.btn.cancel{
    border: 1px solid var(--normal-blue);
    color: var(--normal-blue);
    
    
}
.btn.save{
    background: var(--normal-blue);
    color:var(--white);
    margin-right: 1rem;

  
}

@media screen and (max-width:650px) {
.back-board{
 
    background: var(--white);

    align-items: flex-start;
}
.container{
    width: 100%;
    height: auto;

    padding: 0rem;

    --middle-font:1.35rem;
    --big-font:1.65rem;
    --huge-font:1.85rem;
}  
.head{
  


    grid-template-columns: 1fr 2rem;
    align-items: center;

    padding:0 0.5rem;
    width: 100%;
    height: 4rem;

}  
.icon.cross{
       
    width:1.45rem;
  
    --icon-color: var(--black);
    cursor: pointer;
    display: flex;
    align-items: center;

}

.title{
    font-size: 2rem;

}
.icon{

    width:2rem;
    margin-top: 0.25rem;
    --icon-color: var(--dark-gray);
    

    
}
.icon.details{

  


}
.btn{
    font-size: 1.25rem;
}
}

</style>