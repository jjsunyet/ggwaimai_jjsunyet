<template>
  <div class="star" :class="`star-${size}`" >
    <span class="star-item " v-for="(sc,index) in starClasses" :key="index" :class="sc"></span>
  </div>
</template>
<script>

  /*
  * star中有哪些数据是需要动态修改的
  * 1.class：on/half/off
  * 2.star: 数量：根据score来计算
  *         怎么表示? on代表全星（n>=0），half代表半星（n=0,1）,off（n>=0)
  * */
  const CLASS_ON = 'on';
  const CLASS_HALF = 'half';
  const CLASS_OFF = 'off';

  export default {
    props:{
      score:Number,
      size:Number
    },
    computed:{
      starClasses(){
        const scs = [];
        const {score} = this;
        const scoreInteger = Math.floor(score);
        for (var i = 0; i <scoreInteger; i++) {
          scs.push(CLASS_ON)
        }
        if(Math.round(score-scoreInteger) ){
          scs.push(CLASS_HALF)
        }else if(scs.length<5){
          scs.push(CLASS_OFF)
        }
        return scs
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
