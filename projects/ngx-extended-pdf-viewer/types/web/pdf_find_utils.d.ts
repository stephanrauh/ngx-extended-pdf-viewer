export function getNormalizeWithNFKC(): any;
/**
 * Determine if the match spanning `[startIdx, startIdx + length)` in `content`
 * is a whole word, i.e. there's a word break on each side of it. Each boundary
 * is tested on its two adjacent characters in isolation rather than on the
 * whole string, so a contraction such as "can't" doesn't prevent "can" from
 * being an entire word, matching Firefox's find:
 * https://searchfox.org/firefox-main/source/toolkit/components/find/nsFind.cpp
 */
export function isEntireWord(content: any, startIdx: any, length: any): boolean;
