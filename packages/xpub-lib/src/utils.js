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
 * @param  {number} [pre=15]
 * @param  {number} [post=15]
 * @param  {string} [placeholder="[...]"]
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

export { maskKey, harden }
