<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 48.48 50" class="icon">
            <path d="M45.53,20.12V6a1,1,0,0,0-1-1H38a1,1,0,0,0-1,1v5.55L30.71,5.29a1,1,0,0,0-1.42,0L10.77,23.81h0L6.05,28.53A1,1,0,1,0,7.47,30l3-3V54a1,1,0,0,0,1,1h37a1,1,0,0,0,1-1V26.94l3,3A1,1,0,0,0,54,30a1,1,0,0,0,0-1.42ZM39,7h4.57V18.12L39,13.55ZM25.16,53V42.07h9.68V53Zm22.36,0H36.84V41.07a1,1,0,0,0-1-1H24.16a1,1,0,0,0-1,1V53H12.48V24.94L30,7.41l7.25,7.26h0l6.58,6.57h0l3.69,3.7Z" transform="translate(-5.76 -5)"/>
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