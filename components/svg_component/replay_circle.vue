<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 50.33 50.9" class="icon">
            <path d="M54.42,20.87l-4.19,3.75A19.79,19.79,0,1,1,41.65,15l4.18-3.74a25.13,25.13,0,1,0,8.59,9.58Z" transform="translate(-6.83 -6.55)"/>
            <path d="M48.78,6.55,37,18.65l12.77.65Z" transform="translate(-6.83 -6.55)"/>
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