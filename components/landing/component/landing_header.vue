<template>
    <header class="container">
        <section class="logo-area">
            <h1 class="logo-text">logo</h1>
        </section>
        <aside class="buttons-area">
            <email-icon class="icon" @iconClicked="redirect"></email-icon>
            <info-icon class="icon" @iconClicked="redirect"></info-icon>
            
        </aside>
    </header>
</template>

<script>
import emailIcon from '../../svg_component/emain_circle_fill'
import infoIcon from '../../svg_component/info_cicrle_fill'
export default {
    data(){
        return{
            
        }
    },
    components:{
        'email-icon':emailIcon,
        'info-icon':infoIcon
    },
    computed:{
        
    },
    methods:{
        redirect(){
            console.log('asdasd')
        }
    }
}
</script>

<style scoped>
.container{
    width: 100%;
    height: 3.85rem;
    padding: 0 0 0 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--dark-blue);
}

.logo-text{
    margin: 0;
    padding: 0 0 0.15rem 0;


    color: var(--brown);
    font-weight: 600;
    font-size: 1.9rem;

    cursor: pointer;
    
}
.buttons-area{
    display: flex;
    justify-content: space-between;
}

.icon{
    
    width: 3.85rem;
    height: 3.85rem;
    padding:1rem ;

    cursor: pointer;
  
    --icon-background-color:transparent;
    --icon-color:var(--light-blue);

}
.icon:hover{

    --icon-background-color:rgba(255,255,255,0.2);
    --icon-color:var(--white);

}

</style>