<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg  viewBox="0 0 80.06 60" class="icon">
            <path d="M87.6,30.8,42.7,77.5a6.17,6.17,0,0,1-9,0L11.3,54a6.83,6.83,0,0,1,0-9.4,6.17,6.17,0,0,1,9,0l18,18.8,40.4-42a6.17,6.17,0,0,1,9,0A6.93,6.93,0,0,1,87.6,30.8Z" transform="translate(-9.43 -19.45)"/>
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
