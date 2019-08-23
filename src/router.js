import Vue from 'vue'
import Router from 'vue-router'
import DiccionarioAlarmas from './views/DiccionarioAlarms';
import OltFault from './views/OltFault';
import OltRecovery from './views/OltRecovery'
import OltCommands from './views/OltCommands'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/alarms-dictionary',
            name: 'Diccionario de Alarmas',
            component: DiccionarioAlarmas
        },
        {
            path: '/olt-fault',
            name: 'OLT Faul',
            component: OltFault
        },
        {
            path: '/olt-recovery',
            name: 'OLT Recovery',
            component: OltRecovery
        },
        {
            path: '/olt-commands',
            name: 'OLT Commands',
            component: OltCommands
        }
    ]
})
