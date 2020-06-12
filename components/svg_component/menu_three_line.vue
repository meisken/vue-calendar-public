<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 54 38" class="icon">
            <path d="M26,31a3,3,0,0,0,0,6H74a3,3,0,0,0,0-6Zm0,16a3,3,0,0,0,0,6H74a3,3,0,0,0,0-6Zm0,16a3,3,0,0,0,0,6H74a3,3,0,0,0,0-6Z" transform="translate(-23 -31)"/>
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