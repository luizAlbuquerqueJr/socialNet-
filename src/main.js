import Vue from 'vue'
import App from './App.vue'
import perfilView from './perfil.vue'
import timeLineView from './timeLine.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(Vuex)





// Vue.use(Firebase)
Vue.use(Vuex)
Vue.use(VueRouter)

const vuexPersist = new VuexPersistence({
  key: `beyond`,
  storage: window.localStorage,
  modules: [
    'timeLine',

  ]
})

const perfil = {
  namespaced: true,
  state: {
    users: [
      {
        name: 'Guilherme'
      },
      {
        name: 'Vinícius'
      },
      {
        name: 'Almir'
      }
    ]
  },
  getters: {
    getMessages: state => {
      return state.messages
    }
  },
  actions: {
    sendMessage({ commit }, message) {
      commit('addMessage', message)
    }
  },
  mutations: {
    addMessage (state, message) {
      state.messages.push(message)
    }
  }
}



const timeLine = {
  namespaced: true,
  state: {
    theme:'#FF00FF',
    posts: [
      { user: "Maylon", text: "Quinta é dia de TBT" ,path : "/dog passeio.jpg" ,date:"07:00"},
      { user: "Prince", text: "Manda o zap aqui é ruim?" ,path : "" ,date:"06:30"},
      { user: "Trovao", text: "Não para de pensar nela, o que faço?" ,path : "/dog triste.jpg" ,date:"ontem as 20:00"},
      { user: "Bob", text: "Alguem sabe o nome dessa princesa?" ,path : "/dog1.jpeg" ,date:"ontem as 16:17"},
      { user: "Paçoca", text: "Pensando na Prova de Teorica, affs" ,path : "/dog2.jpg" ,date:"ontem as 16:13:"},
      { user: "Prince", text: "Meu filho acaba é lindo demais?" ,path : "/dog3.jpg" ,date:"ontem as 15:01"},
      { user: "Maylon", text: "Acabei de morder meu dono haha" ,path : "" ,date:"23/08"},
      { user: "Scob", text: "Eu e a morena" ,path : "/dogcasal.jpeg" ,date:"21/08"  }  
    ]
    
  },
  getters: {
    getPosts: state => {
      return state.posts
    },
    getTheme: state => {
      return state.theme
    }
  },
  actions: {
    sendPost({ commit }, post) {
      commit('addPost', post)
    },
    deleteAll({commit}){
      commit('deleteAllPost')
    },
    deletePost({ commit }, index){
      commit('delPost',index)
    },
    editarPost({ commit }, postEdit){     
      commit('editPost',postEdit)
    },
    changeTheme({ commit }, postEdit){     
      commit('themeChange',postEdit)
    }
    
  },
  mutations: {
    addPost (state, post) {
      state.posts.push(post)
    },
    deleteAllPost(state){
      state.posts = []
    },
    delPost(state,index){
      state.posts.splice(index,1)

    },
    editPost(state,postEdit){
      console.log("koffff s" )
      console.log(postEdit)
      state.posts[postEdit.index].text = postEdit.novoTexto;
    },
    themeChange(state){
      
      state.theme = 'blue'

    }
  }
}

const store = new Vuex.Store({
  modules: {
    perfil: perfil,
    timeLine: timeLine
  },
  plugins: [vuexPersist.plugin]
})

const routes = [
  {
    path: '/',
    component: timeLineView
  },
  {
    path: '/perfil/:name',
    component: perfilView
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.fullPath)
  if (to.fullPath === '/perfil/Prince') next('/')
  else next()
})

new Vue({
  router,  
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

