/**
 * Helpers for PDF sound objects (ISO 32000-1, 12.5.6.16).
 *
 * Sound streams contain samples described by /R, /C, /B, /E, and optional /CO.
 * We wrap supported uncompressed PCM (Raw/Signed, 8/16-bit, mono/stereo) in WAV
 * for playback.
 *
 * @import { BaseStream } from "./base_stream.js";
 * @import { Dict } from "./primitives.js";
 */
/**
 * Return a supported uncompressed sample format.
 *
 * @param {Dict} [dict] The sound object's stream dictionary.
 * @returns {{
 *   channels: number,
 *   sampleRate: number,
 *   bitsPerSample: number,
 *   encoding: string,
 * } | null}
 */
export function getSoundFormat(dict?: Dict): {
    channels: number;
    sampleRate: number;
    bitsPerSample: number;
    encoding: string;
} | null;
/**
 * Build a WAV file from supported PDF sound samples.
 *
 * PDF 16-bit samples are big-endian; WAV uses little-endian, unsigned 8-bit
 * samples, and signed 16-bit samples. The data chunk is trimmed to a whole
 * number of frames (a multiple of the block alignment); a stream with no
 * complete frame produces no WAV.
 *
 * @param {BaseStream} stream The sound object stream.
 * @param {Uint8Array} samples Raw sample bytes from the stream.
 * @returns {Uint8Array | null}
 */
export function soundStreamToWav(stream: BaseStream, samples: Uint8Array): Uint8Array | null;
import type { Dict } from "./primitives.js";
import type { BaseStream } from "./base_stream.js";
