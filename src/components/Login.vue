<template>
    <v-container fluid class="fill-height">        
        <v-row align="center" justify="center">
            <v-flex xs3>
                <v-card class="elevation-20">
                    <br>
                    <v-img
                        id="logoEntel"
                        align="right"
                        width="120"
                        height="110"
                        :src="logo" 
                    />
                    <br><h2 align="center" class="headline" style="color:#005BFF">Portal Redes</h2>
                    <br><br>
                    <v-card-text>
                        <v-text-field
                            rounded
                            color="#005BFF"
                            append-icon="person"
                            label="Usuario" 
                            solo>
                        </v-text-field>
                        <v-text-field
                            rounded
                            color="#005BFF"
                            append-icon="lock"
                            label="Contraseña"
                            type="password"
                            solo>
                        </v-text-field>
                        <v-checkbox
                            color="#005BFF"
                            label="¿Recordar credenciales?">
                        </v-checkbox>
                        <v-btn
                            @click="loading = true"
                            :loading="loading"
                            rounded
                            large
                            dark
                            color="#005BFF" 
                            block>
                            Ingresar
                        </v-btn>
                        <br>
                        <v-btn
                            @click="loading = false"
                            rounded
                            large
                            dark
                            color="#FF3D00" 
                            block>
                            Otro Usuario
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-row>        
    </v-container>
</template>

<script>
    export default {
        data: () =>({
            logo: require('../assets/puntos-logo.png'),
            loading: false
        })
    }
</script>

<style scoped>
    #logoEntel{
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>