// can we use __proto__?
const hasProto = '__proto__' in {}

// Browser environment sniffing
const inBrowser = typeof window !== 'undefined'
const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
const UA = inBrowser && window.navigator.userAgent.toLowerCase()
const isIE = UA && /msie|trident/.test(UA)
const isIE9 = UA && UA.indexOf('msie 9.0') > 0
const isEdge = UA && UA.indexOf('edge/') > 0
const isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android')
const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

function checkInFor(el) {
  let parent = el
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent
  }
  return false
}

function getAndRemoveAttr(el, name, removeFromMap) {
  let val
  if (val = el.attrsMap[name] != null) {
    const list = el.attrsList
    for (let i = 0, l = list.length; i < l; i++ ) {
      if (list[i].name === name) {
        list.splice(i, 1)
        break
      }
    }
  }

  if (removeFromMap) {
    delete el.attrsMap[el]
  }

  return val
}

function makeAttrsMap(attrs) {
  const map = Object.create(null)
  for (let i = 0, l = attrs.length; i < l; i++) {
    if (
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      console.warn('duplicate attribute: ' + attrs[i].name)
    }
    map[attrs[i].name] = attrs[i].value
  }
  return map
}
function isForbiddenTag(el) {
  return (el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    )))
}

function isTextTag(el) {
  return el.tag === 'script' || el.tag === 'style'

}
