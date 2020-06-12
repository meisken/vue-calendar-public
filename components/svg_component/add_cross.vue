
<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 60 60" class="icon">
            <g>
                <rect y="25" width="60" height="10"/>
            </g>
            <g>
                <rect x="25" width="10" height="60"/>
            </g>
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