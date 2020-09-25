/**
 * This module exports various utility functions.
 *
 * @module utils
 */

import { APOSTROPHE } from "./constants"

/**
 * Masks an extended public key by showing only the first and last couple
 * characters.
 *
 * @param  {string} key - the (extended public) key to mask
 * @param  {number} [pre=15] - number of characters to show in the beginning
 * @param  {number} [post=15] - number of characters to show in the end
 * @param  {string} [placeholder="[...]"] - string used for masking
 */
function maskKey(key, pre = 15, post = 15, placeholder = "[...]") {
  const beginning = key.substr(0, pre)
  const ending = key.substr(key.length - post, key.length)
  return beginning + placeholder + ending
}

/**
 * Hardens a path segment as described in BIP32.
 *
 * @param  {string} pathSegment - the path segment to harden
 */
function harden(pathSegment) {
  return pathSegment + APOSTROPHE
}

/**
 * Splits a given bitcoin address into three segments for easier readability.
 * Per default, the first and last segment is 6 characters long.
 *
 * @param  {string} address - the given bitcoin address
 * @param  {number} [pre=6] - length of the first segment
 * @param  {number} [post=6] - length of the last segment
 *
 * @returns {string[]} array of address segments
 */
function segment(address, pre = 6, post = 6) {
  const beginning = address.substr(0, pre)
  const middle = address.substr(pre, address.length - (pre + post))
  const end = address.substr(address.length - post, address.length)
  return [beginning, middle, end]
}

export { maskKey, harden, segment }
