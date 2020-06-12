<template>
    <div class="mother">
        <div class="title">
            <div class="year-and-month">{{ monthNames[currentMonth] + " " + currentYear }}</div>
            <div class="MonthBtn-container">
                
                <div class="prev-month-btn MonthBtn" @click="prevOrNextMonth(-1)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.00024 47.99976" x="0px" y="0px"><path d="M4.00012,47.99976a4,4,0,0,1-2.82861-6.82862L18.34338,23.99976,1.17151,6.82837A4.00027,4.00027,0,0,1,6.82874,1.17114l20,20a4.00061,4.00061,0,0,1,0,5.65723l-20,20A3.98887,3.98887,0,0,1,4.00012,47.99976Z"></path></svg></div>
                <div class="next-month-btn MonthBtn"  @click="prevOrNextMonth(1)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.00024 47.99976" x="0px" y="0px"><path d="M4.00012,47.99976a4,4,0,0,1-2.82861-6.82862L18.34338,23.99976,1.17151,6.82837A4.00027,4.00027,0,0,1,6.82874,1.17114l20,20a4.00061,4.00061,0,0,1,0,5.65723l-20,20A3.98887,3.98887,0,0,1,4.00012,47.99976Z"></path></svg></div>
            </div>
        </div>
        <div>
            <table>
         
                <tr class="dateHeader" >
                    <th v-for="(day,index) in dayNames" :key="index">{{ day }}</th>
                </tr>
               
                <tr class="dateBody">
                    <th v-for="(day,index) in dayNumbers" :key="index" @click="dateNumberClicked(index)" :class="[{today : initializeDay  == index - firstDay + 1 && isThisYearAndMonth },{dayOfNotBlank: index >= firstDay}]">{{ day }}</th>
                    <div class="default-btn" @click="initializeDate">show dafault</div>
                </tr>
               
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            initializeYear:null,
            initializeMonth:null,
            initializeDay:null, 
            

            currentYear:null,
            currentMonth:null,
            currentDay:null,

            firstDay:null,
            totaldaysInMonth:null,

            monthNames:['January','February','March','April','MAY','June','July','August','September','October','November','December'],
            dayNames:['su','mo','tu','we','th','fr','sa'],
            dayNumbers:[],

        }
    },
    computed:{
        isThisYearAndMonth(){
            return this.currentYear == this.initializeYear && this.currentMonth == this.initializeMonth;
            //checking Is the day in the mount and year of now
        },
    

    },
    methods:{
        initializeDate(){
            var today = new Date();

            this.initializeYear = today.getFullYear();
            this.initializeMonth = today.getMonth();
            this.initializeDay = today.getDate();
    

            this.currentYear = today.getFullYear();
            this.currentMonth = today.getMonth();
            this.showCalendar(this.currentYear,this.currentMonth);
            this.emitDate();
        },
        dateNumberClicked(index){

            if(index >= this.firstDay){
                var whichDay = index - this.firstDay + 1;
                this.changeDay(this.currentYear,this.currentMonth,whichDay);//get the day when clicked
                this.emitDate();
            }
        },
        emitDate(){

            this.$emit('dayChanged',{
                year:this.initializeYear,
                month:this.initializeMonth,
                day:this.initializeDay
            })
 
 
        },
        changeDay(year,month,day){

            this.initializeYear = year;
            this.initializeMonth = month;
            this.initializeDay = day;
            //here is for update the inital date to current
        

            if(this.initializeYear != this.currentYear){
                this.currentYear = this.initializeYear;
                this.showCalendar(year,month);
            }
            if(this.initializeMonth != this.currentMonth){
                this.currentMonth = this.initializeMonth;
                this.showCalendar(year,month);
            }//check has it updated
            

        },

        prevOrNextMonth(prevOrNext){
            this.currentMonth += prevOrNext;

            if(this.currentMonth > 11){
                this.currentYear += 1;
                this.currentMonth = 0;
            }
            if(this.currentMonth < 0){
                this.currentYear -= 1;
                this.currentMonth = this.monthNames.length - 1;
            }
            // update the current year and month then show on calendar

            this.showCalendar(this.currentYear,this.currentMonth);
        },
        showCalendar(year,month){

            this.dayNumbers = [];
            this.firstDay = (new Date(year, month)).getDay();
            this.totaldaysInMonth = 32 - new Date(year, month, 32).getDate();



            for( var i = 1 ; i <= this.firstDay ; i++ ){
                this.dayNumbers.push("");
            }// the blank space before first day
            for(var l = 1; l <= this.totaldaysInMonth; l++ ){
                this.dayNumbers.push(l);
            }//render the day

            
        },

    },
    created(){


        //initialize the date
        this.initializeDate();
        
   
    }
}
</script>

<style scoped>
/*
    body{
        background: #F9F9F9;
        font-family: "Segoe UI";
        display: flex;
        justify-content: center;
        align-items: center;
        height: 95vh;
    }   
    *{
        box-sizing: border-box;
    }
*/
    .mother{
        width: 19rem;
        min-height: 18.5rem;
       
   
        background: var(--white);
      

        box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
        border-radius: 6px;

        color: var(--black);
        padding:0.5% 0 3% 0;
    }
    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
    
        width: 100%;
        padding: 0.25rem 0rem 0.2rem 0.4rem;
 
        border-bottom: 1px solid var(--dark-gray);

        
        color: var(--black);

    }
    .year-and-month{
        font-size: 1.625rem;
        font-weight: 400;
        text-transform: uppercase;
        
    }
    .MonthBtn-container{
        display: flex;
        align-items: center;
      

      
   
    }
    .MonthBtn{

        width: 1.125rem;
        height: 1.125rem;
        margin-left:0.5rem; 
        cursor: pointer;
        margin-top: 0.15rem;

    }
    .MonthBtn svg{
        height: 100%;
        width: 100%;
        fill: var(--black);
       
    }
    .prev-month-btn{
       
        transform: rotate(180deg);

 
   
    }
    .next-month-btn{

    
    }
    table{
        width: 100%;
        display: block;
        padding: 0 0.5rem 0% 0.5rem;
        
        color: var(--black);
      
    }
    tr{
 
     
        display: grid;
        grid-template-columns: repeat(7,1fr);
        grid-auto-rows: 1.65rem;
        grid-column-gap: 1.1rem;
        grid-row-gap: 0.75rem;

        justify-items: center;
        align-items: center;
        
  
    }
    .dateHeader{
        margin-bottom: 0.25rem;
    }
    th{
        font-weight: 400;
        font-size: 1.15rem;
       
        width: 100%;
        height: 100%;
        max-width: 2rem;
        max-height: 2rem;
 
   
    }
    .today{
        background: var(--light-blue);
        color: var(--white);
        border-radius: 999px;
    }
    th.dayOfNotBlank{
        cursor: pointer;
        font-weight: 300;
    }
    th.dayOfNotBlank:hover{
        background: var(--light-blue);
        color: var(--white);
        border-radius: 999px;
    }
    .default-btn{
        grid-column: 1 / 8;
       

        width: 100%;
  
        padding: 0.15rem 0;

        display: flex;
        align-items: center;
        justify-content: center;

        background: var(--light-blue);

        cursor: pointer;

        opacity: 0.7;

        font-size: 1.1rem;
        font-weight: 400;
        color: var(--dark-blue);
        box-shadow: 0px 3px 6px  rgba(0,0,0,0.05);
    }

    .default-btn:hover{
        opacity:1;
    }
</style>