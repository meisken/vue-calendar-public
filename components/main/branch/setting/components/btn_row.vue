<template>
    <div class="setting_row">
        <span class="title"></span>

        <span class="btns-container ">
            <div class="submit btn" @click="$emit('submit')">submit</div>
            <div class="cancel btn" @click="$emit('cancel')">cancel</div>
        </span>


    </div>  
</template>

<script>
import './style/row.css'
export default {

}
</script>

<style scoped>
.btns-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 16.5rem;



}
.btn{
    width: 7.5rem;
    height: 1.925rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 2px;
    font-size: 1.15rem;

    cursor: pointer;
}
.btn:hover{
    border: 1px solid var(--light-blue);
    background: var(--light-blue);
    color: var(--normal-blue);
}
.submit{
    background: var(--normal-blue);
    color: var(--white);

    
}
.cancel{
    border: 1px solid var(--normal-blue);
    color: var(--normal-blue);;
}
@media screen and (max-width:768px){
.btns-container{

    width: 100%;



}
.btn{
    width: 47.5%;
    height: 2.25rem;



    border-radius: 2px;
    font-size: 1.25rem;


}   
}
</style>