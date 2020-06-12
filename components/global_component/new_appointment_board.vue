<template>
    <transition name="roll-up">
        <div class="back-board" v-if="doesBookingBoardShow">
            <div class="container" ref="appointment" @animationend="toggleAnimation">
                <header class="title">
                    <div class="title">book appointment</div>
                    <cross-icon class="cross icon" @iconClicked="pageChange(-3)"></cross-icon>
                </header>
                <main class="body">
                    <section class="page one" v-if="currentPage == 1">

                        <div class="each-wrapper">
                            <div class="index">1.</div>
                            <div class="q-and-a-wrapper">
                                <div class="question">does the appointment happen regularly?</div>
                                <div class="answer-wrapper checkbox">

                                    <div class="custom-checkbox" @click="regular = true">
                                        <div class="checkbox-box">
                                            <tick-icon class="tick" v-if="regular"></tick-icon>
                                        </div>
                                        <span class="checkbox-text">Yes</span>
                                    </div>
                                    <div class="custom-checkbox" @click="regular = false">
                                        <div class="checkbox-box">
                                            <tick-icon class="tick" v-if="!regular"></tick-icon>
                                        </div>
                                        <span class="checkbox-text">No</span>
                                    </div>

                                </div>
                                <div class="error-text" v-if="regularCheckboxErr != ''">{{ regularCheckboxErr }}</div>
                            </div>
                        </div>

                        <div class="each-wrapper">
                            <div class="index">2.</div>
                            <div class="q-and-a-wrapper">
                                <div class="question">appointment name</div>
                                <div class="answer-wrapper input-text">
                                    <title-icon class="icon"></title-icon>
                                    <input type="text" class="input-text" v-model="title" maxlength="20">
                                </div>
                                <div class="error-text" v-if="titleChecker != ''">{{ titleChecker }}</div>
                            </div>
                        </div>

                        <div class="each-wrapper">
                            <div class="index">3.</div>
                            <div class="q-and-a-wrapper">
                                <div class="question">appointment details (option)</div>
                                <div class="answer-wrapper input-text">
                                    <details-icon class="icon"></details-icon>
                                    <input type="text" class="input-text" v-model="details">
                                </div>
                                <div class="error-text" v-if="detailsChecker != ''">{{ detailsChecker }}</div>
                            </div>
                        </div>

                    </section>


                    <section class="page two regular" v-if="currentPage == 2 && regular">

                        <div class="each-wrapper">
                            <div class="index">4.</div>
                            <div class="q-and-a-wrapper">
                                <div class="question">pick days it will repeat</div>
                                <div class="answer-wrapper days-picker">
                                    <span v-for="({day,wasSelected},index) in dayNames" :key="index" class="day-selector" :class="{'daySelected' : wasSelected}" @click="selectingDays(index)">{{ day }}</span>

                                </div>
                                <div class="error-text" v-if="regularDaysChecker != ''">{{ regularDaysChecker }}</div>
                            </div>
                        </div>

                        <div class="each-wrapper">
                            <div class="index">5.</div>
                            <div class="q-and-a-wrapper">
                                <div class="question">when is it start</div>
                                <div class="answer-wrapper input-text">
                                    <clock-icon class="icon"></clock-icon>
                                    <input type="time" class="input-text" v-model="regularTime.start">
                                </div>
                                <div class="error-text" v-if="regularStartChecker != ''">{{ regularStartChecker }}</div>
                            </div>
                        </div>

                        <div class="each-wrapper">
                            <div class="index">6.</div>
                            <div class="q-and-a-wrapper">
                                <div class="question">when is it end</div>
                                <div class="answer-wrapper input-text">
                                    <clock-icon class="icon"></clock-icon>
                                    <input type="time" class="input-text" v-model="regularTime.end">
                                </div>
                                <div class="error-text" v-if="regularEndChecker != ''">{{ regularEndChecker }}</div>
                            </div>
                        </div>

                    </section>

                    <section class="page two no-regular" v-if="currentPage == 2 && !regular">

                        <div class="each-wrapper">
                            <div class="index">4.</div>
                            <div class="q-and-a-wrapper">
                                <div class="question">when is it start</div>
                                <div class="answer-wrapper input-text">
                                    <calendar-icon class="icon"></calendar-icon>
                                    <input type="datetime-local" class="input-text" v-model="notRegularTime.start">
                                </div>
                                <div class="error-text" v-if="notRegularStartChecker != ''">{{ notRegularStartChecker }}</div>
                            </div>
                        </div>

                        <div class="each-wrapper">
                            <div class="index">5.</div>
                            <div class="q-and-a-wrapper">
                                <div class="question">when is it end</div>
                                <div class="answer-wrapper input-text">
                                    <calendar-icon class="icon"></calendar-icon>
                                    <input type="datetime-local" class="input-text" v-model="notRegularTime.end">
                                </div>
                                <div class="error-text" v-if="notRegularEndChecker != ''">{{ notRegularEndChecker }}</div>
                            </div>
                        </div>

                    </section>                    


                </main>
                <footer class="buttons">
                    <div class="next btn" @click="pageChange(1)">{{ currentPage == maxPage ?  'sumbit' :'next' }}</div>
                    <div class="prev btn" @click="pageChange(-1)">{{ currentPage == 1 ?  'cancel' :'back' }}</div>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
