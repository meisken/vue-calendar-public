<template>

    <div class="container" :class="{ 'show':mobileMenuShow }" v-touch:left="testTouch">
        <header class="nav-header" @click="$router.push('/home')"><h1 class="logo-text">logo</h1></header>
        <section class="nav-body">
            <div v-for="(cell,index) in navNames" :key="index" class="nav-element-wrapper" @click="linkTo(index)" :class="{'current-path': matchCurrentPath(index)}">
                <component :is="navIcons(index)" class="nav-icon"></component>
                <span class="nav-name">{{cell}}</span>
            </div>
    
        </section>
        <footer class="nav-footer">
            <div class="nav-element-wrapper"  @click="linkTo(5)" >
                <support-icon  class="nav-icon"></support-icon>
                <span class="nav-name">support</span>
            </div>
        </footer>
    </div>

</template>

<script>
import firebase from 'firebase'

import homeIcom from '../../svg_component/home.vue'
import calendarIcon from '../../svg_component/calendar_clock.vue'
import taskboardIcon from '../../svg_component/task_border_done.vue'
import settingIcon from '../../svg_component/setting_slim_line.vue'
import logoutIcon from '../../svg_component/logout_door.vue'
import supportIcon from '../../svg_component/support_question.vue'

import {mapMutations,mapState,mapActions} from 'vuex'


export default {
    components: {
        'home-icom':homeIcom,    
        'calendar-icon':calendarIcon,
        'taskboard-icon':taskboardIcon,
        'setting-icon':settingIcon,
        'logout-icon':logoutIcon,
        'support-icon':supportIcon

    },
    directives:{
    },
    data(){
        return{
            navNames:["home","calendar","task board","setting","log out",],
        }
    },
    computed:{
        ...mapState([
            'mobileMenuShow'
        ])
    },
    methods:{
        ...mapMutations([
            'toggleMobileMenuStatus',
            'setColorConfig',
            'revertColorConfig'
        ]),
        ...mapActions([
            'getColorConfig'
        ]),
        matchCurrentPath(index){
            let name = this.$route.name.toLowerCase();
            let macthName = this.navNames[index].trim().replace(/ /g,'');
            if(name == 'timetable'){
                name = 'calendar';
            }
      
            return name == macthName;
        },//matching which current path and icon name for distinguish where is the user  
        navIcons(index){
            switch(index){
                case 0 : return homeIcom;
                case 1 : return calendarIcon;
                case 2 : return taskboardIcon;
                case 3 : return settingIcon;
                case 4 : return logoutIcon;
            }
        },//variable for dynamic component,it used for nav-icon
        linkTo(index){

            let {$router:router} = this;

            switch(index){
                case 0 : router.push('/home');break;
                case 1 : router.push('/home/calendar');break;
                case 2 : router.push('/home/taskBoard');break;
                case 3 : router.push('/home/setting');break;
                case 4 : firebase.auth().signOut();router.push('/');break;
                case 5 : router.push('/home/support');break;
                
            }  

        },//when the nav element was clicked, this event redirect to next destination
        testTouch(){
            if(window.matchMedia("(max-width: 768px)").matches){
                this.toggleMobileMenuStatus();
            }
        }   
    },
    mounted(){
        this.getColorConfig().then(() => {
            this.setColorConfig();
        });//Apply the user style setting
    },
    beforeDestroy(){
        this.revertColorConfig();
        this.setColorConfig();

    }
}
</script>

<style scoped>
.container{
    width: 5.75rem;
    min-width: 5.75rem;
    height: 100vh;
    min-height: 550px;
    background: var(--dark-blue);
    display: grid;
    grid-template-rows: 1fr 10fr 1fr;

    overflow: hidden;
    transition: 0.5s ;
    
}
.container:hover{
    width: 20rem;
    min-width: 20rem;
}

.nav-header{
    width: 100%;
  
}
.logo-text{
    margin: 0;
    padding: 0.75rem 0 0.15rem 0.75rem;


    color: var(--brown);
    font-weight: 400;
    font-size: 1.9rem;

    cursor: pointer;
    
}
.nav-body{
    margin-top: 0.25rem;
    display: grid;
    grid-auto-rows: 6.25rem;

}
.nav-element-wrapper{
    width:20rem;
    height: 6.25rem;
    padding: 0 1.5rem;
    
    
    display: flex;
    align-items: center;

    cursor: pointer;

}
.current-path{
    background: rgba(255,255,255,0.3);
}
.nav-element-wrapper:hover{
    background: rgba(255,255,255,0.3);
}

.nav-icon{
    width: 2.25rem;
    margin-right: 3rem;
    --icon-color:var(--light-blue);
}
.nav-name{
    color: var(--light-blue);
    font-size: 1.65rem;
    font-weight: 300;
    transition: 0.5s;
    opacity: 0;
    padding-bottom: 0.125rem


}
.container:hover .nav-name{
    opacity: 1; 
}



.nav-footer{
 
    width: 100%;

}
@media screen and (max-height: 650px) and (min-width: 768px){
.nav-body{
  

    grid-auto-rows: 5rem;

}
.nav-element-wrapper{

    height: 5rem;


}
.nav-icon{
    width: 2rem;

}
.nav-name{

    font-size: 1.5rem;
    padding-bottom: 0.125rem


}
}
@media screen and (max-width:768px){
.container{

    width: 20rem;
    min-width: 20rem;

    overflow: hidden;
    min-height: 0px;
    height: 100vh;
  
}

.container.show{


    /* this effect better than display transition, but it will trigger a bug on ios*/

}
.nav-element-wrapper{



    


}
.container.show .nav-name{
    opacity: 1; 
}
}

@media not all and (hover:hover) {
.container{


    height: var(--mobile-height,100vh);
  
}
}
</style>