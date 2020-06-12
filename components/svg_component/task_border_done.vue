<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 62.68 73.59" class="icon">
            <path d="M72.51,65.58V82.05H29.64V19.8H42.86v3.26H59.29V19.8H72.51v6.63c.63-.06,1.27-.09,1.91-.09a13,13,0,0,1,1.4.05V16.5H26.32V85.35h49.5V65.62c-.46,0-.93.06-1.4.06C73.78,65.68,73.14,65.64,72.51,65.58Z" transform="translate(-26.32 -11.76)"/><path d="M46.12,32.9V26.34h-9.9v9.83h9.9Zm-3.3,0h-3.3V29.62h3.3Z" transform="translate(-26.32 -11.76)"/><path d="M46.12,52.56V46h-9.9v9.83h9.9Zm-3.3,0h-3.3V49.29h3.3Z" transform="translate(-26.32 -11.76)"/>
            <polygon points="54.37 26.14 42.7 37.72 38.04 33.09 35.7 35.41 40.37 40.04 42.7 42.36 45.04 40.04 56.71 28.45 54.37 26.14"/>
            <path d="M39.52,65.68h-3.3v9.83h9.9V65.68Zm3.3,6.55h-3.3V69h3.3Z" transform="translate(-26.32 -11.76)"/>
            <path d="M51.07,14.91a1.63,1.63,0,0,1,1.63,1.58H56a5,5,0,0,0-9.89,0h3.32A1.62,1.62,0,0,1,51.07,14.91Z" transform="translate(-26.32 -11.76)"/>
            <path d="M72.52,29.62A16.39,16.39,0,1,0,89,46,16.39,16.39,0,0,0,72.52,29.62Zm0,29.48A13.1,13.1,0,1,1,85.71,46,13.1,13.1,0,0,1,72.52,59.1Z" transform="translate(-26.32 -11.76)"/>
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

