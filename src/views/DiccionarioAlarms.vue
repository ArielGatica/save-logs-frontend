<template>
    <v-container fluid grid-list-md text-xs-left>
        <v-layout row wrap align-center justify-center>
            <v-flex xs10 mt-12>
                <v-card>
                    <!--TOOLBAR-->
                    <v-toolbar dark height="80" style="background-color:#025BFF; color:#FFF">
                        <v-toolbar-title class="headline">
                            <v-icon>import_contacts</v-icon> Alarms Dictionary
                        </v-toolbar-title>                                               

                        <v-spacer/>

                        <v-flex xs4>
                            <v-text-field
                                v-model="search"
                                solo-inverted
                                color="#FF3D00"
                                append-icon="search"
                                hide-details
                            />
                        </v-flex>

                        <v-spacer/>
                        <v-tooltip v-model="iconDel" bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="selected[0] !== undefined ? dialogRemove = true : snackInfo = true">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Eliminar alarma</span>
                        </v-tooltip>

                        <v-tooltip v-model="iconEdit" bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="selected[0] !== undefined ? null : snackInfo = true">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </template>
                            <span>Editar alarma</span>
                        </v-tooltip>
                        

                        <v-tooltip v-model="iconAdd" bottom>
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
                        :search="search"
                        :items="items"
                        :headers="headers"
                        item-key="_id"
                        show-select
                        single-select
                        :loading="loader"
                        loading-text="Cargando datos..."
                        no-results-text="No se encontraron datos"
                    />
                </v-card>
            </v-flex>

            <!--DIALOG ADD-->
            <v-dialog v-model="dialogAdd" width="750" persistent>
                <v-card>
                    <v-card-title>
                        <span class="headline">Agregar Alarma</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form v-model="valid" ref="form">
                            <v-flex xs12>
                                <v-text-field
                                    v-model="dataAlarms.fault"
                                    :rules="someRules"
                                    append-icon="notifications"
                                    label="Fault"
                                    color="#0034F9"
                                />
                                <v-text-field
                                    v-model="dataAlarms.recovery"
                                    :rules="someRules"
                                    append-icon="add_alert"
                                    label="Recovery"
                                    color="#0034F9"
                                />
                            </v-flex>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            @click="dialogAdd = false; resetForm(); loadBtn = false"
                            dark
                            color="#FF3D00">                            
                            Cancelar
                        </v-btn>
                        <v-btn
                            :disabled="!valid"
                            @click="addAlarms()"
                            :loading="loadBtn"
                            color="#0034F9"
                            style="color:#FFFFFF">
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
                    <v-card-text class="body-1" v-if="this.selected[0] !== undefined">
                        ¿Está seguro que desea Eliminar el registro asociado a Fault 
                        <b>{{this.selected[0].fault}}</b> de Alarms Dictionary?
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            @click="dialogRemove = false"
                            dark
                            color="#FF3D00">
                            Cancelar
                        </v-btn>
                        <v-btn
                            @click="removeAlarms()"
                            dark
                            color="#0034F9">
                            Eliminar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!--SNACKBAR-->
            <v-snackbar v-model="snack" color="#01E9B9" style="color:#0034F9" top :timeout="timeSnack" v-if="this.msgRes !== undefined">
                {{msgRes}}
                <v-spacer/>
                <v-btn icon @click="snack = false">
                    <v-icon color="#0034F9">done_outline</v-icon>
                </v-btn>
            </v-snackbar>

            <v-snackbar v-model="snackInfo" color="#FF3D00" top :timeout="timeSnack">
                Debes seleccionar al menos un registro para realizar esta acción.
                <v-spacer/>
                <v-btn icon @click="snackInfo = false">
                    <v-icon>announcement</v-icon>
                </v-btn>
            </v-snackbar>

        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import { environments } from '../environments/environments';

    export default {
        data: () =>({
            search: '',
            loadBtn: false,
            someRules: [ v => !!v || 'Este campo no puede estar vacío' ],
            valid: true,
            snackInfo: false,
            timeSnack: 6000,
            msgRes: '',
            snack: false,
            iconAdd: false,
            iconDel: false,
            iconEdit: false,
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
            resetForm(){
                this.$refs.form.reset()
            },
            addAlarms(){
                this.loadBtn = true;
                axios.post(`${environments.API_BACKEND_ALARMAS}logs/alarms-dictionary/save`, this.dataAlarms)
                .then((res) =>{
                    if(res.status == 200){

                        let newData = {
                            fault: this.dataAlarms.fault,
                            recovery: this.dataAlarms.recovery
                        }

                        this.loadBtn = false;
                        this.items.push(newData);
                        this.dialogAdd = false;
                        this.snack = true;
                        this.msgRes = res.data.message;
                        this.resetForm();
                    }
                })
                .catch((err) => { console.error(err) });
            },
            removeAlarms(){
                axios.delete(`${environments.API_BACKEND_ALARMAS}logs/alarms-dictionary/delete/${this.selected[0]._id}`)
                .then((res) =>{
                    if(res.status == 200){
                        let index = this.items.indexOf(this.selected[0]._id);
                        this.items.splice(index, 1);
                        this.dialogRemove = false;
                        this.snack = true;
                        this.msgRes = res.data.message
                    }
                })
                .catch((err) => { console.error(err) });
            },
            editAlarms(){
                axios.put(`${environments.API_BACKEND_ALARMAS}logs/alarms-dictionary/edit`, this.dataAlarms)
                .then((res) =>{
                    if(res.status == 200){
                        this.dialogRemove = false;
                        this.snack = true;
                        this.msgRes = res.data.message;
                    }
                })
                .catch((err) => { console.error(err) });
            }
        }
    }
</script>