<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 81.2 80" class="icon">
            <polygon points="47 21.2 47 0 0 0 0 80 47 80 47 58.95 43 58.95 43 76 4 76 4 4 43 4 43 21.2 47 21.2"/>
            <polygon points="55.74 20.2 73.54 38 24 38 24 42 73.54 42 55.74 59.8 58.57 62.63 81.2 40 58.57 17.37 55.74 20.2"/>
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
