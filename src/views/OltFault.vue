<template>
    <v-container fluid grid-list-md text-xs-left>
        <v-layout row wrap align-center justify-center>
            <v-flex xs10 mt-12>
                <v-card>
                    <!--TOOLBAR-->
                    <v-toolbar dark height="80" style="background-color:#0072B0; color:#FFF">
                        <v-toolbar-title class="headline">
                            <v-icon>notifications</v-icon> OLT Fault
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
        data:()=>({
            loader: true,
            items: [],
            headers: [
                { text: 'Date', value: 'date' },
                { text: 'IP', value: 'ip' },
                { text: 'Severity', value: 'severity' },
                { text: 'Alarm Name', value: 'alarm_name'},
                { text: 'Classification', value: 'classification' },
                { text: 'Frame', value: 'frame_id' },
                { text: 'Slot', value: 'slot_id' },
                { text: 'Port', value: 'port_id' },
                { text: 'Ont', value: 'ont_id' },
                { text: 'Equipment', value: 'equipment_id' }
            ]
        }),
        beforeMount(){
            let self = this;

            async function callOltFault(){
                try {
                    const getOltFault = await axios.get(`${environments.API_BACKEND_ALARMAS}logs/olt-fault`)
                    if(getOltFault)
                        return getOltFault;
                } catch (error) {
                    return error;
                }
            }
            callOltFault().then((res) =>{
                if(res !== undefined){
                    self.items = res.data.oltFault;
                    self.loader = false;
                }
            })
            .catch((err) => { console.error(err) });
        }
    }   
</script>