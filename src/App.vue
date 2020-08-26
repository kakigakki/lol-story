<template>
  <div id="app">
    <Header></Header>
    <keep-alive>
      <router-view />
    </keep-alive>
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
<style lang="stylus">
#app {
  height: 100vh;
  position: relative;
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
