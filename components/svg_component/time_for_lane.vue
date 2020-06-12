<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 86.82 86.82" class="icon">
            <path d="M48,19a3,3,0,0,0-3,3V54a3,3,0,0,0,3,3H69a3,3,0,0,0,0-6H51V22A3,3,0,0,0,48,19Z" transform="translate(-6.5 -7.68)"/>
            <path d="M87.1,45.4a3,3,0,0,0,3,2.6h.4A3,3,0,0,0,93,44.6,43.71,43.71,0,0,0,56.4,8a3,3,0,0,0-.9,5.9A37.77,37.77,0,0,1,87.1,45.4Z" transform="translate(-6.5 -7.68)"/>
            <path d="M45.7,7.7A43.51,43.51,0,1,0,93.3,55.3,3,3,0,0,0,90.6,52a3,3,0,0,0-3.3,2.7,37.49,37.49,0,1,1-41-41,3,3,0,1,0-.6-6Z" transform="translate(-6.5 -7.68)"/>
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
