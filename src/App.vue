<template>
    <v-app>
        <Login/>

        <!--<NavBar/>
        <v-content>
            <router-view></router-view>
        </v-content>-->
    </v-app>
</template>

<script>
    import NavBar from './components/NavBar';
    import Login from './components/Login';

    export default {
        name: "App",
        components:{
            NavBar,
            Login
        },
        data: () => ({
        
        })
    };
</script>
