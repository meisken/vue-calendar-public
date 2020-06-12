<template>
    <div  @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 19.93 19.96" class="icon">
            <path d="M17,13.5a1,1,0,0,1,2,0v5.63A2.88,2.88,0,0,1,16.13,22H4.87A2.88,2.88,0,0,1,2,19.13V7.87A2.88,2.88,0,0,1,4.87,5H11a1,1,0,0,1,0,2H4.87A.87.87,0,0,0,4,7.87V19.13a.87.87,0,0,0,.87.87H16.13a.87.87,0,0,0,.87-.87Z" transform="translate(-2 -2.04)"/>
            <path d="M18.11,4.45,10.63,12l-.36,1.77L12,13.37l7.48-7.5Zm.7-2.12,2.83,2.83a1,1,0,0,1,0,1.41L13.24,15a1,1,0,0,1-.51.27L9.2,16A1,1,0,0,1,8,14.8l.71-3.53A1,1,0,0,1,9,10.76l8.4-8.43A1,1,0,0,1,18.81,2.33Z" transform="translate(-2 -2.04)"/>
            <polygon points="12.79 4.17 14.21 2.76 17.21 5.76 15.79 7.17 12.79 4.17"/>
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