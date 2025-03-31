## Common options for all formats

### Sample Rate Options
- 44.1 kHz: CD-quality standard (Music, general audio)
- 48 kHz: Professional audio standard (Video production, professional audio)
- 22.05 kHz: Lower quality, smaller file size
- 16 kHz: Speech/podcast quality
- 88.2 kHz: High-resolution audio for high-end audio production
- 96 kHz: Professional high-resolution standard

Conversion guidelines: downsample only when necessary, avoid upsampling (doesn't improve quality), match source material's original sample rate when possible.


### Channels
- Mono (1 channel)
- Stereo (2 channels)


### Normalize volume

FFmpeg can normalize volume, there are no any parameters to this operation, it's just a filter.

### Adjust volume

#### Numerical Volume Scale
- Minimum: 0.0 (Mute)
- Default: 1.0 (Original Volume)
- Maximum: Theoretically unlimited, but practically recommended up to 2.0-3.0

#### Detailed Volume Range Examples
- Mute: `volume=0.0`
- Half Volume: `volume=0.5`
- Original Volume: `volume=1.0`
- Double Volume: `volume=2.0`
- Triple Volume: `volume=3.0`

#### Decibel-Based Adjustment
Increase by 6dB (approximately double volume), decrease by 3dB (approximately half volume)

#### Volume Adjustment Warnings
- Values above 2.0 may cause distortion
- Extreme adjustments can introduce audio artifacts
- Recommended range: 0.5 to 2.0

#### Volume Mapping Reference
- 0.0: Silent
- 0.1 - 0.4: Very Quiet
- 0.5 - 0.9: Quiet
- 1.0: Original Volume
- 1.1 - 1.5: Slightly Louder
- 1.6 - 2.0: Noticeably Louder
- 2.1 - 3.0: Potentially Distorted

#### Practical Recommendations
1. Start with small increments
2. Test and listen to output
3. Use peak normalization for consistent volume
4. Avoid extreme volume changes

### Metadata Handling

FFMpeg can add metadata to audio

1. Common metadata

- `title`: Song or track name
- `artist`: Performer or band name
- `album`: Album title
- `genre`: Music genre
- `date`: Release year
- `track`: Track number
- `comment`: Additional notes
- `composer`: Song writer or composer
- `album_artist`: Primary artist of the album

2. Technical Metadata
- `encoded_by`: Encoding software/person
- `encoding_tool`: Encoding application
- `encoder_settings`: Specific encoding parameters
- `compilation`: Part of a compilation (0/1)
- `disc`: Disc number in a multi-disc set

3. Rights and Licensing
- `license`: Usage license
- `copyright`: Copyright statement
- `website`: Artist or label website
- `TCOP`: Copyright message
- `TPUB`: Publisher

4. Performance Details
- `mood`: Emotional tone of the track
- `original_artist`: Original performer
- `performer_sort_order`: Sorting name for performer
- `album_sort_order`: Sorting name for album
