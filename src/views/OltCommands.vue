<template>
    <v-container fluid grid-list-md text-xs-left>
        <v-layout row wrap align-center justify-center>
            <v-flex xs10 mt-12>
                <v-card>
                    <!--TOOLBAR-->
                    <v-toolbar dark height="80" style="background-color:#0072B0; color:#FFF">
                        <v-toolbar-title class="headline">
                            <v-icon>developer_mode</v-icon> OLT Commands
                        </v-toolbar-title>
                    </v-toolbar>

                    <!--TABLE-->
                    <v-data-table
                        :items="items"
                        :headers="headers"
                        :loading="loader"
                        loading-text="Cargando datos..."
                    />
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import { environments } from '../environments/environments';


    export default {
        data:() =>({
            loader: true,
            items: [],
            headers: [
                { text: 'Date', value: 'date' },
                { text: 'IP Olt', value: 'ip_olt' },
                { text: 'IP', value: 'ip' },
                { text: 'User', value: 'user' },
                { text: 'Command', value: 'command' }
            ]
        }),
        beforeMount(){
            let self = this;

            async function callOltCommands(){
                try {
                    const getOltCommands = await axios.get(`${environments.API_BACKEND_ALARMAS}logs/olt-commands`)
                    if(getOltCommands)
                        return getOltCommands;
                } catch (err) {
                    return err;
                }
            }
            callOltCommands().then((res) =>{
                if(res !== undefined){
                    self.items = res.data.data;
                    self.loader = false;
                }
            })
            .catch((err) => { console.error(err) });
        }
    }
</script>