import crossIcon from '../svg_component/cross_normal.vue'
import calendarIcon from '../svg_component/calendar_tick.vue'
import clockIcon from '../svg_component/time_for_lane.vue'
import detailsIcon from '../svg_component/detail_article.vue'
import titleIcon from '../svg_component/headline.vue'
import tickIcon from '../svg_component/tick.vue'

import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import {bus} from '../../main.js'
import db from '../../firebase/firebaseinit.js'
import firebase from 'firebase'

export default {
    components:{
        'cross-icon':crossIcon,
        'title-icon':titleIcon,
        'tick-icon':tickIcon,
        'calendar-icon':calendarIcon,
        'clock-icon':clockIcon,
        'details-icon':detailsIcon
    },
    computed:{
        ...mapState([
            'doesBookingBoardShow',
            'currentDay'
        ]),
        ...mapGetters([
            'dateFormatCurrentDay',
  
        ]),
        regularCheckboxErr(){

            return ''
        },
        titleChecker(){
            let title = this.title;
            if(title.length == 0){
                return "can't be empty"
            }
            return ''
        },
        detailsChecker(){
            let details = this.details;
            
            return ''
        },
        regularDaysChecker(){
            if(this.dayNames.every(day => day.wasSelected == false)){
                return "can't be empty"
            }
            return ''
        },
        regularStartChecker(){
           

            if(this.regularTime.start == ''){
                return "can't be empty"
            }
            if( this.regularTime.start >  this.regularTime.end){
                return "bad time range"
            }
            return ''
        },
        regularEndChecker(){
            if(this.regularTime.end == ''){
                return "can't be empty"
            }
            return ''
        },

        notRegularStartChecker(){

            if(this.notRegularTime.start == ''){
                return "can't be empty"
            }
          
            if( this.notRegularTime.start >  this.notRegularTime.end){
                return "bad time range"
            }


            return ''
        },
        notRegularEndChecker(){
            if(this.notRegularTime.end == ''){
                return "can't be empty"
            }
            return ''
        }        
    },
 
    data(){
        return{
            currentPage:1,
            maxPage:2,

     
            regular:false,

            title:'',
            details:'',

            regularTime:{
                start:'12:00',
                end:'12:00'
            },
            notRegularTime:{
                start:'2020-06-09T12:00',
                end:'2020-06-09T12:00'
            },


            fetchingData:false,

            monthsName:["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
            dayNames:[{ day:'SUN', wasSelected:false },{ day:'MON', wasSelected:false },
                      { day:'TUE', wasSelected:false },{ day:'WED', wasSelected:false },
                      { day:'THU', wasSelected:false },{ day:'FRI', wasSelected:false },
                      { day:'SAT', wasSelected:false }],
            

        }
    },
    methods:{



        ...mapMutations([
            'toggleBookingStatus',
            'loading',
            'showPrompt'

        ]),
        ...mapActions([
            'getUserTimetable'
        ]),


        pageChange(val/*+1 or -1 */){

            if(val == 1){
                if(this.formatErrorChecker()){
                    this.toggleAnimation();
                    return
                }
            }


            this.currentPage += val;
            if(this.currentPage > this.maxPage){
                
                this.currentPage = 1;
                this.submitData();

            }
            if(this.currentPage < 1){
                this.endingAction();
                this.currentPage = 1;

            }
        },
        formatErrorChecker(){

            if(this.currentPage == 1){

                if(this.titleChecker != '' || this.detailsChecker != '' ){
                    return true
                }

            }

            if(this.currentPage == 2){
                if(this.regular){
                    if(this.regularDaysChecker != '' ||this.regularStartChecker != '' || this.regularEndChecker != ''){
                        return true
                    }
                }
                if(!this.regular){
                    if(this.notRegularStartChecker != '' || this.notRegularEndChecker != ''){
                        return true
                    }
                }
            }
            return false

        },//the actually checker on computer

        toggleAnimation(){
            this.$refs.appointment.classList.toggle('animation');
        },


        initializeAllData(){
            let now = new Date();

            this.title = '';
            this.details = '';

            function plusZero(val){
                    if(val < 10){
                        return '0' + val
                    }
                    return val
                  
            }


            this.regularTime.start = plusZero(now.getHours()) + ':' + plusZero(now.getMinutes());
            this.regularTime.end = plusZero(now.getHours()) + ':' + plusZero(now.getMinutes());


            function currentDate(){
                let year = now.getFullYear();

                let month = plusZero(now.getMonth() + 1);
          

                let date =  plusZero(now.getDate());
    

                let hour = plusZero(now.getHours());
                let minutes = plusZero(now.getMinutes());


                return year + '-' + month + '-' + date + 'T' + hour + ':' + minutes
            }

          
            this.notRegularTime.start = currentDate();
            this.notRegularTime.end = currentDate();
            
            this.dayNames.map(eachDay => {
                eachDay.wasSelected = false;
            })
          
        },

        selectingDays(index){

            this.dayNames[index].wasSelected = !this.dayNames[index].wasSelected ;
     
        },


        submitData(){

            let submited = new Promise((resolve,reject) => {
                this.loading();
                let currentUser = firebase.auth().currentUser;

                

                let notRegularData = {

                    title:this.title,
                    content:this.details,
                    isItRegular:false,
                    startTime:new Date(this.notRegularTime.start),
                    endTime:new Date(this.notRegularTime.end),

                }

                let days = [];
                this.dayNames.forEach((day,index) => {
                    if(day.wasSelected){
                        days.push(index);
                    }
                })

                let regularData = {
                    title:this.title,
                    content:this.details,
                    isItRegular:true,
                    startTime:this.regularTime.start,
                    endTime:this.regularTime.end,
                    days:days
                }

                let destination =  this.regular ? 'user-timetable-regular' : 'user-timetable';
                db.collection('user-profile').doc(currentUser.uid).collection(destination).add( this.regular ? regularData : notRegularData ).then(() => {
                    this.endingAction(true);
                    resolve();

                }).catch(err => {
                    this.endingAction(false);
                    console.log(err);
                    reject(err);
                });
            })
            return submited

        },


        endingAction(doesItSuccess){

      
            this.initializeAllData();
            this.toggleBookingStatus();

            if(doesItSuccess != null){
                
                this.loading();
                this.emitStatus(doesItSuccess);

            }

        },

        emitStatus(doesItSuccess){
            let msg = '';
            if(doesItSuccess){
                msg = 'booked a new appointment';
                bus.$emit('addedAppointment');
            }else{
                msg = 'book appointment failed ';
            }

            this.showPrompt({success:doesItSuccess,msg:msg});
        },

        fetchDataForBookAgain({ref,isItRegular}){



            if(!this.fetchingData){
                this.fetchingData = true;
                let currentUser = firebase.auth().currentUser;
                this.regular = isItRegular;
                let destination =  this.regular ? 'user-timetable-regular' : 'user-timetable';
                db.collection('user-profile').doc(currentUser.uid).collection(destination).doc(ref).get().then(data => {
        
                    let {title,content,startTime,endTime} = data.data();

                    this.title = title;
                    this.details = content;
            
                    if(this.regular){




                        this.regularTime = {

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

         
                        this.notRegularTime = {

                            start:start,
                            end:end
                        }
                    }
                    this.fetchingData = false;
                
                }).catch(err => {
                    this.showPrompt({success:false,msg:'fetch data failed'})
                    console.log(err);
                    this.fetchingData = false;
                });                
            }


        },

    },
    created(){
        this.initializeAllData();
      
    
    },
    mounted(){
        bus.$on('bookAgain',this.fetchDataForBookAgain);
    },
    beforeDestroy(){
        bus.$off('bookAgain',this.fetchDataForBookAgain);
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
    background: var(--white);
    width: 35rem;
    min-height: 22.5rem;
    padding-bottom: 1rem;
    border-radius: 8px;



    display: grid;
    grid-row-gap: 0.75rem;
    grid-template-rows: 4rem 1fr 2.75rem;

    
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
header.title{
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;

    padding: 0 1rem 0 0.5rem;
    border-radius: 8px 8px 0 0;

    background-image:  linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),linear-gradient(var(--light-blue) , var(--light-blue));

  
}
div.title{
    font-size: 1.5rem;

}
.cross.icon{
    width: 1.45rem;
    cursor: pointer;
}
.cross.icon:hover{
    --icon-color:var(--normal-blue);
}


.body{
    padding: 0rem 0.75rem;
}
.page{
    display: grid;
    grid-template-columns:1fr;
 

    grid-row-gap: 1rem;
}
.page.one{

}
.each-wrapper{
    display: grid;
    grid-template-columns: 1.5rem 1fr;

}
.index{
    color: var(--normal-blue);
    font-size: 1.5rem;
    font-weight: 400;
}
.q-and-a-wrapper{

}
.question{
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--normal-blue)
}
.answer-wrapper{
    margin-top: 0.75rem;
    display: flex;
    align-items: center;
}

.answer-wrapper.checkbox{

}
.custom-checkbox{
    display: flex;
    align-items: center;
    margin-right: 1rem;

    cursor: pointer;

    font-size: 1.25rem;
}
.checkbox-box{
    width: 1rem;
    height: 1rem;
    padding: 0.075rem;
    border: 1px solid var(--black);

    margin-right: 6px;

    display: flex;
    align-items: center;
    justify-content: center;
  
}
.answer-wrapper.input-text{

    border: 1px solid var(--gray-border);
    padding:0.15rem 0.5rem;
    width: 95%;
}


.answer-wrapper.days-picker{

}
.day-selector{
    font-weight: 500;
    font-size: 1.05rem;
    color: var(--gray-border);   
    margin-right: 1rem;
    cursor: pointer;
}
.day-selector.daySelected{
    color: var(--normal-blue);
}
.tick{

    transform: scale(1) rotate(-5deg) translateY(-10%);
}
.tick.checked{
 
}
.checkbox-text{
    
}
input.input-text{
    font-size: 1.25rem;
    border: none;
    
   -webkit-appearance:none;
   -moz-appearance:none;
   appearance:none;
   outline: none;

   width: 100%;
}
.error-text{
    color: var(--normal-red);

}
.body .icon{
    --icon-color: var(--gray-border);
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
}

footer.buttons{

    display: flex;
    justify-content: flex-end;
    padding: 0 1.5rem;
    align-items: flex-end;
    height: 100%;
   
}
.buttons .btn{
    width: 7.5rem;
    height: 1.85rem;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
@media screen and (min-width:768px){
.buttons .btn:hover{
    background: var(--light-blue);
    color: var(--normal-blue);
    border: 1px solid var(--light-blue);
    
}   
}

.next{
    background: var(--normal-blue);
    color: var(--white);
 
    margin-right: 1.25rem;
}
.prev{

    border: 1px solid var(--normal-blue);
    color: var(--normal-blue);
}
@media screen and (max-width: 650px){
.container{

    width: 100%;
    min-height: 0;
    height: var(--mobile-height);
    max-height: var(--mobile-height);
    padding-bottom: 1rem;
    border-radius: 0px;



    grid-row-gap:1.5em;
    grid-template-rows: 4rem 1fr 5rem;


    
} 
header.title{
    margin-bottom: 1.5rem;
    height: 4.75rem;
    padding: 0 1.25rem 0 0.75rem;
}
div.title{
    font-size: 1.75rem;

}
.body{
    padding: 0rem 0.75rem;
    margin-bottom: 4rem;
}
.page{
    display: grid;
    grid-template-columns:1fr;
 

    grid-row-gap: 1.75rem;
}
.each-wrapper{
    display: grid;
    grid-template-columns: 1.65rem 1fr;

}
.custom-checkbox{

    margin-right: 2rem;

    font-size: 1.35rem;
}
.checkbox-box{
    width: 1.225rem;
    height: 1.225rem;
    padding: 0.1rem;
    border: 1px solid var(--black);

    margin-right:0.5rem;

  
}
.tick{

    transform: scale(1) rotate(-5deg) translateY(-6.5%);
}

footer.buttons{
    justify-content: space-between;
    padding:0 1rem;
    align-items: center;

}
.buttons .btn{
    font-size: 1.425rem;
    width: 50%;

    height: 2.5rem;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.05);
}


}

</style>