<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 50 50" class="icon">
            <path class="cls-1" d="M21.2,20.59h6.39V35.24H28.8v3.44H21.2V35.24h1.2V24H21.2ZM28,14.35a3,3,0,1,1-3-3A3,3,0,0,1,28,14.35ZM25,50A25,25,0,1,0,0,25,25,25,0,0,0,25,50Z"/>
        </svg>
    </div>
</template>

<script>
import iconMixins from './script/mixin.js'
import './style/icon_style.css'
export default {
    mixins:[iconMixins],

}
</script>

<style scoped>
.cls-1{
    fill-rule:evenodd;
 
}
</style>

