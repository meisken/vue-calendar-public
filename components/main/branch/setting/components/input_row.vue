<template>
    <div class="setting_row" @click="$emit('click')" :class="{'non-input-style':!modeInput}">
        <span class="title">
            <slot name="title"></slot>
        </span>
        <span class="middle-wrapper">
            <slot name="middle"></slot>
            <span class="error-text">{{ errText }}</span>
        </span>
        <span class="expand-btn-container" v-if="!modeInput">
            <go-arrow-iocn class="expand-btn" :class="{'showing':showing}" ></go-arrow-iocn>
    
        </span>
    </div>
</template>

<script>
import './style/row.css'
import goIcon from '../../../../svg_component/go_v.vue'

export default {
    props:['modeInput','defaultValue','showing','errText'],
    data(){
        return{
            input:'',
        }
    },

    components:{
        'go-arrow-iocn':goIcon
    },
    mounted(){
        this.input = this.defaultValue;
    },

}
</script>

<style scoped>

</style>