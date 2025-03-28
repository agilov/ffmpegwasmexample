import {FFmpeg} from '@ffmpeg/ffmpeg'
import {fetchFile, toBlobURL} from '@ffmpeg/util'
import {detectMimeType} from './formats/detectMime'

const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core-mt@0.12.9/dist/esm'
const ffmpeg = new FFmpeg()

type ProgressHandler = (progress: number) => void | undefined;
type LogHandler = (msg: string) => void | undefined;

/**
 * Transcoding to specified format
 *
 * @example
 * ```ts
 * transcode(fileBlob, (progress: number): void => {
 *   console.log(progress)
 * })
 * ```
 *
 * @remarks
 * - log includes output to stdout and stderr.
 * - The progress events are accurate only when the length of
 * input and output video/audio file are the same.
 */
export async function transcode(
    blob: Blob,
    format: AudioFormat,
    progress: ProgressHandler | undefined,
    log: LogHandler | undefined
) {
    const writeLog = (msg: string) => {
        console.log(msg)
        return log ? log(msg) : undefined
    }
    const writeProgress = (e) => {

        return progress ? progress(e.progress) : undefined
    }

    await loadCore(writeLog)

    ffmpeg.on('log', writeLog)
    ffmpeg.on("progress", writeProgress)
    try {
        writeLog('Start transcoding')
        await ffmpeg.writeFile('test.bin', await fetchFile(blob))
        // await ffmpeg.exec(['-i', 'test.mp4', '-vn', '-ar','44100','-ac','2','-b:a','192k', 'test.mp3'])
        const result = await ffmpeg.exec(['-i', 'test.bin', '-vn', ...format ])
        if (result !== 0) {
            writeLog(`Transcoding failed, exit status:  ${result}`)
            return ''
        }
        writeLog('Transcoding completed')

        const data = await ffmpeg.readFile(format.pop())
        console.log('Transcoding completed', data);
        const mimeType = await detectMimeType(data.slice(0, 16));
        const transcodedBlob = new Blob([data.buffer], { type: mimeType });
        writeLog(`Output aduio info: size - ${transcodedBlob.size}, type - ${mimeType}`)
        return URL.createObjectURL(transcodedBlob)
    } finally {
        ffmpeg.off('log', writeLog)
        ffmpeg.off('progress', writeProgress)
    }

    return ''
}

async function loadCore(writeLog: Function) {
    if (!ffmpeg.loaded) {
        writeLog('Loading ffmpeg-core.js')
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript')
        })
        writeLog('ffmpeg-core.js loaded!')
    }
}
