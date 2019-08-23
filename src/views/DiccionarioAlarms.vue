<template>
    <v-container fluid grid-list-md text-xs-left>
        <v-layout row wrap align-center justify-center>
            <v-flex xs10 mt-12>
                <v-card>
                    <!--TOOLBAR-->
                    <v-toolbar dark height="80" style="background-color:#0072B0; color:#FFF">
                        <v-toolbar-title class="headline">
                            <v-icon>import_contacts</v-icon> Alarms Dictionary
                        </v-toolbar-title>
                        <v-spacer/>

                        <v-tooltip v-model="showDel" bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="dialogRemove = true">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Eliminar alarma</span>
                        </v-tooltip>

                        <v-tooltip v-model="showEdit" bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </template>
                            <span>Editar alarma</span>
                        </v-tooltip>
                        

                        <v-tooltip v-model="showAdd" bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="dialogAdd = true">
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </template>
                            <span>Agregar alarma</span>
                        </v-tooltip>

                    </v-toolbar>

                    <!--TABLE-->
                    <v-data-table
                        v-model="selected"
                        :items="items"
                        :headers="headers"
                        item-key="_id"
                        show-select
                        single-select
                        :loading="loader"
                        loading-text="Cargando datos..."
                    >

                    </v-data-table>
                </v-card>
            </v-flex>

            <!--DIALOG ADD-->
            <v-dialog v-model="dialogAdd" width="750" persistent>
                <v-card>
                    <v-card-title>
                        <span class="headline">Agregar Alarma</span>
                    </v-card-title>
                    <v-card-text>
                        <v-flex xs12>
                            <v-text-field
                                append-icon="notifications"
                                v-model="dataAlarms.fault"
                                label="Fault"
                            />
                            <v-text-field
                                append-icon="add_alert"
                                v-model="dataAlarms.recovery"
                                label="Recovery"
                            />
                        </v-flex>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            @click="dialogAdd = false; clearField()"
                            dark
                            color="#0072AE">
                            Cancelar
                        </v-btn>
                        <v-btn
                            @click="addAlarms(); dialogAdd = false"
                            dark
                            color="#F78F1E">
                            Agregar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!--DIALOG DELETE-->
            <v-dialog v-model="dialogRemove" max-width="450" persistent>
                <v-card>
                    <v-card-title>
                        <span class="headline">Eliminar Alarma</span>
                    </v-card-title>
                    <v-card-text class="body-1">
                        ¿Está seguro que desea Eliminar el registro de Alarms Dictionary?
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            @click="dialogRemove = false"
                            dark
                            color="#0072AE">
                            Cancelar
                        </v-btn>
                        <v-btn
                            dark
                            color="#F78F1E">
                            Eliminar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import { environments } from '../environments/environments';

    export default {
        data: () =>({
            showAdd: false,
            showDel: false,
            showEdit: false,
            snack: true,
            dialogRemove: false,
            dialogAdd: false,
            loader: true,
            selected: [],
            items: [],
            headers: [
                { text: 'Fault', value: 'fault' },
                { text: 'Recovery', value: 'recovery' }
            ],
            dataAlarms: {
                fault: '', 
                recovery: ''
            }
        }),
        beforeMount(){
            let self = this;

            async function callDictionary(){
                try {
                    const getDictionary = await axios.get(`${environments.API_BACKEND_ALARMAS}logs/alarms-dictionary`)
                    if(getDictionary)
                        return getDictionary;
                } catch (error) {
                    return error;
                }
            }
            callDictionary().then((response) =>{
                if(response !== undefined){
                    self.items = response.data.data;
                    self.loader = false;
                }
            })
            .catch((err) => { console.error(err) });
        },
        methods:{
            clearField(){
                this.dataAlarms.fault = '';
                this.dataAlarms.recovery = '';
            },
            addAlarms(){
                axios.post(`${environments.API_BACKEND_ALARMAS}logs/alarms-dictionary/save`, this.dataAlarms)
                .then((res) =>{
                    if(res.status == 200)
                        alert(res.data.message);
                })
                .catch((err) => { console.error(err) });
            }
        }
    }
</script>