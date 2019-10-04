import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        msgSnack: 5
    },
    mutations: {
        increment(){
            this.state.msgSnack++
        }
    },
    actions: {

    }
})
