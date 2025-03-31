<template>
  <div>
    <p>Select audio or video file</p>
    <input type="file" accept="audio/*,video/*" @change="handleFileChange"/>
    <div v-if="audioBlobUrl">
      <p>source audio</p>
      <audio v-if="audioBlobUrl" :src="audioBlobUrl" controls></audio>
      <p v-if="blobInfo">Blob Size: {{ blobInfo.size }} bytes, Type: {{ blobInfo.type }}</p>

      <button @click="convert" v-if="blobInfo" :disabled="progress !== 0">transcode to</button>
      <select v-model="selectedFormat" v-if="blobInfo" :disabled="progress !== 0">
        <option v-for="format in formats" :value="format">{{ format }}</option>
      </select>
    </div>

    <br/>
    <br/>
    <br/>
    <br/>

    <div v-if="progress !== 0">
      <p style="width: 500px">Progress: {{ progress }}</p>
      <p style="width: 800px">Log: {{ log }}</p>
      <div v-if="outputAudio">
        <p>transcoded audio</p>
        <audio :src="outputAudio" controls></audio>
      </div>

    </div>
  </div>
</template>

<script>
import {transcode} from './utils/convert';
import {defineComponent, ref} from 'vue'
import {createMp3Format} from "@/formats/mp3";
import {createM4aFormat} from "@/formats/m4a";
import {createWavFormat} from "@/formats/wav";
import {createFlacFormat} from "@/formats/flac";

export default defineComponent({
  name: 'App',
  setup() {
    const log = ref('')
    const progress = ref(0)
    let outputAudio = ref('')
    let audioBlobUrl = ref('');
    let blobData = ref('');
    let selectedFormat = ref('mp3');
    let blobInfo = ref({});
    const formats = ['mp3', 'mp4', 'wav', 'flac'];

    async function handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const arrayBuffer = e.target.result;
          const blob = new Blob([arrayBuffer], {type: file.type});
          blobData.value = blob

          audioBlobUrl.value = URL.createObjectURL(blob);
          blobInfo.value = {
            size: blob.size,
            type: blob.type,
          };
          progress.value = 0
        };

        reader.readAsArrayBuffer(file);
        console.log(reader.result);

      }
    }

    function createFormat() {
      let format = [];
      const metadata = {
        title: 'My Song',
        artist: 'My Artist',
        album: 'My Album'
      }
      switch (selectedFormat.value) {
        case 'mp3':
          format = createMp3Format({
            bitrate: 192,
            sampleRate: 44100,
            channels: 'stereo',
            volume: 1.5,
            normalize: true,
            metadata
          })
          break;
        case 'm4a':
          format = createM4aFormat({
            bitrate: 192,
            sampleRate: 44100,
            channels: 'stereo',
            volume: 1.5,
            normalize: true,
          })
          break;
        case 'wav':
          format = createWavFormat({
            bitDepth: 8,
            sampleRate: 44100,
            channels: 'stereo',
            volume: 1.5,
            normalize: true,
          })
          break;
        case 'flac':
          format = createFlacFormat({
            bitDepth: 32,
            compressionLevel: 8,
            sampleRate: 44100,
            channels: 'stereo',
            volume: 1.5,
            normalize: true,
          })
          break;
      }
      return format;
    }


    async function convert() {
      outputAudio.value = await transcode(
          blobData.value,
          createFormat(),
          (msg) => {
        progress.value = msg
      }, (msg) => log.value = msg);
    }

    return {
      log,
      outputAudio,
      progress,
      blobData,
      handleFileChange,
      blobInfo,
      audioBlobUrl,
      convert,
      formats,
      selectedFormat,
    }
  }
})
</script>
