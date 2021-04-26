<template>
  <div class="toggle-box">
    <input
      type="checkbox"
      id="toggle-box-checkbox"
      v-model="enable"
      @click="switchDisplay"
    />
    <label
      for="toggle-box-checkbox"
      class="toggle-box-label-left"
      :style="scale"
    />
    <label for="toggle-box-checkbox" class="toggle-box-label" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DayNightSwitch',
  props: {
    size: {
      type: String,
      default: 'md',
    },
  },
  computed: {
    ...mapState(['store_accessibility']),
    scale() {
      let value = 1.0

      switch (this.size) {
        case 'xl':
          value = 1.5
          break
        case 'lg':
          value = 1.25
          break
        case 'md':
          value = 1.0
          break
        case 'sm':
          value = 0.75
          break
      }

      return 'transform: scale(' + value + ')'
    },
    enable: {
      get: function() {
        return this.store_accessibility.displayNight.enable
      },
      set: function() {
        // la hook est présente mais pas de mutation,
        // tout simplement lors du montage de ce composant,
        // cette hook est appelée et ce n'est pas le but
        return this.store_accessibility.displayNight.enable
      },
    },
  },
  methods: {
    switchDisplay() {
      this.$store.dispatch('store_accessibility/switch_display')
    },
  },
}
</script>

<style lang="less" scoped>
// importé puis modifié de https://codepen.io/jesperkc/pen/pydMqb

@shine: 0 0 10px #333;
@on-bg: rgba(0, 0, 0, 0.15);
@on-dot-color: gold;
@on-border: 2px solid gold;
@off-bg: rgba(255, 255, 255, 0.15);
@off-dot-color: white;
@off-border: 2px solid white;
@togglebutton-size: 15px;
@togglebutton-padding: 4px;
@togglebutton-margin: 10px;
@togglebutton-label-padding: 0px;
@togglebutton-label-color: rgba(149, 149, 149, 0.51);
@togglebutton-label-active-color: rgba(250, 250, 250, 0.51);
@togglebutton-label-weight: normal;
@togglebutton-label-active-weight: bold;

.toggle-box-label-left {
  &:empty {
    margin-left: -@togglebutton-margin;
  }

  &::before,
  &::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    /*transition*/
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
    outline: none;
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    z-index: 1;
    line-height: 34px;
    text-indent: 40px;
    height: @togglebutton-size;
    width: @togglebutton-size;
    margin: @togglebutton-padding;
    /*border-radius*/
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    right: ((@togglebutton-size)) + @togglebutton-label-padding +
      @togglebutton-margin;
    bottom: @togglebutton-label-padding;
    background: @on-dot-color;
    transform: rotate(-45deg);
    box-shadow: @shine;
  }
  &:after {
    content: '';
    display: inline-block;
    width: (@togglebutton-size * 2) + (@togglebutton-padding * 2);
    height: @togglebutton-size + (@togglebutton-padding * 2);
    /*border-radius*/
    -webkit-border-radius: @togglebutton-size;
    -moz-border-radius: @togglebutton-size;
    border-radius: @togglebutton-size;
    background: @off-bg;
    vertical-align: middle;
    margin: 0 @togglebutton-margin;
    border: @on-border;
  }
}

.toggle-box {
  label {
    display: inline-block;
    position: relative;
    padding: @togglebutton-label-padding;
    margin: 0;
    cursor: pointer;
    color: @togglebutton-label-color;
    font-weight: @togglebutton-label-weight;
  }

  input[type='checkbox'] {
    //  C'est répeté parceque je ne sais pas comment fusionner les 2 avec Less
    border: none;
    outline: none;
    display: none;

    &:active {
      border: none;
      outline: none;
      display: none;
    }
    //  C'est répeté parceque je ne sais pas comment fusionner les 2 avec Less

    + .toggle-box-label-left {
      color: @togglebutton-label-active-color;
      font-weight: @togglebutton-label-active-weight;
    }

    &:checked + .toggle-box-label-left {
      color: @togglebutton-label-color;
      font-weight: @togglebutton-label-weight;
    }

    &:checked + .toggle-box-label-left + .toggle-box-label {
      color: @togglebutton-label-active-color;
      font-weight: @togglebutton-label-active-weight;
    }

    &:checked + .toggle-box-label-left:before {
      right: 17px;
      box-shadow: 5px 5px 0 0 @off-dot-color;
      background: transparent;
    }

    &:checked + .toggle-box-label-left:after {
      background: @on-bg;
      border: @off-border;
    }

    &:hover + .toggle-box-label-left:after {
      border: 2px solid skyblue;
    }
  }
}
</style>
