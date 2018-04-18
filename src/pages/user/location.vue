<template>
  <div class="wrap userLocation">
    <map class="userLocation-map" :longitude="log" :latitude="lat" :scale="scale"
      :markers="markers" show-location
    ></map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      log: 120.007876,
      lat: 30.296475,
      scale: 15,
      markers: [
        {
          id: 0,
          iconPath: '/static/img/icon-marker.png',
          latitude: 30.296475,
          longitude: 120.007876,
          width: 17,
          height: 34
        }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
.userLocation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &-map {
    width: 100%;
    height: 100%;
  }
}
</style>
