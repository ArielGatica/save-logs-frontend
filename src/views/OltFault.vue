
<template>
    <v-container fluid grid-list-md text-xs-left>
        <v-layout row wrap align-center justify-center>
            <v-flex xs10 mt-12>
                <v-card>
                    <!--TOOLBAR-->
                    <v-toolbar dark height="80" style="background-color:#025BFF; color:#FFF">
                        <v-toolbar-title class="headline">
                            <v-icon>notifications</v-icon> OLT Fault
                        </v-toolbar-title>
                        
                        <v-spacer></v-spacer>

                        <v-flex xs4>
                            <v-text-field
                                v-model="search"
                                solo-inverted
                                color="#FF3D00"
                                append-icon="search"
                                hide-details
                            />
                        </v-flex>

                        <v-spacer></v-spacer>

                    </v-toolbar>

                    <!--{{ msgSnack }}-->

                    <!--TABLE-->
                    <v-data-table
                        :items="items"
                        :search="search"
                        :headers="headers"
                        :loading="loader"
                        loading-text="Cargando datos..."
                    >

                        <template v-slot:item.olt_recovery_id="{ item }">
                            <v-icon color="#01E9B9">{{ item.olt_recovery_id !== undefined ? 'check_circle' : null }}</v-icon>
                        </template>

                    </v-data-table>
                </v-card>
            </v-flex>

            <!--
            <v-btn icon @click="done()">
                <v-icon color="indigo">done_outline</v-icon>
            </v-btn>
            -->

        </v-layout>
    </v-container>
</template>

<script>
    import store from '../store/store';
    import axios from 'axios';
    import { environments } from '../environments/environments';
    import { mapState } from 'vuex'

    export default {
        data:()=>({
            search: '',
            loader: true,
            items: [],
            headers: [
                { text: 'Date', value: 'date' },
                { text: 'Microseconds', value: 'date_microseconds' },
                { text: 'IP', value: 'ip' },
                { text: 'Severity', value: 'severity' },
                //{ text: 'Alarm Name', value: 'alarm_name'},
                { text: 'Classification', value: 'classification' },
                { text: 'Frame', value: 'frame_id' },
                { text: 'Slot', value: 'slot_id' },
                { text: 'Port', value: 'port_id' },
                { text: 'Ont', value: 'ont_id' },
                { text: 'Equipment', value: 'equipment_id' },
                { text: 'Match', value: 'olt_recovery_id' }
            ]
        }),
        computed:{
            ...mapState(['msgSnack'])
        },
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
        },
        methods:{
            done(){
                store.commit('increment');
            }
        }
    }   
</script>