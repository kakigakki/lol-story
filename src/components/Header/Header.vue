<template>
  <div class="m-header">
    <div class="logo">nnn</div>
    <h1 class="text">LOL UNIVERSE</h1>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.m-header {
  position: relative;
  height: 44px;
  text-align: center;
  color: $color-text;
  font-size: 0;
  background-color: $color-card;

  .logo {
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
    width: 30px;
    height: 32px;
    margin-right: 9px;
    bg-image('logo');
    background-size: 30px 32px;
  }

  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: $font-size-large;
  }
}
</style>