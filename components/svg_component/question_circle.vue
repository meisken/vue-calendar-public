<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 32 32" class="icon">
            <path d="M16,32A16,16,0,1,1,32,16,16,16,0,0,1,16,32ZM16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Z"/>
            <circle cx="16.04" cy="21" r="1"/>
            <path d="M16,19a1,1,0,0,1-1-1c0-1.33,1.18-2.34,2.33-3.16a1.81,1.81,0,0,0,.53-1.78A1.9,1.9,0,0,0,16.1,12h0A2.17,2.17,0,0,0,14,13.35a1,1,0,1,1-1.88-.7,4.19,4.19,0,0,1,4-2.68h0a3.89,3.89,0,0,1,3.7,2.47,3.8,3.8,0,0,1-1.28,4C17.19,17.42,17,17.85,17,18A1,1,0,0,1,16,19Z"/>
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