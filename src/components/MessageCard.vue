<template>
    <!--<v-card outlined class='ma-3' ref='myPost' :class="{ 'teal accent-4': messageProp.user != 'Eu', 'grey lighten-2': messageProp.user == 'Eu' }">-->
    <v-card outlined class='ma-3' ref='myPost' :color='theme'>
        
        <v-row justify='space-between' >
            
            <v-col col='auto'>
                <v-card-text @click='openProfile(messageProp.user)' class="font-weight-bold pb-0">{{ messageProp.user}}</v-card-text>
                <v-card-subtitle class="font-weight-bold pt-0 pb-0">{{messageProp.date}} </v-card-subtitle>
                
            </v-col>
            <v-col col='auto' class ="d-flex justify-end ">
                <v-btn @click='edit()' icon color="yellow" >
                    <v-icon>mdi-playlist-edit</v-icon>
                </v-btn>
                <v-btn @click='deletarPost()' icon color="red">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>               
            </v-col>
        </v-row>
        
        <v-row v-show='editing'>
            <v-text-field v-model='field' @keyup.enter='finishEdit()' solo label= "" hide-details ></v-text-field>
            <v-btn @click='finishEdit()' icon color="yellow">
            <v-icon>mdi-content-save-edit</v-icon>
            </v-btn>
        </v-row>
        <!--:class="{ 'teal accent-4': messageProp.user == 'friend', 'grey lighten-2': messageProp.user != 'friend' }"-->
        <v-card-text :id='this.index' class = 'black--text messagem'
         :class="{ 'cor1': theme == '#009688', 'cor2': theme != '#009688' }">{{ messageProp.text}}</v-card-text>
        <!--<v-card-text :color='theme' :id='this.index' class = 'black--text messagem'>{{ messageProp.text}}</v-card-text>-->
        
        
        <img width='100%'  v-if="messageProp.path !== ''" :src= "require('@/assets' + messageProp.path)"/>
    </v-card>
</template>

<script>
 
  
export default {
    mounted() {
        // if(this.theme == '#009688'){
        //     this.subTheme = "#80CBC4"
        // }else{
        //     this.subTheme = "blue"
        // }
        console.log("montou")
        
    //     document.getElementById(String(this.index)).scrollIntoView();
    },   
    props: ['theme','messageProp','index' ],
    data: () => ({
        field: '',
        editing : false,
        path:'as',
        subTheme:"#80CBC4"
    }),
    methods: {
    focusInput() {
      this.$refs.myPost.$el.focus();
    },
    deletarPost () {
      console.log("apagar")
      this.$emit('deletarPost',this.index);
        // this.allPost = []
      
    
    },
    openProfile(userName) {
        console.log("ir para o perfil kof as as d")
        this.$router.push(`perfil/${userName}`)
    },
    edit() {
        console.log('editando');
        this.editing = !this.editing
    },
    finishEdit(){
        console.log('finalizar edicao');
        this.editing = !this.editing
        this.$emit('editarPost',this.index,this.field);

    }
    
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cabin:ital@1&display=swap');
.inicio{
  height:50px;  
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  padding:0;
  
  
}
.cor1{
    background: #80CBC4
}

.cor2{
    background: #9e9e9e

}
.messagem{
    
    font-family: 'Cabin', sans-serif;
    font-size: 59 !important;
}
</style>