<template>
     <div class="main_container" :class="{'nav-show':mobileMenuShow}">
        <slide-nav></slide-nav>
    
        <router-view></router-view>
 
 
    </div>
</template>

<script>
import firebase from 'firebase'
import slideNav from './components/navigation_bar.vue'
import {mapState} from 'vuex'
export default {
    components:{
        'slide-nav':slideNav
    },
    mounted(){

    },
     computed:{
        ...mapState([
            'mobileMenuShow'
        ])
    },
}
</script>

<style>
.main_container{
    display: flex;
    min-width: calc(100vw + 20rem);

    --router-component-width:calc(100vw - 5.75rem);

}
@media screen and (max-width:768px){
.main_container{
    position: relative;
    left: -20rem;
    transition: 0.5s ease-out;
    --router-component-width:100vw;
}
.main_container.nav-show{
    transition: 0.5s ease-in;
    left: -0rem;
}
}


</style>
