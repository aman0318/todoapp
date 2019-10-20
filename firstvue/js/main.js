var Grocerylists={
  props:['listdata'],
  data(){
      return{
        newitem:"",

            }
       },
  methods:{
  
        calldata:function(index)
        {
        
      
            this.$emit('delet-data',index);
        },
      

        add:function()
        {
          console.log(this.$refs);
          this.$emit('add-new',this.newitem);
        },
        select:function(list)
        {
          
          this.$emit('change-select',list);
      
        }


  },
  

  template:` 
 <div class="container-fluid">
    <div class="row todoitems" v-for="(list,index) in listdata.todos">
      <div class="col-md-6 ">
          <li class="list-group-item">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" for="check1" :checked="list.Selected" >
                <label class="custom-control-label" id="check1'" v-on:click="select(list)">{{list.Name}}</label>
              </div>
          </li>
      </div>
      <div class="col-md-2 offset-4">
         <button class="btn  btn-light btn1 btn-sm 	fas fa-trash-alt " style="margin-top:10px;" @click="calldata(index)" ></button>
      </div>
   </div>
   <form>
      <div class="row"  style="margin-top:10px;" >
          <div class="col-md-10 form-group">
              <input type="text" placeholder="Add todo items" class="form-control" v-model="newitem" ref="input">
          </div>
          <div class="col-md-2 form-group">
            <button class="btn btn-success     form-control " @click="add()" >Add</button>
          </div>
      </div>
    </form>

</div>
  
  `

}

var Grocerytodo={
  
  components: {
    
           'Grocerylists':Grocerylists
   
            },
  data(){
    return{
          Title:this.$route.params.title,
            listdata:[],
      todo:[],
      newtd:[],
          }

        },
        mounted(){
          this.getlistdata();
          console.log(this.$refs);
          console.log(this.newtd);
          },

        methods: {
  
          getlistdata()
          {
            axios.get('http://localhost:3000/ToDoList?title='+this.Title)
            .then(success=> {
              // handle success
               this.listdata=success.data[0];
              // console.log(success)
            });
        
          
          },
          additems:function(newitem)
          {
            this.todo=this.listdata.todos;
            axios.post('http://localhost:3000/ToDoList', {
              Name:newitem})
            .then((resp) => {
            //  this.newtd=resp.data;
            })
          
          
            // // console.log("=================")
            //   this.listdata.todos.push({
                    
            //     Name:newitem,
              
                
            //   })
          
          },
          Deleteitems:function(index)
          {
        
                  this.listdata.todos.splice(index,1);
          },
          chageSelect:function(list){
                if(list.Selected==false){

                      list.Selected=true;

                }
                else{
                  list.Selected=false;
                }
                  
          }

      },
  template:` 
   <div class="card" >
      <h5 class="card-header  bg-dark text-white">{{Title}}</h5>
      {{newtd}}
      {{todo}}
        <div class="card-body">
                <ul class="list-group list-group-flush">
                   <Grocerylists :listdata="listdata" ref="demo"
                   @delet-data=" Deleteitems"
                   @add-new="additems"
                   @change-select="chageSelect"
                   ></Grocerylists>
                </ul> 
             
        </div>
   </div> 
  `
}



var ListTitle={
props:['todolist'],
methods:{
deletetitle:function(index)
{
 delete this.todolist.titles(index);
}
},
  template:`
   <div>
       <li class="list-group-item list-group-item-action"  v-for="(todo,index) in todolist" v-bind:key="index" >
         <router-link :to="'/Grocerytodo/'+todo.title">
              {{todo.title}}
             
          </router-link>
          <button class="btn  btn-light btn1 btn-sm 	fas fa-trash-alt offset-7 " style="margin-top:10px;"  ></button>
        </li>
   </div>
  `
  
  
  } ;                                                                                                                                                                                                                                                                                                             



 var lists={


  components: {
    
    'ListTitle':ListTitle
   
  },


  data(){
    return{
      todolist:[]
    }
  },
  mounted(){
  this.getdata();
  },
    methods: {
  
  getdata(){
    axios.get('http://localhost:3000/ToDoList')
    .then(success=> {
      // handle success
       this.todolist=success.data;
      // console.log(success)
    });

  
  },
  // deletetitle:function(index)
  // {
         
  //         this.todolist.title.splice(index,1)
  // }
 
 
    },
  template: `
  <div class="card" >
       <h5 class="card-header  bg-dark text-white">To Do Lists</h5>
          <div class="card-body">
                <ul class="list-group list-group-flush">
                    <ListTitle :todolist="todolist" ></ListTitle>
                </ul> 
           </div>
    </div>
  `
}

const routes =
       [
            { path: '/', component: lists },
            { path: '/Grocerytodo/:title', component: Grocerytodo },
        ]




const router = new VueRouter({

  routes
  // mode:'history'

});


var myObject = new Vue({
  el: '#app',
  router,
  components: {
    
    // 'ListTitle':ListTitle
   
  }

  
}).$mount('#app')



