<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 18 78" class="icon">
            <path d="M54.5,40.9H45.1a4.27,4.27,0,0,0-4.3,4.3v9.4a4.27,4.27,0,0,0,4.3,4.3h9.4a4.27,4.27,0,0,0,4.3-4.3V45.2A4.33,4.33,0,0,0,54.5,40.9Z" transform="translate(-40.8 -10.9)"/>
            <path d="M54.5,10.9H45.1a4.27,4.27,0,0,0-4.3,4.3v9.4a4.27,4.27,0,0,0,4.3,4.3h9.4a4.27,4.27,0,0,0,4.3-4.3V15.2A4.33,4.33,0,0,0,54.5,10.9Z" transform="translate(-40.8 -10.9)"/>
            <path d="M54.5,70.9H45.1a4.27,4.27,0,0,0-4.3,4.3v9.4a4.27,4.27,0,0,0,4.3,4.3h9.4a4.27,4.27,0,0,0,4.3-4.3V75.2A4.33,4.33,0,0,0,54.5,70.9Z" transform="translate(-40.8 -10.9)"/>
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