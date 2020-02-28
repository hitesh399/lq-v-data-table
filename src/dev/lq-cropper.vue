<template>
     <v-layout align-center justify-center row fill-height>
       <div v-if="loading" style="width: 96%; position: absolute; top: 43px;">
        <v-progress-linear :indeterminate="true"></v-progress-linear>
       </div>
       <vue-croppie
          ref="croppieRef"
          :viewport="viewport"
          :show-zoomer="true"
          :enableResize="false"
        />
       </v-layout>
     </v-layout>
</template>

<script>
export default {
  name: 'lq-cropper',
  props: {
    target: String,
    file: File,
    boundary: {
      type: Object,
      default() { return { width: 250, height: 100 }; }
    },
    viewport: {
      type: Object,
      required: true
    },
    size: {
      type: [String, Object],
      default: () => 'original'
    }
  },
  inject: ['lqForm', 'lqFile'],
  data: function () {
    return {
      loading: false,
      rawData: ''
    }
  },
  created() {
    this.readFile();
  },
  watch: {
    file: function (newFile, oldFile) {
      this.readFile();
    }
  },
  methods: {
    readFile() {
      if (!this.file) {
        return;
      }
      let fReader = new FileReader();
      this.loading = true;
      fReader.onload = (e) => {
        this.rawData = e.target.result;
        setTimeout(() => {
            this.init()
        }, 500)
      }
      fReader.readAsDataURL(this.file);
    },
    init: function () {
      this.$refs.croppieRef.refresh()
      this.$refs.croppieRef.bind({
        url: this.rawData
      })
      this.loading = false;
    },
    cropImage: function () {
      const options = {
        type: 'blob',
        size: this.size,
        format: this.circle ? 'png' : this.getFileExt(this.file.name),
        quality: 1,
        circle: this.circle
      }

      this.$refs.croppieRef.result(options, (output) => {
        let name = this.file.name
        let newFile = new File([output], name , {type: this.circle ? 'png' : this.file.type })
        let elementName = this.target + '.file'
        this.$store.dispatch('form/setElementValue', {
          formName: this.lqForm.name,
          elementName,
          value: newFile
        })
        this.$store.dispatch('form/setElementValue', {
          formName: this.lqForm.name,
          elementName: this.target + '.cropped',
          value: true
        })

        this.lqFile.readFile(false)

      });
    },
    getFileExt(name) {
        let name_arr = name.split('.')
        return name_arr[name_arr.length -1]
    },
    createFileName(name, include) {
      let name_arr = name.split('.')
      name_arr[name_arr.length -1] = include + '.' + name_arr[name_arr.length -1]
      return name_arr.join('.')
    }
  }
}
</script>

<style>

</style>
