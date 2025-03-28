import {type AudioFormatOptions, createCommonFormat} from "@/formats/common";

/**
 *
 * @param options
 */
export function createWavFormat(options: WavFormatOptions): string[] {
    const commands = createCommonFormat(options)

    const bitDepthVariats = {
        8: 'pcm_u8',
        16: 'pcm_s16le',
        24: 'pcm_s24le',
        32: 'pcm_f32le',
    }
    // Bitrate handling
    if (options.bitDepth) {
        commands.push(`-acodec`);
        commands.push(`${bitDepthVariats[options.bitDepth]}`);
    }

    commands.push('output.wav');

    return commands;
}

interface WavFormatOptions extends AudioFormatOptions {
    bitDepth?:  8 | 16 | 24 | 32
}
