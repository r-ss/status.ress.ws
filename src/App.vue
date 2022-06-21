<template>
<div class="app-body">


    <Navbar />

    <div class="pagecontent">
      <router-view v-slot="{ Component }">
        <!-- <keep-alive> -->
          <component :is="Component" />
        <!-- </keep-alive> -->
      </router-view>
    </div>



</div><!-- .app-body -->

</template>






<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>


#app {
  margin: 15px;
}







.pagecontent {
  position: relative;
  top: 0px;
  padding-bottom: 40px;
}



.m-top { margin-top: 15px; }
.mm-top { margin-top: 30px; }
.m-right { margin-right: 15px; }
.mm-right { margin-right: 30px; }
.m-bottom { margin-bottom: 15px; }
.mm-bottom { margin-bottom: 30px; }
.m-left { margin-left: 15px; }
.mm-left { margin-left: 30px; }

.strikethrough { text-decoration: line-through; }
.inline-block {display: inline-block;}

.center {text-align: center;}
.align-left {text-align: left;}
.align-right {text-align: right;}

.pointer {cursor: pointer;}


</style>

