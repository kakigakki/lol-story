<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "components/TabBar/TabBar";
import Header from "components/Header/Header";
export default {
  data() {
    return {
      active: 0,
    };
  },
  components: {
    Tabbar,
    Header,
  },
};
</script>
<style>
#app {
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
