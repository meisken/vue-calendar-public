<template>
    <div  @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 78 78" class="icon">
            <path class="cls-1" d="M0,39A39,39,0,1,1,39,78,39,39,0,0,1,0,39ZM20.15,23.55a4,4,0,0,0-4,4V51.07a4,4,0,0,0,4,4h38.4a4,4,0,0,0,4-4V27.54a4,4,0,0,0-4-4Z"/>
            <rect x="34.68" y="33.34" width="31.54" height="5" transform="translate(-11.4 33.87) rotate(-33.57)"/>
            <rect x="25.01" y="20.11" width="5" height="31.46" transform="translate(-17.57 38.84) rotate(-56.31)"/>
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

