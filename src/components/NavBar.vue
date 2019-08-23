<template>
    <v-app-bar app height="70" color="#0072B0" dark>
        <v-toolbar-title class="headline text-uppercase">
            <v-img
                width="70"
                height="65"
                :src="imgLogo"
            />
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn                
            text 
            router to="/alarms-dictionary" 
            class="mr-2">
            <span>OLT Dictionary</span>
        </v-btn>
        <v-btn                
            text 
            router to="/olt-fault" 
            class="mr-2">
            <span>OLT Fault</span>
        </v-btn>
        <v-btn                 
            text router to="/olt-recovery">
            <span>OLT Recovery</span>
        </v-btn>
        <v-btn                 
            text 
            class="mr-2"
            router to="/olt-commands">
            <span class="mr-2">OLT Commands</span>
        </v-btn>        
    </v-app-bar>
</template>

<script>
    export default {
        data: () =>({
            imgLogo: require('../assets/entel-logo-blue.png')
        })
    }
</script>