var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.provide = function(a) {
  if(!COMPILED) {
    if(goog.isProvided_(a)) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    delete goog.implicitNamespaces_[a];
    for(var b = a;(b = b.substring(0, b.lastIndexOf("."))) && !goog.getObjectByName(b);) {
      goog.implicitNamespaces_[b] = !0
    }
  }
  goog.exportPath_(a)
};
goog.setTestOnly = function(a) {
  if(COMPILED && !goog.DEBUG) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + a ? ": " + a : ".");
  }
};
COMPILED || (goog.isProvided_ = function(a) {
  return!goog.implicitNamespaces_[a] && !!goog.getObjectByName(a)
}, goog.implicitNamespaces_ = {});
goog.exportPath_ = function(a, b, c) {
  a = a.split(".");
  c = c || goog.global;
  !(a[0] in c) && c.execScript && c.execScript("var " + a[0]);
  for(var d;a.length && (d = a.shift());) {
    !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
  }
};
goog.getObjectByName = function(a, b) {
  for(var c = a.split("."), d = b || goog.global, e;e = c.shift();) {
    if(goog.isDefAndNotNull(d[e])) {
      d = d[e]
    }else {
      return null
    }
  }
  return d
};
goog.globalize = function(a, b) {
  var c = b || goog.global, d;
  for(d in a) {
    c[d] = a[d]
  }
};
goog.addDependency = function(a, b, c) {
  if(!COMPILED) {
    for(var d, a = a.replace(/\\/g, "/"), e = goog.dependencies_, f = 0;d = b[f];f++) {
      e.nameToPath[d] = a;
      a in e.pathToNames || (e.pathToNames[a] = {});
      e.pathToNames[a][d] = true
    }
    for(d = 0;b = c[d];d++) {
      a in e.requires || (e.requires[a] = {});
      e.requires[a][b] = true
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function(a) {
  if(!COMPILED && !goog.isProvided_(a)) {
    if(goog.ENABLE_DEBUG_LOADER) {
      var b = goog.getPathFromDeps_(a);
      if(b) {
        goog.included_[b] = true;
        goog.writeScripts_();
        return
      }
    }
    a = "goog.require could not find: " + a;
    goog.global.console && goog.global.console.error(a);
    throw Error(a);
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function(a) {
  return a
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.getInstance = function() {
    return a.instance_ || (a.instance_ = new a)
  }
};
!COMPILED && goog.ENABLE_DEBUG_LOADER && (goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function() {
  var a = goog.global.document;
  return typeof a != "undefined" && "write" in a
}, goog.findBasePath_ = function() {
  if(goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH
  }else {
    if(goog.inHtmlDocument_()) {
      for(var a = goog.global.document.getElementsByTagName("script"), b = a.length - 1;b >= 0;--b) {
        var c = a[b].src, d = c.lastIndexOf("?"), d = d == -1 ? c.length : d;
        if(c.substr(d - 7, 7) == "base.js") {
          goog.basePath = c.substr(0, d - 7);
          break
        }
      }
    }
  }
}, goog.importScript_ = function(a) {
  var b = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
  !goog.dependencies_.written[a] && b(a) && (goog.dependencies_.written[a] = true)
}, goog.writeScriptTag_ = function(a) {
  if(goog.inHtmlDocument_()) {
    goog.global.document.write('<script type="text/javascript" src="' + a + '"><\/script>');
    return true
  }
  return false
}, goog.writeScripts_ = function() {
  function a(e) {
    if(!(e in d.written)) {
      if(!(e in d.visited)) {
        d.visited[e] = true;
        if(e in d.requires) {
          for(var g in d.requires[e]) {
            if(!goog.isProvided_(g)) {
              if(g in d.nameToPath) {
                a(d.nameToPath[g])
              }else {
                throw Error("Undefined nameToPath for " + g);
              }
            }
          }
        }
      }
      if(!(e in c)) {
        c[e] = true;
        b.push(e)
      }
    }
  }
  var b = [], c = {}, d = goog.dependencies_, e;
  for(e in goog.included_) {
    d.written[e] || a(e)
  }
  for(e = 0;e < b.length;e++) {
    if(b[e]) {
      goog.importScript_(goog.basePath + b[e])
    }else {
      throw Error("Undefined script input");
    }
  }
}, goog.getPathFromDeps_ = function(a) {
  return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.typeOf = function(a) {
  var b = typeof a;
  if(b == "object") {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }
      if(a instanceof Object) {
        return b
      }
      var c = Object.prototype.toString.call(a);
      if(c == "[object Window]") {
        return"object"
      }
      if(c == "[object Array]" || typeof a.length == "number" && typeof a.splice != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(c == "[object Function]" || typeof a.call != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if(b == "function" && typeof a.call == "undefined") {
      return"object"
    }
  }
  return b
};
goog.propertyIsEnumerableCustom_ = function(a, b) {
  if(b in a) {
    for(var c in a) {
      if(c == b && Object.prototype.hasOwnProperty.call(a, b)) {
        return true
      }
    }
  }
  return false
};
goog.propertyIsEnumerable_ = function(a, b) {
  return a instanceof Object ? Object.prototype.propertyIsEnumerable.call(a, b) : goog.propertyIsEnumerableCustom_(a, b)
};
goog.isDef = function(a) {
  return a !== void 0
};
goog.isNull = function(a) {
  return a === null
};
goog.isDefAndNotNull = function(a) {
  return a != null
};
goog.isArray = function(a) {
  return goog.typeOf(a) == "array"
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return b == "array" || b == "object" && typeof a.length == "number"
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && typeof a.getFullYear == "function"
};
goog.isString = function(a) {
  return typeof a == "string"
};
goog.isBoolean = function(a) {
  return typeof a == "boolean"
};
goog.isNumber = function(a) {
  return typeof a == "number"
};
goog.isFunction = function(a) {
  return goog.typeOf(a) == "function"
};
goog.isObject = function(a) {
  a = goog.typeOf(a);
  return a == "object" || a == "array" || a == "function"
};
goog.getUid = function(a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(a) {
  "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_]
  }catch(b) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if(b == "object" || b == "array") {
    if(a.clone) {
      return a.clone()
    }
    var b = b == "array" ? [] : {}, c;
    for(c in a) {
      b[c] = goog.cloneObject(a[c])
    }
    return b
  }
  return a
};
goog.bindNative_ = function(a, b, c) {
  return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, b, c) {
  if(!a) {
    throw Error();
  }
  if(arguments.length > 2) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c)
    }
  }
  return function() {
    return a.apply(b, arguments)
  }
};
goog.bind = function(a, b, c) {
  goog.bind = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.unshift.apply(b, c);
    return a.apply(this, b)
  }
};
goog.mixin = function(a, b) {
  for(var c in b) {
    a[c] = b[c]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function(a) {
  if(goog.global.execScript) {
    goog.global.execScript(a, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(goog.evalWorksForGlobals_ == null) {
        goog.global.eval("var _et_ = 1;");
        if(typeof goog.global._et_ != "undefined") {
          delete goog.global._et_;
          goog.evalWorksForGlobals_ = true
        }else {
          goog.evalWorksForGlobals_ = false
        }
      }
      if(goog.evalWorksForGlobals_) {
        goog.global.eval(a)
      }else {
        var b = goog.global.document, c = b.createElement("script");
        c.type = "text/javascript";
        c.defer = false;
        c.appendChild(b.createTextNode(a));
        b.body.appendChild(c);
        b.body.removeChild(c)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
  var c = function(a) {
    return goog.cssNameMapping_[a] || a
  }, d;
  d = goog.cssNameMapping_ ? goog.cssNameMappingStyle_ == "BY_WHOLE" ? c : function(a) {
    for(var a = a.split("-"), b = [], d = 0;d < a.length;d++) {
      b.push(c(a[d]))
    }
    return b.join("-")
  } : function(a) {
    return a
  };
  return b ? a + "-" + d(b) : d(a)
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
  var c = b || {}, d;
  for(d in c) {
    var e = ("" + c[d]).replace(/\$/g, "$$$$"), a = a.replace(RegExp("\\{\\$" + d + "\\}", "gi"), e)
  }
  return a
};
goog.exportSymbol = function(a, b, c) {
  goog.exportPath_(a, b, c)
};
goog.exportProperty = function(a, b, c) {
  a[b] = c
};
goog.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a
};
goog.base = function(a, b, c) {
  var d = arguments.callee.caller;
  if(d.superClass_) {
    return d.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1))
  }
  for(var e = Array.prototype.slice.call(arguments, 2), f = false, g = a.constructor;g;g = g.superClass_ && g.superClass_.constructor) {
    if(g.prototype[b] === d) {
      f = true
    }else {
      if(f) {
        return g.prototype[b].apply(a, e)
      }
    }
  }
  if(a[b] === d) {
    return a.constructor.prototype[b].apply(a, e)
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
  a.call(goog.global)
};
goog.debug = {};
goog.debug.Error = function(a) {
  this.stack = Error().stack || "";
  a && (this.message = "" + a)
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(a, b) {
  return 0 == a.lastIndexOf(b, 0)
};
goog.string.endsWith = function(a, b) {
  var c = a.length - b.length;
  return 0 <= c && a.indexOf(b, c) == c
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length))
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
};
goog.string.subs = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = ("" + arguments[c]).replace(/\$/g, "$$$$"), a = a.replace(/\%s/, d)
  }
  return a
};
goog.string.collapseWhitespace = function(a) {
  return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(a) {
  return/^[\s\xa0]*$/.test(a)
};
goog.string.isEmptySafe = function(a) {
  return goog.string.isEmpty(goog.string.makeSafe(a))
};
goog.string.isBreakingWhitespace = function(a) {
  return!/[^\t\n\r ]/.test(a)
};
goog.string.isAlpha = function(a) {
  return!/[^a-zA-Z]/.test(a)
};
goog.string.isNumeric = function(a) {
  return!/[^0-9]/.test(a)
};
goog.string.isAlphaNumeric = function(a) {
  return!/[^a-zA-Z0-9]/.test(a)
};
goog.string.isSpace = function(a) {
  return" " == a
};
goog.string.isUnicodeChar = function(a) {
  return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
};
goog.string.stripNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(a) {
  return a.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(a) {
  return a.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function(a) {
  return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(a) {
  return a.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(a) {
  return a.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(a, b) {
  var c = ("" + a).toLowerCase(), d = ("" + b).toLowerCase();
  return c < d ? -1 : c == d ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(a, b) {
  if(a == b) {
    return 0
  }
  if(!a) {
    return-1
  }
  if(!b) {
    return 1
  }
  for(var c = a.toLowerCase().match(goog.string.numerateCompareRegExp_), d = b.toLowerCase().match(goog.string.numerateCompareRegExp_), e = Math.min(c.length, d.length), f = 0;f < e;f++) {
    var g = c[f], h = d[f];
    if(g != h) {
      return c = parseInt(g, 10), !isNaN(c) && (d = parseInt(h, 10), !isNaN(d) && c - d) ? c - d : g < h ? -1 : 1
    }
  }
  return c.length != d.length ? c.length - d.length : a < b ? -1 : 1
};
goog.string.encodeUriRegExp_ = /^[a-zA-Z0-9\-_.!~*'()]*$/;
goog.string.urlEncode = function(a) {
  a = "" + a;
  return!goog.string.encodeUriRegExp_.test(a) ? encodeURIComponent(a) : a
};
goog.string.urlDecode = function(a) {
  return decodeURIComponent(a.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(a, b) {
  return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(a, b) {
  if(b) {
    return a.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }
  if(!goog.string.allRe_.test(a)) {
    return a
  }
  -1 != a.indexOf("&") && (a = a.replace(goog.string.amperRe_, "&amp;"));
  -1 != a.indexOf("<") && (a = a.replace(goog.string.ltRe_, "&lt;"));
  -1 != a.indexOf(">") && (a = a.replace(goog.string.gtRe_, "&gt;"));
  -1 != a.indexOf('"') && (a = a.replace(goog.string.quotRe_, "&quot;"));
  return a
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(a) {
  return goog.string.contains(a, "&") ? "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
};
goog.string.unescapeEntitiesUsingDom_ = function(a) {
  var b = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, c = document.createElement("div");
  return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, e) {
    var f = b[a];
    if(f) {
      return f
    }
    if("#" == e.charAt(0)) {
      var g = Number("0" + e.substr(1));
      isNaN(g) || (f = String.fromCharCode(g))
    }
    f || (c.innerHTML = a + " ", f = c.firstChild.nodeValue.slice(0, -1));
    return b[a] = f
  })
};
goog.string.unescapePureXmlEntities_ = function(a) {
  return a.replace(/&([^;]+);/g, function(a, c) {
    switch(c) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if("#" == c.charAt(0)) {
          var d = Number("0" + c.substr(1));
          if(!isNaN(d)) {
            return String.fromCharCode(d)
          }
        }
        return a
    }
  })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
  return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
goog.string.stripQuotes = function(a, b) {
  for(var c = b.length, d = 0;d < c;d++) {
    var e = 1 == c ? b : b.charAt(d);
    if(a.charAt(0) == e && a.charAt(a.length - 1) == e) {
      return a.substring(1, a.length - 1)
    }
  }
  return a
};
goog.string.truncate = function(a, b, c) {
  c && (a = goog.string.unescapeEntities(a));
  a.length > b && (a = a.substring(0, b - 3) + "...");
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.truncateMiddle = function(a, b, c, d) {
  c && (a = goog.string.unescapeEntities(a));
  if(d && a.length > b) {
    d > b && (d = b);
    var e = a.length - d, a = a.substring(0, b - d) + "..." + a.substring(e)
  }else {
    a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e))
  }
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\u0008":"\\b", "\u000c":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
  a = "" + a;
  if(a.quote) {
    return a.quote()
  }
  for(var b = ['"'], c = 0;c < a.length;c++) {
    var d = a.charAt(c), e = d.charCodeAt(0);
    b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d))
  }
  b.push('"');
  return b.join("")
};
goog.string.escapeString = function(a) {
  for(var b = [], c = 0;c < a.length;c++) {
    b[c] = goog.string.escapeChar(a.charAt(c))
  }
  return b.join("")
};
goog.string.escapeChar = function(a) {
  if(a in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[a]
  }
  if(a in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a]
  }
  var b = a, c = a.charCodeAt(0);
  if(31 < c && 127 > c) {
    b = a
  }else {
    if(256 > c) {
      if(b = "\\x", 16 > c || 256 < c) {
        b += "0"
      }
    }else {
      b = "\\u", 4096 > c && (b += "0")
    }
    b += c.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[a] = b
};
goog.string.toMap = function(a) {
  for(var b = {}, c = 0;c < a.length;c++) {
    b[a.charAt(c)] = !0
  }
  return b
};
goog.string.contains = function(a, b) {
  return-1 != a.indexOf(b)
};
goog.string.countOf = function(a, b) {
  return a && b ? a.split(b).length - 1 : 0
};
goog.string.removeAt = function(a, b, c) {
  var d = a;
  0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
  return d
};
goog.string.remove = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "");
  return a.replace(c, "")
};
goog.string.removeAll = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "g");
  return a.replace(c, "")
};
goog.string.regExpEscape = function(a) {
  return("" + a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(a, b) {
  return Array(b + 1).join(a)
};
goog.string.padNumber = function(a, b, c) {
  a = goog.isDef(c) ? a.toFixed(c) : "" + a;
  c = a.indexOf(".");
  -1 == c && (c = a.length);
  return goog.string.repeat("0", Math.max(0, b - c)) + a
};
goog.string.makeSafe = function(a) {
  return null == a ? "" : "" + a
};
goog.string.buildString = function(a) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(a, b) {
  for(var c = 0, d = goog.string.trim("" + a).split("."), e = goog.string.trim("" + b).split("."), f = Math.max(d.length, e.length), g = 0;0 == c && g < f;g++) {
    var h = d[g] || "", i = e[g] || "", j = RegExp("(\\d*)(\\D*)", "g"), k = RegExp("(\\d*)(\\D*)", "g");
    do {
      var l = j.exec(h) || ["", "", ""], m = k.exec(i) || ["", "", ""];
      if(0 == l[0].length && 0 == m[0].length) {
        break
      }
      var c = 0 == l[1].length ? 0 : parseInt(l[1], 10), n = 0 == m[1].length ? 0 : parseInt(m[1], 10), c = goog.string.compareElements_(c, n) || goog.string.compareElements_(0 == l[2].length, 0 == m[2].length) || goog.string.compareElements_(l[2], m[2])
    }while(0 == c)
  }
  return c
};
goog.string.compareElements_ = function(a, b) {
  return a < b ? -1 : a > b ? 1 : 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(a) {
  for(var b = 0, c = 0;c < a.length;++c) {
    b = 31 * b + a.charCodeAt(c), b %= goog.string.HASHCODE_MAX_
  }
  return b
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(a) {
  var b = Number(a);
  return 0 == b && goog.string.isEmpty(a) ? NaN : b
};
goog.string.toCamelCaseCache_ = {};
goog.string.toCamelCase = function(a) {
  return goog.string.toCamelCaseCache_[a] || (goog.string.toCamelCaseCache_[a] = ("" + a).replace(/\-([a-z])/g, function(a, c) {
    return c.toUpperCase()
  }))
};
goog.string.toSelectorCaseCache_ = {};
goog.string.toSelectorCase = function(a) {
  return goog.string.toSelectorCaseCache_[a] || (goog.string.toSelectorCaseCache_[a] = ("" + a).replace(/([A-Z])/g, "-$1").toLowerCase())
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
  b.unshift(a);
  goog.debug.Error.call(this, goog.string.subs.apply(null, b));
  b.shift();
  this.messagePattern = a
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
  var e = "Assertion failed";
  if(c) {
    var e = e + (": " + c), f = d
  }else {
    a && (e += ": " + a, f = b)
  }
  throw new goog.asserts.AssertionError("" + e, f || []);
};
goog.asserts.assert = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.fail = function(a, b) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertString = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertFunction = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertObject = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertArray = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertBoolean = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
  goog.asserts.ENABLE_ASSERTS && !(a instanceof b) && goog.asserts.doAssertFailure_("instanceof check failed.", null, c, Array.prototype.slice.call(arguments, 3))
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = !0;
goog.array.peek = function(a) {
  return a[a.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(goog.isString(a)) {
    return!goog.isString(b) || 1 != b.length ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(a, b, null == c ? a.length - 1 : c)
} : function(a, b, c) {
  c = null == c ? a.length - 1 : c;
  0 > c && (c = Math.max(0, a.length + c));
  if(goog.isString(a)) {
    return!goog.isString(b) || 1 != b.length ? -1 : a.lastIndexOf(b, c)
  }
  for(;0 <= c;c--) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in e && b.call(c, e[f], f, a)
  }
};
goog.array.forEachRight = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;--d) {
    d in e && b.call(c, e[d], d, a)
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0;h < d;h++) {
    if(h in g) {
      var i = g[h];
      b.call(c, i, h, a) && (e[f++] = i)
    }
  }
  return e
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.map.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in f && (e[g] = b.call(c, f[g], g, a))
  }
  return e
};
goog.array.reduce = function(a, b, c, d) {
  if(a.reduce) {
    return d ? a.reduce(goog.bind(b, d), c) : a.reduce(b, c)
  }
  var e = c;
  goog.array.forEach(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.reduceRight = function(a, b, c, d) {
  if(a.reduceRight) {
    return d ? a.reduceRight(goog.bind(b, d), c) : a.reduceRight(b, c)
  }
  var e = c;
  goog.array.forEachRight(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.some.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return!0
    }
  }
  return!1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.every.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && !b.call(c, e[f], f, a)) {
      return!1
    }
  }
  return!0
};
goog.array.find = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndex = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return f
    }
  }
  return-1
};
goog.array.findRight = function(a, b, c) {
  b = goog.array.findIndexRight(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndexRight = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;d--) {
    if(d in e && b.call(c, e[d], d, a)) {
      return d
    }
  }
  return-1
};
goog.array.contains = function(a, b) {
  return 0 <= goog.array.indexOf(a, b)
};
goog.array.isEmpty = function(a) {
  return 0 == a.length
};
goog.array.clear = function(a) {
  if(!goog.isArray(a)) {
    for(var b = a.length - 1;0 <= b;b--) {
      delete a[b]
    }
  }
  a.length = 0
};
goog.array.insert = function(a, b) {
  goog.array.contains(a, b) || a.push(b)
};
goog.array.insertAt = function(a, b, c) {
  goog.array.splice(a, c, 0, b)
};
goog.array.insertArrayAt = function(a, b, c) {
  goog.partial(goog.array.splice, a, c, 0).apply(null, b)
};
goog.array.insertBefore = function(a, b, c) {
  var d;
  2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d)
};
goog.array.remove = function(a, b) {
  var c = goog.array.indexOf(a, b), d;
  (d = 0 <= c) && goog.array.removeAt(a, c);
  return d
};
goog.array.removeAt = function(a, b) {
  goog.asserts.assert(null != a.length);
  return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call(a, b, 1).length
};
goog.array.removeIf = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1
};
goog.array.concat = function(a) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.clone = function(a) {
  if(goog.isArray(a)) {
    return goog.array.concat(a)
  }
  for(var b = [], c = 0, d = a.length;c < d;c++) {
    b[c] = a[c]
  }
  return b
};
goog.array.toArray = function(a) {
  return goog.isArray(a) ? goog.array.concat(a) : goog.array.clone(a)
};
goog.array.extend = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = arguments[c], e;
    if(goog.isArray(d) || (e = goog.isArrayLike(d)) && d.hasOwnProperty("callee")) {
      a.push.apply(a, d)
    }else {
      if(e) {
        for(var f = a.length, g = d.length, h = 0;h < g;h++) {
          a[f + h] = d[h]
        }
      }else {
        a.push(d)
      }
    }
  }
};
goog.array.splice = function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(a, goog.array.slice(arguments, 1))
};
goog.array.slice = function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call(a, b) : goog.array.ARRAY_PROTOTYPE_.slice.call(a, b, c)
};
goog.array.removeDuplicates = function(a, b) {
  for(var c = b || a, d = {}, e = 0, f = 0;f < a.length;) {
    var g = a[f++], h = goog.isObject(g) ? "o" + goog.getUid(g) : (typeof g).charAt(0) + g;
    Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, c[e++] = g)
  }
  c.length = e
};
goog.array.binarySearch = function(a, b, c) {
  return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b)
};
goog.array.binarySelect = function(a, b, c) {
  return goog.array.binarySearch_(a, b, !0, void 0, c)
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
  for(var f = 0, g = a.length, h;f < g;) {
    var i = f + g >> 1, j;
    j = c ? b.call(e, a[i], i, a) : b(d, a[i]);
    0 < j ? f = i + 1 : (g = i, h = !j)
  }
  return h ? f : ~f
};
goog.array.sort = function(a, b) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.sort.call(a, b || goog.array.defaultCompare)
};
goog.array.stableSort = function(a, b) {
  for(var c = 0;c < a.length;c++) {
    a[c] = {index:c, value:a[c]}
  }
  var d = b || goog.array.defaultCompare;
  goog.array.sort(a, function(a, b) {
    return d(a.value, b.value) || a.index - b.index
  });
  for(c = 0;c < a.length;c++) {
    a[c] = a[c].value
  }
};
goog.array.sortObjectsByKey = function(a, b, c) {
  var d = c || goog.array.defaultCompare;
  goog.array.sort(a, function(a, c) {
    return d(a[b], c[b])
  })
};
goog.array.isSorted = function(a, b, c) {
  for(var b = b || goog.array.defaultCompare, d = 1;d < a.length;d++) {
    var e = b(a[d - 1], a[d]);
    if(0 < e || 0 == e && c) {
      return!1
    }
  }
  return!0
};
goog.array.equals = function(a, b, c) {
  if(!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) {
    return!1
  }
  for(var d = a.length, c = c || goog.array.defaultCompareEquality, e = 0;e < d;e++) {
    if(!c(a[e], b[e])) {
      return!1
    }
  }
  return!0
};
goog.array.compare = function(a, b, c) {
  return goog.array.equals(a, b, c)
};
goog.array.compare3 = function(a, b, c) {
  for(var c = c || goog.array.defaultCompare, d = Math.min(a.length, b.length), e = 0;e < d;e++) {
    var f = c(a[e], b[e]);
    if(0 != f) {
      return f
    }
  }
  return goog.array.defaultCompare(a.length, b.length)
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b
};
goog.array.binaryInsert = function(a, b, c) {
  c = goog.array.binarySearch(a, b, c);
  return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1
};
goog.array.binaryRemove = function(a, b, c) {
  b = goog.array.binarySearch(a, b, c);
  return 0 <= b ? goog.array.removeAt(a, b) : !1
};
goog.array.bucket = function(a, b) {
  for(var c = {}, d = 0;d < a.length;d++) {
    var e = a[d], f = b(e, d, a);
    goog.isDef(f) && (c[f] || (c[f] = [])).push(e)
  }
  return c
};
goog.array.repeat = function(a, b) {
  for(var c = [], d = 0;d < b;d++) {
    c[d] = a
  }
  return c
};
goog.array.flatten = function(a) {
  for(var b = [], c = 0;c < arguments.length;c++) {
    var d = arguments[c];
    goog.isArray(d) ? b.push.apply(b, goog.array.flatten.apply(null, d)) : b.push(d)
  }
  return b
};
goog.array.rotate = function(a, b) {
  goog.asserts.assert(null != a.length);
  a.length && (b %= a.length, 0 < b ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(a, a.splice(-b, b)) : 0 > b && goog.array.ARRAY_PROTOTYPE_.push.apply(a, a.splice(0, -b)));
  return a
};
goog.array.zip = function(a) {
  if(!arguments.length) {
    return[]
  }
  for(var b = [], c = 0;;c++) {
    for(var d = [], e = 0;e < arguments.length;e++) {
      var f = arguments[e];
      if(c >= f.length) {
        return b
      }
      d.push(f[c])
    }
    b.push(d)
  }
};
goog.array.shuffle = function(a, b) {
  for(var c = b || Math.random, d = a.length - 1;0 < d;d--) {
    var e = Math.floor(c() * (d + 1)), f = a[d];
    a[d] = a[e];
    a[e] = f
  }
};
goog.object = {};
goog.object.forEach = function(a, b, c) {
  for(var d in a) {
    b.call(c, a[d], d, a)
  }
};
goog.object.filter = function(a, b, c) {
  var d = {}, e;
  for(e in a) {
    b.call(c, a[e], e, a) && (d[e] = a[e])
  }
  return d
};
goog.object.map = function(a, b, c) {
  var d = {}, e;
  for(e in a) {
    d[e] = b.call(c, a[e], e, a)
  }
  return d
};
goog.object.some = function(a, b, c) {
  for(var d in a) {
    if(b.call(c, a[d], d, a)) {
      return!0
    }
  }
  return!1
};
goog.object.every = function(a, b, c) {
  for(var d in a) {
    if(!b.call(c, a[d], d, a)) {
      return!1
    }
  }
  return!0
};
goog.object.getCount = function(a) {
  var b = 0, c;
  for(c in a) {
    b++
  }
  return b
};
goog.object.getAnyKey = function(a) {
  for(var b in a) {
    return b
  }
};
goog.object.getAnyValue = function(a) {
  for(var b in a) {
    return a[b]
  }
};
goog.object.contains = function(a, b) {
  return goog.object.containsValue(a, b)
};
goog.object.getValues = function(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = a[d]
  }
  return b
};
goog.object.getKeys = function(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = d
  }
  return b
};
goog.object.getValueByKeys = function(a, b) {
  for(var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1;c < d.length && !(a = a[d[c]], !goog.isDef(a));c++) {
  }
  return a
};
goog.object.containsKey = function(a, b) {
  return b in a
};
goog.object.containsValue = function(a, b) {
  for(var c in a) {
    if(a[c] == b) {
      return!0
    }
  }
  return!1
};
goog.object.findKey = function(a, b, c) {
  for(var d in a) {
    if(b.call(c, a[d], d, a)) {
      return d
    }
  }
};
goog.object.findValue = function(a, b, c) {
  return(b = goog.object.findKey(a, b, c)) && a[b]
};
goog.object.isEmpty = function(a) {
  for(var b in a) {
    return!1
  }
  return!0
};
goog.object.clear = function(a) {
  for(var b in a) {
    delete a[b]
  }
};
goog.object.remove = function(a, b) {
  var c;
  (c = b in a) && delete a[b];
  return c
};
goog.object.add = function(a, b, c) {
  if(b in a) {
    throw Error('The object already contains the key "' + b + '"');
  }
  goog.object.set(a, b, c)
};
goog.object.get = function(a, b, c) {
  return b in a ? a[b] : c
};
goog.object.set = function(a, b, c) {
  a[b] = c
};
goog.object.setIfUndefined = function(a, b, c) {
  return b in a ? a[b] : a[b] = c
};
goog.object.clone = function(a) {
  var b = {}, c;
  for(c in a) {
    b[c] = a[c]
  }
  return b
};
goog.object.unsafeClone = function(a) {
  var b = goog.typeOf(a);
  if("object" == b || "array" == b) {
    if(a.clone) {
      return a.clone()
    }
    var b = "array" == b ? [] : {}, c;
    for(c in a) {
      b[c] = goog.object.unsafeClone(a[c])
    }
    return b
  }
  return a
};
goog.object.transpose = function(a) {
  var b = {}, c;
  for(c in a) {
    b[a[c]] = c
  }
  return b
};
goog.object.PROTOTYPE_FIELDS_ = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
goog.object.extend = function(a, b) {
  for(var c, d, e = 1;e < arguments.length;e++) {
    d = arguments[e];
    for(c in d) {
      a[c] = d[c]
    }
    for(var f = 0;f < goog.object.PROTOTYPE_FIELDS_.length;f++) {
      c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
};
goog.object.create = function(a) {
  var b = arguments.length;
  if(1 == b && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if(b % 2) {
    throw Error("Uneven number of arguments");
  }
  for(var c = {}, d = 0;d < b;d += 2) {
    c[arguments[d]] = arguments[d + 1]
  }
  return c
};
goog.object.createSet = function(a) {
  var b = arguments.length;
  if(1 == b && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  for(var c = {}, d = 0;d < b;d++) {
    c[arguments[d]] = !0
  }
  return c
};
goog.structs = {};
goog.structs.getCount = function(a) {
  return"function" == typeof a.getCount ? a.getCount() : goog.isArrayLike(a) || goog.isString(a) ? a.length : goog.object.getCount(a)
};
goog.structs.getValues = function(a) {
  if("function" == typeof a.getValues) {
    return a.getValues()
  }
  if(goog.isString(a)) {
    return a.split("")
  }
  if(goog.isArrayLike(a)) {
    for(var b = [], c = a.length, d = 0;d < c;d++) {
      b.push(a[d])
    }
    return b
  }
  return goog.object.getValues(a)
};
goog.structs.getKeys = function(a) {
  if("function" == typeof a.getKeys) {
    return a.getKeys()
  }
  if("function" != typeof a.getValues) {
    if(goog.isArrayLike(a) || goog.isString(a)) {
      for(var b = [], a = a.length, c = 0;c < a;c++) {
        b.push(c)
      }
      return b
    }
    return goog.object.getKeys(a)
  }
};
goog.structs.contains = function(a, b) {
  return"function" == typeof a.contains ? a.contains(b) : "function" == typeof a.containsValue ? a.containsValue(b) : goog.isArrayLike(a) || goog.isString(a) ? goog.array.contains(a, b) : goog.object.containsValue(a, b)
};
goog.structs.isEmpty = function(a) {
  return"function" == typeof a.isEmpty ? a.isEmpty() : goog.isArrayLike(a) || goog.isString(a) ? goog.array.isEmpty(a) : goog.object.isEmpty(a)
};
goog.structs.clear = function(a) {
  "function" == typeof a.clear ? a.clear() : goog.isArrayLike(a) ? goog.array.clear(a) : goog.object.clear(a)
};
goog.structs.forEach = function(a, b, c) {
  if("function" == typeof a.forEach) {
    a.forEach(b, c)
  }else {
    if(goog.isArrayLike(a) || goog.isString(a)) {
      goog.array.forEach(a, b, c)
    }else {
      for(var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0;g < f;g++) {
        b.call(c, e[g], d && d[g], a)
      }
    }
  }
};
goog.structs.filter = function(a, b, c) {
  if("function" == typeof a.filter) {
    return a.filter(b, c)
  }
  if(goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.filter(a, b, c)
  }
  var d, e = goog.structs.getKeys(a), f = goog.structs.getValues(a), g = f.length;
  if(e) {
    d = {};
    for(var h = 0;h < g;h++) {
      b.call(c, f[h], e[h], a) && (d[e[h]] = f[h])
    }
  }else {
    d = [];
    for(h = 0;h < g;h++) {
      b.call(c, f[h], void 0, a) && d.push(f[h])
    }
  }
  return d
};
goog.structs.map = function(a, b, c) {
  if("function" == typeof a.map) {
    return a.map(b, c)
  }
  if(goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.map(a, b, c)
  }
  var d, e = goog.structs.getKeys(a), f = goog.structs.getValues(a), g = f.length;
  if(e) {
    d = {};
    for(var h = 0;h < g;h++) {
      d[e[h]] = b.call(c, f[h], e[h], a)
    }
  }else {
    d = [];
    for(h = 0;h < g;h++) {
      d[h] = b.call(c, f[h], void 0, a)
    }
  }
  return d
};
goog.structs.some = function(a, b, c) {
  if("function" == typeof a.some) {
    return a.some(b, c)
  }
  if(goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.some(a, b, c)
  }
  for(var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0;g < f;g++) {
    if(b.call(c, e[g], d && d[g], a)) {
      return!0
    }
  }
  return!1
};
goog.structs.every = function(a, b, c) {
  if("function" == typeof a.every) {
    return a.every(b, c)
  }
  if(goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.every(a, b, c)
  }
  for(var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0;g < f;g++) {
    if(!b.call(c, e[g], d && d[g], a)) {
      return!1
    }
  }
  return!0
};
goog.iter = {};
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : Error("StopIteration");
goog.iter.Iterator = function() {
};
goog.iter.Iterator.prototype.next = function() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function() {
  return this
};
goog.iter.toIterator = function(a) {
  if(a instanceof goog.iter.Iterator) {
    return a
  }
  if("function" == typeof a.__iterator__) {
    return a.__iterator__(!1)
  }
  if(goog.isArrayLike(a)) {
    var b = 0, c = new goog.iter.Iterator;
    c.next = function() {
      for(;;) {
        if(b >= a.length) {
          throw goog.iter.StopIteration;
        }
        if(b in a) {
          return a[b++]
        }
        b++
      }
    };
    return c
  }
  throw Error("Not implemented");
};
goog.iter.forEach = function(a, b, c) {
  if(goog.isArrayLike(a)) {
    try {
      goog.array.forEach(a, b, c)
    }catch(d) {
      if(d !== goog.iter.StopIteration) {
        throw d;
      }
    }
  }else {
    a = goog.iter.toIterator(a);
    try {
      for(;;) {
        b.call(c, a.next(), void 0, a)
      }
    }catch(e) {
      if(e !== goog.iter.StopIteration) {
        throw e;
      }
    }
  }
};
goog.iter.filter = function(a, b, c) {
  var a = goog.iter.toIterator(a), d = new goog.iter.Iterator;
  d.next = function() {
    for(;;) {
      var d = a.next();
      if(b.call(c, d, void 0, a)) {
        return d
      }
    }
  };
  return d
};
goog.iter.range = function(a, b, c) {
  var d = 0, e = a, f = c || 1;
  1 < arguments.length && (d = a, e = b);
  if(0 == f) {
    throw Error("Range step argument must not be zero");
  }
  var g = new goog.iter.Iterator;
  g.next = function() {
    if(f > 0 && d >= e || f < 0 && d <= e) {
      throw goog.iter.StopIteration;
    }
    var a = d;
    d = d + f;
    return a
  };
  return g
};
goog.iter.join = function(a, b) {
  return goog.iter.toArray(a).join(b)
};
goog.iter.map = function(a, b, c) {
  var a = goog.iter.toIterator(a), d = new goog.iter.Iterator;
  d.next = function() {
    for(;;) {
      var d = a.next();
      return b.call(c, d, void 0, a)
    }
  };
  return d
};
goog.iter.reduce = function(a, b, c, d) {
  var e = c;
  goog.iter.forEach(a, function(a) {
    e = b.call(d, e, a)
  });
  return e
};
goog.iter.some = function(a, b, c) {
  a = goog.iter.toIterator(a);
  try {
    for(;;) {
      if(b.call(c, a.next(), void 0, a)) {
        return!0
      }
    }
  }catch(d) {
    if(d !== goog.iter.StopIteration) {
      throw d;
    }
  }
  return!1
};
goog.iter.every = function(a, b, c) {
  a = goog.iter.toIterator(a);
  try {
    for(;;) {
      if(!b.call(c, a.next(), void 0, a)) {
        return!1
      }
    }
  }catch(d) {
    if(d !== goog.iter.StopIteration) {
      throw d;
    }
  }
  return!0
};
goog.iter.chain = function(a) {
  var b = arguments, c = b.length, d = 0, e = new goog.iter.Iterator;
  e.next = function() {
    try {
      if(d >= c) {
        throw goog.iter.StopIteration;
      }
      return goog.iter.toIterator(b[d]).next()
    }catch(a) {
      if(a !== goog.iter.StopIteration || d >= c) {
        throw a;
      }
      d++;
      return this.next()
    }
  };
  return e
};
goog.iter.dropWhile = function(a, b, c) {
  var a = goog.iter.toIterator(a), d = new goog.iter.Iterator, e = !0;
  d.next = function() {
    for(;;) {
      var d = a.next();
      if(!e || !b.call(c, d, void 0, a)) {
        return e = !1, d
      }
    }
  };
  return d
};
goog.iter.takeWhile = function(a, b, c) {
  var a = goog.iter.toIterator(a), d = new goog.iter.Iterator, e = !0;
  d.next = function() {
    for(;;) {
      if(e) {
        var d = a.next();
        if(b.call(c, d, void 0, a)) {
          return d
        }
        e = !1
      }else {
        throw goog.iter.StopIteration;
      }
    }
  };
  return d
};
goog.iter.toArray = function(a) {
  if(goog.isArrayLike(a)) {
    return goog.array.toArray(a)
  }
  var a = goog.iter.toIterator(a), b = [];
  goog.iter.forEach(a, function(a) {
    b.push(a)
  });
  return b
};
goog.iter.equals = function(a, b) {
  var a = goog.iter.toIterator(a), b = goog.iter.toIterator(b), c, d;
  try {
    for(;;) {
      c = d = !1;
      var e = a.next();
      c = !0;
      var f = b.next();
      d = !0;
      if(e != f) {
        break
      }
    }
  }catch(g) {
    if(g !== goog.iter.StopIteration) {
      throw g;
    }
    if(c && !d) {
      return!1
    }
    if(!d) {
      try {
        b.next()
      }catch(h) {
        if(h !== goog.iter.StopIteration) {
          throw h;
        }
        return!0
      }
    }
  }
  return!1
};
goog.iter.nextOrValue = function(a, b) {
  try {
    return goog.iter.toIterator(a).next()
  }catch(c) {
    if(c != goog.iter.StopIteration) {
      throw c;
    }
    return b
  }
};
goog.iter.product = function(a) {
  if(goog.array.some(arguments, function(a) {
    return!a.length
  }) || !arguments.length) {
    return new goog.iter.Iterator
  }
  var b = new goog.iter.Iterator, c = arguments, d = goog.array.repeat(0, c.length);
  b.next = function() {
    if(d) {
      for(var a = goog.array.map(d, function(a, b) {
        return c[b][a]
      }), b = d.length - 1;0 <= b;b--) {
        goog.asserts.assert(d);
        if(d[b] < c[b].length - 1) {
          d[b]++;
          break
        }
        if(0 == b) {
          d = null;
          break
        }
        d[b] = 0
      }
      return a
    }
    throw goog.iter.StopIteration;
  };
  return b
};
goog.iter.cycle = function(a) {
  var b = goog.iter.toIterator(a), c = [], d = 0, a = new goog.iter.Iterator, e = !1;
  a.next = function() {
    var a = null;
    if(!e) {
      try {
        return a = b.next(), c.push(a), a
      }catch(g) {
        if(g != goog.iter.StopIteration || goog.array.isEmpty(c)) {
          throw g;
        }
        e = !0
      }
    }
    a = c[d];
    d = (d + 1) % c.length;
    return a
  };
  return a
};
goog.structs.Map = function(a, b) {
  this.map_ = {};
  goog.structs.Map.PRESERVE_NON_STRING_KEYS && (this.numericKeyMap_ = {});
  var c = arguments.length;
  if(1 < c) {
    if(c % 2) {
      throw Error("Uneven number of arguments");
    }
    for(var d = 0;d < c;d += 2) {
      this.set(arguments[d], arguments[d + 1])
    }
  }else {
    a && this.addAll(a)
  }
};
goog.structs.Map.PRESERVE_NON_STRING_KEYS = !0;
goog.structs.Map.KEY_PREFIX = ":";
goog.structs.Map.prototype.count_ = 0;
goog.structs.Map.prototype.version_ = 0;
goog.structs.Map.prototype.getCount = function() {
  return this.count_
};
goog.structs.Map.prototype.getValues = function() {
  var a = [], b;
  for(b in this.map_) {
    goog.structs.Map.isKey_(b) && a.push(this.map_[b])
  }
  return a
};
goog.structs.Map.prototype.getKeys = function() {
  var a = [], b;
  for(b in this.map_) {
    goog.structs.Map.isKey_(b) && a.push(this.getKey_(b))
  }
  return a
};
goog.structs.Map.prototype.containsKey = function(a) {
  return goog.structs.Map.makeKey_(a) in this.map_
};
goog.structs.Map.prototype.containsValue = function(a) {
  for(var b in this.map_) {
    if(goog.structs.Map.isKey_(b) && this.map_[b] == a) {
      return!0
    }
  }
  return!1
};
goog.structs.Map.prototype.equals = function(a, b) {
  if(this === a) {
    return!0
  }
  if(this.count_ != a.getCount()) {
    return!1
  }
  var c = b || goog.structs.Map.defaultEquals, d;
  for(d in this.map_) {
    if(d = this.getKey_(d), !c(this.get(d), a.get(d))) {
      return!1
    }
  }
  return!0
};
goog.structs.Map.defaultEquals = function(a, b) {
  return a === b
};
goog.structs.Map.prototype.isEmpty = function() {
  return 0 == this.count_
};
goog.structs.Map.prototype.clear = function() {
  this.map_ = {};
  this.version_ = this.count_ = 0;
  goog.structs.Map.PRESERVE_NON_STRING_KEYS && (this.numericKeyMap_ = {})
};
goog.structs.Map.prototype.remove = function(a) {
  a = goog.structs.Map.makeKey_(a);
  return goog.object.remove(this.map_, a) ? (goog.structs.Map.PRESERVE_NON_STRING_KEYS && delete this.numericKeyMap_[a], this.count_--, this.version_++, !0) : !1
};
goog.structs.Map.prototype.get = function(a, b) {
  var c = goog.structs.Map.makeKey_(a);
  return c in this.map_ ? this.map_[c] : b
};
goog.structs.Map.prototype.set = function(a, b) {
  var c = goog.structs.Map.makeKey_(a);
  c in this.map_ || (this.version_++, this.count_++, goog.structs.Map.PRESERVE_NON_STRING_KEYS && goog.isNumber(a) && (this.numericKeyMap_[c] = !0));
  this.map_[c] = b
};
goog.structs.Map.prototype.addAll = function(a) {
  var b;
  a instanceof goog.structs.Map ? (b = a.getKeys(), a = a.getValues()) : (b = goog.object.getKeys(a), a = goog.object.getValues(a));
  for(var c = 0;c < b.length;c++) {
    this.set(b[c], a[c])
  }
};
goog.structs.Map.prototype.clone = function() {
  return new goog.structs.Map(this)
};
goog.structs.Map.prototype.transpose = function() {
  var a = new goog.structs.Map, b;
  for(b in this.map_) {
    a.set(this.map_[b], this.getKey_(b))
  }
  return a
};
goog.structs.Map.prototype.toObject = function() {
  var a = {}, b;
  for(b in this.map_) {
    goog.structs.Map.isKey_(b) && (a[this.getKey_(b)] = this.map_[b])
  }
  return a
};
goog.structs.Map.prototype.getKeyIterator = function() {
  return this.__iterator__(!0)
};
goog.structs.Map.prototype.getValueIterator = function() {
  return this.__iterator__(!1)
};
goog.structs.Map.prototype.__iterator__ = function(a) {
  var b = 0, c = this.getKeys(), d = this.map_, e = this.version_, f = this, g = new goog.iter.Iterator;
  g.next = function() {
    for(;;) {
      if(e != f.version_) {
        throw Error("The map has changed since the iterator was created");
      }
      if(b >= c.length) {
        throw goog.iter.StopIteration;
      }
      var g = c[b++];
      return a ? g : d[goog.structs.Map.makeKey_(g)]
    }
  };
  return g
};
goog.structs.Map.prototype.getKey_ = function(a) {
  var b = a.substring(1);
  return goog.structs.Map.PRESERVE_NON_STRING_KEYS ? this.numericKeyMap_[a] ? Number(b) : b : b
};
goog.structs.Map.isKey_ = function(a) {
  return a.charAt(0) == goog.structs.Map.KEY_PREFIX
};
goog.structs.Map.makeKey_ = function(a) {
  return goog.structs.Map.KEY_PREFIX + a
};
goog.uri = {};
goog.uri.utils = {};
goog.uri.utils.CharCode_ = {AMPERSAND:38, EQUAL:61, HASH:35, QUESTION:63};
goog.uri.utils.buildFromEncodedParts = function(a, b, c, d, e, f, g) {
  var h = [];
  a && h.push(a, ":");
  c && (h.push("//"), b && h.push(b, "@"), h.push(c), d && h.push(":", d));
  e && h.push(e);
  f && h.push("?", f);
  g && h.push("#", g);
  return h.join("")
};
goog.uri.utils.splitRe_ = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
goog.uri.utils.ComponentIndex = {SCHEME:1, USER_INFO:2, DOMAIN:3, PORT:4, PATH:5, QUERY_DATA:6, FRAGMENT:7};
goog.uri.utils.split = function(a) {
  return a.match(goog.uri.utils.splitRe_)
};
goog.uri.utils.decodeIfPossible_ = function(a) {
  return a && decodeURIComponent(a)
};
goog.uri.utils.getComponentByIndex_ = function(a, b) {
  return goog.uri.utils.split(b)[a] || null
};
goog.uri.utils.getScheme = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, a)
};
goog.uri.utils.getUserInfoEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, a)
};
goog.uri.utils.getUserInfo = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(a))
};
goog.uri.utils.getDomainEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, a)
};
goog.uri.utils.getDomain = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(a))
};
goog.uri.utils.getPort = function(a) {
  return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, a)) || null
};
goog.uri.utils.getPathEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, a)
};
goog.uri.utils.getPath = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(a))
};
goog.uri.utils.getQueryData = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, a)
};
goog.uri.utils.getFragmentEncoded = function(a) {
  var b = a.indexOf("#");
  return 0 > b ? null : a.substr(b + 1)
};
goog.uri.utils.setFragmentEncoded = function(a, b) {
  return goog.uri.utils.removeFragment(a) + (b ? "#" + b : "")
};
goog.uri.utils.getFragment = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(a))
};
goog.uri.utils.getHost = function(a) {
  a = goog.uri.utils.split(a);
  return goog.uri.utils.buildFromEncodedParts(a[goog.uri.utils.ComponentIndex.SCHEME], a[goog.uri.utils.ComponentIndex.USER_INFO], a[goog.uri.utils.ComponentIndex.DOMAIN], a[goog.uri.utils.ComponentIndex.PORT])
};
goog.uri.utils.getPathAndAfter = function(a) {
  a = goog.uri.utils.split(a);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, a[goog.uri.utils.ComponentIndex.PATH], a[goog.uri.utils.ComponentIndex.QUERY_DATA], a[goog.uri.utils.ComponentIndex.FRAGMENT])
};
goog.uri.utils.removeFragment = function(a) {
  var b = a.indexOf("#");
  return 0 > b ? a : a.substr(0, b)
};
goog.uri.utils.haveSameDomain = function(a, b) {
  var c = goog.uri.utils.split(a), d = goog.uri.utils.split(b);
  return c[goog.uri.utils.ComponentIndex.DOMAIN] == d[goog.uri.utils.ComponentIndex.DOMAIN] && c[goog.uri.utils.ComponentIndex.SCHEME] == d[goog.uri.utils.ComponentIndex.SCHEME] && c[goog.uri.utils.ComponentIndex.PORT] == d[goog.uri.utils.ComponentIndex.PORT]
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function(a) {
  if(goog.DEBUG && (0 <= a.indexOf("#") || 0 <= a.indexOf("?"))) {
    throw Error("goog.uri.utils: Fragment or query identifiers are not supported: [" + a + "]");
  }
};
goog.uri.utils.appendQueryData_ = function(a) {
  if(a[1]) {
    var b = a[0], c = b.indexOf("#");
    0 <= c && (a.push(b.substr(c)), a[0] = b = b.substr(0, c));
    c = b.indexOf("?");
    0 > c ? a[1] = "?" : c == b.length - 1 && (a[1] = void 0)
  }
  return a.join("")
};
goog.uri.utils.appendKeyValuePairs_ = function(a, b, c) {
  if(goog.isArray(b)) {
    for(var d = 0;d < b.length;d++) {
      c.push("&", a), "" !== b[d] && c.push("=", goog.string.urlEncode(b[d]))
    }
  }else {
    null != b && (c.push("&", a), "" !== b && c.push("=", goog.string.urlEncode(b)))
  }
};
goog.uri.utils.buildQueryDataBuffer_ = function(a, b, c) {
  goog.asserts.assert(0 == Math.max(b.length - (c || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
  for(c = c || 0;c < b.length;c += 2) {
    goog.uri.utils.appendKeyValuePairs_(b[c], b[c + 1], a)
  }
  return a
};
goog.uri.utils.buildQueryData = function(a, b) {
  var c = goog.uri.utils.buildQueryDataBuffer_([], a, b);
  c[0] = "";
  return c.join("")
};
goog.uri.utils.buildQueryDataBufferFromMap_ = function(a, b) {
  for(var c in b) {
    goog.uri.utils.appendKeyValuePairs_(c, b[c], a)
  }
  return a
};
goog.uri.utils.buildQueryDataFromMap = function(a) {
  a = goog.uri.utils.buildQueryDataBufferFromMap_([], a);
  a[0] = "";
  return a.join("")
};
goog.uri.utils.appendParams = function(a, b) {
  return goog.uri.utils.appendQueryData_(2 == arguments.length ? goog.uri.utils.buildQueryDataBuffer_([a], arguments[1], 0) : goog.uri.utils.buildQueryDataBuffer_([a], arguments, 1))
};
goog.uri.utils.appendParamsFromMap = function(a, b) {
  return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([a], b))
};
goog.uri.utils.appendParam = function(a, b, c) {
  return goog.uri.utils.appendQueryData_([a, "&", b, "=", goog.string.urlEncode(c)])
};
goog.uri.utils.findParam_ = function(a, b, c, d) {
  for(var e = c.length;0 <= (b = a.indexOf(c, b)) && b < d;) {
    var f = a.charCodeAt(b - 1);
    if(f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.QUESTION) {
      if(f = a.charCodeAt(b + e), !f || f == goog.uri.utils.CharCode_.EQUAL || f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.HASH) {
        return b
      }
    }
    b += e + 1
  }
  return-1
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function(a, b) {
  return 0 <= goog.uri.utils.findParam_(a, 0, b, a.search(goog.uri.utils.hashOrEndRe_))
};
goog.uri.utils.getParamValue = function(a, b) {
  var c = a.search(goog.uri.utils.hashOrEndRe_), d = goog.uri.utils.findParam_(a, 0, b, c);
  if(0 > d) {
    return null
  }
  var e = a.indexOf("&", d);
  if(0 > e || e > c) {
    e = c
  }
  d += b.length + 1;
  return goog.string.urlDecode(a.substr(d, e - d))
};
goog.uri.utils.getParamValues = function(a, b) {
  for(var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = [];0 <= (e = goog.uri.utils.findParam_(a, d, b, c));) {
    d = a.indexOf("&", e);
    if(0 > d || d > c) {
      d = c
    }
    e += b.length + 1;
    f.push(goog.string.urlDecode(a.substr(e, d - e)))
  }
  return f
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function(a, b) {
  for(var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = [];0 <= (e = goog.uri.utils.findParam_(a, d, b, c));) {
    f.push(a.substring(d, e)), d = Math.min(a.indexOf("&", e) + 1 || c, c)
  }
  f.push(a.substr(d));
  return f.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1")
};
goog.uri.utils.setParam = function(a, b, c) {
  return goog.uri.utils.appendParam(goog.uri.utils.removeParam(a, b), b, c)
};
goog.uri.utils.appendPath = function(a, b) {
  goog.uri.utils.assertNoFragmentsOrQueries_(a);
  goog.string.endsWith(a, "/") && (a = a.substr(0, a.length - 1));
  goog.string.startsWith(b, "/") && (b = b.substr(1));
  return goog.string.buildString(a, "/", b)
};
goog.uri.utils.StandardQueryParam = {RANDOM:"zx"};
goog.uri.utils.makeUnique = function(a) {
  return goog.uri.utils.setParam(a, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString())
};
goog.Uri = function(a, b) {
  var c;
  a instanceof goog.Uri ? (this.setIgnoreCase(null == b ? a.getIgnoreCase() : b), this.setScheme(a.getScheme()), this.setUserInfo(a.getUserInfo()), this.setDomain(a.getDomain()), this.setPort(a.getPort()), this.setPath(a.getPath()), this.setQueryData(a.getQueryData().clone()), this.setFragment(a.getFragment())) : a && (c = goog.uri.utils.split("" + a)) ? (this.setIgnoreCase(!!b), this.setScheme(c[goog.uri.utils.ComponentIndex.SCHEME] || "", !0), this.setUserInfo(c[goog.uri.utils.ComponentIndex.USER_INFO] || 
  "", !0), this.setDomain(c[goog.uri.utils.ComponentIndex.DOMAIN] || "", !0), this.setPort(c[goog.uri.utils.ComponentIndex.PORT]), this.setPath(c[goog.uri.utils.ComponentIndex.PATH] || "", !0), this.setQuery(c[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", !0), this.setFragment(c[goog.uri.utils.ComponentIndex.FRAGMENT] || "", !0)) : (this.setIgnoreCase(!!b), this.queryData_ = new goog.Uri.QueryData(null, this, this.ignoreCase_))
};
goog.Uri.RANDOM_PARAM = goog.uri.utils.StandardQueryParam.RANDOM;
goog.Uri.prototype.scheme_ = "";
goog.Uri.prototype.userInfo_ = "";
goog.Uri.prototype.domain_ = "";
goog.Uri.prototype.port_ = null;
goog.Uri.prototype.path_ = "";
goog.Uri.prototype.fragment_ = "";
goog.Uri.prototype.isReadOnly_ = !1;
goog.Uri.prototype.ignoreCase_ = !1;
goog.Uri.prototype.toString = function() {
  if(this.cachedToString_) {
    return this.cachedToString_
  }
  var a = [];
  this.scheme_ && a.push(goog.Uri.encodeSpecialChars_(this.scheme_, goog.Uri.reDisallowedInSchemeOrUserInfo_), ":");
  this.domain_ && (a.push("//"), this.userInfo_ && a.push(goog.Uri.encodeSpecialChars_(this.userInfo_, goog.Uri.reDisallowedInSchemeOrUserInfo_), "@"), a.push(goog.Uri.encodeString_(this.domain_)), null != this.port_ && a.push(":", "" + this.getPort()));
  this.path_ && (this.hasDomain() && "/" != this.path_.charAt(0) && a.push("/"), a.push(goog.Uri.encodeSpecialChars_(this.path_, "/" == this.path_.charAt(0) ? goog.Uri.reDisallowedInAbsolutePath_ : goog.Uri.reDisallowedInRelativePath_)));
  var b = "" + this.queryData_;
  b && a.push("?", b);
  this.fragment_ && a.push("#", goog.Uri.encodeSpecialChars_(this.fragment_, goog.Uri.reDisallowedInFragment_));
  return this.cachedToString_ = a.join("")
};
goog.Uri.prototype.resolve = function(a) {
  var b = this.clone(), c = a.hasScheme();
  c ? b.setScheme(a.getScheme()) : c = a.hasUserInfo();
  c ? b.setUserInfo(a.getUserInfo()) : c = a.hasDomain();
  c ? b.setDomain(a.getDomain()) : c = a.hasPort();
  var d = a.getPath();
  if(c) {
    b.setPort(a.getPort())
  }else {
    if(c = a.hasPath()) {
      if("/" != d.charAt(0)) {
        if(this.hasDomain() && !this.hasPath()) {
          d = "/" + d
        }else {
          var e = b.getPath().lastIndexOf("/");
          -1 != e && (d = b.getPath().substr(0, e + 1) + d)
        }
      }
      d = goog.Uri.removeDotSegments(d)
    }
  }
  c ? b.setPath(d) : c = a.hasQuery();
  c ? b.setQuery(a.getDecodedQuery()) : c = a.hasFragment();
  c && b.setFragment(a.getFragment());
  return b
};
goog.Uri.prototype.clone = function() {
  return goog.Uri.create(this.scheme_, this.userInfo_, this.domain_, this.port_, this.path_, this.queryData_.clone(), this.fragment_, this.ignoreCase_)
};
goog.Uri.prototype.getScheme = function() {
  return this.scheme_
};
goog.Uri.prototype.setScheme = function(a, b) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  if(this.scheme_ = b ? goog.Uri.decodeOrEmpty_(a) : a) {
    this.scheme_ = this.scheme_.replace(/:$/, "")
  }
  return this
};
goog.Uri.prototype.hasScheme = function() {
  return!!this.scheme_
};
goog.Uri.prototype.getUserInfo = function() {
  return this.userInfo_
};
goog.Uri.prototype.setUserInfo = function(a, b) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.userInfo_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
  return this
};
goog.Uri.prototype.hasUserInfo = function() {
  return!!this.userInfo_
};
goog.Uri.prototype.getDomain = function() {
  return this.domain_
};
goog.Uri.prototype.setDomain = function(a, b) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.domain_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
  return this
};
goog.Uri.prototype.hasDomain = function() {
  return!!this.domain_
};
goog.Uri.prototype.getPort = function() {
  return this.port_
};
goog.Uri.prototype.setPort = function(a) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  if(a) {
    a = Number(a);
    if(isNaN(a) || 0 > a) {
      throw Error("Bad port number " + a);
    }
    this.port_ = a
  }else {
    this.port_ = null
  }
  return this
};
goog.Uri.prototype.hasPort = function() {
  return null != this.port_
};
goog.Uri.prototype.getPath = function() {
  return this.path_
};
goog.Uri.prototype.setPath = function(a, b) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.path_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
  return this
};
goog.Uri.prototype.hasPath = function() {
  return!!this.path_
};
goog.Uri.prototype.hasQuery = function() {
  return"" !== this.queryData_.toString()
};
goog.Uri.prototype.setQueryData = function(a, b) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  a instanceof goog.Uri.QueryData ? (this.queryData_ = a, this.queryData_.uri_ = this, this.queryData_.setIgnoreCase(this.ignoreCase_)) : (b || (a = goog.Uri.encodeSpecialChars_(a, goog.Uri.reDisallowedInQuery_)), this.queryData_ = new goog.Uri.QueryData(a, this, this.ignoreCase_));
  return this
};
goog.Uri.prototype.setQuery = function(a, b) {
  return this.setQueryData(a, b)
};
goog.Uri.prototype.getEncodedQuery = function() {
  return this.queryData_.toString()
};
goog.Uri.prototype.getDecodedQuery = function() {
  return this.queryData_.toDecodedString()
};
goog.Uri.prototype.getQueryData = function() {
  return this.queryData_
};
goog.Uri.prototype.getQuery = function() {
  return this.getEncodedQuery()
};
goog.Uri.prototype.setParameterValue = function(a, b) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.queryData_.set(a, b);
  return this
};
goog.Uri.prototype.setParameterValues = function(a, b) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  goog.isArray(b) || (b = ["" + b]);
  this.queryData_.setValues(a, b);
  return this
};
goog.Uri.prototype.getParameterValues = function(a) {
  return this.queryData_.getValues(a)
};
goog.Uri.prototype.getParameterValue = function(a) {
  return this.queryData_.get(a)
};
goog.Uri.prototype.getFragment = function() {
  return this.fragment_
};
goog.Uri.prototype.setFragment = function(a, b) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.fragment_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
  return this
};
goog.Uri.prototype.hasFragment = function() {
  return!!this.fragment_
};
goog.Uri.prototype.hasSameDomainAs = function(a) {
  return(!this.hasDomain() && !a.hasDomain() || this.getDomain() == a.getDomain()) && (!this.hasPort() && !a.hasPort() || this.getPort() == a.getPort())
};
goog.Uri.prototype.makeUnique = function() {
  this.enforceReadOnly();
  this.setParameterValue(goog.Uri.RANDOM_PARAM, goog.string.getRandomString());
  return this
};
goog.Uri.prototype.removeParameter = function(a) {
  this.enforceReadOnly();
  this.queryData_.remove(a);
  return this
};
goog.Uri.prototype.setReadOnly = function(a) {
  this.isReadOnly_ = a;
  return this
};
goog.Uri.prototype.isReadOnly = function() {
  return this.isReadOnly_
};
goog.Uri.prototype.enforceReadOnly = function() {
  if(this.isReadOnly_) {
    throw Error("Tried to modify a read-only Uri");
  }
};
goog.Uri.prototype.setIgnoreCase = function(a) {
  this.ignoreCase_ = a;
  this.queryData_ && this.queryData_.setIgnoreCase(a);
  return this
};
goog.Uri.prototype.getIgnoreCase = function() {
  return this.ignoreCase_
};
goog.Uri.parse = function(a, b) {
  return a instanceof goog.Uri ? a.clone() : new goog.Uri(a, b)
};
goog.Uri.create = function(a, b, c, d, e, f, g, h) {
  h = new goog.Uri(null, h);
  a && h.setScheme(a);
  b && h.setUserInfo(b);
  c && h.setDomain(c);
  d && h.setPort(d);
  e && h.setPath(e);
  f && h.setQueryData(f);
  g && h.setFragment(g);
  return h
};
goog.Uri.resolve = function(a, b) {
  a instanceof goog.Uri || (a = goog.Uri.parse(a));
  b instanceof goog.Uri || (b = goog.Uri.parse(b));
  return a.resolve(b)
};
goog.Uri.removeDotSegments = function(a) {
  if(".." == a || "." == a) {
    return""
  }
  if(!goog.string.contains(a, "./") && !goog.string.contains(a, "/.")) {
    return a
  }
  for(var b = goog.string.startsWith(a, "/"), a = a.split("/"), c = [], d = 0;d < a.length;) {
    var e = a[d++];
    "." == e ? b && d == a.length && c.push("") : ".." == e ? ((1 < c.length || 1 == c.length && "" != c[0]) && c.pop(), b && d == a.length && c.push("")) : (c.push(e), b = !0)
  }
  return c.join("/")
};
goog.Uri.decodeOrEmpty_ = function(a) {
  return a ? decodeURIComponent(a) : ""
};
goog.Uri.encodeString_ = function(a) {
  return goog.isString(a) ? encodeURIComponent(a) : null
};
goog.Uri.encodeSpecialRegExp_ = /^[a-zA-Z0-9\-_.!~*'():\/;?]*$/;
goog.Uri.encodeSpecialChars_ = function(a, b) {
  var c = null;
  goog.isString(a) && (c = a, goog.Uri.encodeSpecialRegExp_.test(c) || (c = encodeURI(a)), 0 <= c.search(b) && (c = c.replace(b, goog.Uri.encodeChar_)));
  return c
};
goog.Uri.encodeChar_ = function(a) {
  a = a.charCodeAt(0);
  return"%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
};
goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g;
goog.Uri.reDisallowedInRelativePath_ = /[\#\?:]/g;
goog.Uri.reDisallowedInAbsolutePath_ = /[\#\?]/g;
goog.Uri.reDisallowedInQuery_ = /[\#\?@]/g;
goog.Uri.reDisallowedInFragment_ = /#/g;
goog.Uri.haveSameDomain = function(a, b) {
  var c = goog.uri.utils.split(a), d = goog.uri.utils.split(b);
  return c[goog.uri.utils.ComponentIndex.DOMAIN] == d[goog.uri.utils.ComponentIndex.DOMAIN] && c[goog.uri.utils.ComponentIndex.PORT] == d[goog.uri.utils.ComponentIndex.PORT]
};
goog.Uri.QueryData = function(a, b, c) {
  this.encodedQuery_ = a || null;
  this.uri_ = b || null;
  this.ignoreCase_ = !!c
};
goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function() {
  if(!this.keyMap_ && (this.keyMap_ = new goog.structs.Map, this.count_ = 0, this.encodedQuery_)) {
    for(var a = this.encodedQuery_.split("&"), b = 0;b < a.length;b++) {
      var c = a[b].indexOf("="), d = null, e = null;
      0 <= c ? (d = a[b].substring(0, c), e = a[b].substring(c + 1)) : d = a[b];
      d = goog.string.urlDecode(d);
      d = this.getKeyName_(d);
      this.add(d, e ? goog.string.urlDecode(e) : "")
    }
  }
};
goog.Uri.QueryData.createFromMap = function(a, b, c) {
  var d = goog.structs.getKeys(a);
  if("undefined" == typeof d) {
    throw Error("Keys are undefined");
  }
  return goog.Uri.QueryData.createFromKeysValues(d, goog.structs.getValues(a), b, c)
};
goog.Uri.QueryData.createFromKeysValues = function(a, b, c, d) {
  if(a.length != b.length) {
    throw Error("Mismatched lengths for keys/values");
  }
  c = new goog.Uri.QueryData(null, c, d);
  for(d = 0;d < a.length;d++) {
    c.add(a[d], b[d])
  }
  return c
};
goog.Uri.QueryData.prototype.keyMap_ = null;
goog.Uri.QueryData.prototype.count_ = null;
goog.Uri.QueryData.decodedQuery_ = null;
goog.Uri.QueryData.prototype.getCount = function() {
  this.ensureKeyMapInitialized_();
  return this.count_
};
goog.Uri.QueryData.prototype.add = function(a, b) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  a = this.getKeyName_(a);
  if(this.containsKey(a)) {
    var c = this.keyMap_.get(a);
    goog.isArray(c) ? c.push(b) : this.keyMap_.set(a, [c, b])
  }else {
    this.keyMap_.set(a, b)
  }
  this.count_++;
  return this
};
goog.Uri.QueryData.prototype.remove = function(a) {
  this.ensureKeyMapInitialized_();
  a = this.getKeyName_(a);
  if(this.keyMap_.containsKey(a)) {
    this.invalidateCache_();
    var b = this.keyMap_.get(a);
    goog.isArray(b) ? this.count_ -= b.length : this.count_--;
    return this.keyMap_.remove(a)
  }
  return!1
};
goog.Uri.QueryData.prototype.clear = function() {
  this.invalidateCache_();
  this.keyMap_ && this.keyMap_.clear();
  this.count_ = 0
};
goog.Uri.QueryData.prototype.isEmpty = function() {
  this.ensureKeyMapInitialized_();
  return 0 == this.count_
};
goog.Uri.QueryData.prototype.containsKey = function(a) {
  this.ensureKeyMapInitialized_();
  a = this.getKeyName_(a);
  return this.keyMap_.containsKey(a)
};
goog.Uri.QueryData.prototype.containsValue = function(a) {
  var b = this.getValues();
  return goog.array.contains(b, a)
};
goog.Uri.QueryData.prototype.getKeys = function() {
  this.ensureKeyMapInitialized_();
  for(var a = this.keyMap_.getValues(), b = this.keyMap_.getKeys(), c = [], d = 0;d < b.length;d++) {
    var e = a[d];
    if(goog.isArray(e)) {
      for(var f = 0;f < e.length;f++) {
        c.push(b[d])
      }
    }else {
      c.push(b[d])
    }
  }
  return c
};
goog.Uri.QueryData.prototype.getValues = function(a) {
  this.ensureKeyMapInitialized_();
  if(a) {
    if(a = this.getKeyName_(a), this.containsKey(a)) {
      var b = this.keyMap_.get(a);
      if(goog.isArray(b)) {
        return b
      }
      a = [];
      a.push(b)
    }else {
      a = []
    }
  }else {
    for(var b = this.keyMap_.getValues(), a = [], c = 0;c < b.length;c++) {
      var d = b[c];
      goog.isArray(d) ? goog.array.extend(a, d) : a.push(d)
    }
  }
  return a
};
goog.Uri.QueryData.prototype.set = function(a, b) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  a = this.getKeyName_(a);
  if(this.containsKey(a)) {
    var c = this.keyMap_.get(a);
    goog.isArray(c) ? this.count_ -= c.length : this.count_--
  }
  this.keyMap_.set(a, b);
  this.count_++;
  return this
};
goog.Uri.QueryData.prototype.get = function(a, b) {
  this.ensureKeyMapInitialized_();
  a = this.getKeyName_(a);
  if(this.containsKey(a)) {
    var c = this.keyMap_.get(a);
    return goog.isArray(c) ? c[0] : c
  }
  return b
};
goog.Uri.QueryData.prototype.setValues = function(a, b) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  a = this.getKeyName_(a);
  if(this.containsKey(a)) {
    var c = this.keyMap_.get(a);
    goog.isArray(c) ? this.count_ -= c.length : this.count_--
  }
  0 < b.length && (this.keyMap_.set(a, b), this.count_ += b.length)
};
goog.Uri.QueryData.prototype.toString = function() {
  if(this.encodedQuery_) {
    return this.encodedQuery_
  }
  if(!this.keyMap_) {
    return""
  }
  for(var a = [], b = 0, c = this.keyMap_.getKeys(), d = 0;d < c.length;d++) {
    var e = c[d], f = goog.string.urlEncode(e), e = this.keyMap_.get(e);
    if(goog.isArray(e)) {
      for(var g = 0;g < e.length;g++) {
        0 < b && a.push("&"), a.push(f), "" !== e[g] && a.push("=", goog.string.urlEncode(e[g])), b++
      }
    }else {
      0 < b && a.push("&"), a.push(f), "" !== e && a.push("=", goog.string.urlEncode(e)), b++
    }
  }
  return this.encodedQuery_ = a.join("")
};
goog.Uri.QueryData.prototype.toDecodedString = function() {
  this.decodedQuery_ || (this.decodedQuery_ = goog.Uri.decodeOrEmpty_(this.toString()));
  return this.decodedQuery_
};
goog.Uri.QueryData.prototype.invalidateCache_ = function() {
  delete this.decodedQuery_;
  delete this.encodedQuery_;
  this.uri_ && delete this.uri_.cachedToString_
};
goog.Uri.QueryData.prototype.filterKeys = function(a) {
  this.ensureKeyMapInitialized_();
  goog.structs.forEach(this.keyMap_, function(b, c) {
    goog.array.contains(a, c) || this.remove(c)
  }, this);
  return this
};
goog.Uri.QueryData.prototype.clone = function() {
  var a = new goog.Uri.QueryData;
  this.decodedQuery_ && (a.decodedQuery_ = this.decodedQuery_);
  this.encodedQuery_ && (a.encodedQuery_ = this.encodedQuery_);
  this.keyMap_ && (a.keyMap_ = this.keyMap_.clone());
  return a
};
goog.Uri.QueryData.prototype.getKeyName_ = function(a) {
  a = "" + a;
  this.ignoreCase_ && (a = a.toLowerCase());
  return a
};
goog.Uri.QueryData.prototype.setIgnoreCase = function(a) {
  a && !this.ignoreCase_ && (this.ensureKeyMapInitialized_(), this.invalidateCache_(), goog.structs.forEach(this.keyMap_, function(a, c) {
    var d = c.toLowerCase();
    c != d && (this.remove(c), this.add(d, a))
  }, this));
  this.ignoreCase_ = a
};
goog.Uri.QueryData.prototype.extend = function(a) {
  for(var b = 0;b < arguments.length;b++) {
    goog.structs.forEach(arguments[b], function(a, b) {
      this.add(b, a)
    }, this)
  }
};
goog.structs.Collection = function() {
};
goog.structs.Set = function(a) {
  this.map_ = new goog.structs.Map;
  a && this.addAll(a)
};
goog.structs.Set.getKey_ = function(a) {
  var b = typeof a;
  return"object" == b && a || "function" == b ? "o" + goog.getUid(a) : b.substr(0, 1) + a
};
goog.structs.Set.prototype.getCount = function() {
  return this.map_.getCount()
};
goog.structs.Set.prototype.add = function(a) {
  this.map_.set(goog.structs.Set.getKey_(a), a)
};
goog.structs.Set.prototype.addAll = function(a) {
  for(var a = goog.structs.getValues(a), b = a.length, c = 0;c < b;c++) {
    this.add(a[c])
  }
};
goog.structs.Set.prototype.removeAll = function(a) {
  for(var a = goog.structs.getValues(a), b = a.length, c = 0;c < b;c++) {
    this.remove(a[c])
  }
};
goog.structs.Set.prototype.remove = function(a) {
  return this.map_.remove(goog.structs.Set.getKey_(a))
};
goog.structs.Set.prototype.clear = function() {
  this.map_.clear()
};
goog.structs.Set.prototype.isEmpty = function() {
  return this.map_.isEmpty()
};
goog.structs.Set.prototype.contains = function(a) {
  return this.map_.containsKey(goog.structs.Set.getKey_(a))
};
goog.structs.Set.prototype.containsAll = function(a) {
  return goog.structs.every(a, this.contains, this)
};
goog.structs.Set.prototype.intersection = function(a) {
  for(var b = new goog.structs.Set, a = goog.structs.getValues(a), c = 0;c < a.length;c++) {
    var d = a[c];
    this.contains(d) && b.add(d)
  }
  return b
};
goog.structs.Set.prototype.getValues = function() {
  return this.map_.getValues()
};
goog.structs.Set.prototype.clone = function() {
  return new goog.structs.Set(this)
};
goog.structs.Set.prototype.equals = function(a) {
  return this.getCount() == goog.structs.getCount(a) && this.isSubsetOf(a)
};
goog.structs.Set.prototype.isSubsetOf = function(a) {
  var b = goog.structs.getCount(a);
  if(this.getCount() > b) {
    return!1
  }
  !(a instanceof goog.structs.Set) && 5 < b && (a = new goog.structs.Set(a));
  return goog.structs.every(this, function(b) {
    return goog.structs.contains(a, b)
  })
};
goog.structs.Set.prototype.__iterator__ = function() {
  return this.map_.__iterator__(!1)
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !0;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.global.navigator ? goog.global.navigator.userAgent : null
};
goog.userAgent.getNavigator = function() {
  return goog.global.navigator
};
goog.userAgent.init_ = function() {
  goog.userAgent.detectedOpera_ = !1;
  goog.userAgent.detectedIe_ = !1;
  goog.userAgent.detectedWebkit_ = !1;
  goog.userAgent.detectedMobile_ = !1;
  goog.userAgent.detectedGecko_ = !1;
  var a;
  if(!goog.userAgent.BROWSER_KNOWN_ && (a = goog.userAgent.getUserAgentString())) {
    var b = goog.userAgent.getNavigator();
    goog.userAgent.detectedOpera_ = 0 == a.indexOf("Opera");
    goog.userAgent.detectedIe_ = !goog.userAgent.detectedOpera_ && -1 != a.indexOf("MSIE");
    goog.userAgent.detectedWebkit_ = !goog.userAgent.detectedOpera_ && -1 != a.indexOf("WebKit");
    goog.userAgent.detectedMobile_ = goog.userAgent.detectedWebkit_ && -1 != a.indexOf("Mobile");
    goog.userAgent.detectedGecko_ = !goog.userAgent.detectedOpera_ && !goog.userAgent.detectedWebkit_ && "Gecko" == b.product
  }
};
goog.userAgent.BROWSER_KNOWN_ || goog.userAgent.init_();
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.userAgent.detectedOpera_;
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.userAgent.detectedIe_;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.userAgent.detectedGecko_;
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.userAgent.detectedWebkit_;
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.detectedMobile_;
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var a = goog.userAgent.getNavigator();
  return a && a.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11;
goog.userAgent.initPlatform_ = function() {
  goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
  goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
  goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
  goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator().appVersion || "", "X11")
};
goog.userAgent.PLATFORM_KNOWN_ || goog.userAgent.initPlatform_();
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
goog.userAgent.determineVersion_ = function() {
  var a = "", b;
  goog.userAgent.OPERA && goog.global.opera ? (a = goog.global.opera.version, a = "function" == typeof a ? a() : a) : (goog.userAgent.GECKO ? b = /rv\:([^\);]+)(\)|;)/ : goog.userAgent.IE ? b = /MSIE\s+([^\);]+)(\)|;)/ : goog.userAgent.WEBKIT && (b = /WebKit\/(\S+)/), b && (a = (a = b.exec(goog.userAgent.getUserAgentString())) ? a[1] : ""));
  return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), b > parseFloat(a)) ? "" + b : a
};
goog.userAgent.getDocumentMode_ = function() {
  var a = goog.global.document;
  return a ? a.documentMode : void 0
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(a, b) {
  return goog.string.compareVersions(a, b)
};
goog.userAgent.isVersionCache_ = {};
goog.userAgent.isVersion = function(a) {
  return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionCache_[a] || (goog.userAgent.isVersionCache_[a] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a))
};
goog.userAgent.isDocumentModeCache_ = {};
goog.userAgent.isDocumentMode = function(a) {
  return goog.userAgent.isDocumentModeCache_[a] || (goog.userAgent.isDocumentModeCache_[a] = goog.userAgent.IE && document.documentMode && document.documentMode >= a)
};
goog.debug.catchErrors = function(a, b, c) {
  var c = c || goog.global, d = c.onerror, e = goog.userAgent.WEBKIT ? !b : !!b;
  c.onerror = function(b, c, h) {
    d && d(b, c, h);
    a({message:b, fileName:c, line:h});
    return e
  }
};
goog.debug.expose = function(a, b) {
  if("undefined" == typeof a) {
    return"undefined"
  }
  if(null == a) {
    return"NULL"
  }
  var c = [], d;
  for(d in a) {
    if(b || !goog.isFunction(a[d])) {
      var e = d + " = ";
      try {
        e += a[d]
      }catch(f) {
        e += "*** " + f + " ***"
      }
      c.push(e)
    }
  }
  return c.join("\n")
};
goog.debug.deepExpose = function(a, b) {
  var c = new goog.structs.Set, d = [], e = function(a, g) {
    var h = g + "  ";
    try {
      if(goog.isDef(a)) {
        if(goog.isNull(a)) {
          d.push("NULL")
        }else {
          if(goog.isString(a)) {
            d.push('"' + a.replace(/\n/g, "\n" + g) + '"')
          }else {
            if(goog.isFunction(a)) {
              d.push(("" + a).replace(/\n/g, "\n" + g))
            }else {
              if(goog.isObject(a)) {
                if(c.contains(a)) {
                  d.push("*** reference loop detected ***")
                }else {
                  c.add(a);
                  d.push("{");
                  for(var i in a) {
                    if(b || !goog.isFunction(a[i])) {
                      d.push("\n"), d.push(h), d.push(i + " = "), e(a[i], h)
                    }
                  }
                  d.push("\n" + g + "}")
                }
              }else {
                d.push(a)
              }
            }
          }
        }
      }else {
        d.push("undefined")
      }
    }catch(j) {
      d.push("*** " + j + " ***")
    }
  };
  e(a, "");
  return d.join("")
};
goog.debug.exposeArray = function(a) {
  for(var b = [], c = 0;c < a.length;c++) {
    goog.isArray(a[c]) ? b.push(goog.debug.exposeArray(a[c])) : b.push(a[c])
  }
  return"[ " + b.join(", ") + " ]"
};
goog.debug.exposeException = function(a, b) {
  try {
    var c = goog.debug.normalizeErrorObject(a);
    return"Message: " + goog.string.htmlEscape(c.message) + '\nUrl: <a href="view-source:' + c.fileName + '" target="_new">' + c.fileName + "</a>\nLine: " + c.lineNumber + "\n\nBrowser stack:\n" + goog.string.htmlEscape(c.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + goog.string.htmlEscape(goog.debug.getStacktrace(b) + "-> ")
  }catch(d) {
    return"Exception trying to expose exception! You win, we lose. " + d
  }
};
goog.debug.normalizeErrorObject = function(a) {
  var b = goog.getObjectByName("window.location.href");
  if(goog.isString(a)) {
    return{message:a, name:"Unknown error", lineNumber:"Not available", fileName:b, stack:"Not available"}
  }
  var c, d, e = !1;
  try {
    c = a.lineNumber || a.line || "Not available"
  }catch(f) {
    c = "Not available", e = !0
  }
  try {
    d = a.fileName || a.filename || a.sourceURL || b
  }catch(g) {
    d = "Not available", e = !0
  }
  return e || !a.lineNumber || !a.fileName || !a.stack ? {message:a.message, name:a.name, lineNumber:c, fileName:d, stack:a.stack || "Not available"} : a
};
goog.debug.enhanceError = function(a, b) {
  var c = "string" == typeof a ? Error(a) : a;
  c.stack || (c.stack = goog.debug.getStacktrace(arguments.callee.caller));
  if(b) {
    for(var d = 0;c["message" + d];) {
      ++d
    }
    c["message" + d] = "" + b
  }
  return c
};
goog.debug.getStacktraceSimple = function(a) {
  for(var b = [], c = arguments.callee.caller, d = 0;c && (!a || d < a);) {
    b.push(goog.debug.getFunctionName(c));
    b.push("()\n");
    try {
      c = c.caller
    }catch(e) {
      b.push("[exception trying to get caller]\n");
      break
    }
    d++;
    if(d >= goog.debug.MAX_STACK_DEPTH) {
      b.push("[...long stack...]");
      break
    }
  }
  a && d >= a ? b.push("[...reached max depth limit...]") : b.push("[end]");
  return b.join("")
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getStacktrace = function(a) {
  return goog.debug.getStacktraceHelper_(a || arguments.callee.caller, [])
};
goog.debug.getStacktraceHelper_ = function(a, b) {
  var c = [];
  if(goog.array.contains(b, a)) {
    c.push("[...circular reference...]")
  }else {
    if(a && b.length < goog.debug.MAX_STACK_DEPTH) {
      c.push(goog.debug.getFunctionName(a) + "(");
      for(var d = a.arguments, e = 0;e < d.length;e++) {
        0 < e && c.push(", ");
        var f;
        f = d[e];
        switch(typeof f) {
          case "object":
            f = f ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            f = "" + f;
            break;
          case "boolean":
            f = f ? "true" : "false";
            break;
          case "function":
            f = (f = goog.debug.getFunctionName(f)) ? f : "[fn]";
            break;
          default:
            f = typeof f
        }
        40 < f.length && (f = f.substr(0, 40) + "...");
        c.push(f)
      }
      b.push(a);
      c.push(")\n");
      try {
        c.push(goog.debug.getStacktraceHelper_(a.caller, b))
      }catch(g) {
        c.push("[exception trying to get caller]\n")
      }
    }else {
      a ? c.push("[...long stack...]") : c.push("[end]")
    }
  }
  return c.join("")
};
goog.debug.setFunctionResolver = function(a) {
  goog.debug.fnNameResolver_ = a
};
goog.debug.getFunctionName = function(a) {
  if(goog.debug.fnNameCache_[a]) {
    return goog.debug.fnNameCache_[a]
  }
  if(goog.debug.fnNameResolver_) {
    var b = goog.debug.fnNameResolver_(a);
    if(b) {
      return goog.debug.fnNameCache_[a] = b
    }
  }
  a = "" + a;
  goog.debug.fnNameCache_[a] || (b = /function ([^\(]+)/.exec(a), goog.debug.fnNameCache_[a] = b ? b[1] : "[Anonymous]");
  return goog.debug.fnNameCache_[a]
};
goog.debug.makeWhitespaceVisible = function(a) {
  return a.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
};
goog.debug.fnNameCache_ = {};
goog.debug.LogRecord = function(a, b, c, d, e) {
  this.reset(a, b, c, d, e)
};
goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.prototype.exceptionText_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = !0;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function(a, b, c, d, e) {
  goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS && (this.sequenceNumber_ = "number" == typeof e ? e : goog.debug.LogRecord.nextSequenceNumber_++);
  this.time_ = d || goog.now();
  this.level_ = a;
  this.msg_ = b;
  this.loggerName_ = c;
  delete this.exception_;
  delete this.exceptionText_
};
goog.debug.LogRecord.prototype.getLoggerName = function() {
  return this.loggerName_
};
goog.debug.LogRecord.prototype.getException = function() {
  return this.exception_
};
goog.debug.LogRecord.prototype.setException = function(a) {
  this.exception_ = a
};
goog.debug.LogRecord.prototype.getExceptionText = function() {
  return this.exceptionText_
};
goog.debug.LogRecord.prototype.setExceptionText = function(a) {
  this.exceptionText_ = a
};
goog.debug.LogRecord.prototype.setLoggerName = function(a) {
  this.loggerName_ = a
};
goog.debug.LogRecord.prototype.getLevel = function() {
  return this.level_
};
goog.debug.LogRecord.prototype.setLevel = function(a) {
  this.level_ = a
};
goog.debug.LogRecord.prototype.getMessage = function() {
  return this.msg_
};
goog.debug.LogRecord.prototype.setMessage = function(a) {
  this.msg_ = a
};
goog.debug.LogRecord.prototype.getMillis = function() {
  return this.time_
};
goog.debug.LogRecord.prototype.setMillis = function(a) {
  this.time_ = a
};
goog.debug.LogRecord.prototype.getSequenceNumber = function() {
  return this.sequenceNumber_
};
goog.debug.LogBuffer = function() {
  goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY.");
  this.clear()
};
goog.debug.LogBuffer.getInstance = function() {
  goog.debug.LogBuffer.instance_ || (goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer);
  return goog.debug.LogBuffer.instance_
};
goog.debug.LogBuffer.CAPACITY = 0;
goog.debug.LogBuffer.prototype.addRecord = function(a, b, c) {
  var d = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
  this.curIndex_ = d;
  if(this.isFull_) {
    return d = this.buffer_[d], d.reset(a, b, c), d
  }
  this.isFull_ = d == goog.debug.LogBuffer.CAPACITY - 1;
  return this.buffer_[d] = new goog.debug.LogRecord(a, b, c)
};
goog.debug.LogBuffer.isBufferingEnabled = function() {
  return 0 < goog.debug.LogBuffer.CAPACITY
};
goog.debug.LogBuffer.prototype.clear = function() {
  this.buffer_ = Array(goog.debug.LogBuffer.CAPACITY);
  this.curIndex_ = -1;
  this.isFull_ = !1
};
goog.debug.LogBuffer.prototype.forEachRecord = function(a) {
  var b = this.buffer_;
  if(b[0]) {
    var c = this.curIndex_, d = this.isFull_ ? c : -1;
    do {
      d = (d + 1) % goog.debug.LogBuffer.CAPACITY, a(b[d])
    }while(d != c)
  }
};
goog.debug.Logger = function(a) {
  this.name_ = a
};
goog.debug.Logger.prototype.parent_ = null;
goog.debug.Logger.prototype.level_ = null;
goog.debug.Logger.prototype.children_ = null;
goog.debug.Logger.prototype.handlers_ = null;
goog.debug.Logger.ENABLE_HIERARCHY = !0;
goog.debug.Logger.ENABLE_HIERARCHY || (goog.debug.Logger.rootHandlers_ = []);
goog.debug.Logger.Level = function(a, b) {
  this.name = a;
  this.value = b
};
goog.debug.Logger.Level.prototype.toString = function() {
  return this.name
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1E3);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function() {
  goog.debug.Logger.Level.predefinedLevelsCache_ = {};
  for(var a = 0, b;b = goog.debug.Logger.Level.PREDEFINED_LEVELS[a];a++) {
    goog.debug.Logger.Level.predefinedLevelsCache_[b.value] = b;
    goog.debug.Logger.Level.predefinedLevelsCache_[b.name] = b
  }
};
goog.debug.Logger.Level.getPredefinedLevel = function(a) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  return goog.debug.Logger.Level.predefinedLevelsCache_[a] || null
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function(a) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  if(a in goog.debug.Logger.Level.predefinedLevelsCache_) {
    return goog.debug.Logger.Level.predefinedLevelsCache_[a]
  }
  for(var b = 0;b < goog.debug.Logger.Level.PREDEFINED_LEVELS.length;++b) {
    var c = goog.debug.Logger.Level.PREDEFINED_LEVELS[b];
    if(c.value <= a) {
      return c
    }
  }
  return null
};
goog.debug.Logger.getLogger = function(a) {
  return goog.debug.LogManager.getLogger(a)
};
goog.debug.Logger.logToProfilers = function(a) {
  goog.global.console && (goog.global.console.timeStamp ? goog.global.console.timeStamp(a) : goog.global.console.markTimeline && goog.global.console.markTimeline(a));
  goog.global.msWriteProfilerMark && goog.global.msWriteProfilerMark(a)
};
goog.debug.Logger.prototype.getName = function() {
  return this.name_
};
goog.debug.Logger.prototype.addHandler = function(a) {
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    if(!this.handlers_) {
      this.handlers_ = []
    }
    this.handlers_.push(a)
  }else {
    goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false.");
    goog.debug.Logger.rootHandlers_.push(a)
  }
};
goog.debug.Logger.prototype.removeHandler = function(a) {
  var b = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
  return!!b && goog.array.remove(b, a)
};
goog.debug.Logger.prototype.getParent = function() {
  return this.parent_
};
goog.debug.Logger.prototype.getChildren = function() {
  if(!this.children_) {
    this.children_ = {}
  }
  return this.children_
};
goog.debug.Logger.prototype.setLevel = function(a) {
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    this.level_ = a
  }else {
    goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false.");
    goog.debug.Logger.rootLevel_ = a
  }
};
goog.debug.Logger.prototype.getLevel = function() {
  return this.level_
};
goog.debug.Logger.prototype.getEffectiveLevel = function() {
  if(!goog.debug.Logger.ENABLE_HIERARCHY) {
    return goog.debug.Logger.rootLevel_
  }
  if(this.level_) {
    return this.level_
  }
  if(this.parent_) {
    return this.parent_.getEffectiveLevel()
  }
  goog.asserts.fail("Root logger has no level set.");
  return null
};
goog.debug.Logger.prototype.isLoggable = function(a) {
  return a.value >= this.getEffectiveLevel().value
};
goog.debug.Logger.prototype.log = function(a, b, c) {
  this.isLoggable(a) && this.doLogRecord_(this.getLogRecord(a, b, c))
};
goog.debug.Logger.prototype.getLogRecord = function(a, b, c) {
  var d = goog.debug.LogBuffer.isBufferingEnabled() ? goog.debug.LogBuffer.getInstance().addRecord(a, b, this.name_) : new goog.debug.LogRecord(a, "" + b, this.name_);
  if(c) {
    d.setException(c);
    d.setExceptionText(goog.debug.exposeException(c, arguments.callee.caller))
  }
  return d
};
goog.debug.Logger.prototype.shout = function(a, b) {
  this.log(goog.debug.Logger.Level.SHOUT, a, b)
};
goog.debug.Logger.prototype.severe = function(a, b) {
  this.log(goog.debug.Logger.Level.SEVERE, a, b)
};
goog.debug.Logger.prototype.warning = function(a, b) {
  this.log(goog.debug.Logger.Level.WARNING, a, b)
};
goog.debug.Logger.prototype.info = function(a, b) {
  this.log(goog.debug.Logger.Level.INFO, a, b)
};
goog.debug.Logger.prototype.config = function(a, b) {
  this.log(goog.debug.Logger.Level.CONFIG, a, b)
};
goog.debug.Logger.prototype.fine = function(a, b) {
  this.log(goog.debug.Logger.Level.FINE, a, b)
};
goog.debug.Logger.prototype.finer = function(a, b) {
  this.log(goog.debug.Logger.Level.FINER, a, b)
};
goog.debug.Logger.prototype.finest = function(a, b) {
  this.log(goog.debug.Logger.Level.FINEST, a, b)
};
goog.debug.Logger.prototype.logRecord = function(a) {
  this.isLoggable(a.getLevel()) && this.doLogRecord_(a)
};
goog.debug.Logger.prototype.doLogRecord_ = function(a) {
  goog.debug.Logger.logToProfilers("log:" + a.getMessage());
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    for(var b = this;b;) {
      b.callPublish_(a);
      b = b.getParent()
    }
  }else {
    for(var b = 0, c;c = goog.debug.Logger.rootHandlers_[b++];) {
      c(a)
    }
  }
};
goog.debug.Logger.prototype.callPublish_ = function(a) {
  if(this.handlers_) {
    for(var b = 0, c;c = this.handlers_[b];b++) {
      c(a)
    }
  }
};
goog.debug.Logger.prototype.setParent_ = function(a) {
  this.parent_ = a
};
goog.debug.Logger.prototype.addChild_ = function(a, b) {
  this.getChildren()[a] = b
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function() {
  if(!goog.debug.LogManager.rootLogger_) {
    goog.debug.LogManager.rootLogger_ = new goog.debug.Logger("");
    goog.debug.LogManager.loggers_[""] = goog.debug.LogManager.rootLogger_;
    goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG)
  }
};
goog.debug.LogManager.getLoggers = function() {
  return goog.debug.LogManager.loggers_
};
goog.debug.LogManager.getRoot = function() {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.rootLogger_
};
goog.debug.LogManager.getLogger = function(a) {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.loggers_[a] || goog.debug.LogManager.createLogger_(a)
};
goog.debug.LogManager.createFunctionForCatchErrors = function(a) {
  return function(b) {
    (a || goog.debug.LogManager.getRoot()).severe("Error: " + b.message + " (" + b.fileName + " @ Line: " + b.line + ")")
  }
};
goog.debug.LogManager.createLogger_ = function(a) {
  var b = new goog.debug.Logger(a);
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    var c = a.lastIndexOf("."), d = a.substr(0, c), c = a.substr(c + 1), d = goog.debug.LogManager.getLogger(d);
    d.addChild_(c, b);
    b.setParent_(d)
  }
  return goog.debug.LogManager.loggers_[a] = b
};
var safaridriver = {extension:{}};
safaridriver.extension.Tab = function(a) {
  this.browserTab_ = a;
  this.id_ = goog.string.getRandomString();
  this.isReady_ = !0;
  this.readyListeners_ = [];
  var b = goog.bind(this.onBeforeNavigate_, this), c = goog.bind(this.onNavigate_, this);
  a.addEventListener("beforeNavigate", b, !1);
  a.addEventListener("navigate", c, !1);
  a.addEventListener("close", function() {
    a.removeEventListener("beforeNavigate", b, !1);
    a.removeEventListener("navigate", c, !1)
  }, !1)
};
safaridriver.extension.Tab.LOG_ = goog.debug.Logger.getLogger("safaridriver.extension.Tab");
safaridriver.extension.Tab.prototype.idleStateWaitKey_ = null;
safaridriver.extension.Tab.prototype.getBrowserTab = function() {
  return this.browserTab_
};
safaridriver.extension.Tab.prototype.getId = function() {
  return this.id_
};
safaridriver.extension.Tab.prototype.log_ = function(a, b) {
  safaridriver.extension.Tab.LOG_.log(b || goog.debug.Logger.Level.INFO, "[" + this.id_ + "] " + a)
};
safaridriver.extension.Tab.prototype.whenReady = function(a) {
  this.isReady_ ? a(this.browserTab_) : (this.log_("Tab is not ready for commands; registering callback"), this.readyListeners_.push(a))
};
safaridriver.extension.Tab.prototype.loadsNewPage = function(a) {
  var b = new goog.Uri(this.browserTab_.url), c = new goog.Uri(a);
  return b.toString() === c.toString() ? !!b.getFragment() || /#$/.test(this.browserTab_.url) === /#$/.test(a) : b.toString() === c.toString() || b.setFragment("").toString() !== c.setFragment("").toString()
};
safaridriver.extension.Tab.prototype.onBeforeNavigate_ = function(a) {
  this.loadsNewPage(a.url) && (this.log_("Tab is about to load a URL\nfrom: " + this.browserTab_.url + "\nto:   " + a.url), this.isReady_ = !1, this.idleStateWaitKey_ && (clearTimeout(this.idleStateWaitKey_), this.idleStateWaitKey_ = null))
};
safaridriver.extension.Tab.prototype.onNavigate_ = function() {
  this.log_("New URL loaded; waiting for idle state");
  var a = this;
  a.isReady_ = !0;
  a.idleStateWaitKey_ || (a.idleStateWaitKey_ = setTimeout(function() {
    a.idleStateWaitKey_ = null;
    for(a.log_("Tab looks ready; notifying listeners");a.readyListeners_.length;) {
      if(!a.isReady_) {
        a.log_("Tab is loading another page");
        break
      }
      a.readyListeners_.shift()(a.browserTab_)
    }
  }, 100))
};
safaridriver.extension.Tab.prototype.send = function(a, b) {
  var c = goog.string.getRandomString(), d = new webdriver.promise.Deferred, e = new safaridriver.Command(c, a), f = new safaridriver.message.CommandMessage(e), g = goog.bind(this.log_, this);
  g("Preparing command: " + JSON.stringify(e));
  this.whenReady(function(h) {
    function i(a) {
      try {
        var b = safaridriver.message.Message.fromEvent(a)
      }catch(e) {
        g(goog.debug.Logger.Level.SEVERE, "Unable to parse message: " + a.name + ": " + JSON.stringify(a.message), e);
        return
      }
      if(b.isType(safaridriver.message.Type.RESPONSE)) {
        if(b.getId() !== c) {
          g(goog.debug.Logger.Level.FINE, "Ignoring response to another command: " + a.message.id + " (" + c + ")")
        }else {
          if(d.isPending()) {
            h.removeEventListener("message", i, !1);
            clearTimeout(k);
            try {
              d.resolve(webdriver.error.checkResponse(b.getResponse()))
            }catch(f) {
              d.reject(f)
            }
          }else {
            g(goog.debug.Logger.Level.WARNING, "Received command response after promise has been resolved; perhaps it previously timed-out? " + JSON.stringify(a.message))
          }
        }
      }else {
        g(goog.debug.Logger.Level.FINE, "Ignoring non-response message: " + JSON.stringify(a.message))
      }
    }
    g("Sending command: " + JSON.stringify(e));
    h.addEventListener("message", i, !1);
    if(b && 0 < b) {
      var j = goog.now(), k = setTimeout(function() {
        d.isPending() && d.reject(new bot.Error(bot.ErrorCode.SCRIPT_TIMEOUT, 'Timed out awaiting response to command "' + a.getName() + '" after ' + (goog.now() - j) + " ms"))
      }, b)
    }
    f.send(h.page)
  });
  return d.promise
};
var webdriver = {Command:function(a) {
  this.name_ = a;
  this.parameters_ = {}
}};
webdriver.Command.prototype.getName = function() {
  return this.name_
};
webdriver.Command.prototype.setParameter = function(a, b) {
  this.parameters_[a] = b;
  return this
};
webdriver.Command.prototype.setParameters = function(a) {
  this.parameters_ = a;
  return this
};
webdriver.Command.prototype.getParameter = function(a) {
  return this.parameters_[a]
};
webdriver.Command.prototype.getParameters = function() {
  return this.parameters_
};
webdriver.CommandName = {GET_SERVER_STATUS:"status", NEW_SESSION:"newSession", GET_SESSIONS:"getSessions", DESCRIBE_SESSION:"getSessionCapabilities", CLOSE:"close", QUIT:"quit", GET_CURRENT_URL:"getCurrentUrl", GET:"get", GO_BACK:"goBack", GO_FORWARD:"goForward", REFRESH:"refresh", ADD_COOKIE:"addCookie", GET_COOKIE:"getCookie", GET_ALL_COOKIES:"getCookies", DELETE_COOKIE:"deleteCookie", DELETE_ALL_COOKIES:"deleteAllCookies", GET_ACTIVE_ELEMENT:"getActiveElement", FIND_ELEMENT:"findElement", FIND_ELEMENTS:"findElements", 
FIND_CHILD_ELEMENT:"findChildElement", FIND_CHILD_ELEMENTS:"findChildElements", CLEAR_ELEMENT:"clearElement", CLICK_ELEMENT:"clickElement", SEND_KEYS_TO_ELEMENT:"sendKeysToElement", SEND_KEYS_TO_ACTIVE_ELEMENT:"sendKeysToActiveElement", SUBMIT_ELEMENT:"submitElement", GET_CURRENT_WINDOW_HANDLE:"getCurrentWindowHandle", GET_WINDOW_HANDLES:"getWindowHandles", SWITCH_TO_WINDOW:"switchToWindow", SWITCH_TO_FRAME:"switchToFrame", GET_PAGE_SOURCE:"getPageSource", GET_TITLE:"getTitle", EXECUTE_SCRIPT:"executeScript", 
EXECUTE_ASYNC_SCRIPT:"executeAsyncScript", GET_ELEMENT_TEXT:"getElementText", GET_ELEMENT_TAG_NAME:"getElementTagName", IS_ELEMENT_SELECTED:"isElementSelected", IS_ELEMENT_ENABLED:"isElementEnabled", IS_ELEMENT_DISPLAYED:"isElementDisplayed", GET_ELEMENT_LOCATION:"getElementLocation", GET_ELEMENT_SIZE:"getElementSize", GET_ELEMENT_ATTRIBUTE:"getElementAttribute", GET_ELEMENT_VALUE_OF_CSS_PROPERTY:"getElementValueOfCssProperty", ELEMENT_EQUALS:"elementEquals", SCREENSHOT:"screenshot", DIMISS_ALERT:"dimissAlert", 
IMPLICITLY_WAIT:"implicitlyWait", SET_SCRIPT_TIMEOUT:"setScriptTimeout", GET_ALERT:"getAlert", ACCEPT_ALERT:"acceptAlert", DISMISS_ALERT:"dismissAlert", GET_ALERT_TEXT:"getAlertText", SET_ALERT_VALUE:"setAlertValue", EXECUTE_SQL:"executeSQL", GET_LOCATION:"getLocation", SET_LOCATION:"setLocation", GET_APP_CACHE:"getAppCache", GET_APP_CACHE_STATUS:"getStatus", CLEAR_APP_CACHE:"clearAppCache", IS_BROWSER_ONLINE:"isBrowserOnline", SET_BROWSER_ONLINE:"setBrowserOnline", GET_LOCAL_STORAGE_ITEM:"getLocalStorageItem", 
GET_LOCAL_STORAGE_KEYS:"getLocalStorageKeys", SET_LOCAL_STORAGE_ITEM:"setLocalStorageItem", REMOVE_LOCAL_STORAGE_ITEM:"removeLocalStorageItem", CLEAR_LOCAL_STORAGE:"clearLocalStorage", GET_LOCAL_STORAGE_SIZE:"getLocalStorageSize", GET_SESSION_STORAGE_ITEM:"getSessionStorageItem", GET_SESSION_STORAGE_KEYS:"getSessionStorageKey", SET_SESSION_STORAGE_ITEM:"setSessionStorageItem", REMOVE_SESSION_STORAGE_ITEM:"removeSessionStorageItem", CLEAR_SESSION_STORAGE:"clearSessionStorage", GET_SESSION_STORAGE_SIZE:"getSessionStorageSize", 
SET_SCREEN_ORIENTATION:"setScreenOrientation", GET_SCREEN_ORIENTATION:"getScreenOrientation", CLICK:"mouseClick", DOUBLE_CLICK:"mouseDoubleClick", MOUSE_DOWN:"mouseButtonDown", MOUSE_UP:"mouseButtonUp", MOVE_TO:"mouseMoveTo", SEND_KEYS_TO_SESSION:"sendKeys", TOUCH_SINGLE_TAP:"touchSingleTap", TOUCH_DOWN:"touchDown", TOUCH_UP:"touchUp", TOUCH_MOVE:"touchMove", TOUCH_SCROLL:"touchScroll", TOUCH_DOUBLE_TAP:"touchDoubleTap", TOUCH_LONG_PRESS:"touchLongPress", TOUCH_FLICK:"touchFlick", SET_WINDOW_SIZE:"setWindowSize", 
SET_WINDOW_POSITION:"setWindowPosition", GET_WINDOW_SIZE:"getWindowSize", GET_WINDOW_POSITION:"getWindowPosition", GET_LOGS:"getLogs"};
webdriver.CommandExecutor = function() {
};
safaridriver.Command = function(a, b, c) {
  var d = goog.isString(b) ? b : b.getName();
  webdriver.Command.call(this, d);
  this.id = a;
  this.setParameters(goog.isString(b) ? c || {} : b.getParameters())
};
goog.inherits(safaridriver.Command, webdriver.Command);
safaridriver.Command.fromJSONObject = function(a) {
  return!goog.isString(a.id) || !goog.isString(a.name) || !goog.isObject(a.parameters) ? null : new safaridriver.Command(a.id, a.name, a.parameters)
};
safaridriver.Command.prototype.getId = function() {
  return this.id
};
safaridriver.Command.prototype.toJSON = function() {
  return{id:this.id, name:this.getName(), parameters:this.getParameters()}
};
safaridriver.message = {};
safaridriver.message.Type = {ACTIVATE:"activate", COMMAND:"command", CONNECT:"connect", LOADED:"loaded", RESPONSE:"response"};
safaridriver.message.Message = function(a) {
  this.data_ = {};
  this.data_[safaridriver.message.Message.Field.SOURCE] = safaridriver.message.Message.SOURCE;
  this.data_[safaridriver.message.Message.Field.MESSAGE] = a
};
safaridriver.message.Message.Field = {SOURCE:"source", MESSAGE:"message"};
safaridriver.message.Message.SOURCE = "webdriver";
safaridriver.message.Message.fromEvent = function(a) {
  a = a.message || a.data;
  if(!goog.isObject(a) || a[safaridriver.message.Message.Field.SOURCE] !== safaridriver.message.Message.SOURCE) {
    throw Error("Invalid message: " + JSON.stringify(a));
  }
  switch(a[safaridriver.message.Message.Field.MESSAGE]) {
    case safaridriver.message.Type.COMMAND:
      return safaridriver.message.CommandMessage.fromData_(a);
    case safaridriver.message.Type.CONNECT:
      return safaridriver.message.ConnectMessage.fromData_(a);
    case safaridriver.message.Type.RESPONSE:
      return safaridriver.message.ResponseMessage.fromData_(a);
    case safaridriver.message.Type.ACTIVATE:
    ;
    case safaridriver.message.Type.LOADED:
      return safaridriver.message.Message.fromData_(a);
    default:
      throw Error("Unknown message type: " + JSON.stringify(a));
  }
};
safaridriver.message.Message.fromData_ = function(a) {
  return new safaridriver.message.Message(a[safaridriver.message.Message.Field.MESSAGE])
};
safaridriver.message.Message.prototype.setField = function(a, b) {
  if(a === safaridriver.message.Message.Field.MESSAGE || a === safaridriver.message.Message.Field.SOURCE) {
    throw Error("The specified field may not be overridden: " + a);
  }
  this.data_[a] = b
};
safaridriver.message.Message.prototype.getField = function(a) {
  return this.data_[a]
};
safaridriver.message.Message.prototype.getType = function() {
  return this.getField(safaridriver.message.Message.Field.MESSAGE)
};
safaridriver.message.Message.prototype.isType = function(a) {
  return this.getField(safaridriver.message.Message.Field.MESSAGE) === a
};
safaridriver.message.Message.prototype.send = function(a) {
  a ? a.dispatchMessage(this.getType(), this.data_) : window.postMessage(this.data_, "*")
};
safaridriver.message.Message.prototype.toJSON = function() {
  return this.data_
};
safaridriver.message.Message.prototype.toString = function() {
  return JSON.stringify(this)
};
safaridriver.message.CommandMessage = function(a) {
  safaridriver.message.Message.call(this, safaridriver.message.Type.COMMAND);
  this.command_ = a
};
goog.inherits(safaridriver.message.CommandMessage, safaridriver.message.Message);
safaridriver.message.CommandMessage.COMMAND_FIELD_ = "command";
safaridriver.message.CommandMessage.fromData_ = function(a) {
  var b = a[safaridriver.message.CommandMessage.COMMAND_FIELD_];
  if(!goog.isObject(b)) {
    throw Error("Invalid command message: " + JSON.stringify(a));
  }
  b = safaridriver.Command.fromJSONObject(b);
  if(!b) {
    throw Error("Invalid command message: " + JSON.stringify(a));
  }
  return new safaridriver.message.CommandMessage(b)
};
safaridriver.message.CommandMessage.prototype.getCommand = function() {
  return this.command_
};
safaridriver.message.CommandMessage.prototype.toJSON = function() {
  this.setField(safaridriver.message.CommandMessage.COMMAND_FIELD_, this.command_.toJSON());
  return safaridriver.message.CommandMessage.superClass_.toJSON.call(this)
};
safaridriver.message.CommandMessage.prototype.send = function(a) {
  this.setField(safaridriver.message.CommandMessage.COMMAND_FIELD_, this.command_.toJSON());
  safaridriver.message.CommandMessage.superClass_.send.call(this, a)
};
safaridriver.message.ConnectMessage = function(a) {
  safaridriver.message.Message.call(this, safaridriver.message.Type.CONNECT);
  this.setField(safaridriver.message.ConnectMessage.URL_FIELD_, a)
};
goog.inherits(safaridriver.message.ConnectMessage, safaridriver.message.Message);
safaridriver.message.ConnectMessage.URL_FIELD_ = "url";
safaridriver.message.ConnectMessage.fromData_ = function(a) {
  var b = a[safaridriver.message.ConnectMessage.URL_FIELD_];
  if(!goog.isString(b)) {
    throw Error("Invalid connect message: " + JSON.stringify(a));
  }
  return new safaridriver.message.ConnectMessage(b)
};
safaridriver.message.ConnectMessage.prototype.getUrl = function() {
  return this.getField(safaridriver.message.ConnectMessage.URL_FIELD_)
};
safaridriver.message.ResponseMessage = function(a, b) {
  safaridriver.message.Message.call(this, safaridriver.message.Type.RESPONSE);
  this.setField(safaridriver.message.ResponseMessage.Field_.ID, a);
  this.setField(safaridriver.message.ResponseMessage.Field_.RESPONSE, b)
};
goog.inherits(safaridriver.message.ResponseMessage, safaridriver.message.Message);
safaridriver.message.ResponseMessage.Field_ = {ID:"id", RESPONSE:"response"};
safaridriver.message.ResponseMessage.fromData_ = function(a) {
  var b = a[safaridriver.message.ResponseMessage.Field_.ID], c = a[safaridriver.message.ResponseMessage.Field_.RESPONSE];
  if(!goog.isString(b) || !goog.isObject(c)) {
    throw Error("Invalid response message: " + JSON.stringify(a));
  }
  return new safaridriver.message.ResponseMessage(b, c)
};
safaridriver.message.ResponseMessage.prototype.getId = function() {
  return this.getField(safaridriver.message.ResponseMessage.Field_.ID)
};
safaridriver.message.ResponseMessage.prototype.getResponse = function() {
  return this.getField(safaridriver.message.ResponseMessage.Field_.RESPONSE)
};
var bot = {ErrorCode:{SUCCESS:0, NO_SUCH_ELEMENT:7, NO_SUCH_FRAME:8, UNKNOWN_COMMAND:9, UNSUPPORTED_OPERATION:9, STALE_ELEMENT_REFERENCE:10, ELEMENT_NOT_VISIBLE:11, INVALID_ELEMENT_STATE:12, UNKNOWN_ERROR:13, ELEMENT_NOT_SELECTABLE:15, JAVASCRIPT_ERROR:17, XPATH_LOOKUP_ERROR:19, TIMEOUT:21, NO_SUCH_WINDOW:23, INVALID_COOKIE_DOMAIN:24, UNABLE_TO_SET_COOKIE:25, MODAL_DIALOG_OPENED:26, NO_MODAL_DIALOG_OPEN:27, SCRIPT_TIMEOUT:28, INVALID_ELEMENT_COORDINATES:29, INVALID_SELECTOR_ERROR:32, SQL_DATABASE_ERROR:33, 
MOVE_TARGET_OUT_OF_BOUNDS:34, IME_ENGINE_ACTIVATION_FAILED:35, IME_NOT_AVAILABLE:36}, Error:function(a, b) {
  this.code = a;
  this.message = b || "";
  this.name = bot.Error.NAMES_[a] || bot.Error.NAMES_[bot.ErrorCode.UNKNOWN_ERROR];
  var c = Error(this.message);
  c.name = this.name;
  this.stack = c.stack || ""
}};
goog.inherits(bot.Error, Error);
bot.Error.NAMES_ = goog.object.create(bot.ErrorCode.NO_SUCH_ELEMENT, "NoSuchElementError", bot.ErrorCode.NO_SUCH_FRAME, "NoSuchFrameError", bot.ErrorCode.UNKNOWN_COMMAND, "UnknownCommandError", bot.ErrorCode.STALE_ELEMENT_REFERENCE, "StaleElementReferenceError", bot.ErrorCode.ELEMENT_NOT_VISIBLE, "ElementNotVisibleError", bot.ErrorCode.INVALID_ELEMENT_STATE, "InvalidElementStateError", bot.ErrorCode.UNKNOWN_ERROR, "UnknownError", bot.ErrorCode.ELEMENT_NOT_SELECTABLE, "ElementNotSelectableError", 
bot.ErrorCode.XPATH_LOOKUP_ERROR, "XPathLookupError", bot.ErrorCode.NO_SUCH_WINDOW, "NoSuchWindowError", bot.ErrorCode.INVALID_COOKIE_DOMAIN, "InvalidCookieDomainError", bot.ErrorCode.UNABLE_TO_SET_COOKIE, "UnableToSetCookieError", bot.ErrorCode.MODAL_DIALOG_OPENED, "ModalDialogOpenedError", bot.ErrorCode.NO_MODAL_DIALOG_OPEN, "NoModalDialogOpenError", bot.ErrorCode.SCRIPT_TIMEOUT, "ScriptTimeoutError", bot.ErrorCode.INVALID_SELECTOR_ERROR, "InvalidSelectorError", bot.ErrorCode.SQL_DATABASE_ERROR, 
"SqlDatabaseError", bot.ErrorCode.MOVE_TARGET_OUT_OF_BOUNDS, "MoveTargetOutOfBoundsError");
bot.Error.prototype.isAutomationError = !0;
goog.DEBUG && (bot.Error.prototype.toString = function() {
  return"[" + this.name + "] " + this.message
});
webdriver.error = {};
webdriver.error.isResponseObject = function(a) {
  return goog.isObject(a) && goog.isNumber(a.status)
};
webdriver.error.createResponse = function(a) {
  return webdriver.error.isResponseObject(a) ? a : {status:a && goog.isNumber(a.code) ? a.code : bot.ErrorCode.UNKNOWN_ERROR, value:{message:a && a.message || a + ""}}
};
webdriver.error.checkResponse = function(a) {
  var b = a.status;
  if(b == bot.ErrorCode.SUCCESS) {
    return a
  }
  b = b || bot.ErrorCode.UNKNOWN_ERROR;
  a = a.value;
  if(!a || !goog.isObject(a)) {
    throw new bot.Error(b, a + "");
  }
  throw new bot.Error(b, a.message + "");
};
webdriver.EventEmitter = function() {
  this.events_ = {}
};
webdriver.EventEmitter.prototype.emit = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1), d = this.events_[a];
  if(d) {
    for(var e = 0;e < d.length;) {
      d[e].fn.apply(null, c), d[e].oneshot ? d.splice(e, 1) : e += 1
    }
  }
};
webdriver.EventEmitter.prototype.listeners = function(a) {
  var b = this.events_[a];
  b || (b = this.events_[a] = []);
  return b
};
webdriver.EventEmitter.prototype.addListener = function(a, b, c) {
  for(var a = this.listeners(a), d = a.length, e = 0;e < d;++e) {
    if(a[e] == b) {
      return this
    }
  }
  a.push({fn:b, oneshot:!!c});
  return this
};
webdriver.EventEmitter.prototype.once = function(a, b) {
  return this.addListener(a, b, !0)
};
webdriver.EventEmitter.prototype.on = webdriver.EventEmitter.prototype.addListener;
webdriver.EventEmitter.prototype.removeListener = function(a, b) {
  var c = this.events_[a];
  if(c) {
    for(var d = c.length, e = 0;e < d;++e) {
      if(c[e].fn == b) {
        c.splice(e, 1);
        break
      }
    }
  }
  return this
};
webdriver.EventEmitter.prototype.removeAllListeners = function(a) {
  goog.isDef(a) ? delete this.events_[a] : this.events_ = {};
  return this
};
/*
 Portions of this code are from the Dojo toolkit, received under the
 BSD License:
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.
 Neither the name of the Dojo Foundation nor the names of its contributors
 may be used to endorse or promote products derived from this software
 without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
*/
webdriver.promise = {};
webdriver.promise.Promise = function() {
};
webdriver.promise.Promise.prototype.cancel = function() {
  throw new TypeError('Unimplemented function: "cancel"');
};
webdriver.promise.Promise.prototype.isPending = function() {
  throw new TypeError('Unimplemented function: "isPending"');
};
webdriver.promise.Promise.prototype.then = function() {
  throw new TypeError('Unimplemented function: "then"');
};
webdriver.promise.Promise.prototype.addCallback = function(a, b) {
  return this.then(goog.bind(a, b))
};
webdriver.promise.Promise.prototype.addErrback = function(a, b) {
  return this.then(null, goog.bind(a, b))
};
webdriver.promise.Promise.prototype.addBoth = function(a, b) {
  a = goog.bind(a, b);
  return this.then(a, a)
};
webdriver.promise.Promise.prototype.addCallbacks = function(a, b, c) {
  return this.then(goog.bind(a, c), goog.bind(b, c))
};
webdriver.promise.Deferred = function(a) {
  function b() {
    return j == webdriver.promise.Deferred.State.PENDING
  }
  function c(a, c) {
    if(!b()) {
      throw Error("This Deferred has already been resolved.");
    }
    j = a;
    for(k = c;h.length;) {
      d(h.shift())
    }
    if(!i && j == webdriver.promise.Deferred.State.REJECTED) {
      var e = webdriver.promise.Application.getInstance();
      e.pendingRejections_ += 1;
      setTimeout(function() {
        e.pendingRejections_ -= 1;
        i || e.abortFrame_(k)
      }, 0)
    }
  }
  function d(a) {
    var b = j == webdriver.promise.Deferred.State.RESOLVED ? a.callback : a.errback;
    b ? (b = webdriver.promise.Application.getInstance().runInNewFrame_(goog.partial(b, k)), webdriver.promise.asap(b, a.deferred.resolve, a.deferred.reject)) : j == webdriver.promise.Deferred.State.REJECTED ? a.deferred.reject(k) : a.deferred.resolve(k)
  }
  function e(a) {
    webdriver.promise.isPromise(a) && a !== l ? a instanceof webdriver.promise.Deferred ? a.then(goog.partial(c, webdriver.promise.Deferred.State.RESOLVED), goog.partial(c, webdriver.promise.Deferred.State.REJECTED)) : webdriver.promise.when(a, e, f) : c(webdriver.promise.Deferred.State.RESOLVED, a)
  }
  function f(a) {
    webdriver.promise.isPromise(a) && a !== l ? a instanceof webdriver.promise.Deferred ? a.then(goog.partial(c, webdriver.promise.Deferred.State.REJECTED), goog.partial(c, webdriver.promise.Deferred.State.REJECTED)) : webdriver.promise.when(a, f, f) : c(webdriver.promise.Deferred.State.REJECTED, a)
  }
  function g(c) {
    if(!b()) {
      throw Error("This Deferred has already been resolved.");
    }
    a && (c = a(c) || c);
    b() && f(c)
  }
  webdriver.promise.Promise.call(this);
  var h = [], i = !1, j = webdriver.promise.Deferred.State.PENDING, k;
  this.then = function(a, b) {
    i = !0;
    var c = {callback:a, errback:b, deferred:new webdriver.promise.Deferred(g)};
    j == webdriver.promise.Deferred.State.PENDING ? h.push(c) : d(c);
    return c.deferred.promise
  };
  var l = this;
  this.promise = new webdriver.promise.Promise;
  this.promise.then = this.then;
  this.promise.cancel = this.cancel = g;
  this.promise.isPending = this.isPending = b;
  this.resolve = this.callback = e;
  this.reject = this.errback = f
};
goog.inherits(webdriver.promise.Deferred, webdriver.promise.Promise);
webdriver.promise.Deferred.State = {REJECTED:-1, PENDING:0, RESOLVED:1};
webdriver.promise.isPromise = function(a) {
  return!!a && goog.isObject(a) && goog.isFunction(a.then)
};
webdriver.promise.delayed = function(a) {
  var b, c = new webdriver.promise.Deferred(function() {
    clearTimeout(b)
  });
  b = setTimeout(c.resolve, a);
  return c.promise
};
webdriver.promise.resolved = function(a) {
  var b = new webdriver.promise.Deferred;
  b.resolve(a);
  return b.promise
};
webdriver.promise.rejected = function(a) {
  var b = new webdriver.promise.Deferred;
  b.reject(a);
  return b.promise
};
webdriver.promise.checkedNodeCall = function(a) {
  var b = new webdriver.promise.Deferred(function() {
    throw Error("This Deferred may not be cancelled");
  }), c = !1;
  try {
    a(function(a, d) {
      c || (c = !0, a ? b.reject(a) : b.resolve(d))
    })
  }catch(d) {
    c || (c = !0, b.reject(d))
  }
  return b.promise
};
webdriver.promise.when = function(a, b, c) {
  if(a instanceof webdriver.promise.Promise) {
    return a.then(b, c)
  }
  var d = new webdriver.promise.Deferred(function() {
    throw Error("This Deferred may not be cancelled");
  });
  webdriver.promise.asap(a, d.resolve, d.reject);
  return d.then(b, c)
};
webdriver.promise.asap = function(a, b, c) {
  webdriver.promise.isPromise(a) ? a.then(b, c) : a && goog.isObject(a) && goog.isFunction(a.addCallbacks) ? a.addCallbacks(b, c) : b && b(a)
};
webdriver.promise.fullyResolved = function(a) {
  return webdriver.promise.isPromise(a) ? webdriver.promise.when(a, webdriver.promise.fullyResolveValue_) : webdriver.promise.fullyResolveValue_(a)
};
webdriver.promise.fullyResolveValue_ = function(a) {
  switch(goog.typeOf(a)) {
    case "array":
      return webdriver.promise.fullyResolveKeys_(a, a.length, function(a, c, d) {
        for(var e = a.length, f = 0;f < e;++f) {
          c.call(d, a[f], f, a)
        }
      });
    case "object":
      return webdriver.promise.isPromise(a) ? a : goog.isNumber(a.nodeType) ? webdriver.promise.resolved(a) : webdriver.promise.fullyResolveKeys_(a, goog.object.getKeys(a).length, goog.object.forEach);
    default:
      return webdriver.promise.resolved(a)
  }
};
webdriver.promise.fullyResolveKeys_ = function(a, b, c) {
  if(!b) {
    return webdriver.promise.resolved(a)
  }
  var d = 0, e = !1, f = !1, g = new webdriver.promise.Deferred(function() {
    f = !0
  });
  c(a, function(c, i) {
    function j() {
      ++d == b && !f && g.resolve(a)
    }
    if(!f) {
      var k = goog.typeOf(c);
      if("array" != k && "object" != k) {
        return j()
      }
      webdriver.promise.fullyResolved(c).then(function(b) {
        a[i] = b;
        j()
      }, function(a) {
        !e && !f && (e = !0, g.reject(a))
      })
    }
  });
  return g.promise
};
webdriver.promise.Application = function() {
  webdriver.EventEmitter.call(this);
  this.history_ = []
};
goog.inherits(webdriver.promise.Application, webdriver.EventEmitter);
goog.addSingletonGetter(webdriver.promise.Application);
webdriver.promise.Application.EventType = {IDLE:"idle", SCHEDULE_TASK:"scheduleTask", UNCAUGHT_EXCEPTION:"uncaughtException"};
webdriver.promise.Application.EVENT_LOOP_FREQUENCY = 10;
webdriver.promise.Application.prototype.activeFrame_ = null;
webdriver.promise.Application.prototype.schedulingFrame_ = null;
webdriver.promise.Application.prototype.shutdownId_ = null;
webdriver.promise.Application.prototype.eventLoopId_ = null;
webdriver.promise.Application.prototype.pendingRejections_ = 0;
webdriver.promise.Application.prototype.pendingTasks_ = 0;
webdriver.promise.Application.prototype.reset = function() {
  this.activeFrame_ = null;
  this.clearHistory();
  this.removeAllListeners();
  this.cancelShutdown_();
  this.cancelEventLoop_()
};
webdriver.promise.Application.prototype.getHistory = function() {
  return this.history_.join("\n")
};
webdriver.promise.Application.prototype.clearHistory = function() {
  this.history_ = []
};
webdriver.promise.Application.prototype.getSchedule = function() {
  return this.activeFrame_ ? this.activeFrame_.getRoot().toString() : "[]"
};
webdriver.promise.Application.prototype.schedule = function(a, b) {
  this.cancelShutdown_();
  this.activeFrame_ || (this.activeFrame_ = new webdriver.promise.Application.Frame);
  var c = new webdriver.promise.Application.Task(b, a);
  (this.schedulingFrame_ || this.activeFrame_).addChild(c);
  this.emit(webdriver.promise.Application.EventType.SCHEDULE_TASK);
  this.scheduleEventLoopStart_();
  return c.promise
};
webdriver.promise.Application.prototype.scheduleAndWaitForIdle = function(a, b) {
  function c() {
    g = setTimeout(function() {
      f.removeListener(webdriver.promise.Application.EventType.SCHEDULE_TASK, d);
      f.removeListener(webdriver.promise.Application.EventType.UNCAUGHT_EXCEPTION, e);
      f.waitingForIdle_ = null;
      h.resolve()
    }, 0);
    f.once(webdriver.promise.Application.EventType.SCHEDULE_TASK, d)
  }
  function d() {
    clearTimeout(g);
    f.once(webdriver.promise.Application.EventType.IDLE, c)
  }
  function e(a) {
    clearTimeout(g);
    f.removeListener(webdriver.promise.Application.EventType.IDLE, c);
    f.removeListener(webdriver.promise.Application.EventType.SCHEDULE_TASK, d);
    setTimeout(function() {
      f.waitingForIdle_ = null;
      h.reject(a)
    }, 0)
  }
  if(this.waitingForIdle_) {
    throw Error("Whoops! It looks like another task is already waiting this application to go idle: " + this.waitingForIdle_);
  }
  this.waitingForIdle_ = a;
  var f = this, g, h = new webdriver.promise.Deferred(function() {
    f.waitingForIdle_ = null;
    clearTimeout(g);
    f.removeListener(webdriver.promise.Application.EventType.IDLE, c);
    f.removeListener(webdriver.promise.Application.EventType.SCHEDULE_TASK, d);
    f.removeListener(webdriver.promise.Application.EventType.UNCAUGHT_EXCEPTION, e)
  });
  f.schedule(a, b);
  f.once(webdriver.promise.Application.EventType.IDLE, c);
  f.once(webdriver.promise.Application.EventType.UNCAUGHT_EXCEPTION, e);
  return h.promise
};
webdriver.promise.Application.prototype.scheduleTimeout = function(a, b) {
  return this.schedule(a, function() {
    return webdriver.promise.delayed(b)
  })
};
webdriver.promise.Application.prototype.scheduleWait = function(a, b, c, d) {
  var e = Math.min(c, 100), f = this;
  return this.schedule(a, function() {
    function a() {
      var k = f.runInNewFrame_(b);
      return webdriver.promise.when(k, function(b) {
        var f = goog.now() - h;
        b ? (j.isWaiting = !1, i.resolve(b)) : f >= c ? i.reject(Error((d ? d + "\n" : "") + "Wait timed out after " + f + "ms")) : setTimeout(a, e)
      }, i.reject)
    }
    var h = goog.now(), i = new webdriver.promise.Deferred, j = f.activeFrame_;
    j.isWaiting = !0;
    a();
    return i.promise
  })
};
webdriver.promise.Application.prototype.scheduleEventLoopStart_ = function() {
  this.eventLoopId_ || (this.eventLoopId_ = setInterval(goog.bind(this.runEventLoop_, this), webdriver.promise.Application.EVENT_LOOP_FREQUENCY))
};
webdriver.promise.Application.prototype.cancelEventLoop_ = function() {
  this.eventLoopId_ && (clearInterval(this.eventLoopId_), this.eventLoopId_ = null)
};
webdriver.promise.Application.prototype.runEventLoop_ = function() {
  if(!this.pendingRejections_) {
    if(this.activeFrame_) {
      var a;
      if(!this.activeFrame_.getPendingTask() && (a = this.getNextTask_())) {
        this.history_.push(Array(this.pendingTasks_ + 1).join("..") + a.description);
        var b = this.activeFrame_;
        b.setPendingTask(a);
        var c = goog.bind(function() {
          this.pendingTasks_--;
          b.setPendingTask(null)
        }, this);
        this.pendingTasks_++;
        var d = this.runInNewFrame_(a.execute, !0);
        webdriver.promise.asap(d, function(b) {
          c();
          a.resolve(b)
        }, function(b) {
          c();
          a.reject(b)
        })
      }
    }else {
      this.commenceShutdown_()
    }
  }
};
webdriver.promise.Application.prototype.getNextTask_ = function() {
  var a = this.activeFrame_.getFirstChild();
  if(!a) {
    return this.activeFrame_.isWaiting || this.resolveFrame_(this.activeFrame_), null
  }
  if(a instanceof webdriver.promise.Application.Frame) {
    return this.activeFrame_ = a, this.getNextTask_()
  }
  a.getParent().removeChild(a);
  return a
};
webdriver.promise.Application.prototype.resolveFrame_ = function(a) {
  this.activeFrame_ === a && (this.activeFrame_ = a.getParent());
  a.getParent() && a.getParent().removeChild(a);
  a.resolve();
  this.activeFrame_ || this.commenceShutdown_()
};
webdriver.promise.Application.prototype.abortFrame_ = function(a) {
  if(this.activeFrame_) {
    var b = this.activeFrame_.getParent();
    b && b.removeChild(this.activeFrame_);
    var c = this.activeFrame_;
    this.activeFrame_ = b;
    c.reject(a)
  }else {
    this.abortNow_(a)
  }
};
webdriver.promise.Application.prototype.runInNewFrame_ = function(a, b) {
  function c() {
    var a = d.getParent();
    a && a.removeChild(d);
    e.activeFrame_ = f
  }
  var d = new webdriver.promise.Application.Frame, e = this, f = this.activeFrame_;
  try {
    this.activeFrame_ ? this.activeFrame_.addChild(d) : this.activeFrame_ = d;
    b && (this.activeFrame_ = d);
    try {
      this.schedulingFrame_ = d;
      var g = a()
    }finally {
      this.schedulingFrame_ = null
    }
    d.lockFrame();
    return!d.children_.length ? (c(), g) : d.then(function() {
      return g
    }, function(a) {
      if(g instanceof webdriver.promise.Promise && g.isPending()) {
        g.cancel(a);
        return g
      }
      throw a;
    })
  }catch(h) {
    return c(), webdriver.promise.rejected(h)
  }
};
webdriver.promise.Application.prototype.commenceShutdown_ = function() {
  if(!this.shutdownId_) {
    this.cancelEventLoop_();
    var a = this;
    a.shutdownId_ = setTimeout(function() {
      a.shutdownId_ = null;
      a.emit(webdriver.promise.Application.EventType.IDLE)
    }, 0)
  }
};
webdriver.promise.Application.prototype.cancelShutdown_ = function() {
  this.shutdownId_ && (clearTimeout(this.shutdownId_), this.shutdownId_ = null)
};
webdriver.promise.Application.prototype.abortNow_ = function(a) {
  this.activeFrame_ = null;
  this.cancelShutdown_();
  this.cancelEventLoop_();
  this.listeners(webdriver.promise.Application.EventType.UNCAUGHT_EXCEPTION).length ? this.emit(webdriver.promise.Application.EventType.UNCAUGHT_EXCEPTION, a) : setTimeout(function() {
    throw a;
  }, 0)
};
webdriver.promise.Application.Node = function() {
  webdriver.promise.Deferred.call(this)
};
goog.inherits(webdriver.promise.Application.Node, webdriver.promise.Deferred);
webdriver.promise.Application.Node.prototype.parent_ = null;
webdriver.promise.Application.Node.prototype.getParent = function() {
  return this.parent_
};
webdriver.promise.Application.Node.prototype.setParent = function(a) {
  this.parent_ = a
};
webdriver.promise.Application.Node.prototype.getRoot = function() {
  for(var a = this;a.parent_;) {
    a = a.parent_
  }
  return a
};
webdriver.promise.Application.Frame = function() {
  webdriver.promise.Application.Node.call(this);
  this.children_ = []
};
goog.inherits(webdriver.promise.Application.Frame, webdriver.promise.Application.Node);
webdriver.promise.Application.Frame.prototype.pendingTask_ = null;
webdriver.promise.Application.Frame.prototype.isActive_ = !1;
webdriver.promise.Application.Frame.prototype.isLocked_ = !1;
webdriver.promise.Application.Frame.prototype.lastInsertedChild_ = null;
webdriver.promise.Application.Frame.prototype.getPendingTask = function() {
  return this.pendingTask_
};
webdriver.promise.Application.Frame.prototype.setPendingTask = function(a) {
  this.pendingTask_ = a
};
webdriver.promise.Application.Frame.prototype.lockFrame = function() {
  this.isLocked_ = !0
};
webdriver.promise.Application.Frame.prototype.addChild = function(a) {
  if(this.lastInsertedChild_ && this.lastInsertedChild_ instanceof webdriver.promise.Application.Frame && !this.lastInsertedChild_.isLocked_) {
    this.lastInsertedChild_.addChild(a)
  }else {
    if(a.setParent(this), this.isActive_ && a instanceof webdriver.promise.Application.Frame) {
      var b = 0;
      this.lastInsertedChild_ instanceof webdriver.promise.Application.Frame && (b = goog.array.indexOf(this.children_, this.lastInsertedChild_) + 1);
      goog.array.insertAt(this.children_, a, b);
      this.lastInsertedChild_ = a
    }else {
      this.lastInsertedChild_ = a, this.children_.push(a)
    }
  }
};
webdriver.promise.Application.Frame.prototype.getFirstChild = function() {
  this.isActive_ = !0;
  return this.children_[0]
};
webdriver.promise.Application.Frame.prototype.removeChild = function(a) {
  var b = goog.array.indexOf(this.children_, a);
  a.setParent(null);
  goog.array.removeAt(this.children_, b);
  this.lastInsertedChild_ === a && (this.lastInsertedChild_ = null)
};
webdriver.promise.Application.Frame.prototype.toString = function() {
  return"[" + goog.array.map(this.children_, function(a) {
    return a.toString()
  }).join(",") + "]"
};
webdriver.promise.Application.Task = function(a, b) {
  webdriver.promise.Application.Node.call(this);
  this.execute = a;
  this.description = b || "(anonymous task)"
};
goog.inherits(webdriver.promise.Application.Task, webdriver.promise.Application.Node);
webdriver.promise.Application.Task.prototype.toString = function() {
  return this.description
};
safaridriver.extension.commands = {};
safaridriver.extension.commands.LOG_ = goog.debug.Logger.getLogger("safaridriver.extension.commands");
safaridriver.extension.commands.describeSession = function(a) {
  return a.getCapabilities()
};
safaridriver.extension.commands.closeTab = function(a) {
  a.getCommandTab().getBrowserTab().close()
};
safaridriver.extension.commands.getWindowHandle = function(a) {
  return a.getCommandTab().getId()
};
safaridriver.extension.commands.getWindowHandles = function(a) {
  return a.getTabIds()
};
safaridriver.extension.commands.getCurrentUrl = function(a) {
  var b = new webdriver.promise.Deferred;
  a.getCommandTab().whenReady(function(a) {
    b.resolve(a.url)
  });
  return b.promise
};
safaridriver.extension.commands.getTitle = function(a) {
  var b = new webdriver.promise.Deferred;
  a.getCommandTab().whenReady(function(a) {
    b.resolve(a.title)
  });
  return b.promise
};
safaridriver.extension.commands.loadUrl = function(a, b) {
  var c = b.getParameter("url");
  if(!c) {
    throw Error('Invalid command: missing "url" parameter');
  }
  var d = new goog.Uri(c);
  if("file" === d.getScheme()) {
    throw Error("Unsupported URL protocol: " + c);
  }
  var e = new webdriver.promise.Deferred;
  a.getCommandTab().whenReady(function(c) {
    function g() {
      e.isPending() && (c.removeEventListener("navigate", g, !1), safaridriver.extension.commands.LOG_.info("Page load finished; returning: " + c.url), e.resolve())
    }
    var h = a.getCommandTab().loadsNewPage(d);
    h && c.addEventListener("navigate", g, !1);
    safaridriver.extension.commands.sendCommand(a, b).then(function() {
      !h && e.isPending() && (safaridriver.extension.commands.LOG_.info("Not expecting a new page load; returning"), e.resolve())
    }, function(a) {
      e.isPending() && (safaridriver.extension.commands.LOG_.severe("Error while loading page; failing", a), c.removeEventListener("navigate", g, !1), e.reject(a))
    })
  });
  return e.promise
};
safaridriver.extension.commands.refresh = function(a, b) {
  var c = new webdriver.promise.Deferred;
  a.getCommandTab().whenReady(function(d) {
    function e() {
      c.isPending() && (d.removeEventListener("navigate", e, !1), c.resolve())
    }
    d.addEventListener("navigate", e, !1);
    safaridriver.extension.commands.sendCommand(a, b).addErrback(function(a) {
      c.isPending() && (d.removeEventListener("navigate", e, !1), c.reject(a))
    })
  });
  return c.promise
};
safaridriver.extension.commands.implicitlyWait = function(a, b) {
  a.setImplicitWait(b.getParameter("ms") || 0)
};
safaridriver.extension.commands.setScriptTimeout = function(a, b) {
  a.setScriptTimeout(b.getParameter("ms") || 0)
};
safaridriver.extension.commands.findElement = function(a, b) {
  function c() {
    goog.isDef(e) || (e = goog.now());
    return safaridriver.extension.commands.sendCommand(a, b).then(d)
  }
  function d(d) {
    var h = d.value;
    (!h || !h.length) && 0 < a.getImplicitWait() && goog.now() - e < a.getImplicitWait() ? c() : h ? f.resolve(d) : (d = new bot.Error(bot.ErrorCode.NO_SUCH_ELEMENT, "Could not find element: " + JSON.stringify(b.getParameters())), f.reject(d))
  }
  var e, f = new webdriver.promise.Deferred;
  a.getCommandTab().whenReady(c);
  return f.promise
};
safaridriver.extension.commands.DEFAULT_COMMAND_TIMEOUT_ = 3E4;
safaridriver.extension.commands.sendCommand = function(a, b, c) {
  c = (c || 0) + safaridriver.extension.commands.DEFAULT_COMMAND_TIMEOUT_;
  return(a instanceof safaridriver.extension.Tab ? a : a.getCommandTab()).send(b, c)
};
safaridriver.extension.commands.switchToWindow = function(a, b) {
  var c = b.getParameter("name");
  if(!c) {
    throw Error('Invalid command: missing required parameter "name"');
  }
  var d = a.getTab(c);
  if(!d) {
    throw new bot.Error(bot.ErrorCode.NO_SUCH_WINDOW, "No such window: " + c);
  }
  a.setCommandTab(d)
};
safaridriver.extension.commands.switchToFrame = function(a, b) {
  if(null !== b.getParameter("id")) {
    throw Error("Unimplemented command: " + b.getName());
  }
};
safaridriver.extension.commands.sendWindowCommand = function(a, b) {
  var c = b.getParameter("windowHandle"), d;
  if("current" === c) {
    d = a.getCommandTab()
  }else {
    if(!(d = a.getTab(c))) {
      throw new bot.Error(bot.ErrorCode.NO_SUCH_WINDOW, "No such window: " + c);
    }
  }
  return safaridriver.extension.commands.sendCommand(d, b)
};
safaridriver.extension.commands.executeAsyncScript = function(a, b) {
  var c = a.getScriptTimeout();
  b.setParameter("timeout", c);
  return safaridriver.extension.commands.sendCommand(a, b, c)
};
goog.disposable = {};
goog.disposable.IDisposable = function() {
};
goog.Disposable = function() {
  goog.Disposable.ENABLE_MONITORING && (goog.Disposable.instances_[goog.getUid(this)] = this)
};
goog.Disposable.ENABLE_MONITORING = !1;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
  var a = [], b;
  for(b in goog.Disposable.instances_) {
    goog.Disposable.instances_.hasOwnProperty(b) && a.push(goog.Disposable.instances_[Number(b)])
  }
  return a
};
goog.Disposable.clearUndisposedObjects = function() {
  goog.Disposable.instances_ = {}
};
goog.Disposable.prototype.disposed_ = !1;
goog.Disposable.prototype.isDisposed = function() {
  return this.disposed_
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
  if(!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.ENABLE_MONITORING)) {
    var a = goog.getUid(this);
    if(!goog.Disposable.instances_.hasOwnProperty(a)) {
      throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
    }
    delete goog.Disposable.instances_[a]
  }
};
goog.Disposable.prototype.registerDisposable = function(a) {
  this.dependentDisposables_ || (this.dependentDisposables_ = []);
  this.dependentDisposables_.push(a)
};
goog.Disposable.prototype.disposeInternal = function() {
  this.dependentDisposables_ && goog.disposeAll.apply(null, this.dependentDisposables_)
};
goog.dispose = function(a) {
  a && "function" == typeof a.dispose && a.dispose()
};
goog.disposeAll = function(a) {
  for(var b = 0, c = arguments.length;b < c;++b) {
    var d = arguments[b];
    goog.isArrayLike(d) ? goog.disposeAll.apply(null, d) : goog.dispose(d)
  }
};
safaridriver.extension.Server = function(a) {
  goog.Disposable.call(this);
  this.log_ = goog.debug.Logger.getLogger("safaridriver.extension.Server");
  this.session_ = a;
  this.ready_ = new webdriver.promise.Deferred
};
goog.inherits(safaridriver.extension.Server, goog.Disposable);
safaridriver.extension.Server.COMMAND_MAP_ = {};
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.NEW_SESSION] = safaridriver.extension.commands.describeSession;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.DESCRIBE_SESSION] = safaridriver.extension.commands.describeSession;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.QUIT] = goog.nullFunction;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.CLOSE] = safaridriver.extension.commands.closeTab;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_CURRENT_WINDOW_HANDLE] = safaridriver.extension.commands.getWindowHandle;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_WINDOW_HANDLES] = safaridriver.extension.commands.getWindowHandles;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_CURRENT_URL] = safaridriver.extension.commands.getCurrentUrl;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_TITLE] = safaridriver.extension.commands.getTitle;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_PAGE_SOURCE] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET] = safaridriver.extension.commands.loadUrl;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.REFRESH] = safaridriver.extension.commands.refresh;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GO_BACK] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GO_FORWARD] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GO_BACK] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.ADD_COOKIE] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ALL_COOKIES] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.DELETE_ALL_COOKIES] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.DELETE_COOKIE] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.IMPLICITLY_WAIT] = safaridriver.extension.commands.implicitlyWait;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.FIND_ELEMENT] = safaridriver.extension.commands.findElement;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.FIND_ELEMENTS] = safaridriver.extension.commands.findElement;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.FIND_CHILD_ELEMENT] = safaridriver.extension.commands.findElement;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.FIND_CHILD_ELEMENTS] = safaridriver.extension.commands.findElement;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ACTIVE_ELEMENT] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.CLEAR_ELEMENT] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.CLICK_ELEMENT] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SUBMIT_ELEMENT] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ELEMENT_TEXT] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ELEMENT_TAG_NAME] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.IS_ELEMENT_SELECTED] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.IS_ELEMENT_ENABLED] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.IS_ELEMENT_DISPLAYED] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ELEMENT_LOCATION] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ELEMENT_SIZE] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ELEMENT_ATTRIBUTE] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ELEMENT_VALUE_OF_CSS_PROPERTY] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.ELEMENT_EQUALS] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SEND_KEYS_TO_ELEMENT] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.CLICK] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.DOUBLE_CLICK] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.MOUSE_DOWN] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.MOUSE_UP] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.MOVE_TO] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SEND_KEYS_TO_SESSION] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SWITCH_TO_FRAME] = safaridriver.extension.commands.switchToFrame;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SWITCH_TO_WINDOW] = safaridriver.extension.commands.switchToWindow;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SET_WINDOW_SIZE] = safaridriver.extension.commands.sendWindowCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SET_WINDOW_POSITION] = safaridriver.extension.commands.sendWindowCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_WINDOW_SIZE] = safaridriver.extension.commands.sendWindowCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_WINDOW_POSITION] = safaridriver.extension.commands.sendWindowCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.EXECUTE_SCRIPT] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.EXECUTE_ASYNC_SCRIPT] = safaridriver.extension.commands.executeAsyncScript;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SET_SCRIPT_TIMEOUT] = safaridriver.extension.commands.setScriptTimeout;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SCREENSHOT] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.prototype.webSocket_ = null;
safaridriver.extension.Server.prototype.disposeInternal = function() {
  this.logMessage_("Disposing of server", goog.debug.Logger.Level.FINE);
  this.webSocket_ && (this.ready_.isPending() && this.ready_.cancel(Error("Server has been disposed")), this.webSocket_.close());
  delete this.log_;
  delete this.session_;
  delete this.ready_;
  delete this.webSocket_;
  safaridriver.extension.Server.superClass_.disposeInternal.call(this)
};
safaridriver.extension.Server.prototype.getSession = function() {
  return this.session_
};
safaridriver.extension.Server.prototype.connect = function(a) {
  if(this.isDisposed()) {
    throw Error("This server has been disposed!");
  }
  if(this.webSocket_) {
    throw Error("This server has already connected!");
  }
  this.logMessage_("Connecting to " + a);
  this.webSocket_ = new WebSocket(a);
  this.webSocket_.onopen = goog.bind(this.onOpen_, this);
  this.webSocket_.onclose = goog.bind(this.onClose_, this);
  this.webSocket_.onmessage = goog.bind(this.onMessage_, this);
  this.webSocket_.onerror = goog.bind(this.onError_, this);
  return this.ready_.promise
};
safaridriver.extension.Server.prototype.execute = function(a, b) {
  var c = safaridriver.extension.Server.COMMAND_MAP_[a.getName()];
  if(!c) {
    return this.logMessage_("Unknown command: " + a.getName(), goog.debug.Logger.Level.SEVERE), webdriver.promise.rejected(webdriver.error.createResponse(Error("Unknown command: " + a.getName())))
  }
  this.logMessage_("Scheduling command: " + a.getName());
  var d = this.session_.getId() + "::" + a.getName(), d = webdriver.promise.Application.getInstance().schedule(d, goog.bind(function() {
    this.logMessage_("Executing command: " + a.getName());
    return c(this.session_, a)
  }, this)).then(function(a) {
    return webdriver.error.isResponseObject(a) ? a : {status:bot.ErrorCode.SUCCESS, value:a}
  }, webdriver.error.createResponse);
  b && d.then(webdriver.error.checkResponse).then(goog.partial(b, null), b);
  return d
};
safaridriver.extension.Server.prototype.logMessage_ = function(a, b) {
  this.log_.log(b || goog.debug.Logger.Level.INFO, "[" + this.session_.getId() + "] " + a)
};
safaridriver.extension.Server.prototype.onOpen_ = function() {
  this.logMessage_("WebSocket connection established.");
  !this.isDisposed() && this.ready_.isPending() && this.ready_.resolve()
};
safaridriver.extension.Server.prototype.onClose_ = function() {
  this.logMessage_("WebSocket connection was closed.", goog.debug.Logger.Level.WARNING);
  this.isDisposed() || (this.ready_.isPending() && this.ready_.reject(Error("Failed to connect")), this.dispose())
};
safaridriver.extension.Server.prototype.onError_ = function(a) {
  this.logMessage_("There was an error in the WebSocket: " + a.data, goog.debug.Logger.Level.SEVERE)
};
safaridriver.extension.Server.prototype.onMessage_ = function(a) {
  function b(a, b) {
    if(!goog.object.containsKey(a, b)) {
      throw Error('Invalid command: missing "' + b + '" key');
    }
  }
  this.logMessage_("Received a message: " + a.data);
  try {
    var c = JSON.parse(a.data);
    b(c, "id");
    b(c, "name")
  }catch(d) {
    this.send_(null, webdriver.error.createResponse(d));
    return
  }
  var e = new safaridriver.Command(c.id, c.name, c.parameters || {});
  this.execute(e).addCallback(function(a) {
    this.send_(e, a)
  }, this)
};
safaridriver.extension.Server.prototype.send_ = function(a, b) {
  a && (b.id = a.id);
  var c = JSON.stringify(b);
  this.logMessage_("Sending response: " + c);
  !a && b.status === bot.ErrorCode.SUCCESS && this.logMessage_("Sending success response with a null command: " + c, goog.debug.Logger.Level.WARNING);
  this.webSocket_.send(c)
};
goog.userAgent.product = {};
goog.userAgent.product.ASSUME_FIREFOX = !1;
goog.userAgent.product.ASSUME_CAMINO = !1;
goog.userAgent.product.ASSUME_IPHONE = !1;
goog.userAgent.product.ASSUME_IPAD = !1;
goog.userAgent.product.ASSUME_ANDROID = !1;
goog.userAgent.product.ASSUME_CHROME = !1;
goog.userAgent.product.ASSUME_SAFARI = !0;
goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_CAMINO || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
goog.userAgent.product.init_ = function() {
  goog.userAgent.product.detectedFirefox_ = !1;
  goog.userAgent.product.detectedCamino_ = !1;
  goog.userAgent.product.detectedIphone_ = !1;
  goog.userAgent.product.detectedIpad_ = !1;
  goog.userAgent.product.detectedAndroid_ = !1;
  goog.userAgent.product.detectedChrome_ = !1;
  goog.userAgent.product.detectedSafari_ = !1;
  var a = goog.userAgent.getUserAgentString();
  a && (-1 != a.indexOf("Firefox") ? goog.userAgent.product.detectedFirefox_ = !0 : -1 != a.indexOf("Camino") ? goog.userAgent.product.detectedCamino_ = !0 : -1 != a.indexOf("iPhone") || -1 != a.indexOf("iPod") ? goog.userAgent.product.detectedIphone_ = !0 : -1 != a.indexOf("iPad") ? goog.userAgent.product.detectedIpad_ = !0 : -1 != a.indexOf("Android") ? goog.userAgent.product.detectedAndroid_ = !0 : -1 != a.indexOf("Chrome") ? goog.userAgent.product.detectedChrome_ = !0 : -1 != a.indexOf("Safari") && 
  (goog.userAgent.product.detectedSafari_ = !0))
};
goog.userAgent.product.PRODUCT_KNOWN_ || goog.userAgent.product.init_();
goog.userAgent.product.OPERA = goog.userAgent.OPERA;
goog.userAgent.product.IE = goog.userAgent.IE;
goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.userAgent.product.detectedFirefox_;
goog.userAgent.product.CAMINO = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CAMINO : goog.userAgent.product.detectedCamino_;
goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.detectedIphone_;
goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.userAgent.product.detectedIpad_;
goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.userAgent.product.detectedAndroid_;
goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.userAgent.product.detectedChrome_;
goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.detectedSafari_;
goog.userAgent.product.determineVersion_ = function() {
  var a = "", b, c;
  if(goog.userAgent.product.FIREFOX) {
    b = /Firefox\/([0-9.]+)/
  }else {
    if(goog.userAgent.product.IE || goog.userAgent.product.OPERA) {
      return goog.userAgent.VERSION
    }
    goog.userAgent.product.CHROME ? b = /Chrome\/([0-9.]+)/ : goog.userAgent.product.SAFARI ? b = /Version\/([0-9.]+)/ : goog.userAgent.product.IPHONE || goog.userAgent.product.IPAD ? (b = /Version\/(\S+).*Mobile\/(\S+)/, c = !0) : goog.userAgent.product.ANDROID ? b = /Android\s+([0-9.]+)(?:.*Version\/([0-9.]+))?/ : goog.userAgent.product.CAMINO && (b = /Camino\/([0-9.]+)/)
  }
  b && (a = (a = b.exec(goog.userAgent.getUserAgentString())) ? c ? a[1] + "." + a[2] : a[2] || a[1] : "");
  return a
};
goog.userAgent.product.VERSION = goog.userAgent.product.determineVersion_();
goog.userAgent.product.isVersion = function(a) {
  return 0 <= goog.string.compareVersions(goog.userAgent.product.VERSION, a)
};
webdriver.Session = function(a, b) {
  this.id = a;
  this.capabilities = b
};
webdriver.Session.prototype.getId = function() {
  return this.id
};
webdriver.Session.prototype.getCapabilities = function() {
  return this.capabilities
};
webdriver.Session.prototype.getCapability = function(a) {
  return this.capabilities[a]
};
webdriver.Session.prototype.toJSON = function() {
  return this.id
};
safaridriver.extension.Session = function(a) {
  webdriver.Session.call(this, goog.string.getRandomString(), safaridriver.extension.Session.CAPABILITIES);
  this.log_ = goog.debug.Logger.getLogger("safaridriver.extension.Session");
  this.tabManager_ = a
};
goog.inherits(safaridriver.extension.Session, webdriver.Session);
safaridriver.extension.Session.CAPABILITIES = {browserName:"safari", version:goog.userAgent.product.VERSION, platform:goog.userAgent.MAC ? "MAC" : "WINDOWS", javascriptEnabled:!0, takesScreenshot:!0, cssSelectorsEnabled:!0};
safaridriver.extension.Session.prototype.implicitWait_ = 0;
safaridriver.extension.Session.prototype.scriptTimeout_ = 0;
safaridriver.extension.Session.prototype.getCommandTab = function() {
  return this.tabManager_.getCommandTab()
};
safaridriver.extension.Session.prototype.setCommandTab = function(a) {
  this.tabManager_.setCommandTab(a)
};
safaridriver.extension.Session.prototype.getTab = function(a) {
  return this.tabManager_.getTab(a)
};
safaridriver.extension.Session.prototype.getTabIds = function() {
  return this.tabManager_.getIds()
};
safaridriver.extension.Session.prototype.getImplicitWait = function() {
  return this.implicitWait_
};
safaridriver.extension.Session.prototype.setImplicitWait = function(a) {
  this.implicitWait_ = a
};
safaridriver.extension.Session.prototype.getScriptTimeout = function() {
  return this.scriptTimeout_
};
safaridriver.extension.Session.prototype.setScriptTimeout = function(a) {
  this.scriptTimeout_ = a
};
safaridriver.extension.TabManager = function() {
  this.tabs_ = [];
  this.log_ = goog.debug.Logger.getLogger("safaridriver.extension.TabManager");
  safari.application.addEventListener("open", goog.bind(this.onOpen_, this), !0);
  safari.application.addEventListener("open", goog.bind(this.onClose_, this), !0);
  this.init_()
};
safaridriver.extension.TabManager.prototype.commandTab_ = null;
safaridriver.extension.TabManager.prototype.init_ = function() {
  var a = null;
  safari.application.browserWindows.forEach(function(b) {
    var c = safari.application.activeBrowserWindow === b;
    b.tabs.forEach(function(b) {
      c && safari.application.activeBrowserWindow.activeTab === b ? a = this.getTab(b) : b.close()
    }, this)
  }, this);
  a && this.setCommandTab(a)
};
safaridriver.extension.TabManager.prototype.setCommandTab = function(a) {
  a === this.commandTab_ ? this.log_.warning("Unnecessarily resetting the focused tab!") : (this.commandTab_ = a, this.log_.info("Set command tab to " + a.getId()), a = a.getBrowserTab(), a.browserWindow !== safari.application.activeBrowserWindow && a.browserWindow.activate(), a !== a.browserWindow.activeTab && a.activate())
};
safaridriver.extension.TabManager.prototype.onOpen_ = function(a) {
  a.target instanceof SafariBrowserWindow ? this.log_.info("Ignoring open window event") : this.log_.info("Tab opened: " + this.getTab(a.target).getId())
};
safaridriver.extension.TabManager.prototype.onClose_ = function(a) {
  a.target instanceof SafariBrowserWindow ? this.log_.info("Ignoring close window event") : (this.commandTab_ && this.commandTab_.getBrowserTab() === a.target && (this.log_.info("The command tab has been closed: " + this.commandTab_.getId()), this.commandTab_ = null), this.log_.info("Tab closed"), this.delete_(a.target))
};
safaridriver.extension.TabManager.prototype.getTab = function(a) {
  var b = goog.isString(a), c = goog.array.find(this.tabs_, function(c) {
    return(b ? c.getId() : c.getBrowserTab()) === a
  });
  !c && !b && (this.log_.info("Registering new tab"), c = new safaridriver.extension.Tab(a), this.tabs_.push(c));
  return c
};
safaridriver.extension.TabManager.prototype.getIds = function() {
  return goog.array.map(this.tabs_, function(a) {
    return a.getId()
  })
};
safaridriver.extension.TabManager.prototype.getTabCount = function() {
  return this.tabs_.length
};
safaridriver.extension.TabManager.prototype.delete_ = function(a) {
  var b = goog.array.findIndex(this.tabs_, function(b) {
    return b.getBrowserTab() === a
  });
  0 > b ? this.log_.warning("Attempting to delete an unknown tab.") : (this.log_.info("Deleting entry for tab " + this.tabs_[b].getId()), goog.array.removeAt(this.tabs_, b))
};
safaridriver.extension.TabManager.prototype.getCommandTab = function() {
  if(this.commandTab_) {
    return this.commandTab_
  }
  var a;
  a = this.getTabCount() ? "The driver is not focused on a window. You must switch to a window before proceeding." : "There are no open windows!";
  throw new bot.Error(bot.ErrorCode.NO_SUCH_WINDOW, a);
};
goog.debug.RelativeTimeProvider = function() {
  this.relativeTimeStart_ = goog.now()
};
goog.debug.RelativeTimeProvider.defaultInstance_ = new goog.debug.RelativeTimeProvider;
goog.debug.RelativeTimeProvider.prototype.set = function(a) {
  this.relativeTimeStart_ = a
};
goog.debug.RelativeTimeProvider.prototype.reset = function() {
  this.set(goog.now())
};
goog.debug.RelativeTimeProvider.prototype.get = function() {
  return this.relativeTimeStart_
};
goog.debug.RelativeTimeProvider.getDefaultInstance = function() {
  return goog.debug.RelativeTimeProvider.defaultInstance_
};
goog.debug.Formatter = function(a) {
  this.prefix_ = a || "";
  this.startTimeProvider_ = goog.debug.RelativeTimeProvider.getDefaultInstance()
};
goog.debug.Formatter.prototype.showAbsoluteTime = !0;
goog.debug.Formatter.prototype.showRelativeTime = !0;
goog.debug.Formatter.prototype.showLoggerName = !0;
goog.debug.Formatter.prototype.showExceptionText = !1;
goog.debug.Formatter.prototype.showSeverityLevel = !1;
goog.debug.Formatter.prototype.setStartTimeProvider = function(a) {
  this.startTimeProvider_ = a
};
goog.debug.Formatter.prototype.getStartTimeProvider = function() {
  return this.startTimeProvider_
};
goog.debug.Formatter.prototype.resetRelativeTimeStart = function() {
  this.startTimeProvider_.reset()
};
goog.debug.Formatter.getDateTimeStamp_ = function(a) {
  a = new Date(a.getMillis());
  return goog.debug.Formatter.getTwoDigitString_(a.getFullYear() - 2E3) + goog.debug.Formatter.getTwoDigitString_(a.getMonth() + 1) + goog.debug.Formatter.getTwoDigitString_(a.getDate()) + " " + goog.debug.Formatter.getTwoDigitString_(a.getHours()) + ":" + goog.debug.Formatter.getTwoDigitString_(a.getMinutes()) + ":" + goog.debug.Formatter.getTwoDigitString_(a.getSeconds()) + "." + goog.debug.Formatter.getTwoDigitString_(Math.floor(a.getMilliseconds() / 10))
};
goog.debug.Formatter.getTwoDigitString_ = function(a) {
  return 10 > a ? "0" + a : "" + a
};
goog.debug.Formatter.getRelativeTime_ = function(a, b) {
  var c = (a.getMillis() - b) / 1E3, d = c.toFixed(3), e = 0;
  if(1 > c) {
    e = 2
  }else {
    for(;100 > c;) {
      e++, c *= 10
    }
  }
  for(;0 < e--;) {
    d = " " + d
  }
  return d
};
goog.debug.HtmlFormatter = function(a) {
  goog.debug.Formatter.call(this, a)
};
goog.inherits(goog.debug.HtmlFormatter, goog.debug.Formatter);
goog.debug.HtmlFormatter.prototype.showExceptionText = !0;
goog.debug.HtmlFormatter.prototype.formatRecord = function(a) {
  var b;
  switch(a.getLevel().value) {
    case goog.debug.Logger.Level.SHOUT.value:
      b = "dbg-sh";
      break;
    case goog.debug.Logger.Level.SEVERE.value:
      b = "dbg-sev";
      break;
    case goog.debug.Logger.Level.WARNING.value:
      b = "dbg-w";
      break;
    case goog.debug.Logger.Level.INFO.value:
      b = "dbg-i";
      break;
    default:
      b = "dbg-f"
  }
  var c = [];
  c.push(this.prefix_, " ");
  this.showAbsoluteTime && c.push("[", goog.debug.Formatter.getDateTimeStamp_(a), "] ");
  this.showRelativeTime && c.push("[", goog.string.whitespaceEscape(goog.debug.Formatter.getRelativeTime_(a, this.startTimeProvider_.get())), "s] ");
  this.showLoggerName && c.push("[", goog.string.htmlEscape(a.getLoggerName()), "] ");
  c.push('<span class="', b, '">', goog.string.newLineToBr(goog.string.whitespaceEscape(goog.string.htmlEscape(a.getMessage()))));
  this.showExceptionText && a.getException() && c.push("<br>", goog.string.newLineToBr(goog.string.whitespaceEscape(a.getExceptionText() || "")));
  c.push("</span><br>");
  return c.join("")
};
goog.debug.TextFormatter = function(a) {
  goog.debug.Formatter.call(this, a)
};
goog.inherits(goog.debug.TextFormatter, goog.debug.Formatter);
goog.debug.TextFormatter.prototype.formatRecord = function(a) {
  var b = [];
  b.push(this.prefix_, " ");
  this.showAbsoluteTime && b.push("[", goog.debug.Formatter.getDateTimeStamp_(a), "] ");
  this.showRelativeTime && b.push("[", goog.debug.Formatter.getRelativeTime_(a, this.startTimeProvider_.get()), "s] ");
  this.showLoggerName && b.push("[", a.getLoggerName(), "] ");
  this.showSeverityLevel && b.push("[", a.getLevel().name, "] ");
  b.push(a.getMessage(), "\n");
  this.showExceptionText && a.getException() && b.push(a.getExceptionText(), "\n");
  return b.join("")
};
safaridriver.console = {};
safaridriver.console.init = function() {
  var a = new goog.debug.TextFormatter;
  a.showAbsoluteTime = !1;
  a.showExceptionText = !1;
  goog.debug.LogManager.getRoot().addHandler(function(b) {
    var c = a.formatRecord(b);
    switch(b.getLevel()) {
      case goog.debug.Logger.Level.SHOUT:
        console.group(c);
        console.groupEnd();
        break;
      case goog.debug.Logger.Level.SEVERE:
        console.error(c);
        break;
      case goog.debug.Logger.Level.WARNING:
        console.warn(c);
        break;
      case goog.debug.Logger.Level.INFO:
        console.info(c);
        break;
      default:
        console.debug(c)
    }
  })
};
webdriver.Locator = function(a, b) {
  this.using = a;
  this.value = b
};
webdriver.Locator.factory_ = function(a) {
  return function(b) {
    return new webdriver.Locator(a, b)
  }
};
webdriver.Locator.Strategy = {className:webdriver.Locator.factory_("class name"), "class name":webdriver.Locator.factory_("class name"), css:webdriver.Locator.factory_("css selector"), id:webdriver.Locator.factory_("id"), js:webdriver.Locator.factory_("js"), linkText:webdriver.Locator.factory_("link text"), "link text":webdriver.Locator.factory_("link text"), name:webdriver.Locator.factory_("name"), partialLinkText:webdriver.Locator.factory_("partial link text"), "partial link text":webdriver.Locator.factory_("partial link text"), 
tagName:webdriver.Locator.factory_("tag name"), "tag name":webdriver.Locator.factory_("tag name"), xpath:webdriver.Locator.factory_("xpath")};
goog.exportSymbol("By", webdriver.Locator.Strategy);
webdriver.Locator.createFromObj = function(a) {
  var b = goog.object.getAnyKey(a);
  if(b) {
    if(b in webdriver.Locator.Strategy) {
      return webdriver.Locator.Strategy[b](a[b])
    }
  }else {
    throw Error("No keys found in locator hash object");
  }
  throw Error("Unsupported locator strategy: " + b);
};
webdriver.Locator.checkLocator = function(a) {
  if(!a.using || !a.value) {
    a = webdriver.Locator.createFromObj(a)
  }
  return a
};
webdriver.Locator.prototype.toString = function() {
  return"By " + this.using + " (" + this.value + ")"
};
webdriver.WebDriver = function(a, b) {
  this.session_ = a;
  this.executor_ = b
};
webdriver.WebDriver.attachToSession = function(a, b) {
  return webdriver.WebDriver.acquireSession_(a, (new webdriver.Command(webdriver.CommandName.DESCRIBE_SESSION)).setParameter("sessionId", b), "WebDriver.attachToSession()")
};
webdriver.WebDriver.createSession = function(a, b) {
  return webdriver.WebDriver.acquireSession_(a, (new webdriver.Command(webdriver.CommandName.NEW_SESSION)).setParameter("desiredCapabilities", b), "WebDriver.createSession()")
};
webdriver.WebDriver.acquireSession_ = function(a, b, c) {
  var d = goog.bind(a.execute, a, b), b = webdriver.promise.Application.getInstance().schedule(c, function() {
    return webdriver.promise.checkedNodeCall(d).then(function(a) {
      webdriver.error.checkResponse(a);
      return new webdriver.Session(a.sessionId, a.value)
    })
  });
  return new webdriver.WebDriver(b, a)
};
webdriver.WebDriver.toWireValue_ = function(a) {
  switch(goog.typeOf(a)) {
    case "array":
      return webdriver.promise.fullyResolved(goog.array.map(a, webdriver.WebDriver.toWireValue_));
    case "object":
      if(goog.isFunction(a.toWireValue)) {
        return webdriver.promise.fullyResolved(a.toWireValue())
      }
      if(goog.isFunction(a.toJSON)) {
        return webdriver.promise.resolved(a.toJSON())
      }
      if(goog.isNumber(a.nodeType) && goog.isString(a.nodeName)) {
        throw Error(["Invalid argument type: ", a.nodeName, "(", a.nodeType, ")"].join(""));
      }
      return webdriver.promise.fullyResolved(goog.object.map(a, webdriver.WebDriver.toWireValue_));
    case "function":
      return webdriver.promise.resolved("" + a);
    case "undefined":
      return webdriver.promise.resolved(null);
    default:
      return webdriver.promise.resolved(a)
  }
};
webdriver.WebDriver.fromWireValue_ = function(a, b) {
  goog.isArray(b) ? b = goog.array.map(b, goog.partial(webdriver.WebDriver.fromWireValue_, a)) : b && goog.isObject(b) && (b = webdriver.WebElement.ELEMENT_KEY in b ? new webdriver.WebElement(a, b[webdriver.WebElement.ELEMENT_KEY]) : goog.object.map(b, goog.partial(webdriver.WebDriver.fromWireValue_, a)));
  return b
};
webdriver.WebDriver.prototype.schedule = function(a, b) {
  function c() {
    if(!d.session_) {
      throw Error("This driver instance does not have a valid session ID (did you call WebDriver.quit()?) and may no longer be used.");
    }
  }
  var d = this;
  c();
  a.setParameter("sessionId", this.session_);
  return webdriver.promise.Application.getInstance().schedule(b, function() {
    c();
    return webdriver.promise.fullyResolved(a.getParameters()).then(webdriver.WebDriver.toWireValue_).then(function(b) {
      a.setParameters(b);
      return webdriver.promise.checkedNodeCall(goog.bind(d.executor_.execute, d.executor_, a))
    })
  }).then(function(a) {
    webdriver.error.checkResponse(a);
    return webdriver.WebDriver.fromWireValue_(d, a.value)
  })
};
webdriver.WebDriver.prototype.getSession = function() {
  return webdriver.promise.when(this.session_)
};
webdriver.WebDriver.prototype.getCapability = function(a) {
  return webdriver.promise.when(this.session_, function(b) {
    return b.capabilities[a]
  })
};
webdriver.WebDriver.prototype.quit = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.QUIT), "WebDriver.quit()").addBoth(function() {
    delete this.session_
  }, this)
};
webdriver.WebDriver.prototype.executeScript = function(a, b) {
  goog.isFunction(a) && (a = "return (" + a + ").apply(null, arguments);");
  return this.schedule((new webdriver.Command(webdriver.CommandName.EXECUTE_SCRIPT)).setParameter("script", a).setParameter("args", goog.array.slice(arguments, 1)), "WebDriver.executeScript()")
};
webdriver.WebDriver.prototype.executeAsyncScript = function(a, b) {
  goog.isFunction(a) && (a = "return (" + a + ").apply(null, arguments);");
  return this.schedule((new webdriver.Command(webdriver.CommandName.EXECUTE_ASYNC_SCRIPT)).setParameter("script", a).setParameter("args", goog.array.slice(arguments, 1)), "WebDriver.executeScript()")
};
webdriver.WebDriver.prototype.call = function(a, b, c) {
  var d = goog.array.slice(arguments, 2);
  return webdriver.promise.Application.getInstance().schedule("WebDriver.call(" + (a.name || "function") + ")", function() {
    return webdriver.promise.fullyResolved(d).then(function(c) {
      return a.apply(b, c)
    })
  })
};
webdriver.WebDriver.prototype.wait = function(a, b, c) {
  var d = a.name || "<anonymous function>", e = c ? " (" + c + ")" : "";
  return webdriver.promise.Application.getInstance().scheduleWait("WebDriver.wait(" + d + ")" + e, a, b, c)
};
webdriver.WebDriver.prototype.sleep = function(a) {
  return webdriver.promise.Application.getInstance().scheduleTimeout("WebDriver.sleep(" + a + ")", a)
};
webdriver.WebDriver.prototype.getWindowHandle = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.GET_CURRENT_WINDOW_HANDLE), "WebDriver.getWindowHandle()")
};
webdriver.WebDriver.prototype.getAllWindowHandles = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.GET_WINDOW_HANDLES), "WebDriver.getAllWindowHandles()")
};
webdriver.WebDriver.prototype.getPageSource = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.GET_PAGE_SOURCE), "WebDriver.getAllWindowHandles()")
};
webdriver.WebDriver.prototype.close = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.CLOSE), "WebDriver.close()")
};
webdriver.WebDriver.prototype.get = function(a) {
  return this.navigate().to(a)
};
webdriver.WebDriver.prototype.getCurrentUrl = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.GET_CURRENT_URL), "WebDriver.getCurrentUrl()")
};
webdriver.WebDriver.prototype.getTitle = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.GET_TITLE), "WebDriver.getTitle()")
};
webdriver.WebDriver.prototype.findElement = function(a, b) {
  var c;
  if(1 === a.nodeType && a.ownerDocument) {
    c = this.findDomElement_(a).then(function(a) {
      if(!a.length) {
        throw new bot.Error(bot.ErrorCode.NO_SUCH_ELEMENT, "Unable to locate element. Is WebDriver focused on its ownerDocument's frame?");
      }
      return a[0]
    })
  }else {
    if(c = webdriver.Locator.checkLocator(a), "js" == c.using) {
      var d = goog.array.slice(arguments, 1);
      goog.array.splice(d, 0, 0, c.value);
      c = this.executeScript.apply(this, d).then(function(a) {
        if(!(a instanceof webdriver.WebElement)) {
          throw Error("JS locator script result was not a WebElement");
        }
        return a
      })
    }else {
      c = this.schedule((new webdriver.Command(webdriver.CommandName.FIND_ELEMENT)).setParameter("using", c.using).setParameter("value", c.value), "WebDriver.findElement(" + c + ")")
    }
  }
  return new webdriver.WebElement(this, c)
};
webdriver.WebDriver.prototype.findDomElement_ = function(a) {
  function b() {
    delete d[e]
  }
  var c = a.ownerDocument, d = c.$webdriver$ = c.$webdriver$ || {}, e = Math.floor(Math.random() * goog.now()).toString(36);
  d[e] = a;
  a[e] = e;
  return this.executeScript(function(a) {
    var b = document.$webdriver$;
    if(!b) {
      return null
    }
    b = b[a];
    return!b || b[a] !== a ? [] : [b]
  }, e).then(function(a) {
    b();
    if(a.length && !(a[0] instanceof webdriver.WebElement)) {
      throw Error("JS locator script result was not a WebElement");
    }
    return a
  }, b)
};
webdriver.WebDriver.prototype.isElementPresent = function(a, b) {
  return(1 === a.nodeType && a.ownerDocument ? this.findDomElement_(a) : this.findElements.apply(this, arguments)).then(function(a) {
    return!!a.length
  })
};
webdriver.WebDriver.prototype.findElements = function(a, b) {
  a = webdriver.Locator.checkLocator(a);
  if("js" == a.using) {
    var c = goog.array.slice(arguments, 1);
    goog.array.splice(c, 0, 0, a.value);
    return this.executeScript.apply(this, c).then(function(a) {
      return a instanceof webdriver.WebElement ? [a] : !goog.isArray(a) ? [] : goog.array.filter(a, function(a) {
        return a instanceof webdriver.WebElement
      })
    })
  }
  return this.schedule((new webdriver.Command(webdriver.CommandName.FIND_ELEMENTS)).setParameter("using", a.using).setParameter("value", a.value), "WebDriver.findElements(" + a + ")")
};
webdriver.WebDriver.prototype.takeScreenshot = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.SCREENSHOT), "WebDriver.takeScreenshot()")
};
webdriver.WebDriver.prototype.manage = function() {
  return new webdriver.WebDriver.Options(this)
};
webdriver.WebDriver.prototype.navigate = function() {
  return new webdriver.WebDriver.Navigation(this)
};
webdriver.WebDriver.prototype.switchTo = function() {
  return new webdriver.WebDriver.TargetLocator(this)
};
webdriver.WebDriver.Navigation = function(a) {
  this.driver_ = a
};
webdriver.WebDriver.Navigation.prototype.to = function(a) {
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.GET)).setParameter("url", a), "WebDriver.navigate().to(" + a + ")")
};
webdriver.WebDriver.Navigation.prototype.back = function() {
  return this.driver_.schedule(new webdriver.Command(webdriver.CommandName.GO_BACK), "WebDriver.navigate().back()")
};
webdriver.WebDriver.Navigation.prototype.forward = function() {
  return this.driver_.schedule(new webdriver.Command(webdriver.CommandName.GO_FORWARD), "WebDriver.navigate().forward()")
};
webdriver.WebDriver.Navigation.prototype.refresh = function() {
  return this.driver_.schedule(new webdriver.Command(webdriver.CommandName.REFRESH), "WebDriver.navigate().refresh()")
};
webdriver.WebDriver.Options = function(a) {
  this.driver_ = a
};
webdriver.WebDriver.Options.prototype.addCookie = function(a, b, c, d, e) {
  if(/[;=]/.test(a)) {
    throw Error('Invalid cookie name "' + a + '"');
  }
  if(/;/.test(b)) {
    throw Error('Invalid cookie value "' + b + '"');
  }
  var f = a + "=" + b + (d ? ";domain=" + d : "") + (c ? ";path=" + c : "") + (e ? ";secure" : "");
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.ADD_COOKIE)).setParameter("name", a).setParameter("value", b).setParameter("path", c).setParameter("domain", d).setParameter("secure", !!e), "WebDriver.manage().addCookie(" + f + ")")
};
webdriver.WebDriver.Options.prototype.deleteAllCookies = function() {
  return this.driver_.schedule(new webdriver.Command(webdriver.CommandName.ADD_COOKIE), "WebDriver.manage().deleteAllCookies()")
};
webdriver.WebDriver.Options.prototype.deleteCookie = function(a) {
  return this.driver_.schedule(new webdriver.Command(webdriver.CommandName.DELETE_COOKIE), "WebDriver.manage().deleteCookie(" + a + ")")
};
webdriver.WebDriver.Options.prototype.getCookies = function() {
  return this.driver_.schedule(new webdriver.Command(webdriver.CommandName.GET_ALL_COOKIES), "WebDriver.manage().getCookies()")
};
webdriver.WebDriver.Options.prototype.getCookie = function(a) {
  return this.getCookies().addCallback(function(b) {
    return goog.array.find(b, function(b) {
      return b && b.name == a
    })
  })
};
webdriver.WebDriver.Options.prototype.timeouts = function() {
  return new webdriver.WebDriver.Timeouts(this.driver_)
};
webdriver.WebDriver.Timeouts = function(a) {
  this.driver_ = a
};
webdriver.WebDriver.Timeouts.prototype.implicitlyWait = function(a) {
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.IMPLICITLY_WAIT)).setParameter("ms", 0 > a ? 0 : a), "WebDriver.manage().timeouts().implicitlyWait(" + a + ")")
};
webdriver.WebDriver.Timeouts.prototype.setScriptTimeout = function(a) {
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.SET_SCRIPT_TIMEOUT)).setParameter("ms", 0 > a ? 0 : a), "WebDriver.manage().timeouts().setScriptTimeout(" + a + ")")
};
webdriver.WebDriver.TargetLocator = function(a) {
  this.driver_ = a
};
webdriver.WebDriver.TargetLocator.prototype.activeElement = function() {
  var a = this.driver_.schedule(new webdriver.Command(webdriver.CommandName.GET_ACTIVE_ELEMENT), "WebDriver.switchTo().activeElement()");
  return new webdriver.WebElement(this.driver_, a)
};
webdriver.WebDriver.TargetLocator.prototype.defaultContent = function() {
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.SWITCH_TO_FRAME)).setParameter("id", null), "WebDriver.switchTo().defaultContent()")
};
webdriver.WebDriver.TargetLocator.prototype.frame = function(a) {
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.SWITCH_TO_FRAME)).setParameter("id", a), "WebDriver.switchTo().frame(" + a + ")")
};
webdriver.WebDriver.TargetLocator.prototype.window = function(a) {
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.SWITCH_TO_WINDOW)).setParameter("name", a), "WebDriver.switchTo().window(" + a + ")")
};
webdriver.Key = {NULL:"\ue000", CANCEL:"\ue001", HELP:"\ue002", BACK_SPACE:"\ue003", TAB:"\ue004", CLEAR:"\ue005", RETURN:"\ue006", ENTER:"\ue007", SHIFT:"\ue008", CONTROL:"\ue009", ALT:"\ue00a", PAUSE:"\ue00b", ESCAPE:"\ue00c", SPACE:"\ue00d", PAGE_UP:"\ue00e", PAGE_DOWN:"\ue00f", END:"\ue010", HOME:"\ue011", ARROW_LEFT:"\ue012", LEFT:"\ue012", ARROW_UP:"\ue013", UP:"\ue013", ARROW_RIGHT:"\ue014", RIGHT:"\ue014", ARROW_DOWN:"\ue015", DOWN:"\ue015", INSERT:"\ue016", DELETE:"\ue017", SEMICOLON:"\ue018", 
EQUALS:"\ue019", NUMPAD0:"\ue01a", NUMPAD1:"\ue01b", NUMPAD2:"\ue01c", NUMPAD3:"\ue01d", NUMPAD4:"\ue01e", NUMPAD5:"\ue01f", NUMPAD6:"\ue020", NUMPAD7:"\ue021", NUMPAD8:"\ue022", NUMPAD9:"\ue023", MULTIPLY:"\ue024", ADD:"\ue025", SEPARATOR:"\ue026", SUBTRACT:"\ue027", DECIMAL:"\ue028", DIVIDE:"\ue029", F1:"\ue031", F2:"\ue032", F3:"\ue033", F4:"\ue034", F5:"\ue035", F6:"\ue036", F7:"\ue037", F8:"\ue038", F9:"\ue039", F10:"\ue03a", F11:"\ue03b", F12:"\ue03c", COMMAND:"\ue03d", META:"\ue03d"};
webdriver.Key.chord = function(a) {
  var b = goog.array.reduce(goog.array.slice(arguments, 0), function(a, b) {
    return a + b
  }, "");
  return b += webdriver.Key.NULL
};
webdriver.WebElement = function(a, b) {
  webdriver.promise.Deferred.call(this);
  this.driver_ = a;
  var c = this, d = this.resolve, e = this.reject;
  delete this.promise;
  delete this.resolve;
  delete this.reject;
  this.id_ = webdriver.promise.when(b, function(a) {
    d(c);
    if(a instanceof webdriver.WebElement) {
      return a.id_
    }
    if(goog.isDef(a[webdriver.WebElement.ELEMENT_KEY])) {
      return a
    }
    var b = {};
    b[webdriver.WebElement.ELEMENT_KEY] = a;
    return b
  }, e)
};
goog.inherits(webdriver.WebElement, webdriver.promise.Deferred);
webdriver.WebElement.ELEMENT_KEY = "ELEMENT";
webdriver.WebElement.equals = function(a, b) {
  return a == b ? webdriver.promise.resolved(!0) : webdriver.promise.fullyResolved([a.id_, b.id_]).then(function(c) {
    if(c[0][webdriver.WebElement.ELEMENT_KEY] == c[1][webdriver.WebElement.ELEMENT_KEY]) {
      return!0
    }
    c = new webdriver.Command(webdriver.CommandName.ELEMENT_EQUALS);
    c.setParameter("other", b);
    return a.schedule_(c, "webdriver.WebElement.equals()")
  })
};
webdriver.WebElement.prototype.getDriver = function() {
  return this.driver_
};
webdriver.WebElement.prototype.toWireValue = function() {
  return this.id_
};
webdriver.WebElement.prototype.schedule_ = function(a, b) {
  a.setParameter("id", this.id_);
  return this.driver_.schedule(a, b)
};
webdriver.WebElement.prototype.findElement = function(a, b) {
  a = webdriver.Locator.checkLocator(a);
  if("js" == a.using) {
    return this.driver_.findElement.apply(this.driver_, arguments)
  }
  var c = this.schedule_((new webdriver.Command(webdriver.CommandName.FIND_CHILD_ELEMENT)).setParameter("using", a.using).setParameter("value", a.value), "WebElement.findElement(" + a + ")");
  return new webdriver.WebElement(this.driver_, c)
};
webdriver.WebElement.prototype.isElementPresent = function(a, b) {
  a = webdriver.Locator.checkLocator(a);
  return"js" == a.using ? this.driver_.isElementPresent.apply(this.driver_, arguments) : this.findElements.apply(this, arguments).then(function(a) {
    return!!a.length
  })
};
webdriver.WebElement.prototype.findElements = function(a, b) {
  a = webdriver.Locator.checkLocator(a);
  return"js" == a.using ? this.driver_.findElements.apply(this.driver_, arguments) : this.schedule_((new webdriver.Command(webdriver.CommandName.FIND_CHILD_ELEMENTS)).setParameter("using", a.using).setParameter("value", a.value), "WebElement.findElements(" + a + ")")
};
webdriver.WebElement.prototype.click = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.CLICK_ELEMENT), "WebElement.click()")
};
webdriver.WebElement.prototype.sendKeys = function(a) {
  var b = webdriver.promise.fullyResolved(goog.array.slice(arguments, 0)).then(function(a) {
    return goog.array.map(goog.array.slice(a, 0), function(a) {
      return a + ""
    })
  });
  return this.schedule_((new webdriver.Command(webdriver.CommandName.SEND_KEYS_TO_ELEMENT)).setParameter("value", b), "WebElement.sendKeys(" + b + ")")
};
webdriver.WebElement.prototype.getTagName = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.GET_ELEMENT_TAG_NAME), "WebElement.getTagName()")
};
webdriver.WebElement.prototype.getCssValue = function(a) {
  return this.schedule_((new webdriver.Command(webdriver.CommandName.GET_ELEMENT_VALUE_OF_CSS_PROPERTY)).setParameter("propertyName", a), "WebElement.getCssValue(" + a + ")")
};
webdriver.WebElement.prototype.getAttribute = function(a) {
  return this.schedule_((new webdriver.Command(webdriver.CommandName.GET_ELEMENT_ATTRIBUTE)).setParameter("name", a), "WebElement.getAttribute(" + a + ")")
};
webdriver.WebElement.prototype.getText = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.GET_ELEMENT_TEXT), "WebElement.getText()")
};
webdriver.WebElement.prototype.getSize = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.GET_ELEMENT_SIZE), "WebElement.getSize()")
};
webdriver.WebElement.prototype.getLocation = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.GET_ELEMENT_LOCATION), "WebElement.getLocation()")
};
webdriver.WebElement.prototype.isEnabled = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.IS_ELEMENT_ENABLED), "WebElement.isEnabled()")
};
webdriver.WebElement.prototype.isSelected = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.IS_ELEMENT_SELECTED), "WebElement.isSelected()")
};
webdriver.WebElement.prototype.submit = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.SUBMIT_ELEMENT), "WebElement.submit()")
};
webdriver.WebElement.prototype.clear = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.CLEAR_ELEMENT), "WebElement.clear()")
};
webdriver.WebElement.prototype.isDisplayed = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.IS_ELEMENT_DISPLAYED), "WebElement.isDisplayed()")
};
webdriver.WebElement.prototype.getOuterHtml = function() {
  return this.driver_.executeScript(function(a) {
    if("outerHTML" in a) {
      return a.outerHTML
    }
    var b = a.ownerDocument.createElement("div");
    b.appendChild(a.cloneNode(!0));
    return b.innerHTML
  }, this)
};
webdriver.WebElement.prototype.getInnerHtml = function() {
  return this.driver_.executeScript("return arguments[0].innerHTML", this)
};
safaridriver.extension.init = function() {
  goog.debug.LogManager.getRoot().setLevel(goog.debug.Logger.Level.ALL);
  safaridriver.console.init();
  safaridriver.extension.LOG_.info("Initializing tab manager...");
  safaridriver.extension.tabManager_ = new safaridriver.extension.TabManager;
  safaridriver.extension.LOG_.info("Creating debug driver...");
  var a = safaridriver.extension.createSessionServer_();
  safaridriver.extension.driver = new webdriver.WebDriver(new webdriver.Session("debug", {}), a);
  safaridriver.extension.LOG_.info("Waiting for connect command...");
  safari.application.addEventListener("message", safaridriver.extension.onMessage_, !1)
};
safaridriver.extension.LOG_ = goog.debug.Logger.getLogger("safaridriver.extension");
safaridriver.extension.onMessage_ = function(a) {
  safaridriver.extension.LOG_.info("Received message: " + a.name);
  a = safaridriver.message.Message.fromEvent(a);
  if(a.isType(safaridriver.message.Type.CONNECT)) {
    var b = a.getUrl();
    safaridriver.extension.createSessionServer_().connect(b).then(function() {
      safaridriver.extension.LOG_.info("Connected to client: " + b)
    }, function(a) {
      safaridriver.extension.LOG_.severe("Failed to connect to client: " + b, a)
    })
  }
};
safaridriver.extension.createSessionServer_ = function() {
  var a = new safaridriver.extension.Session(safaridriver.extension.tabManager_);
  return new safaridriver.extension.Server(a)
};
;safaridriver.extension.init();
