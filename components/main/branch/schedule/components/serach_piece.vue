<template>
    <div class="container">
        <input type="text" class="search-typing-area" v-model="typingKeyWord" placeholder="search...">
        <div class="search-btn-wrapper">
            <search-icon class="search-icon"></search-icon>
        </div>
    </div>
</template>

<script>
import searchIcon from '../../../../svg_component/search_magnifier'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return{
            typingKeyWord:''
        }
    },
    methods:{
        ...mapMutations([
            'enterSearchKeyword'
        ])
    },
    components:{
        'search-icon':searchIcon
    },
    watch:{
        typingKeyWord(val){
            this.enterSearchKeyword(val);

        }
    },
    computed:{
        ...mapState([
            'searchKeyword'
        ])
    }
}
</script>

<style scoped>
.container{
    background: var(--white);
    width: 100%;
 
    border: 1px solid var(--gray-border);

    display: grid;
    grid-template-columns: 1fr 2.5rem;

}
.search-typing-area{
    width: 100%;
    border: none;
    outline: none;

    font-size: 1.2rem;
    font-weight: 400;
    padding-left: 0.5rem;

}
.search-btn-wrapper{
    border-left: 1px solid var(--gray-border);
    width: 100%;
    padding:0.6rem 0.65rem 0.45rem 0.65rem;
    cursor: pointer;
    
}
.search-icon{
    width: 100%;
    --icon-color:var(--gray-border);

    

}
@media screen and (max-width: 500px){
.container{
    grid-auto-rows: 3rem;
}   
.search-btn-wrapper{

    padding:0.85rem 0.65rem 0.45rem 0.65rem;

    
}
}
</style>