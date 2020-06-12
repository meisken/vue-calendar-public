<template>
    <div class="toggle-btn" @click="show = !show" :class="show ? 'all' : 'limited'">
        <span>{{ rightText }}</span>
        <div class="toggle-dots" :data-content="leftText">
            <div></div>
        </div>
    </div>
</template>

<script>
export default {
    props:['leftText','rightText','valueBinding'],

    watch:{
        show(val){
            this.$emit('input',val)
        }
    },
    data(){
        return{
            show:false
        }
    },
    mounted(){
        this.show = this.showFinishedTask;
    }
}
</script>

<style scoped>
.toggle-btn,.toggle-btn::before{
    --container-padding:12px;
    --container-border-radius:calc(var(--toggle-btn-height,2rem) * 5);
    --background-color:var(--normal-gray);
    
    --width:var(--toggle-btn-width,7rem);;
    --height:var(--toggle-btn-height,2rem);

    width: var(--width);
    height: var(--height);
    padding:0  var(--container-padding);
    

    border-radius: var(--container-border-radius);
    
    display: flex;
    align-items: center;



    color: var(--white);
    font-size: var(--toggle-btn-font-size,1.25rem);

    cursor: pointer;
    transition: 0.5s linear;

    overflow: hidden;

    box-shadow:inset 0px 3px 10px 0px  rgba(0,0,0,0.425);
}

.toggle-btn{
    justify-content: flex-end;
    position: relative;
    background: var(--background-color);
}
.toggle-dots{


  
    width:calc( var(--height) * 0.875 + 5px);
    height: 100%;

    position: absolute;

    
    transition: 0.5s ease-in-out;
    
    
    display: flex;
    justify-content: flex-end;
    align-items: center;

    border-radius: var(--container-border-radius);
    left: 0;
    background: var(--background-color);
}
.toggle-dots div{
    content: '';
 
    width: calc(var(--height) * 0.875);
    height: 87.5%;

    border-radius: 50%;
    background: var(--white);

    margin: 0 2.5px;
}
.all .toggle-dots{

    background: var(--normal-blue);
    
    width: 100%;
    
}

.toggle-dots::before{
    
    position: absolute;
    content: attr(data-content);
    padding: var(--container-padding);
    width: 100%;
    left: 0;
    transition: 0.5s linear width ;
}
.limited .toggle-dots::before{
    width: 0;
    overflow: hidden;
}

</style>