<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 28 28" class="icon">
            <path d="M21,12.46,17.41,16,21,19.54A1,1,0,0,1,21.05,21L21,21a1,1,0,0,1-.71.29,1,1,0,0,1-.7-.29L16,17.41,12.46,21a1,1,0,0,1-.7.29,1,1,0,0,1-.71-1.7L14.59,16l-3.54-3.54a1,1,0,0,1,1.41-1.41L16,14.59l3.54-3.54A1,1,0,0,1,21,11,1,1,0,0,1,21,12.46ZM25.9,25.9a14,14,0,1,1,0-19.8,14,14,0,0,1,0,19.8ZM24.49,7.51a12,12,0,1,0,0,17,12,12,0,0,0,0-17Z" transform="translate(-2 -2)"/>
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