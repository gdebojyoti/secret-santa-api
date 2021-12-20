// sample input: "cookie_1=value_1; cookie_2=value_2"
// sample output: { cookie_1: "value_1"; cookie_2: "value_2" }
module.exports = (cookieString) => {
  if (!cookieString || !cookieString.length) {
    return {}
  }
  
  const cookies = cookieString.split(';')
  const parsedCookies = {}
  cookies.forEach(cookie => {
    const splitted = cookie.split('=')
    parsedCookies[(splitted[0]).trim()] = typeof splitted[1] === 'string' ? (splitted[1]).trim() : splitted[1]
  })
  return parsedCookies
}