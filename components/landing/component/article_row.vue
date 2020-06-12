<template>
    <div class="article-area" :class="layout"> 
        <div class="article-container" :class="layout">    
            <div class="article-picture" :class="layout" :data-aos="[isContentFirst? 'fade-up' : 'fade-right']" data-aos-once="ture"><slot name="picture"></slot></div>
            <div class="content-wrapper" :class="layout" :data-aos="[isContentFirst? 'fade-right' : 'fade-up']" data-aos-once="ture">
                <h1 class="title"><slot name="title"></slot></h1>
                <p class="content"><slot name="content"></slot></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['isContentFirst'],
    computed:{
        layout(){
        
            if(this.isContentFirst){
                return 'layout-content-first';
            }
            return 'layout-picture-first';
            //swicth diffevent layout
        }
    },
  
}
</script>

<style scoped>
.article-area{
    background: #334D59;
    width: 100%;
    padding: 4rem 0;

    display: flex;
    justify-content: center;
    align-items: center;

    --element-width:calc(29rem + 3.5vw);

}
.article-container{
    /*
    display: flex;
    justify-content: space-between;
    align-items: center;
    */

    display: grid;
    grid-template-columns: repeat(2,1fr);
    align-items: center;
    

    width: 100%;
    min-width: 70vw;
    max-width: 70rem;

    color: white;


}

.article-picture {
    grid-area: picture;

}

.article-picture img{
    width: var(--element-width);
    height:calc( var(--element-width) / 1.75);
    object-fit: cover;
}
.content-wrapper{

    grid-area: content;
    padding-bottom: 2.75rem;

    min-height: 15rem;


}

.title{
    padding: 0;
    margin: 0;
    font-weight: 500;
    font-size: 2rem;
}
.content{
    display: block;
    
    line-height: 2.25rem;
    font-weight: 300;
    font-size: 1.45rem;
    opacity: 0.8;
    
    width: var(--element-width);

}

.article-area.layout-content-first{
    background: #002130;
}
.article-area.layout-picture-first{
    background: #334D59;
}
.article-container.layout-content-first{
    grid-template-areas:'content picture';
}
.article-container.layout-picture-first{
    grid-template-areas:'picture content';
}
.content-wrapper.layout-picture-first,.article-picture.layout-content-first{
    justify-self: flex-end;
}
.content-wrapper.layout-content-first,.article-picture.layout-picture-first{
    justify-self: flex-start;
}


@media screen and (max-width: 1024px){
.article-area{
    --element-width:calc(24rem + 4.5vw);
}
.content-wrapper.layout-picture-first,.article-picture.layout-content-first{
    justify-self: center;
}
.content-wrapper.layout-content-first,.article-picture.layout-picture-first{
    justify-self: center;

}
.content-wrapper{
    padding-bottom: 0rem;
}
}
@media screen and (max-width: 768px){
.article-area{
    --element-width:calc(21.5rem + 4.5vw);
}
.content{
    margin: 1.25rem 0 0 0;
}
}
@media screen and (max-width: 768px){
.article-area{
    --element-width:calc(22.5rem + 7.5vw);
}
.article-container{
    grid-template-columns: repeat(1,1fr);   
}
.article-picture {
    margin-bottom: 2rem
}
.article-container.layout-content-first{
    grid-template-areas:'picture'
                        'content';        
}
.article-container.layout-picture-first{
    grid-template-areas:'picture'
                        'content';
  
}
}
</style>