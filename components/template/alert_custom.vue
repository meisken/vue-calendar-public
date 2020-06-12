<template>
    <div class="container" v-if="doesAlertShow">
        <div class="wrapper">
            <div class="msg-area">
                <tick-circle class="icon" v-if="!needCancel"></tick-circle>
                <question-circle class="icon" v-if="needCancel"></question-circle>
                <span class="msg">{{ alertMsg }}</span>
            </div>
            <div class="btn-area">
                <div class="cancel btn" v-show="needCancel" @click="alertEventHandle">cancel</div>
                <div class="ok btn" @click="alertEventHandle({func:funcContain,funcChild:funcChild})">{{needCancel ? 'yes' : 'ok' }}</div>
            </div>
        </div>

    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import tickCircle from '../svg_component/tick_circle.vue'
import questionCircle from '../svg_component/question_circle.vue'

export default {
    data(){
        return{

            showTickOrOther:false,//true = show tick,false = else
            showCancel:false,

        }
    },
    components:{
        'tick-circle':tickCircle,
        'question-circle':questionCircle
    },
    computed:{
        ...mapState([
            'doesAlertShow',
            'alertMsg',
            'needCancel',
            'funcContain',
            'funcChild'
        ])
    },
    methods:{
        ...mapMutations([
            'alertEventHandle'
        ]),


    },
    created(){

    }
}
</script>

<style scoped>
.container{
    position: fixed;
    z-index: 100000;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    
}
.wrapper{
    width: 27.5rem;
    height: 20rem;

    border-radius: 10px;
}
.msg-area{
   
    width: 100%;
    height: 77.5%;
    padding: 0 5% 2.5% 5%;
    background: var(--normal-blue);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 10px 10px 0 0;
}
.icon{
    width: 5rem;
    height: 5rem;
    --icon-color: white;
    margin-bottom: 1rem;
}

.msg{
    color: white;
    font-weight: 400;
    font-size: 1.25rem;
}
.btn-area{
    width: 100%;
    height: 22.5%;

    display: grid;
    grid-template-columns: repeat(2,1fr);
    background: white;
    border-radius:  0 0 10px 10px;


}
.btn{
    color:  var(--normal-blue);
    font-weight: 400;
    font-size: 1.65rem;

 
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

}
.btn:hover{
    background: rgba(0,0,0,0.3);
    color: white
}


.ok{
    

    border-left:0.5px solid rgba(0,0,0,0.3);
    grid-column: 2/3; 

}
</style>