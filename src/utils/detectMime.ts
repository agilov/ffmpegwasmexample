const signatures = {
    'audio/mpeg': [0xFF, 0xF3],  // MP3
    'audio/mp3': [0x49, 0x44, 0x33],  // Another MP3 signature
    'audio/wav': [0x52, 0x49, 0x46, 0x46],  // WAV (RIFF header)
    'audio/mp4': [0x00, 0x00, 0x00, 0x1C, 0x66, 0x74, 0x79, 0x70, 0x4D, 0x34, 0x41],  // M4A alternative
    'audio/flac': [0x66, 0x4C, 0x61, 0x43],  // FLAC
};

export async function detectMimeType(arr: Uint8Array): Promise<string> {
    for (const [mimeType, signature] of Object.entries(signatures)) {
        console.log(signature.join('.'));
        console.log(arr.slice(0, signature.length).join('.'));
        if (signature.join('.') === arr.slice(0, signature.length).join('.')) {
            console.log('Detected mime type', mimeType);
            return mimeType;
        }
    }

    return 'application/octet-stream'
}
