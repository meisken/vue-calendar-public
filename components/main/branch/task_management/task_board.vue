<template>
    <div class="task-board-container">
        <title-header>
            <span slot="title">Task board</span>
        </title-header>
        <section class="body">
            <header class="head">
                <div class="headline">Notes / To do list</div>
                <toggle-button leftText="all" rightText="limited" class="toggle-btn" :valueBinding="showFinishedTask" v-model="showFinishedTask"></toggle-button>

            </header>
            <section class="tasts-container">
                <div class="task-wrapper" v-for="({content,title,ref,isItFinished},index) in filteredTask" :key="index" :class="{'finished' : isItFinished}">
                    <div class="task-head" @click="userTaskHaveFinished({isItFinished,ref})">
                        <div class="task-title">{{ title }}</div>
                        <div class="task-check-box">
                            <tick-icon class="tick icon"></tick-icon>
                        </div>

                    </div>
                    <div class="task-body">
                        {{ content }}
                    </div> 
                    <div class="task-footer">
                        <div class="delete btn border" @click="deleteTask(ref,title)">delete</div>
                        <div class="edit btn fill" @click="toggleEditTaskStatus({content,title,ref})">edit</div>
                    </div>
                </div>
            </section>

            <add-button @click="toggleNewTaskStatus()"></add-button>
        </section>

    </div>
</template>

<script>
import titleHeader from '../../components/title_header.vue'
import tickIcon from '../../../svg_component/tick.vue'
import addBtn from '../../components/add_plus_button.vue'
import toggleBTn from '../../../template/toggle_button.vue'

import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    data(){
        return{
            showFinishedTask:false,
        }
    },
    components:{
        'title-header':titleHeader,
        'tick-icon':tickIcon,
        'add-button':addBtn,
        'toggle-button':toggleBTn
    },
    computed:{
        ...mapState([
            'taskData',
            'editingTaskTemp'

        ]),
        filteredTask(){
            let task = [];
            this.taskData.forEach(eachTask => {
                if(!eachTask.isItFinished || this.showFinishedTask){
                    task.push(eachTask);
                }
            });

            return task 
        }
    },
    methods:{
    ...mapActions([
        'getUserTask',
        'userTaskHaveFinished',
        'deleteUserTask'
        
    ]),
    ...mapMutations([
        'toggleNewTaskStatus' ,
        'toggleEditTaskStatus',
        'showAlert'

    ]),

    deleteTask(ref,title){
        this.showAlert({msg:'Are you sure to delete this <' +  title  + '> ?',needCancel:true,func:this.deleteUserTask,funcChild:ref});
    }
    


    },
    mounted(){
        this.getUserTask();


    }
}
</script>

<style scoped>

.task-board-container{
    background: var(--gray-background);
    height: 100vh;
    width:var(--router-component-width);
    overflow-x: hidden;
    overflow-y: auto;   
 
}
.body{
    margin: 3rem auto;
    
    background: var(--white);
    width: 100%;
    max-width:1100px ;
    min-height: 45rem;
    padding:0.5rem 0.5rem;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);

    border-radius: 12px;
    position: relative;
}

.body .head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem 0.5rem 0.5rem;
    border-bottom: 1px solid var(--gray-border);
}
.headline{
    font-size: 1.75rem;
    color:var(--black);
  
}

.toggle-btn{
    --toggle-btn-width:8rem;
    --toggle-btn-height:2.1rem;
    --toggle-btn-font-size:1.25rem;
}
.btn{
    font-size: 1.25rem;

    border-radius: 2px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

  
 
    

}
.btn.fill{
    background: var(--light-blue);
  
    color: var(--dark-blue);
    opacity: 0.8;
}

.btn.border{
    border: 1px solid var(--normal-blue);
    color: var(--normal-blue);
}
.btn:hover{
    background: var(--normal-blue);
    color: var(--white);
    opacity: 1;
}
.tasts-container{
    display: grid;
   
    grid-template-columns: repeat(auto-fit,minmax(21.5em,auto));
    grid-gap: 2.25rem;

    padding: 1rem 0.5rem;
    
}
.task-wrapper{
    width: 100%;
    box-shadow:0 3px 6px rgba(0,0,0,0.16);
    display: grid;
    grid-template-rows: 2.75rem minmax(7.5rem,1fr) 3rem;
    padding: 0.25rem 0.75rem;
    border-radius: 8px;
    background: var(--white);
 
}
.task-wrapper.finished{
    background: var(--light-gray);
    box-shadow:none;
    opacity: 0.8;
}

.task-head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    
}

.task-title{
    font-size: 1.375rem;
    color:var(--black);
    position: relative;
    
}


@media screen and (min-width:550px){
    .task-head:hover .tick{
        display: block;
        
    }
    .task-wrapper:not(.finished) .task-head:hover .task-title::before{
        content: '';
        position: absolute;

        top: 50%;

        left: -5%;

        width: calc(100% + 1rem);
        height: 0.15rem;
        border-radius: 2%;
        background: var(--normal-blue);
        
    }    
    .task-wrapper.finished .task-head:hover .tick{
        display: none;
    }
}


.task-wrapper.finished .tick{
    display: block;
    
}
.task-check-box{
    border: 1px solid var(--black);
    width: 1.25rem;
    height: 1.25rem;
}
.tick{
    --icon-color:var(--dark-green);
    transform:rotate(-7.5deg);
    display: none;
}
.task-body{
    color:var(--black);
    font-weight: 300;
    font-size: 1.15rem;
}
.task-footer{
    display: flex;
    justify-content: flex-end;
    padding: 0.55rem 0;
}
.task-footer .btn{
    font-size: 1.15rem;
    margin-left: 1rem;
    padding: 0.15rem 0 0.25rem 0;
    width: 7.5rem;
}

@media screen and (max-width: 1186px){
.body{
    margin: 0rem auto;
    border-radius: 0px;
    min-height: calc(100vh - 5.75rem);
}  
.body .head{ 
    border-top: 1px solid var(--gray-border);
}
.tasts-container{

    grid-column-gap:4.5%;
    grid-row-gap: 3rem;


    
} 

}
@media screen and (max-width: 768px){
.body{
    background: var(--gray-background);
    padding: 0;
    box-shadow: none;
    padding-bottom: 20vh;
}
.body .head{
    
    padding:0.5rem;
    background: var(--white);
}

.tasts-container{
    padding: 1rem 1rem;

    grid-row-gap: 2rem;


    
} 

}
@media screen and (max-width: 550px){
.body .head{

    padding: 0.75rem 0.5rem 0.75rem 0.5rem;

}
.headline{
    font-size: 1.85rem;
    color:var(--black);
  
}
.toggle-btn{
    --toggle-btn-width:8.5rem;
    --toggle-btn-height:2.4rem;
    --toggle-btn-font-size:1.425rem;
}
.task-title{
    font-size: 1.65rem;
    color:var(--black);
}
.task-check-box{
    border: 1px solid var(--black);
    width: 1.425rem;
    height: 1.425rem;
}
.task-body{
    color:var(--black);
    font-weight: 300;
    font-size: 1.3rem;
}
.task-footer{
 
    justify-content: space-between;
    padding: 0.4rem 0;

}
.task-footer .btn{
    font-size: 1.25rem;
    margin-left:0;
    padding: 0.15rem 0 0.25rem 0;
    width: 47.5%;
}
}
@media not all and (hover:hover) {
.task-board-container{


    height: var(--mobile-height,100vh);
  
}
}
</style>