<template>
    <transition name="propmt-list" mode="out-in" ><!-- last and first element animation -->
        <transition-group class="container" tag="div" name="propmt-list"  v-if="eachPrompt.length >= 1" mode="out-in">
            <div class="each-prompt" v-for="({success,msg},index) in eachPrompt" :key="index" >
                <component :is="success ? 'tick-icon' : 'cross-icon'" class="icon" :class="success ? 'tick' : 'cross'"></component>
                <span class="msg">{{ msg }} </span>
            </div>
        </transition-group>
    </transition>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import tickIcon from '../svg_component/tick.vue'
import crossIcon from '../svg_component/cross_normal.vue'

export default {
    components:{
        'tick-icon':tickIcon,
        'cross-icon':crossIcon
    },
    data(){
        return{
            triggerAnimation:false
        }
    },
    computed:{
        ...mapState([
            'doespromptShow',
            'promptMsg',
            'promptShowTick',
            'eachPrompt'

        ]),


    },
    methods:{
        ...mapMutations([
            'showPrompt'
        ]),

    },
        
}
</script>

<style scoped>
.container{
    position: fixed;
    bottom: 2.5%;
    right: 2.5%;

    display: flex;
    flex-direction: column-reverse;


}

.each-prompt{

    display: flex;
    align-items: center;



    min-width: 15rem;

    padding: 0.85rem 1.5rem;
    margin-top: 1rem;
    background: var(--normal-blue);
    
    border-radius: 4px
}

@keyframes enterFade {
    0%{
        opacity: 0;
        transform: translateY(0%)
    }    
    100%{
        opacity: 1;
        transform: translateY(150%)
    }

}

.icon{


    width: 1.75rem;
    height: 1.75rem;
    margin-right: 1rem
    
    
}
.icon.tick{
    --icon-color:var(--light-green)
}
.icon.cross{
    --icon-color:var(--normal-red)
}
.msg{
    word-wrap: none;
    font-size: 1.5rem;

    padding-bottom: 0.1rem;
    color: var(--white);

}
.propmt-list-enter-active,.propmt-list-leave-active{
    transition: 0.5s;
}
.propmt-list-enter,.propmt-list-leave-to{
    transform: translateY(125%)
}
.propmt-list-enter-to,.propmt-list-leave{
    transform: translateY(0%)
}   
@media screen and (max-width:550px){
.container{


}   
}
</style>