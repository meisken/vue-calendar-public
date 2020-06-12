<template>
    <div class="cotainer">
        <header class="title">
            <span class="title-text">Notes / To do list</span>
        </header>
        <section class="notes">
            <div class="note" v-for="(task,index) in unfinisheTask" :key="index" @click="userTaskHaveFinished({isItFinished:task.isItFinished,ref:task.ref})">
                <span class="task-title">{{task.title}}</span>
                <div class="tick-box"><span class="tick-symbol">&#10003;</span></div>
            </div>
            <div class="have-no-note-text" v-if="taskData.length == 0">no result...</div>
        </section>
        <footer class="btn-container">
            <div class="btn" @click="toggleNewTaskStatus()">+add a new note</div>
        </footer>
    </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import db from '../../../../../firebase/firebaseinit.js'
import firebase from 'firebase'
export default {
    computed:{
        ...mapState([
            'taskData',

        ]),
        unfinisheTask(){
            let task = [];
            this.taskData.forEach(eachTask => {
                if(!eachTask.isItFinished){
                    task.push(eachTask);
                }
            });

            return task 
        }
    },
    methods:{
        ...mapActions([
            'getUserTask',
            'userTaskHaveFinished'
            
        ]),
        ...mapMutations([
            'toggleNewTaskStatus' ,

        ]),


    },

    mounted(){
        this.getUserTask();
        
    }
}
</script>

<style scoped>

.cotainer{

    width: 100%;
    min-height: 20rem;
    background: var(--white);
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    border-radius: 6px;


    display: grid;
    grid-template-rows: 2.75rem 1fr 3rem;

    color:var(--black);

    
}

header.title{
    padding: 0.25rem 0rem 0rem 0.4rem;
    border-bottom: 1px solid var(--dark-gray);

}
.title-text{
    font-weight: 400;
    font-size: 1.65rem;
}
section.notes{
    display: grid;
    grid-auto-rows: 2.75rem;
    padding: 0 0.5rem;
  
    align-items: center;

}
div.note{
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 0;
}

div.note:hover{

}

.task-title{

    font-size: 1.375rem;
    font-weight: 300;
    margin-bottom: 0.25rem;
    position: relative;

}
div.note:hover .task-title{
    color:var(--normal-blue);
}
div.note:hover .task-title::before{
    content: '';
    position: absolute;

    top: 50%;

    left: -5%;

    width: calc(100% + 1rem);
    height: 0.15rem;
    border-radius: 2%;
    background: var(--normal-blue);
}
.tick-box{
    
    height: 1.2rem;
    width: 1.2rem;
    font-size: 1.05rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border:1px solid var(--black);


}
div.note:hover .tick-box{
    border:1.5px solid var(--normal-blue);
}
.tick-symbol{
    display: none;
}
div.note:hover .tick-symbol{
    display: block;
    color: var(--normal-blue);
}
footer.btn-container{

    padding:0.55rem 0.5rem;
}
.btn{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--light-blue);
    color: var(--dark-blue);
    opacity: 0.8;
    font-size: 1.1rem;
    cursor: pointer;

    box-shadow: 0px 3px 6px  rgba(0,0,0,0.05);
}
.btn:hover{
    opacity: 1;
}
.have-no-note-text{
    font-size: 1.25rem;
    font-weight: 300;
}
@media screen and (max-width: 1065px){
header.title{
    border-bottom: 1px solid var(--light-gray);
    /*
    background: var(--light-blue);
    border-bottom: none;
    */
}    
.cotainer{

    box-shadow:none;
    min-height: 12.5rem;
    grid-template-rows: 2.75rem 1fr 3.25rem;

}
.btn{

    font-size: 1.25rem;

}
section.notes{

    grid-auto-rows:3.15rem;

  


}
}
@media screen and (max-width: 768px){
div.note:hover .task-title{
    color:var(--black);
}
div.note:hover .task-title::before{
    content: none;

}
div.note:hover .tick-box{
    border:1px solid var(--black);
}
div.note:hover .tick-symbol{
    display: none;
  
}
}
@media screen and (max-width: 550px){
.cotainer{


    grid-template-rows: 3rem 1fr 3.425rem;

 
}
header.title{


    background: var(--light-blue);
    border-bottom: none;
    padding: 0.35rem 0rem 0rem 0.4rem;

    color: var(--black)
}  

.btn{
    padding: 0.5rem 0;
    font-size: 1.35rem;

}  
.task-title{
    font-size: 1.625rem;

}
section.notes{

    grid-auto-rows:3.5rem;

  


}    
}
</style>