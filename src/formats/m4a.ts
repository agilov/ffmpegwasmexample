import {type AudioFormatOptions, createCommonFormat} from "@/formats/common";

/**
 *
 * @param options
 */
export function createM4aFormat(options: M4aFormatOptions): string[] {
    const commands = createCommonFormat(options)

    // Bitrate handling
    if (options.bitrate) {
        commands.push(`-b:a`);
        commands.push(`${options.bitrate}k`);
    }

    commands.push('output.m4a');

    return commands;
}

interface M4aFormatOptions extends AudioFormatOptions {
    bitrate?:  96| 128 | 256 | 320
}
