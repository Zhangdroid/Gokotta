export default {
  get (url, params) {
    return fetch(url + params ? this.generateParams(params) : '')
  },
  generateParams (params) {
    return Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&')
  }
}
