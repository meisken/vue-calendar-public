<template>
    <div class="support-container">
        <title-header>
           <span slot="title">Support</span>
        </title-header>
        <main class="body">
            <div class="email-text">
                if you got any problem, please email to <a href="mailto:worktwo2222@gmail.com">worktwo2222@gmail.com</a>
            </div>
        </main>
    </div>
</template>

<script>
import titleHeader from '../../components/title_header.vue'
export default {
    components:{
        'title-header':titleHeader
    }
}
</script>

<style scoped>

.support-container{
    max-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    
    width:var(--router-component-width);

    background: var(--gray-background);    
}
.body{
    margin: 3rem auto;
    max-width:1024px ;
    background: var(--white);
    width: 100%;
    min-height: 40rem;
    padding:0 0rem 20vh 0rem ;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);

    border-radius: 12px;
    position: relative; 
}
.email-text{
    padding: 1rem 0.5rem;
    font-size: 1.5rem;
}
@media not all and (hover:hover) {
.support-container{


    max-height: var(--mobile-height,100vh);
  
}
}
</style>