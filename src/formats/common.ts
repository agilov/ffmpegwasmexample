import type {AudioFormat, AudioFormatOptions} from "./interfaces";

/**
 * @param options
 */
export function createCommonFormat(options: AudioFormatOptions): AudioFormat {
    const commands = [];

    // Sample rate handling
    if (options.sampleRate) {
        commands.push(`-ar`);
        commands.push(`${options.sampleRate}`);
    }

    // Channel handling
    if (options.channels) {
        const channelMap = {
            'mono': 1,
            'stereo': 2
        };
        commands.push(`-ac`);
        commands.push(`${channelMap[options.channels] || options.channels}`);
    }

    // Volume adjustment
    if (options.volume !== undefined) {
        // Clamp volume between 0 and 3.0
        const safeVolume = Math.max(0, Math.min(3.0, options.volume));
        commands.push(`-filter:a`);
        commands.push(`"volume=${safeVolume}"`);
    }

    // Normalize volume (if requested)
    if (options.normalize) {
        commands.push('-filter:a');
        commands.push('loudnorm');
    }

    if (options.metadata) {
        Object.entries(options.metadata).forEach(([key, value]) => {
            if (value) {
                commands.push(`-metadata`);
                value = value.replace('"', '\"')
                commands.push(`${key}="${value}"`);
            }
        });
    }
    return commands;
}

