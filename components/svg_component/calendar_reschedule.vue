<template>
    <div  @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 48 48.01"  class="icon">
            <path d="M14,47a9,9,0,1,1,6.28-15.43L17,34.37l8.23.61.61-8.22-3.31,2.85a12,12,0,1,0,2.21,13.75,10.21,10.21,0,0,0,.54-1.28A11.85,11.85,0,0,0,26,38H23A9,9,0,0,1,14,47Z" transform="translate(-2 -2)"/>
            <path d="M17.57,12h.86A2.82,2.82,0,0,0,21,9V5a2.82,2.82,0,0,0-2.57-3h-.86A2.82,2.82,0,0,0,15,5V9A2.82,2.82,0,0,0,17.57,12Z" transform="translate(-2 -2)"/>
            <path d="M37.57,12h.86A2.82,2.82,0,0,0,41,9V5a2.82,2.82,0,0,0-2.57-3h-.86A2.82,2.82,0,0,0,35,5V9A2.82,2.82,0,0,0,37.57,12Z" transform="translate(-2 -2)"/>
            <path d="M46,6H43a.5.5,0,0,0-.5.5V9a4,4,0,0,1-4,4h-1a4,4,0,0,1-4-4V6.5A.5.5,0,0,0,33,6H23a.5.5,0,0,0-.5.5V9a4,4,0,0,1-4,4h-1a4,4,0,0,1-4-4V6.5A.5.5,0,0,0,13,6H10a4,4,0,0,0-4,4V26.52a12.91,12.91,0,0,1,2-1.17V18.5a.5.5,0,0,1,.5-.5h39a.5.5,0,0,1,.5.5V40a2,2,0,0,1-2,2H27.42a13.1,13.1,0,0,1-.77,2H46a4,4,0,0,0,4-4V10A4,4,0,0,0,46,6Z" transform="translate(-2 -2)"/>
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