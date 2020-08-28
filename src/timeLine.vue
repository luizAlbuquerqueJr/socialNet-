
<template>
      <v-main>
      
      <v-app-bar fixed  :color='themeColor'>
        
        <v-row justify='space-around'>
          <v-col col='auto'>
            <v-btn x-large icon color = '#0D47A1'>
              <v-icon>mdi-post</v-icon>
            </v-btn>
          </v-col>
          <v-col col='auto'>
            <v-btn x-large icon color = '#0D47A1'>
            <v-icon>mdi-account-plus</v-icon>
            </v-btn>
          </v-col>
          <v-col col='auto'>
            <v-btn  x-large icon color = '#0D47A1'>
            <v-icon>mdi-bell</v-icon>
            </v-btn>
          </v-col>
          <v-col col='auto'>
            <v-btn @click='changeMode()' x-large icon color = '#0D47A1'>
            <v-icon>mdi-menu</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      
      <!-- <v-toolbar-title>{{ name }}</v-toolbar-title>-->
      </v-app-bar>
      
      <div class="messages-container" >
        <div v-for="(post, i) in getPosts" :key="i">
          
          <MessageCard   :theme="themeColor" :messageProp='post' :index='i' @deletarPost="deletarPost" @editarPost="editarPost"  />
        </div>
      </div>
      <v-app-bar  fixed bottom :color='themeColor'>
        <v-btn @click='deleteAll()' icon color="red">
          <v-icon>mdi-delete-sweep</v-icon>
        </v-btn>
        <v-text-field v-model='field' @keyup.enter='send()' solo label="Diga o que vc esta pensando..." hide-details></v-text-field>
        <v-btn @click='send()' icon color = '#0D47A1'>
          <v-icon>mdi-send</v-icon>
        </v-btn>
        <v-btn @click='comFoto = !comFoto' icon color = '#0D47A1'>
          <v-icon>mdi-file</v-icon>
        </v-btn>
      </v-app-bar>
    </v-main>
</template>

<script>
import { mapGetters } from 'vuex'

import MessageCard from './components/MessageCard.vue'
export default {
  
  name: "App",
  components: {
    MessageCard
  },
  data: () => ({
    themeColor:'#009688',
    field: '',
    comFoto: false,
    isDark: false
  }),
  methods: {
    send () {
      let post = {
        user: 'me',
        text: this.field,
        path:'',
        date:"Agora mesmo"
      }
      if(this.comFoto){
        post.path = "/cachorro-selfie.jpg" 
      }
      // this.posts.splice(0, 0, message);

      // this.posts.push(message)
      this.$store.dispatch('timeLine/sendPost', post)
      this.field = ''
    },
    deleteAll () {
      this.$store.dispatch('timeLine/deleteAll')
      this.field = ''
    },
    
    deletarPost(index){
      console.log('Mensagem deletada.',index);
      console.log(index);
      console.log('Mensagem deletada.',index);
      // this.posts.splice(index,1)
      this.$store.dispatch('timeLine/deletePost',index)
    },
    //so pode editar a mensagem
    editarPost(index,novoTexto){
      console.log("editando");
      console.log(novoTexto)
      // this.posts[index].text = novoTexto;
      this.$store.dispatch('timeLine/editarPost',{index: index,novoTexto:novoTexto})
      

    },
    changeMode(){
      console.log("themeColor")
      this.isDark = !this.isDark
      if(this.isDark){
        this.themeColor =  '#009688'
        
      }else{
        this.themeColor = '#616161'

      }
      this.$store.dispatch('timeLine/changeTheme')


    }
  },
  computed: {
    ...mapGetters('timeLine', ['getPosts'])
  }
};
</script>

<style>
.messages-container {
  width: 100%;
  padding-top: 64px;
  padding-bottom: 56px;
}
.justify-center{
  display:flex;
  justify-content:space-around;
}
</style>