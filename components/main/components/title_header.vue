<template>
    <div class="container">
        <div class="wrapper">
            <div  class="separate">
                <component :is="mobileMenuShow ? 'cross-icon': 'menu-icon' " class="mobile-menu-btn"  :class="{'cross-icon' : mobileMenuShow }" @iconClicked="toggleMobileMenuStatus"></component>
                <span class="title"><slot name="title"></slot></span>
            </div>
            <span class="button"><slot name="button"></slot></span>
        </div>
    </div>
</template>

<script>
import menuIcon from '../../svg_component/menu_three_line.vue'
import crossIcon from '../../svg_component/cross_normal.vue'
import {mapMutations,mapState} from 'vuex'
export default {
    components:{
        'menu-icon':menuIcon,
        'cross-icon':crossIcon
    },
    methods:{
        ...mapMutations([
            'toggleMobileMenuStatus'
        ])
    },
    computed:{
        ...mapState([
            'mobileMenuShow'
        ]),
    }
}
</script>

<style scoped>
.container{
    width: calc(100vw - 5.75rem);
    padding: 0.85rem 0.25rem;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    background: var(--white);
}
.container > .wrapper{
    width: 100%;
    padding: 0.25rem 0.5rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    
}
.separate{
    display: flex;
}

.title{
    color:var(--normal-blue);
    font-weight: 400;
    font-size: 2.5rem;
}
.button{
    cursor: pointer;
    margin-right: 2.75vw;
    
}

.mobile-menu-btn{
    display: none;

}
@media screen and (max-width: 768px){
.container{
    width: 100vw;
    
} 
.separate{
    justify-content: space-between;
    align-items: center;
    width: 50%;
}
.title{
    transform: translateX(50%);
    font-size: 2.375rem;
}
.mobile-menu-btn{
    display: flex;
    align-content: center;
    justify-content: center;

    --icon-color: var(--normal-blue);

    width: 2rem;
 
    cursor: pointer;



}
.cross-icon{
    --icon-width: 80%;
}
.button{
    min-width: 2rem;
    display: none
    
}
}
@media screen and (max-width: 550px){
.title{

    font-size: 2.25rem;
}    
}
</style>