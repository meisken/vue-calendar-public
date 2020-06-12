<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 70 70" class="icon">
            <path d="M50,20.7A29.3,29.3,0,1,1,20.7,50,29.28,29.28,0,0,1,50,20.7M50,15A35,35,0,1,0,85,50,35,35,0,0,0,50,15Z" transform="translate(-15 -15)"/><path d="M54,35.1,53.2,55a2.79,2.79,0,0,1-2.9,2.7A2.82,2.82,0,0,1,47.6,55l-.8-19.9a3.53,3.53,0,0,1,3.5-3.7A3.59,3.59,0,0,1,54,34.9Z" transform="translate(-15 -15)"/>
            <circle cx="35.4" cy="50.2" r="3.8"/>
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

</style>
