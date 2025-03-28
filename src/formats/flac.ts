import {type AudioFormatOptions, createCommonFormat} from "@/formats/common";

/**
 *
 * @param options
 */
export function createFlacFormat(options: FlacFormatOptions): string[] {
    const commands = createCommonFormat(options)

    commands.push('-c:a')
    commands.push('flac')
    const bitDepthVariats = {
        8: 'u8',
        16: 's16',
        24: 's24',
        32: 's32',
    }
    // Bitrate handling
    if (options.bitDepth) {
        commands.push(`-sample_fmt`);
        commands.push(`${bitDepthVariats[options.bitDepth]}`);
    }

    // Bitrate handling
    if (options.compressionLevel) {
        commands.push(`-compression_level`);
        commands.push(`${options.compressionLevel}`);
    }

    commands.push('output.flac');

    return commands;
}

interface FlacFormatOptions extends AudioFormatOptions {
    compressionLevel?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    bitDepth?: 8 | 16 | 24 | 32
}
