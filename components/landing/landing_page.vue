<template>
    <div class="landing-page">
        <landing-header></landing-header>

        <main class="function-box">
            <transition name="fade-left">
                <router-view></router-view>
            </transition>
        </main>

        <nav class="nav-icons-container">
            <div v-for="(navIconName,index) in navIconsName" :key="index" class="nav-icon-wrapper" @click="scrollToArticle(index)">
                <component :is="navIcons(index)" class="nav-icon"></component>
                <span class="nav-icon-name">{{ navIconName }}</span>
            </div>
        </nav>
        <article class="swim-lane">
            <landing-article :isContentFirst="false" class="swim-lane-el">
                <img src="../../assets/background_image/hourGlass.jpg" slot="picture">
                <span slot="title">Save your time</span>
                <span slot="content">
                    Manage and track your time effectively. Let you know where has the time gone. Then reduce unnecessary time spending. And get efficient lifestyle. Even do more work in a day                 
                </span>
            </landing-article>
            <landing-article :isContentFirst="true" class="swim-lane-el">
                <img src="../../assets/landing_content_image/work_schedule.jpg" slot="picture">
                <span slot="title">Easy to use</span>
                <span slot="content">
                    Any tutorials and instructions are unnecessary in here. It will come naturally to you and pick it up. You will not be confused with the clearly UI. But it keeps same powerful            
                </span>
            </landing-article>            
            <landing-article :isContentFirst="false" class="swim-lane-el">
                <img src="../../assets/landing_content_image/wotk_to_do_list.jpg" slot="picture">
                <span slot="title">Task notes and to do list</span>
                <span slot="content">
                    Besides schedule system. We have a memo system for no time limits. You can write down objective in there. Also you can easily edit and delete the notes with no confusing
                </span>
            </landing-article>

            <landing-article :isContentFirst="true" class="swim-lane-el"> 
                <img src="../../assets/landing_content_image/work_calendar.jpg" slot="picture">
                <span slot="title">Calendar and schedule</span>
                <span slot="content">
                    Our main function which is schedule system that provided tracking program in every day. Also we provided a calendar service for looking at all schedule in a month.                  
                </span>
            </landing-article>


        </article>
        <footer class="landing-footer">
            <span class="prompt-text">What are you waiting for?</span>
            <custom-btn class="getStartedBtn" @onClick="redirect"><span slot="btn-name">Let's get started</span></custom-btn>
        </footer>
    </div>
</template>

<script>

import landingHeader from './component/landing_header.vue'
import landingArticle from './component/article_row.vue'

//icons
import clockIcon from '../svg_component/time_for_lane.vue';
import taskBorderIcon from '../svg_component/task_border_done.vue';
import appsIcon from '../svg_component/apps_square.vue';
import calendarIcon from '../svg_component/calendar_clock.vue';
//icons

import btnTemplate from '../template/vue-btton-template.vue'
export default {
    data(){
        return{
            navIconsName:['save your time','task notes','easy to use','calendar'],
        }
    },
    components:{
        'landing-header':landingHeader,
        'landing-article':landingArticle,
        'custom-btn':btnTemplate,

        'clock-icon':clockIcon,
        'task-border-icon':taskBorderIcon,
        'apps-icon':appsIcon,
        'calendar-icon':calendarIcon

    },
    computed:{
        


    },
    methods:{
        navIcons(index){
            switch(index){
                case 0: return clockIcon;
                case 1: return taskBorderIcon;
                case 2: return appsIcon;
                case 3: return calendarIcon;
            }

            return calendarIcon;
        },//variable for dynamic component

        scrollToArticle(index){
            var articles =  document.getElementsByClassName('swim-lane-el');
            window.scrollTo({
                top: articles[index].offsetTop,
                behavior: 'smooth'
            });
        },//scoll to article of swim lane
        redirect(){
            this.$router.push('/register');
            window.scrollTo({
                top:0,
                behavior: 'smooth'
            })
        }//Navigating to register when let's get started button was clicked

    },
    
    

}
</script>

<style>

main.function-box{

    width: 100%;

    height:calc(100vh - 8rem - 3.85rem);
    min-height: 550px;
    max-height: 1080px;
    background-image:linear-gradient(rgba(0,33,48,0.5) 0%, rgba(0,33,48,0.5) 100%) ,url('../../assets/background_image/landing_page_background.jpg');
    background-size: cover ;
    background-position: center ;

    display: flex;
    align-items: center;
    
}/*.landing-page is in order to limit coverage and prevent the class registered in another page*/
.landing-page .nav-icons-container{
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-auto-rows: minmax(8rem,auto);
    background: var(--dark-blue);

    
}
.landing-page .nav-icon-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    cursor: pointer;
    
}
.landing-page .nav-icon-wrapper:hover{
    background: rgba(255,255,255,0.1);
}
.landing-page .nav-icon-wrapper:hover .nav-icon{
    --icon-color:var(--white);
}
.landing-page .nav-icon-wrapper:hover .nav-icon-name{
    color: var(--white);
}
.landing-page .nav-icon{

    width: 2.85rem;
    margin-bottom: 0.25rem;
    --icon-color:var(--light-blue);
}
.landing-page .nav-icon-name{
    color: var(--light-blue);
    font-weight: 400;
    font-size: 1.25rem;
}


article.swim-lane{
    overflow: hidden;
}
.landing-footer{
    height: 15rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
}
.landing-footer .prompt-text{
    color: black;
    font-size: 2.5rem;
    font-weight: 400;
    margin-bottom: 1.25rem;
}
.getStartedBtn{
    border: 1px solid var(--normal-blue);
    color: var(--normal-blue);
    font-size: 1.5rem;
    padding: 0.2rem 5rem;
    transition: 0.25s linear;

}
.getStartedBtn:hover{
    background: var(--normal-blue);
    color: white;
}

.fade-left-enter-active,.fade-left-leave-active{
    transition: 0.75s ease-out;
    
}
.fade-left-leave-active{
    position: absolute;
}
.fade-left-enter,.fade-left-leave-to{
    opacity: 0;

    transform: translateX(0%);
}
.fade-left-leave,.fade-left-enter-to{
    opacity: 1;
    transform: translateX(-10%)
}
@media screen and (max-width: 768px){
.landing-page .nav-icons-container{
   
    grid-template-columns: repeat(2,1fr);
    grid-auto-rows: minmax(8rem,auto);

}
main.function-box{
    max-height: 600px;

}
}
@media screen and (max-width: 550px){
main.function-box{
 
 
    max-height: 40rem;
}
.landing-footer .prompt-text{

    font-size: 2.35rem;


}
.getStartedBtn{

    font-size: 1.35rem;


}
.fade-left-enter-active,.fade-left-leave-active{
    transition: 0.75s ease-out;
    
}
.fade-left-leave-active{
    position: absolute;
}
.fade-left-enter,.fade-left-leave-to{
    opacity: 0;

    transform: translateX(0%);
}
.fade-left-leave,.fade-left-enter-to{
    opacity: 1;
    transform: translateX(0%)
}
}
</style>