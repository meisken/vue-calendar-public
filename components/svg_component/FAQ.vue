<template>
    <div @click="emitClickEvent" class="wrapper">
        <svg viewBox="0 0 459 462.5" class="icon" >
            <path d="M230,0C356,0,459,103,459,230c0,126-103,229-229,229-38,0-76-9-109-27L19,462c-11,3-22-8-18-19L30,343C10,309,0,270,0,230,0,103,103,0,230,0Zm0,30A199.43,199.43,0,0,0,59,333c2,4,3,8,1,13L37,426l81-24a16.72,16.72,0,0,1,12,1c30,18,65,27,100,27,110,0,200-90,200-200C430,119,340,30,230,30Z"/>
            <path d="M152,165a79.14,79.14,0,0,1,77-62c43,0,78,35,78,79,0,36-26,68-61,76v34H212V246c0-10,8-19,19-20a44,44,0,0,0,42-44c0-25-20-45-44-45a44.87,44.87,0,0,0-44,35Z"/>
            <path class="cls-1" d="M229,316a20,20,0,1,1-20,20A20.06,20.06,0,0,1,229,316Z"/>
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

