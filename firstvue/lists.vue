<template>
  <div class="container">
    <div class="row">
      <ul class="list-group">
  <li class="list-group-item" v-for="(todo,index) in todos " v-bind:key="index" >{{todo.text}}</li>

</ul>
    </div>



  </div>
</template>
<script>
export default {
data:{
   todos: [
     {
       text:'Grocery shopping'
     },
      { text: 'Movies to watch' },
      { text: 'Steps to follow' }
    ]
}
}
</script>

