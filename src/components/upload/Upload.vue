<template>
  <div>
    <input type="file" @change='fileChange($event)'>
    <img src="" alt="" ref="img" accept="image/*">  
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgurl: ''
    }
  },
  methods: {
    fileChange(e) {
      const _this = this
      const file = e.target.files[0]
      console.log(file);
      
      const Reader = new FileReader()
      Reader.readAsDataURL(file);
      Reader.addEventListener('load', function() {
        _this.$refs.img.src = this.result
      })
    }
  }
}
</script>

<style>

</style>