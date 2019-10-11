
<template>
    <v-container fluid grid-list-md text-xs-left>
        <v-layout row wrap align-center justify-center>
            <v-flex xs10 mt-12>
                <v-card>
                    <!--TOOLBAR-->
                    <v-toolbar dark height="80" style="background-color:#025BFF; color:#FFF">
                        <v-toolbar-title class="headline">
                            <v-icon size="33">notifications</v-icon> OLT Fault
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

                        <v-btn icon large @click="removeAlarms()">
                            <v-icon>delete</v-icon>
                        </v-btn>

                    </v-toolbar>

                    <!--{{ msgSnack }}-->

                    <!--TABLE-->
                    <v-data-table
                        v-model="selected"
                        show-select
                        single-select
                        item-key="_id"
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

            <!--SNACKBAR-->
            <v-snackbar v-model="snack" color="#01E9B9" style="color:#0034F9" top :timeout="timeSnack" v-if="this.msgRes !== undefined">
                {{msgRes}}
                <v-spacer/>
                <v-btn icon @click="snack = false">
                    <v-icon color="#0034F9">done_outline</v-icon>
                </v-btn>
            </v-snackbar>

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
            timeSnack: 6000,
            snack: false,
            msgRes: '',
            selected: [],
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
            },
            removeAlarms(){
                axios.delete(`${environments.API_BACKEND_ALARMAS}logs/olt-fault/delete/${this.selected[0]._id}`)
                .then((res) =>{
                    if(res.status == 200){
                        let index = this.items.indexOf(this.selected[0]._id);
                        this.items.splice(index, 1);
                        this.snack = true;
                        this.msgRes = res.data.message;
                    }
                })
                .catch((err) => { console.error(err) });
            }
        }
    }   
</script>