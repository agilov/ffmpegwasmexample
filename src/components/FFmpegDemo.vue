<template>
  <div>
    <p>Select WAV file</p>
    <input type="file" accept="audio/*" @change="handleFileChange"/>
    <div v-if="audioBlobUrl">
      <p>source audio</p>
      <audio v-if="audioBlobUrl" :src="audioBlobUrl" controls></audio>
      <p>blob info</p>
      <p v-if="blobInfo">Blob Size: {{ blobInfo.size }} bytes, Type: {{ blobInfo.type }}</p>

      <button @click="transcode" v-if="!video">transcode it to mp3</button>
    </div>

    <br/>
    <br/>
    <br/>
    <br/>

    <div v-if="blobData">
      <p style="width: 500px">{{ message }}</p>
      <div v-if="video">
        <p>transcoded audio</p>
        <audio   :src="video" controls></audio>
        <p v-if="transcodedBlobInfo">Blob Size: {{ transcodedBlobInfo.size }} bytes, Type: {{ transcodedBlobInfo.type }}</p>

      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {FFmpeg} from '@ffmpeg/ffmpeg'
import type {LogEvent} from '@ffmpeg/ffmpeg/dist/esm/types'
import {fetchFile, toBlobURL} from '@ffmpeg/util'
import {defineComponent, ref} from 'vue'

const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core-mt@0.12.9/dist/esm'
// const videoURL = 'https://raw.githubusercontent.com/ffmpegwasm/testdata/master/video-15s.avi'

export default defineComponent({
  name: 'App',
  setup() {
    const ffmpeg = new FFmpeg()
    const message = ref('')
    let video = ref('')
    let audioBlobUrl = ref('');
    let blobData = ref('');
    let blobInfo = ref({});
    let transcodedBlobInfo = ref({});

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
          // transcode(blob);
        };

        reader.readAsArrayBuffer(file);
        console.log(reader.result);

      }
    }

    async function transcode() {
      message.value = 'Loading ffmpeg-core.js'
      ffmpeg.on('log', ({message: msg}: LogEvent) => {
        message.value = msg
      })
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript')
      })
      message.value = 'Start transcoding'
      await ffmpeg.writeFile('test.wav', await fetchFile(blobData.value))
      // await ffmpeg.exec(['-i', 'test.mp4', '-vn', '-ar','44100','-ac','2','-b:a','192k', 'test.mp3'])
      const result = await ffmpeg.exec(['-i', 'test.wav', 'test.mp3'])
      message.value = 'Complete transcoding '
      console.log('before read')

      const data = await ffmpeg.readFile('test.mp3')
      console.log('written', data)
      const transcodedBlob = new Blob([(data as Uint8Array).buffer], {type: 'audio/mpeg'});
      video.value = URL.createObjectURL(transcodedBlob)

      transcodedBlobInfo.value = {
        size: transcodedBlob.size,
        type: transcodedBlob.type,
      };
    }

    return {
      video,
      message,
      blobData,
      handleFileChange,
      blobInfo,
      audioBlobUrl,
      transcodedBlobInfo,
      transcode
    }
  }
})
</script>
