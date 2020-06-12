<template>
    <div class="container">
        <video src="../../assets/404_video/background.mp4" class="backgroundVideo" loop muted autoplay></video>
        <div class="content">
            <span class="num">404</span>
            <div>not found</div>
            <div class="homeBtn" @click="$router.push('/home')">home</div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container{
    width: 100vw;
    height: 100vh;
}
.backgroundVideo{
    width: 100%;
    height: 100%;

    min-height: 500px;
    object-fit: cover;
}
.content{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: black;
    font-size: 5rem;
    font-weight: 600;
    mix-blend-mode: screen;
    

}
.num{
    font-size: 10rem;
}
.homeBtn{
    margin-top: 3rem;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 400;
    border: 1.5px solid black;
    padding: 0.15rem 3rem 0.25rem 3rem;
}
.homeBtn:hover{
    background: black;
    color: white;
}
</style>