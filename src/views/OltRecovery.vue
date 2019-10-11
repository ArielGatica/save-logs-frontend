<template>
    <v-container fluid grid-list-md text-xs-left>
        <v-layout row wrap align-center justify-center>
            <v-flex xs10 mt-12>
                <v-card>
                    <!--TOOLBAR-->
                    <v-toolbar dark height="80" style="background-color:#025BFF; color:#FFF">
                        <v-toolbar-title class="headline">
                            <v-icon size="33">notifications_none</v-icon> OLT Recovery
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

                    <!--TABLE-->
                    <v-data-table
                        :items="items"
                        :search="search"
                        :headers="headers"
                        :loading="loader"
                        loading-text="Cargando datos..."
                        :footer-props="{
                            prevIcon: 'arrow_back_ios',
                            nextIcon: 'arrow_forward_ios'
                        }"
                    >

                        <template v-slot:item.olt_fault_id="{ item }">
                            <v-icon color="#01E9B9">{{ item.olt_fault_id !== undefined ? 'check_circle' : null }}</v-icon>
                        </template>

                    </v-data-table>

                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    import { environments } from '../environments/environments';

    export default {
        data:() =>({
            search: '',
            loader: true,
            items: [],
            headers: [
                { text: 'Date', value: 'date' },
                { text: 'Microseconds', value: 'date_microseconds' },
                { text: 'IP', value: 'ip' },
                { text: 'Severity', value: 'severity' },
                //{ text: 'Alarm Name', value: 'alarm_name'},
                { text: 'Frame', value: 'frame_id' },
                { text: 'Slot', value: 'slot_id' },
                { text: 'Port', value: 'port_id' },
                { text: 'Ont', value: 'ont_id' },
                { text: 'Equipment', value: 'equipment_id' },
                { text: 'Match', value: 'olt_fault_id'}
            ]
        }),
        created(){
            dateFormat: (date) =>{
                moment(date).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        beforeMount(){
            let self = this;

            async function callOltRecovery(){
                try {
                    const getOltRecovery = await axios.get(`${environments.API_BACKEND_ALARMAS}logs/olt-recovery`)
                    if(getOltRecovery)
                        return getOltRecovery;
                } catch (err) {
                    return err;
                }
            }
            callOltRecovery().then((res) =>{
                if(res !== undefined){
                    self.items = res.data.oltRecovery;
                    self.loader = false;
                }
            })
            .catch((err) => { console.error(err) });
        }
    }
</script>