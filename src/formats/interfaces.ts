export type AudioFormat = string[]

/**
 * Represents standard audio sample rates in Hertz
 * @description Enum of common sample rates used in audio production
 */
enum AudioSampleRate {
    /**
     * CD-quality standard
     * Typical use: Music, general audio
     */
    CD_QUALITY = 44100,

    /**
     * Professional audio standard
     * Typical use: Video production, professional audio
     */
    PROFESSIONAL_STANDARD = 48000,

    /**
     * Lower quality, smaller file size
     */
    LOWER_QUALITY = 22050,

    /**
     * Speech and podcast quality
     */
    SPEECH_QUALITY = 16000,

    /**
     * High-resolution audio for professional production
     */
    HIGH_RESOLUTION_FIRST = 88200,

    /**
     * Professional high-resolution standard
     */
    HIGH_RESOLUTION_PROFESSIONAL = 96000
}

/**
 * Represents comprehensive metadata for a music track
 * @interface AudioMetadata
 * @description Provides a structured representation of various metadata aspects for musical tracks
 *
 * @example
 * ```ts
 * const bohemianRhapsodyMetadata: AudioMetadata = {
 *     title: "Bohemian Rhapsody",
 *     artist: "Queen",
 *     album: "A Night at the Opera",
 *     genre: "Rock",
 *     date: 1975,
 *     track: 11,
 *     composer: "Freddie Mercury",
 *     album_artist: "Queen",
 *     copyright: "© 1975 EMI Records",
 *     mood: "Epic",
 *     compilation: 0
 * };
 * ```
 */
interface AudioMetadata {
    // Common Metadata
    /**
     * The title of the song or track
     * @example "Bohemian Rhapsody"
     */
    title?: string;

    /**
     * The primary performer or band name
     * @example "Queen"
     */
    artist?: string;

    /**
     * The album on which the track appears
     * @example "A Night at the Opera"
     */
    album?: string;

    /**
     * The musical genre of the track
     * @example "Rock", "Classical", "Jazz"
     */
    genre?: string;

    /**
     * The year of track release
     * @example 1975
     */
    date?: number;

    /**
     * The track number within the album
     * @example 11
     */
    track?: number;

    /**
     * Additional notes or comments about the track
     * @example "Live recording from concert"
     */
    comment?: string;

    /**
     * The songwriter or composer of the track
     * @example "Freddie Mercury"
     */
    composer?: string;

    /**
     * The primary artist of the entire album
     * @example "Queen"
     */
    album_artist?: string;

    // Technical Metadata
    /**
     * The entity responsible for audio encoding
     * @example "Jane Doe"
     */
    encoded_by?: string;

    /**
     * The software or application used for encoding
     * @example "Audacity"
     */
    encoding_tool?: string;

    /**
     * Specific parameters used during audio encoding
     * @example "128kbps, stereo, 44.1kHz"
     */
    encoder_settings?: string;

    /**
     * Indicates if the track is part of a compilation
     * @example 0 (not a compilation), 1 (part of compilation)
     */
    compilation?: 0 | 1;

    /**
     * The disc number in a multi-disc album set
     * @example 1
     */
    disc?: number;

    // Rights and Licensing
    /**
     * The usage license for the track
     * @example "CC BY-NC 4.0"
     */
    license?: string;

    /**
     * Copyright statement for the track
     * @example "© 1975 EMI Records"
     */
    copyright?: string;

    /**
     * Official website of the artist or label
     * @example "www.queenofficial.com"
     */
    website?: string;

    /**
     * Standardized copyright message
     * @example "All rights reserved"
     */
    TCOP?: string;

    /**
     * Publisher of the track
     * @example "EMI Music"
     */
    TPUB?: string;

    // Performance Details
    /**
     * Emotional tone or mood of the track
     * @example "Energetic", "Melancholic", "Upbeat"
     */
    mood?: string;

    /**
     * The original performer of the track
     * @example "Original Jazz Ensemble"
     */
    original_artist?: string;

    /**
     * Sorting name for the performer (useful for alphabetization)
     * @example "Mercury, Freddie"
     */
    performer_sort_order?: string;

    /**
     * Sorting name for the album
     * @example "Night at the Opera, A"
     */
    album_sort_order?: string;
}

/**
 * Options to create audio format (common for all formats)
 */
export interface AudioFormatOptions {
    /** Audio sample rate */
    sampleRate?: AudioSampleRate | number,

    /** Audio can be stereo or mono */
    channels?: 'stereo' | 'mono' | 1 | 2,

    /**
     * Volume options
     * - Mute: `volume=0.0`
     * - Half Volume: `volume=0.5`
     * - Original Volume: `volume=1.0`
     * - Double Volume: `volume=2.0`
     * - Triple Volume: `volume=3.0`
     */
    volume?: number,

    /** Normalize audio volume or not */
    normalize?: boolean,

    /** Additional optional audio metadata */
    metadata?: AudioMetadata
}
