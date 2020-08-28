
<template>
    <v-main>
        <v-app-bar fixed  color="#009688">
            <v-row justify='space-around'>
                <v-btn @click='voltar()' icon color="#0D47A1">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>               
                 <v-toolbar-title style="display:flex;align-items : center;">{{ $route.params.name }}</v-toolbar-title>
                 <v-btn  icon color="#0D47A1">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>               
            </v-row>
            
        </v-app-bar>
        <div class="imgPerfil">
            
            <img  width='50%' v-if="$route.params.name === 'Bob'"  :src= "require('@/assets/perfil/Bob.jpeg')"/>
            <img  width='50%' v-if="$route.params.name !== 'Bob'"  :src= "require('@/assets/perfil/Maylon.jpg')"/>
            
            <v-card-text :id='$route.params.name' class = 'black--text messagem'>Sou um dog muito Feliz que trabalho com IA na Beyond</v-card-text>
        </div>
        
        
        
        
        <div v-for="(post, i) in getPosts" :key="i" color="#424242">
          <MessageCard   v-if="post.user === $route.params.name" :messageProp='post' :index='i' @deletarPost="deletarPost" @editarPost="editarPost"  />
        </div>
        
        <!-- <v-card-text :id=this.index class = 'black--text messagem'>{{ messageProp.text}}</v-card-text>-->
    </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
import MessageCard from './components/MessageCard.vue'
export default {
    components: {
        MessageCard
    },
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
    voltar(){
        console.log("ir para a timeLine")
        this.$router.push(`/`)
    }
  },
    
    computed: {
            ...mapGetters('timeLine', ['getPosts'])
    }
}
</script>

<style>
.imgPerfil{
    display:flex;
    align-items : center;
    padding-top: 64px;
    padding-bottom: 10px;
}
.imgPerfil img{
    border-style: solid;
    border-color: green;
    margin-right: 15px;
    margin-left: 15px;
}
</style>