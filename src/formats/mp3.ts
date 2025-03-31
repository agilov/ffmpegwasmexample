import {createCommonFormat} from "@/formats/common";
import type {AudioFormatOptions} from "@/formats/interfaces";

/**
 * Transcoding to specified format
 *
 * @example
 * ```ts
 * const sampleCommand = createMp3Format({
 *     bitrate: 192,
 *     sampleRate: 44100,
 *     channels: 'stereo',
 *     volume: 1.5,
 *     normalize: true,
 *     metadata: {
 *         title: 'My Song',
 *         artist: 'My Artist',
 *         album: 'My Album'
 *     }
 * });
 * ```
 *
 * @remarks
 * - log includes output to stdout and stderr.
 * - The progress events are accurate only when the length of
 * input and output video/audio file are the same.
 */
export function createMp3Format(options: Mp3FormatOptions): string[] {
    const commands = createCommonFormat(options)

    // Bitrate handling
    if (options.bitrate) {
        commands.push(`-b:a`);
        commands.push(`${options.bitrate}k`);
    }

    commands.push('output.mp3');

    return commands;
}

interface Mp3FormatOptions extends AudioFormatOptions {
    bitrate?:  96 | 128 | 256 | 320
}
