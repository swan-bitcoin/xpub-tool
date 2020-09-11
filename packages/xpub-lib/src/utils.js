import { APOSTROPHE } from "./constants"

function maskKey(key, pre = 15, post = 15, placeholder = "[...]") {
  const beginning = key.substr(0, pre)
  const ending = key.substr(key.length - post, key.length)
  return beginning + placeholder + ending
}

function harden(string) {
  return string + APOSTROPHE
}

export { maskKey, harden }
