<template>
    <div class="new-task-btn" @click="$emit('click')">
        <add-icon class="add icon"></add-icon>
    </div>    
</template>

<script>
import addIcon from '../../svg_component/add_cross.vue'
export default {
    components:{
        'add-icon':addIcon 
    }
}
</script>

<style>
.new-task-btn{
    position: fixed;
    right:2.5%;
    bottom: 2.5%;

    background: var(--normal-blue);
    border-radius: 50%;

    width: 3.75rem;
    height: 3.75rem;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
}
.add.icon{
    width: 1.675rem;
    --icon-color:var(--white);
    
}
@media screen and (max-width: 1368px){
.new-task-btn{



    width: 4rem;
    height: 4rem;


}  
.add.icon{
    width: 1.725rem;

}  
}
@media screen and (max-width: 768px){
.new-task-btn{



    width: 4.375rem;
    height: 4.375rem;


}  
.add.icon{
    width: 2rem;

}  
}
</style>