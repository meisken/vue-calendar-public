<template>
    <transition name="fade">
        <div class="container" v-if="loading">
            <svg class="loading-element"><circle cx="50" cy="50" r="50"></circle></svg>
        </div>
    </transition>
</template>

<script>
import {mapState} from 'vuex'
export default {
     computed:{
        ...mapState([
            'loading'
        ]),
    },
}
</script>

<style scoped>

.container{
    position: fixed;
    z-index: 10000;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    background: rgba(0,0,0,0.6);
    
    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
}
.loading-element{
    position: relative;
    width: 110px;
    height: 110px;
    animation: rotate 2s linear infinite;
}
.loading-element circle{
    width: 100%;
    height: 100%;
    fill: none;
    stroke-width: 10;
    stroke: white;
    stroke-linecap: round;
    stroke-dasharray: 440;
    stroke-dashoffset: 440;
    transform: translate(5px,5px);

    animation: loadingAnimation 4s linear infinite;
}
@keyframes rotate{
    0%{
        transform: rotate(0deg)
    }
    100%{
        transform: rotate(360deg)
    }
}
@keyframes loadingAnimation{
    0%{
        stroke-dashoffset: 440;
    }
    50%{
        stroke-dashoffset: 0;
    }
    5.1%{
        stroke-dashoffset: 880;
    }
}
</style>