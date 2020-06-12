<template>
    <transition name="roll-up">
        <div class="back-board" v-if="doesNewTaskBoardShow">
            <div class="container">

                <header class="head">
                    <div class="title">{{ enableEditTask ? 'editing' : 'new'}} notes / to do list</div>
                    <cross-icon class="cross icon" @iconClicked="endingAction(false)"></cross-icon>
                </header>

                <section class="typing-title-area" >
                  
                    <input type="text" class="new-task-notes-title" placeholder="type the title..." v-model="title" maxlength="25"> 
                </section>

                <section class="body">               
                    <div class="datails-container row">
                        <details-icon class="details icon" :class="{'typing':detailTyping}"></details-icon>
                        <textarea class="datalis-input-area" placeholder="type your appointment datails..."  v-model="details"  @focus="detailTyping = true" @focusout="detailTyping = false" ></textarea>
                    </div>
                    <div class="error-text-wrapper row" v-if="errorText != ''">
                
                        <div class="error-text">{{ errorText }}</div>
                    </div>
                </section>

        
                <footer class="floor">
                    <div class="btn-container">
                        <div class="save btn" @click="formatChecker">save</div>
                        <div class="cancel btn" @click="endingAction(false)">cancel</div>
                        
                    </div>
                </footer>
        
            </div>

        </div>
    </transition>
</template>

