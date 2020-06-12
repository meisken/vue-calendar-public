<template>
    <div class="btn-wrapper" @click="emitClick">
        <slot name="btn-name"></slot>
    </div>
</template>

<script>
export default {
    methods:{
        emitClick(){
            this.$emit('onClick')
        }
    }
}
</script>

<style scoped>
.btn-wrapper{
    

    cursor: pointer;


    display: flex;
    align-items: center;
    justify-content: center;


    
    
}
</style>