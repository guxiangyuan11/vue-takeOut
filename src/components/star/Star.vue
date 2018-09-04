<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item on" :class="" v-for="(star,index) in starScore" :key="index"></span>
    <span class="star-item on"></span>
    <span class="star-item on"></span>
    <span class="star-item half"></span>
    <span class="star-item off"></span>
  </div>
</template>

<script>
    export default{
        data: function () {
            return {}
        },
        props: {
          score: Number, // 分数
          size: Number // 星星大小
        },
        computed:{
            starScore: function () {
              const {score} = this;

            }
        },
        components: {},
        templates: {}
    }
</script>

<style lang="scss">
  @import "../../common/scss/mixins";
  .star { //2x图 3x图
    float: left;
    font-size: 0;
    .star-item{
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48{
      .star-item{
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          @include bg-image('./images/stars/star48_on');
        }
        &.half{
          @include bg-image('./images/stars/star48_half');
        }
        &.off{
          @include bg-image('./images/stars/star48_off');
        }
      }
    }
    &.star-36{
      .star-item{
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          @include bg-image('./images/stars/star36_on');
        }
        &.half{
          @include bg-image('./images/stars/star36_half');
        }
        &.off{
          @include bg-image('./images/stars/star36_off');
        }
      }
    }
    &.star-24{
      .star-item{
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          @include bg-image('./images/stars/star24_on');
        }
        &.half{
          @include bg-image('./images/stars/star24_half');
        }
        &.off{
          @include bg-image('./images/stars/star24_off');
        }
      }
    }
  }
</style>
