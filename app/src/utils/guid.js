/**
 * Generate 'GUID', from http://stackoverflow.com/a/105074
 * @returns {string} GUID
 */

export default function () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}
