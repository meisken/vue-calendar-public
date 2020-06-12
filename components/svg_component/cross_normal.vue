<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 58.08 58.08" class="icon">
            <path d="M77.58,22.42a5,5,0,0,0-7.07,0L50,42.93,29.49,22.42a5,5,0,1,0-7.07,7.07L42.93,50,22.42,70.51a5,5,0,1,0,7.07,7.07L50,57.07,70.51,77.58a5,5,0,0,0,7.07-7.07L57.07,50,77.58,29.49A5,5,0,0,0,77.58,22.42Z" transform="translate(-20.96 -20.96)"/>
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