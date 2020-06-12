<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 320 345.75"  class="icon">
            <path class="cls-1" d="M11,39H73V13c0-17,27-17,27,0V39H220V13c0-17,27-17,27,0V39h63c5,0,10,5,10,11V335c0,6-5,11-10,11H11A11.1,11.1,0,0,1,0,335V50A11.1,11.1,0,0,1,11,39Zm6,77H303V329H17Z" transform="translate(0 -0.25)"/>
            <path d="M117,228c-8-8,4-21,12-13l20,21,46-46c8-8,20,5,12,13l-51,51a10.51,10.51,0,0,1-13,0Z" transform="translate(0 -0.25)"/>
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