<script>
import crossIcon from '../svg_component/cross_normal.vue'
import detailsIcon from '../svg_component/detail_article.vue'
import {mapState,mapMutations,mapActions} from 'vuex'
import db from '../../firebase/firebaseinit.js'
import firebase from 'firebase'
import {bus} from '../../main.js'
export default {
    components:{
        'cross-icon':crossIcon,
        'details-icon':detailsIcon
    },
    computed:{
        ...mapState([
            'doesNewTaskBoardShow',
            'enableEditTask'
        ]),
    },
    filters:{

    },   
    data(){
        return{

            title:'',
            details:'',
            errorText:'',

            ref:'',

            detailTyping:false
        }
    },
    methods:{
        ...mapMutations([
           'toggleNewTaskStatus',
           'loading',
           'showPrompt'
        ]),
        ...mapActions([
            'getUserTask'
        ]),
        initializeData(){
            this.title = '',
            this.details = ''
            this.ref = ''
        },

        formatChecker(){

            if(this.title.length > 25){
                this.errorText = 'title only can be 25 character'
                return
            }

            if(this.title.length <= 0){
                this.errorText = 'title can not be empty'
                return                
            }
            if(this.enableEditTask){
                this.updateEdingTask();
            }else{
                this.submitNewNotes();
            }
            
            
        },
        submitNewNotes(){
            this.loading();

            let currentUser = firebase.auth().currentUser;
            db.collection('user-profile').doc(currentUser.uid).collection('user-task').add({
                isItFinished:false,
                title:this.title,
                content:this.details,
                
            }).then(() => {
                this.endingAction(true);
                this.emitStatus(true);
            }).catch(err => {
                console.log(err);
                this.errorText = err;
                this.emitStatus(false);
            });

        },
        updateEdingTask(){
            this.loading();
            let currentUser = firebase.auth().currentUser;
            db.collection('user-profile').doc(currentUser.uid).collection('user-task').doc(this.ref).update({
                title:this.title,
                content:this.details,                
            }).then(() => {
                this.emitStatus(true);
                this.endingAction(true);
                
            }).catch(err => {
                console.log(err);
                this.errorText = err;
                this.emitStatus(false);
            });
        },
        endingAction(DidItNeedLoading){
            this.errorText = '';
            this.initializeData();
            this.getUserTask();
            this.toggleNewTaskStatus();
            if(DidItNeedLoading){
                this.loading();
            }
        },
        emitStatus(doesItSuccess){
            let msg = '';
            if(doesItSuccess){
                msg = this.enableEditTask ? 'edited a note successful' : 'added a new note successful';
            }else{
                msg = 'failed added a note';
            }

            this.showPrompt({success:doesItSuccess,msg:msg});
        },

        localizeData({content,title,ref}){
            this.title = title;
            this.details = content;
            this.ref = ref;
        }
    },
    created(){
      
        this.initializeData();
        bus.$on('injectTaskData',this.localizeData);
    },
    beforeDestroy(){
        bus.$off('injectTaskData',this.localizeData);
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
    width: 30rem;
    background: var(--white);
    padding: 0.75rem 0.65rem 0.75rem 0.5rem;
    border-radius: 4px;
}
.head{
  

    display: grid;
    grid-template-columns: 1fr 1.45rem;
    align-items: center;

    padding-right: 0.15rem;
    width: 100%;
}
.title{
    font-size: 1.75rem;
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
.typing-title-area{
    width: 100%;
    padding: 0 0.75rem;
    margin-bottom: 0.75rem;

    
}



.new-task-notes-title{
   
    width: 100%;
    border: none;
    border-bottom: 1.5px solid var(--gray-border);
    outline: none;
    font-size: 1.675rem;
    font-weight: 300;
    margin-top: 0.75rem;
    padding: 0.15rem 0;
}
.new-task-notes-title:focus{
   border-bottom: 1.5px solid var(--normal-blue);

}

.icon{
    width: 1.85rem;
    --icon-color:var(--dark-gray);
    margin-right: 1rem;
}
.icon.typing{
    --icon-color:var(--normal-blue);
}
.btn{
    width: 8.5rem;
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


.body{
    display: grid;
    grid-template-columns: 1fr;
  
}

.row{
    padding: 0.5rem 0.75rem;
    display: flex; 
}


.icon.details{
    margin-top: 0.15rem
}
.datalis-input-area{
    margin-left: 0.35rem;
    width: calc(100% - 3rem);
    height: 7.5rem;

    font-size: 1.25rem;
    font-weight: 300;
    padding: 0.15rem 0.25rem;

    outline-color: var(--normal-blue);
}
.error-text{
    margin-left: 3.25rem;
    font-size: 1.25rem;
    color: red;
}

.floor{
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  
}
.btn-container{

    display: flex;
    padding: 0 0.75rem;
  
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

}  
.head{
  


    grid-template-columns: 1fr 2rem;
    align-items: center;

    padding:0 0.5rem;
    width: 100%;
    height: 4rem;

    border-bottom: 1px solid var(--gray-border);
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
.typing-title-area{
    width: 100%;
    padding: 0 0.75rem;
    margin-bottom: 0rem;    

    border-bottom: 1px solid var(--gray-border);
}
.new-task-notes-title{
    width: 100%;
    height: auto;

    border: none;

    font-size: 1.75rem;

    margin: 0;
    padding:1rem 0;
}
.new-task-notes-title:focus{
   border-bottom: none;
}

.calendar{
    
}
.icon{
    width: 2.5rem;

    margin-right: 1rem;
} 

.btn{
    width: 100%;
    padding: 0.15rem 0;

    font-size: 1.325rem;

    cursor: pointer;
    transition: 0.25s;
    

}

.body{
    border-bottom: 1px solid var(--gray-border);
    padding: 1rem 0;
}
.icon.details{
    margin-top: 0.15rem
}
.datalis-input-area{
 
    width: 85%;
    height: 9rem;

    font-size: 1.35rem;


    outline-color: var(--normal-blue);

    border-radius: 0;
    border:1px solid var(--gray-border);


}
.error-text{
    margin-left: 3.25rem;
    font-size: 1.25rem;
    color: red;
}

.floor{
    display: flex;
    justify-content: center;
    margin-top: 0rem;
    padding: 1rem 0;

    border-bottom: 1px solid var(--gray-border);
  
}
.btn-container{


    width: 100%;
  
}
.btn-container .btn{
    width: 100%;
}
.btn.cancel{

    
    
}
.btn.save{

    margin-right: 1rem;
    opacity:1;
  
}
.btn.save:hover{
    opacity: 1;
}
.btn.cancel:hover{
    background: none;
    color: var(--normal-blue);
}
}

</style>