/* @mitojs/browser version ' + 3.0.1 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var version = "3.0.1";

var SDK_NAME = 'mitojs';
var SDK_VERSION = version;

var MitoLog = 'Mito.log';
var MitoLogEmptyMsg = 'empty.msg';
var MitoLogEmptyTag = 'empty.tag';
var ERROR_TYPE_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
var globalVar = {
    isLogAddBreadcrumb: true,
    crossOriginThreshold: 1000
};
var Silent = 'silent';

var nativeToString = Object.prototype.toString;
function isType(type) {
    return function (value) {
        return nativeToString.call(value) === "[object " + type + "]";
    };
}
var variableTypeDetection = {
    isNumber: isType("Number"),
    isString: isType("String"),
    isBoolean: isType("Boolean"),
    isNull: isType("Null"),
    isUndefined: isType("Undefined"),
    isSymbol: isType("Symbol"),
    isFunction: isType("Function"),
    isObject: isType("Object"),
    isArray: isType("Array"),
    isProcess: isType("process"),
    isWindow: isType("Window")
};
function isError(wat) {
    switch (nativeToString.call(wat)) {
        case '[object Error]':
            return true;
        case '[object Exception]':
            return true;
        case '[object DOMException]':
            return true;
        default:
            return isInstanceOf(wat, Error);
    }
}
function isEmpty(wat) {
    return (variableTypeDetection.isString(wat) && wat.trim() === '') || wat === undefined || wat === null;
}
function isInstanceOf(wat, base) {
    try {
        return wat instanceof base;
    }
    catch (_e) {
        return false;
    }
}
function isExistProperty(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

var isNodeEnv = variableTypeDetection.isProcess(typeof process !== 'undefined' ? process : 0);
var isWxMiniEnv = variableTypeDetection.isObject(typeof wx !== 'undefined' ? wx : 0) &&
    variableTypeDetection.isFunction(typeof App !== 'undefined' ? App : 0);
var isBrowserEnv = variableTypeDetection.isWindow(typeof window !== 'undefined' ? window : 0);
function getGlobal() {
    if (isBrowserEnv)
        return window;
    if (isWxMiniEnv)
        return wx;
    if (isNodeEnv)
        return process;
}
var _global = getGlobal();
var _support = getGlobalMitoSupport();
function getGlobalMitoSupport() {
    _global.__MITO__ = _global.__MITO__ || {};
    return _global.__MITO__;
}
function supportsHistory() {
    var chrome = _global.chrome;
    var isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
    var hasHistoryApi = 'history' in _global && !!_global.history.pushState && !!_global.history.replaceState;
    return !isChromePackagedApp && hasHistoryApi;
}

var PREFIX = 'MITO Logger';
var Logger = (function () {
    function Logger() {
        var _this = this;
        this.enabled = false;
        this._console = {};
        _global.console = console || _global.console;
        if (console || _global.console) {
            var logType = ['log', 'debug', 'info', 'warn', 'error', 'assert'];
            logType.forEach(function (level) {
                if (!(level in _global.console))
                    return;
                _this._console[level] = _global.console[level];
            });
        }
    }
    Logger.prototype.disable = function () {
        this.enabled = false;
    };
    Logger.prototype.bindOptions = function (debug) {
        this.enabled = debug ? true : false;
    };
    Logger.prototype.enable = function () {
        this.enabled = true;
    };
    Logger.prototype.getEnableStatus = function () {
        return this.enabled;
    };
    Logger.prototype.log = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        (_a = this._console).log.apply(_a, __spreadArray([PREFIX + "[Log]:"], args, false));
    };
    Logger.prototype.warn = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        (_a = this._console).warn.apply(_a, __spreadArray([PREFIX + "[Warn]:"], args, false));
    };
    Logger.prototype.error = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this._console).error.apply(_a, __spreadArray([PREFIX + "[Error]:"], args, false));
    };
    return Logger;
}());
var logger = _support.logger || (_support.logger = new Logger());

function getLocationHref() {
    if (typeof document === 'undefined' || document.location == null)
        return '';
    return document.location.href;
}
function getUrlWithEnv() {
    if (isWxMiniEnv)
        return getCurrentRoute();
    if (isBrowserEnv)
        return getLocationHref();
    return '';
}
function on(target, eventName, handler, opitons) {
    if (opitons === void 0) { opitons = false; }
    target.addEventListener(eventName, handler, opitons);
}
function replaceOld(source, name, replacement, isForced) {
    if (isForced === void 0) { isForced = false; }
    if (source === undefined)
        return;
    if (name in source || isForced) {
        var original_1 = source[name];
        var hookedUnsafe_1 = replacement(original_1);
        var hooked = hookedUnsafe_1;
        if (typeof hookedUnsafe_1 === 'function') {
            hooked = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                try {
                    return hookedUnsafe_1.apply(this, args);
                }
                catch (_a) {
                    return typeof original_1 === 'function' && original_1.apply(this, args);
                }
            };
        }
        source[name] = hooked;
    }
}
var defaultFunctionName = '<anonymous>';
function getFunctionName(fn) {
    if (!fn || typeof fn !== 'function') {
        return defaultFunctionName;
    }
    return fn.name || defaultFunctionName;
}
function throttle(fn, delay) {
    var canRun = true;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!canRun)
            return;
        fn.apply(this, args);
        canRun = false;
        setTimeout(function () {
            canRun = true;
        }, delay);
    };
}
function isInclude(origin, target) {
    return !!~origin.indexOf(target);
}
function getTimestamp() {
    return Date.now();
}
function toStringAny(target, type) {
    return nativeToString.call(target) === "[object " + type + "]";
}
function toStringValidateOption(target, targetName, expectType) {
    if (toStringAny(target, expectType))
        return true;
    typeof target !== 'undefined' && logger.error(targetName + "\u671F\u671B\u4F20\u5165:" + expectType + "\u7C7B\u578B\uFF0C\u5F53\u524D\u662F:" + nativeToString.call(target) + "\u7C7B\u578B");
    return false;
}
function silentConsoleScope(callback) {
    globalVar.isLogAddBreadcrumb = false;
    callback();
    globalVar.isLogAddBreadcrumb = true;
}
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}
function unknownToString(target) {
    if (variableTypeDetection.isString(target)) {
        return target;
    }
    if (variableTypeDetection.isUndefined(target)) {
        return 'undefined';
    }
    return JSON.stringify(target);
}
function setUrlQuery(url, query) {
    var queryArr = [];
    Object.keys(query).forEach(function (k) {
        queryArr.push(k + "=" + query[k]);
    });
    if (url.indexOf('?') !== -1) {
        url = url + "&" + queryArr.join('&');
    }
    else {
        url = url + "?" + queryArr.join('&');
    }
    return url;
}
function interceptStr(str, interceptLength) {
    if (variableTypeDetection.isString(str)) {
        return str.slice(0, interceptLength) + (str.length > interceptLength ? ";slice the first " + interceptLength + " characters" : '');
    }
    return '';
}
function getCurrentRoute() {
    if (!variableTypeDetection.isFunction(getCurrentPages)) {
        return '';
    }
    var pages = getCurrentPages();
    if (!pages.length) {
        return 'App';
    }
    var currentPage = pages.pop();
    return setUrlQuery(currentPage.route, currentPage.options);
}
function firstStrtoUppercase(str) {
    return str.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
        return "" + $1.toUpperCase() + $2;
    });
}
function safeStringify(obj) {
    var set = new Set();
    var str = JSON.stringify(obj, function (_key, value) {
        if (set.has(value)) {
            return 'Circular';
        }
        typeof value === 'object' && set.add(value);
        return value;
    });
    set.clear();
    return str;
}
function validateOptionsAndSet(targetArr) {
    var _this = this;
    targetArr.forEach(function (_a) {
        var target = _a[0], targetName = _a[1], expectType = _a[2];
        return toStringValidateOption(target, targetName, expectType) && (_this[targetName] = target);
    });
}

function htmlElementAsString(target) {
    var tagName = target.tagName.toLowerCase();
    if (tagName === 'body') {
        return null;
    }
    var classNames = target.classList.value;
    classNames = classNames !== '' ? " class=\"" + classNames + "\"" : '';
    var id = target.id ? " id=\"" + target.id + "\"" : '';
    var innerText = target.innerText;
    return "<" + tagName + id + (classNames !== '' ? classNames : '') + ">" + innerText + "</" + tagName + ">";
}
function parseUrlToObj(url) {
    if (!url) {
        return {};
    }
    var match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!match) {
        return {};
    }
    var query = match[6] || '';
    var fragment = match[8] || '';
    return {
        host: match[4],
        path: match[5],
        protocol: match[2],
        relative: match[5] + query + fragment
    };
}
function getBreadcrumbCategoryInBrowser(type) {
    switch (type) {
        case "Xhr":
        case "Fetch":
            return "http";
        case "UI.Click":
        case "Route":
            return "user";
        case "Customer":
        case "Console":
            return "debug";
        case "Unhandledrejection":
        case "Code Error":
        case "Resource":
        default:
            return "exception";
    }
}
function extractErrorStack(ex, level) {
    var normal = {
        time: getTimestamp(),
        url: getUrlWithEnv(),
        name: ex.name,
        level: level,
        message: ex.message
    };
    if (typeof ex.stack === 'undefined' || !ex.stack) {
        return normal;
    }
    var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/, lines = ex.stack.split('\n'), stack = [];
    var submatch, parts, element;
    for (var i = 0, j = lines.length; i < j; ++i) {
        if ((parts = chrome.exec(lines[i]))) {
            var isNative = parts[2] && parts[2].indexOf('native') === 0;
            var isEval = parts[2] && parts[2].indexOf('eval') === 0;
            if (isEval && (submatch = chromeEval.exec(parts[2]))) {
                parts[2] = submatch[1];
                parts[3] = submatch[2];
                parts[4] = submatch[3];
            }
            element = {
                url: !isNative ? parts[2] : null,
                func: parts[1] || "UNKNOWN_FUNCTION",
                args: isNative ? [parts[2]] : [],
                line: parts[3] ? +parts[3] : null,
                column: parts[4] ? +parts[4] : null
            };
        }
        else if ((parts = winjs.exec(lines[i]))) {
            element = {
                url: parts[2],
                func: parts[1] || "UNKNOWN_FUNCTION",
                args: [],
                line: +parts[3],
                column: parts[4] ? +parts[4] : null
            };
        }
        else if ((parts = gecko.exec(lines[i]))) {
            var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
            if (isEval && (submatch = geckoEval.exec(parts[3]))) {
                parts[3] = submatch[1];
                parts[4] = submatch[2];
                parts[5] = null;
            }
            else if (i === 0 && !parts[5] && typeof ex.columnNumber !== 'undefined') {
                stack[0].column = ex.columnNumber + 1;
            }
            element = {
                url: parts[3],
                func: parts[1] || "UNKNOWN_FUNCTION",
                args: parts[2] ? parts[2].split(',') : [],
                line: parts[4] ? +parts[4] : null,
                column: parts[5] ? +parts[5] : null
            };
        }
        else {
            continue;
        }
        if (!element.func && element.line) {
            element.func = "UNKNOWN_FUNCTION";
        }
        stack.push(element);
    }
    if (!stack.length) {
        return null;
    }
    return __assign(__assign({}, normal), { stack: stack });
}

function nativeTryCatch(fn, errorFn) {
    try {
        fn();
    }
    catch (err) {
        console.error('err', err);
        if (errorFn) {
            errorFn(err);
        }
    }
}

var Queue = (function () {
    function Queue() {
        this.stack = [];
        this.isFlushing = false;
        if (!('Promise' in _global))
            return;
        this.micro = Promise.resolve();
    }
    Queue.prototype.addTask = function (fn) {
        var _this = this;
        if (typeof fn !== 'function')
            return;
        if (!('Promise' in _global)) {
            fn();
            return;
        }
        this.stack.push(fn);
        if (!this.isFlushing) {
            this.isFlushing = true;
            this.micro.then(function () { return _this.flushStack(); });
        }
    };
    Queue.prototype.clear = function () {
        this.stack = [];
    };
    Queue.prototype.getStack = function () {
        return this.stack;
    };
    Queue.prototype.flushStack = function () {
        var temp = this.stack.slice(0);
        this.stack.length = 0;
        this.isFlushing = false;
        for (var _i = 0, temp_1 = temp; _i < temp_1.length; _i++) {
            var fn = temp_1[_i];
            fn();
        }
    };
    return Queue;
}());

var Severity;
(function (Severity) {
    Severity["Else"] = "else";
    Severity["Error"] = "error";
    Severity["Warning"] = "warning";
    Severity["Info"] = "info";
    Severity["Debug"] = "debug";
    Severity["Low"] = "low";
    Severity["Normal"] = "normal";
    Severity["High"] = "high";
    Severity["Critical"] = "critical";
})(Severity || (Severity = {}));
(function (Severity) {
    function fromString(level) {
        switch (level) {
            case 'debug':
                return Severity.Debug;
            case 'info':
            case 'log':
            case 'assert':
                return Severity.Info;
            case 'warn':
            case 'warning':
                return Severity.Warning;
            case Severity.Low:
            case Severity.Normal:
            case Severity.High:
            case Severity.Critical:
            case 'error':
                return Severity.Error;
            default:
                return Severity.Else;
        }
    }
    Severity.fromString = fromString;
})(Severity || (Severity = {}));

function fromHttpStatus(httpStatus) {
    if (httpStatus < 400) {
        return "ok";
    }
    if (httpStatus >= 400 && httpStatus < 500) {
        switch (httpStatus) {
            case 401:
                return "unauthenticated";
            case 403:
                return "permission_denied";
            case 404:
                return "not_found";
            case 409:
                return "already_exists";
            case 413:
                return "failed_precondition";
            case 429:
                return "resource_exhausted";
            default:
                return "invalid_argument";
        }
    }
    if (httpStatus >= 500 && httpStatus < 600) {
        switch (httpStatus) {
            case 501:
                return "unimplemented";
            case 503:
                return "unavailable";
            case 504:
                return "deadline_exceeded";
            default:
                return "internal_error";
        }
    }
    return "unknown_error";
}

var allErrorNumber = {};
function createErrorId(data, apikey, maxDuplicateCount) {
    var id;
    switch (data.type) {
        case "HTTP":
            id = data.type + data.request.method + data.response.status + getRealPath(data.request.url) + apikey;
            break;
        case "JAVASCRIPT":
        case "VUE":
        case "REACT":
            id = data.type + data.name + data.message + apikey;
            break;
        case "LOG":
            id = data.customTag + data.type + data.name + apikey;
            break;
        case "PROMISE":
            id = generatePromiseErrorId(data, apikey);
            break;
        default:
            id = data.type + data.message + apikey;
            break;
    }
    id = hashCode(id);
    if (allErrorNumber[id] >= maxDuplicateCount) {
        return null;
    }
    if (typeof allErrorNumber[id] === 'number') {
        allErrorNumber[id]++;
    }
    else {
        allErrorNumber[id] = 1;
    }
    return id;
}
function generatePromiseErrorId(data, apikey) {
    var locationUrl = getRealPath(data.url);
    if (data.name === "unhandledrejection") {
        return data.type + stringToObjAndOrder(data.message) + apikey;
    }
    return data.type + data.name + stringToObjAndOrder(data.message) + locationUrl;
}
function sortObjByKey(obj) {
    return Object.keys(obj)
        .sort()
        .reduce(function (total, key) {
        if (variableTypeDetection.isObject(obj[key])) {
            total[key] = sortObjByKey(obj[key]);
        }
        else {
            total[key] = obj[key];
        }
        return total;
    }, {});
}
function stringToObjAndOrder(reason) {
    try {
        if (/\{.*\}/.test(reason)) {
            var obj = JSON.parse(reason);
            obj = sortObjByKey(obj);
            return JSON.stringify(obj);
        }
        return reason;
    }
    catch (error) {
        return reason;
    }
}
function getRealPath(url) {
    return url
        .replace(/[?#].*$/, '')
        .replace(/\/(\d+)\//g, '/{param}/$1')
        .replace(/\/\d+([/]*$)/g, '/{param}$1');
}
function hashCode(str) {
    var hash = 0;
    if (str.length == 0)
        return hash;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash;
}

var Breadcrumb = (function () {
    function Breadcrumb(options) {
        if (options === void 0) { options = {}; }
        this.maxBreadcrumbs = 10;
        this.beforePushBreadcrumb = null;
        this.stack = [];
        this.bindOptions(options);
    }
    Breadcrumb.prototype.push = function (data) {
        var _this = this;
        if (typeof this.beforePushBreadcrumb === 'function') {
            var result_1 = null;
            var beforePushBreadcrumb_1 = this.beforePushBreadcrumb;
            silentConsoleScope(function () {
                result_1 = beforePushBreadcrumb_1.call(_this, _this, data);
            });
            if (!result_1)
                return this.stack;
            return this.immediatePush(result_1);
        }
        return this.immediatePush(data);
    };
    Breadcrumb.prototype.immediatePush = function (data) {
        data.time || (data.time = getTimestamp());
        if (this.stack.length >= this.maxBreadcrumbs) {
            this.shift();
        }
        this.stack.push(data);
        this.stack.sort(function (a, b) { return a.time - b.time; });
        logger.log(this.stack);
        return this.stack;
    };
    Breadcrumb.prototype.shift = function () {
        return this.stack.shift() !== undefined;
    };
    Breadcrumb.prototype.clear = function () {
        this.stack = [];
    };
    Breadcrumb.prototype.getStack = function () {
        return this.stack;
    };
    Breadcrumb.prototype.bindOptions = function (options) {
        if (options === void 0) { options = {}; }
        var maxBreadcrumbs = options.maxBreadcrumbs, beforePushBreadcrumb = options.beforePushBreadcrumb;
        toStringValidateOption(maxBreadcrumbs, 'maxBreadcrumbs', "Number") && (this.maxBreadcrumbs = maxBreadcrumbs);
        toStringValidateOption(beforePushBreadcrumb, 'beforePushBreadcrumb', "Function") &&
            (this.beforePushBreadcrumb = beforePushBreadcrumb);
    };
    return Breadcrumb;
}());

var Subscribe = (function () {
    function Subscribe() {
        this.dep = new Map();
    }
    Subscribe.prototype.watch = function (eventName, callBack) {
        var fns = this.dep.get(eventName);
        if (fns) {
            this.dep.set(eventName, fns.concat(callBack));
            return;
        }
        this.dep.set(eventName, [callBack]);
    };
    Subscribe.prototype.notify = function (eventName, data) {
        var fns = this.dep.get(eventName);
        if (!eventName || !fns)
            return;
        fns.forEach(function (fn) {
            nativeTryCatch(function () {
                fn(data);
            }, function (e) {
                logger.error("Subscribe.notify\uFF1A\u76D1\u542C\u4E8B\u4EF6\u7684\u56DE\u8C03\u51FD\u6570\u53D1\u751F\u9519\u8BEF\neventName:" + eventName + "\nName: " + getFunctionName(fn) + "\nError: " + e);
            });
        });
    };
    return Subscribe;
}());

var BaseClient = (function () {
    function BaseClient(options) {
        this.SDK_VERSION = SDK_VERSION;
        this.options = options;
        logger.bindOptions(options.debug);
    }
    BaseClient.prototype.use = function (plugins) {
        var _this = this;
        if (this.options.disabled)
            return;
        var subscribe = new Subscribe();
        plugins.forEach(function (item) {
            if (!_this.isPluginEnable(item.name))
                return;
            item.monitor.call(_this, subscribe.notify.bind(subscribe));
            var wrapperTransform = function () {
                var _a, _b;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var res = (_a = item.transform) === null || _a === void 0 ? void 0 : _a.apply(_this, args);
                (_b = item.consumer) === null || _b === void 0 ? void 0 : _b.call(_this, res);
            };
            subscribe.watch(item.name, wrapperTransform);
        });
    };
    BaseClient.prototype.getOptions = function () {
        return this.options;
    };
    return BaseClient;
}());

var BaseOptions = (function () {
    function BaseOptions() {
        this.enableTraceId = false;
        this.includeHttpUrlTraceIdRegExp = /.*/;
        this.traceIdFieldName = 'Trace-Id';
        this.throttleDelayTime = 0;
        this.beforeAppAjaxSend = null;
        this.vue = null;
    }
    BaseOptions.prototype.bindOptions = function (options) {
        var enableTraceId = options.enableTraceId, vue = options.vue, filterXhrUrlRegExp = options.filterXhrUrlRegExp, traceIdFieldName = options.traceIdFieldName, throttleDelayTime = options.throttleDelayTime, includeHttpUrlTraceIdRegExp = options.includeHttpUrlTraceIdRegExp, beforeAppAjaxSend = options.beforeAppAjaxSend;
        var optionArr = [
            [enableTraceId, 'enableTraceId', "Boolean"],
            [traceIdFieldName, 'traceIdFieldName', "String"],
            [throttleDelayTime, 'throttleDelayTime', "Number"],
            [filterXhrUrlRegExp, 'filterXhrUrlRegExp', "RegExp"],
            [includeHttpUrlTraceIdRegExp, 'includeHttpUrlTraceIdRegExp', "RegExp"],
            [beforeAppAjaxSend, 'beforeAppAjaxSend', "Function"]
        ];
        validateOptionsAndSet.call(this, optionArr);
        this.vue = vue;
    };
    BaseOptions.prototype.isFilterHttpUrl = function (url) {
        return this.filterXhrUrlRegExp && this.filterXhrUrlRegExp.test(url);
    };
    BaseOptions.prototype.setTraceId = function (httpUrl, callback) {
        var _a = this, includeHttpUrlTraceIdRegExp = _a.includeHttpUrlTraceIdRegExp, enableTraceId = _a.enableTraceId;
        if (enableTraceId && includeHttpUrlTraceIdRegExp && includeHttpUrlTraceIdRegExp.test(httpUrl)) {
            var traceId = generateUUID();
            callback(this.traceIdFieldName, traceId);
        }
    };
    return BaseOptions;
}());

var BaseTransport = (function () {
    function BaseTransport() {
        this.apikey = '';
        this.dsn = '';
        this.beforeDataReport = null;
        this.backTrackerId = null;
        this.configReportUrl = null;
        this.maxDuplicateCount = 3;
        this.queue = new Queue();
    }
    BaseTransport.prototype.getAuthInfo = function () {
        var trackerId = this.getTrackerId();
        var result = {
            trackerId: String(trackerId),
            sdkVersion: SDK_VERSION,
            sdkName: SDK_NAME,
            apikey: this.apikey
        };
        return result;
    };
    BaseTransport.prototype.getTrackerId = function () {
        if (typeof this.backTrackerId === 'function') {
            var trackerId = this.backTrackerId();
            if (typeof trackerId === 'string' || typeof trackerId === 'number') {
                return trackerId;
            }
            else {
                logger.error("trackerId:" + trackerId + " \u671F\u671B string \u6216 number \u7C7B\u578B\uFF0C\u4F46\u662F\u4F20\u5165 " + typeof trackerId);
            }
        }
        return '';
    };
    BaseTransport.prototype.isSelfDsn = function (targetUrl) {
        return this.dsn && isInclude(targetUrl, this.dsn);
    };
    BaseTransport.prototype.bindOptions = function (options) {
        if (options === void 0) { options = {}; }
        var dsn = options.dsn, beforeDataReport = options.beforeDataReport, apikey = options.apikey, maxDuplicateCount = options.maxDuplicateCount, backTrackerId = options.backTrackerId, configReportUrl = options.configReportUrl;
        var functionType = "Function";
        var optionArr = [
            [apikey, 'apikey', "String"],
            [dsn, 'dsn', "String"],
            [maxDuplicateCount, 'maxDuplicateCount', "Number"],
            [beforeDataReport, 'beforeDataReport', functionType],
            [backTrackerId, 'backTrackerId', functionType],
            [configReportUrl, 'configReportUrl', functionType]
        ];
        validateOptionsAndSet.call(this, optionArr);
    };
    BaseTransport.prototype.send = function (data, breadcrumb) {
        if (breadcrumb === void 0) { breadcrumb = []; }
        return __awaiter(this, void 0, void 0, function () {
            var errorId, transportData, dsn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data.isTrack) {
                            errorId = createErrorId(data, this.apikey, this.maxDuplicateCount);
                            if (!errorId)
                                return [2];
                            data.errorId = errorId;
                        }
                        transportData = __assign(__assign({}, this.getTransportData(data)), { breadcrumb: breadcrumb });
                        if (!(typeof this.beforeDataReport === 'function')) return [3, 2];
                        return [4, this.beforeDataReport(transportData)];
                    case 1:
                        transportData = _a.sent();
                        if (!transportData)
                            return [2];
                        _a.label = 2;
                    case 2:
                        dsn = this.dsn;
                        if (isEmpty(dsn)) {
                            logger.error('dsn is empty,pass in when initializing please');
                            return [2];
                        }
                        if (typeof this.configReportUrl === 'function') {
                            dsn = this.configReportUrl(transportData, dsn);
                            if (!dsn)
                                return [2];
                        }
                        return [2, this.sendToServer(transportData, dsn)];
                }
            });
        });
    };
    return BaseTransport;
}());

var BrowserOptions = (function (_super) {
    __extends(BrowserOptions, _super);
    function BrowserOptions(options) {
        var _this = _super.call(this) || this;
        _this.configReportXhr = null;
        _super.prototype.bindOptions.call(_this, options);
        _this.bindOptions(options);
        return _this;
    }
    BrowserOptions.prototype.bindOptions = function (options) {
        var silentXhr = options.silentXhr, silentFetch = options.silentFetch, silentConsole = options.silentConsole, silentDom = options.silentDom, silentHistory = options.silentHistory, silentError = options.silentError, silentHashchange = options.silentHashchange, silentUnhandledrejection = options.silentUnhandledrejection, useImgUpload = options.useImgUpload, configReportXhr = options.configReportXhr;
        var booleanType = "Boolean";
        var optionArr = [
            [silentXhr, 'silentXhr', booleanType],
            [silentFetch, 'silentFetch', booleanType],
            [silentConsole, 'silentConsole', booleanType],
            [silentDom, 'silentDom', booleanType],
            [silentHistory, 'silentHistory', booleanType],
            [silentError, 'silentError', booleanType],
            [silentHashchange, 'silentHashchange', booleanType],
            [silentUnhandledrejection, 'silentUnhandledrejection', booleanType],
            [useImgUpload, 'useImgUpload', booleanType],
            [configReportXhr, 'configReportXhr', "Function"]
        ];
        validateOptionsAndSet.call(this, optionArr);
    };
    return BrowserOptions;
}(BaseOptions));

var BrowserTransport = (function (_super) {
    __extends(BrowserTransport, _super);
    function BrowserTransport(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.useImgUpload = false;
        _super.prototype.bindOptions.call(_this, options);
        _this.bindOptions(options);
        return _this;
    }
    BrowserTransport.prototype.post = function (data, url) {
        var _this = this;
        var requestFun = function () {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.withCredentials = true;
            if (typeof _this.configReportXhr === 'function') {
                _this.configReportXhr(xhr, data);
            }
            xhr.send(safeStringify(data));
        };
        this.queue.addTask(requestFun);
    };
    BrowserTransport.prototype.imgRequest = function (data, url) {
        var requestFun = function () {
            var img = new Image();
            var spliceStr = url.indexOf('?') === -1 ? '?' : '&';
            img.src = "" + url + spliceStr + "data=" + encodeURIComponent(safeStringify(data));
            img = null;
        };
        this.queue.addTask(requestFun);
    };
    BrowserTransport.prototype.sendToServer = function (data, url) {
        return this.useImgUpload ? this.imgRequest(data, url) : this.post(data, url);
    };
    BrowserTransport.prototype.getTransportData = function (data) {
        return {
            authInfo: this.getAuthInfo(),
            data: data
        };
    };
    BrowserTransport.prototype.bindOptions = function (options) {
        if (options === void 0) { options = {}; }
        var configReportXhr = options.configReportXhr, useImgUpload = options.useImgUpload;
        toStringValidateOption(configReportXhr, 'configReportXhr', "Function") && (this.configReportXhr = configReportXhr);
        toStringValidateOption(useImgUpload, 'useImgUpload', "Boolean") && (this.useImgUpload = useImgUpload);
    };
    return BrowserTransport;
}(BaseTransport));

var BrowserClient = (function (_super) {
    __extends(BrowserClient, _super);
    function BrowserClient(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.options = new BrowserOptions(options);
        _this.transport = new BrowserTransport(options);
        _this.breadcrumb = new Breadcrumb(options);
        return _this;
    }
    BrowserClient.prototype.isPluginEnable = function (name) {
        var silentField = "" + Silent + firstStrtoUppercase(name);
        return !this.options[silentField];
    };
    BrowserClient.prototype.log = function (data) {
        var _a = data.message, message = _a === void 0 ? MitoLogEmptyMsg : _a, _b = data.tag, tag = _b === void 0 ? MitoLogEmptyTag : _b, _c = data.level, level = _c === void 0 ? Severity.Critical : _c, _d = data.ex, ex = _d === void 0 ? '' : _d;
        var errorInfo = {};
        if (isError(ex)) {
            errorInfo = extractErrorStack(ex, level);
        }
        var error = __assign({ type: "LOG", level: level, message: unknownToString(message), name: MitoLog, customTag: unknownToString(tag), time: getTimestamp(), url: getLocationHref() }, errorInfo);
        var breadcrumbStack = this.breadcrumb.push({
            type: "Customer",
            category: getBreadcrumbCategoryInBrowser("Customer"),
            data: message,
            level: Severity.fromString(level.toString())
        });
        this.transport.send(error, breadcrumbStack);
    };
    return BrowserClient;
}(BaseClient));

function addBreadcrumbInBrowser(data, type, level, params) {
    if (level === void 0) { level = Severity.Info; }
    if (params === void 0) { params = {}; }
    return this.breadcrumb.push(__assign({ type: type, data: data, category: getBreadcrumbCategoryInBrowser(type), level: level }, params));
}

var xhrPlugin = {
    name: "xhr",
    monitor: function (notify) {
        monitorXhr.call(this, notify);
    },
    transform: function (collectedData) {
        return httpTransform(collectedData);
    },
    consumer: function (transformedData) {
        httpTransformedDataConsumer.call(this, transformedData);
    }
};
function monitorXhr(notify) {
    var _a = this, options = _a.options, transport = _a.transport;
    if (!('XMLHttpRequest' in _global)) {
        return;
    }
    var originalXhrProto = XMLHttpRequest.prototype;
    replaceOld(originalXhrProto, 'open', function (originalOpen) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.httpCollect = {
                request: {
                    httpType: "xhr",
                    method: variableTypeDetection.isString(args[0]) ? args[0].toUpperCase() : args[0],
                    url: args[1]
                },
                response: {},
                time: getTimestamp()
            };
            originalOpen.apply(this, args);
        };
    });
    replaceOld(originalXhrProto, 'send', function (originalSend) {
        return function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var request = this.httpCollect.request;
            var method = request.method, url = request.url;
            options.setTraceId(url, function (headerFieldName, traceId) {
                request.traceId = traceId;
                _this.setRequestHeader(headerFieldName, traceId);
            });
            options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method: method, url: url }, this);
            on(this, 'loadend', function () {
                var isBlock = transport.isSelfDsn(url) || options.isFilterHttpUrl(url);
                if (isBlock)
                    return;
                var _a = this, responseType = _a.responseType, response = _a.response, status = _a.status;
                request.data = args[0];
                var eTime = getTimestamp();
                if (['', 'json', 'text'].indexOf(responseType) !== -1) {
                    this.httpCollect.response.data = typeof response === 'object' ? JSON.stringify(response) : response;
                }
                this.httpCollect.response.status = status;
                this.httpCollect.elapsedTime = eTime - this.httpCollect.time;
                notify("xhr", this.httpCollect);
            });
            originalSend.apply(this, args);
        };
    });
}
function httpTransform(httpCollectedData) {
    var message = '';
    var _a = httpCollectedData.request, httpType = _a.httpType, method = _a.method, url = _a.url, status = httpCollectedData.response.status, elapsedTime = httpCollectedData.elapsedTime;
    var name = httpType + "--" + method;
    if (status === 0) {
        message =
            elapsedTime <= globalVar.crossOriginThreshold ? 'http请求失败，失败原因：跨域限制或域名不存在' : 'http请求失败，失败原因：超时';
    }
    else {
        message = fromHttpStatus(status);
    }
    message = message === "ok" ? message : message + " " + getRealPath(url);
    return __assign(__assign({}, httpCollectedData), { type: "HTTP", url: getLocationHref(), level: Severity.Low, message: message, name: name });
}
function httpTransformedDataConsumer(transformedData) {
    var type = transformedData.request.httpType === "fetch" ? "Fetch" : "Xhr";
    var status = transformedData.response.status, time = transformedData.time;
    var isError = status === 0 || status === 400 || status > 401;
    addBreadcrumbInBrowser.call(this, transformedData, type, Severity.Info, { time: time });
    if (isError) {
        var breadcrumStack = this.breadcrumb.push({
            type: type,
            category: "exception",
            data: transformedData,
            level: Severity.Error,
            time: time
        });
        this.transport.send(transformedData, breadcrumStack);
    }
}

var fetchPlugin = {
    name: "fetch",
    monitor: function (notify) {
        monitorFetch.call(this, notify);
    },
    transform: function (collectedData) {
        return httpTransform(collectedData);
    },
    consumer: function (transformedData) {
        httpTransformedDataConsumer.call(this, transformedData);
    }
};
function monitorFetch(notify) {
    var _a = this, options = _a.options, transport = _a.transport;
    if (!('fetch' in _global)) {
        return;
    }
    replaceOld(_global, "fetch", function (originalFetch) {
        return function (url, config) {
            if (config === void 0) { config = {}; }
            var sTime = getTimestamp();
            var method = (config && config.method) || 'GET';
            var httpCollect = {
                request: {
                    httpType: "fetch",
                    url: url,
                    method: method,
                    data: config && config.body
                },
                time: sTime,
                response: {}
            };
            var headers = new Headers(config.headers || {});
            Object.assign(headers, {
                setRequestHeader: headers.set
            });
            options.setTraceId(url, function (headerFieldName, traceId) {
                httpCollect.request.traceId = traceId;
                headers.set(headerFieldName, traceId);
            });
            options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method: method, url: url }, headers);
            config = __assign(__assign({}, config), { headers: headers });
            var isBlock = transport.isSelfDsn(url) || options.isFilterHttpUrl(url);
            return originalFetch.apply(_global, [url, config]).then(function (res) {
                var resClone = res.clone();
                var eTime = getTimestamp();
                httpCollect.elapsedTime = eTime - sTime;
                httpCollect.response.status = resClone.status;
                resClone.text().then(function (data) {
                    if (isBlock)
                        return;
                    httpCollect.response.data = data;
                    notify("fetch", httpCollect);
                });
                return res;
            }, function (err) {
                if (isBlock)
                    return;
                var eTime = getTimestamp();
                httpCollect.elapsedTime = eTime - sTime;
                httpCollect.response.status = 0;
                notify("fetch", httpCollect);
                throw err;
            });
        };
    });
}

var domPlugin = {
    name: "dom",
    monitor: function (notify) {
        if (!('document' in _global))
            return;
        var clickThrottle = throttle(notify, this.options.throttleDelayTime);
        on(_global.document, 'click', function () {
            clickThrottle("dom", {
                category: 'click',
                data: this
            });
        }, true);
    },
    transform: function (collectedData) {
        var htmlString = htmlElementAsString(collectedData.data.activeElement);
        return htmlString;
    },
    consumer: function (transformedData) {
        if (transformedData) {
            addBreadcrumbInBrowser.call(this, transformedData, "UI.Click");
        }
    }
};

var errorPlugin = {
    name: "error",
    monitor: function (notify) {
        on(_global, 'error', function (e) {
            notify("error", e);
        }, true);
    },
    transform: function (errorEvent) {
        var target = errorEvent.target;
        if (target.localName) {
            return resourceTransform(errorEvent.target);
        }
        return codeErrorTransform(errorEvent);
    },
    consumer: function (transformedData) {
        var type = transformedData.type === "RESOURCE" ? "Resource" : "Code Error";
        var breadcrumbStack = addBreadcrumbInBrowser.call(this, transformedData, type, Severity.Error);
        this.transport.send(transformedData, breadcrumbStack);
    }
};
var resourceMap = {
    img: '图片',
    script: 'JS脚本'
};
function resourceTransform(target) {
    return {
        type: "RESOURCE",
        url: getLocationHref(),
        message: '资源地址: ' + (interceptStr(target.src, 120) || interceptStr(target.href, 120)),
        level: Severity.Low,
        time: getTimestamp(),
        name: (resourceMap[target.localName] || target.localName) + "\u52A0\u8F7D\u5931\u8D25"
    };
}
function codeErrorTransform(errorEvent) {
    var message = errorEvent.message, filename = errorEvent.filename, lineno = errorEvent.lineno, colno = errorEvent.colno, error = errorEvent.error;
    var result;
    if (error && isError(error)) {
        result = extractErrorStack(error, Severity.Normal);
    }
    result || (result = handleNotErrorInstance(message, filename, lineno, colno));
    result.type = "JAVASCRIPT";
    return result;
}
function handleNotErrorInstance(message, filename, lineno, colno) {
    var name = "UNKNOWN";
    var url = filename || getLocationHref();
    var msg = message;
    var matches = message.match(ERROR_TYPE_RE);
    if (matches[1]) {
        name = matches[1];
        msg = matches[2];
    }
    var element = {
        url: url,
        func: "UNKNOWN_FUNCTION",
        args: "UNKNOWN",
        line: lineno,
        col: colno
    };
    return {
        url: url,
        name: name,
        message: msg,
        level: Severity.Normal,
        time: getTimestamp(),
        stack: [element]
    };
}

var hashRoutePlugin = {
    name: "hashchange",
    monitor: function (notify) {
        if (!isExistProperty(_global, 'onpopstate')) {
            on(_global, "hashchange", function (e) {
                var from = e.oldURL, to = e.newURL;
                notify("hashchange", { from: from, to: to });
            });
        }
    },
    transform: function (collectedData) {
        return routeTransform(collectedData);
    },
    consumer: function (transformedData) {
        routeTransformedConsumer.call(this, transformedData);
    }
};
function routeTransform(collectedData) {
    var from = collectedData.from, to = collectedData.to;
    var parsedFrom = parseUrlToObj(from).relative;
    var parsedTo = parseUrlToObj(to).relative;
    return {
        from: parsedFrom ? parsedFrom : '/',
        to: parsedTo ? parsedTo : '/'
    };
}
function routeTransformedConsumer(transformedData) {
    if (transformedData.from === transformedData.to)
        return;
    addBreadcrumbInBrowser.call(this, transformedData, "Route");
}

var historyRoutePlugin = {
    name: "history",
    monitor: function (notify) {
        var lastHref;
        if (!supportsHistory())
            return;
        var oldOnpopstate = _global.onpopstate;
        _global.onpopstate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var to = getLocationHref();
            var from = lastHref;
            lastHref = to;
            notify("history", {
                from: from,
                to: to
            });
            oldOnpopstate && oldOnpopstate.apply(this, args);
        };
        function historyReplaceFn(originalHistoryFn) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var url = args.length > 2 ? args[2] : undefined;
                if (url) {
                    var from = lastHref;
                    var to = String(url);
                    lastHref = to;
                    notify("history", {
                        from: from,
                        to: to
                    });
                }
                return originalHistoryFn.apply(this, args);
            };
        }
        replaceOld(_global.history, 'pushState', historyReplaceFn);
        replaceOld(_global.history, 'replaceState', historyReplaceFn);
    },
    transform: function (collectedData) {
        return routeTransform(collectedData);
    },
    consumer: function (transformedData) {
        routeTransformedConsumer.call(this, transformedData);
    }
};

var consolePlugin = {
    name: "console",
    monitor: function (notify) {
        if (!('console' in _global)) {
            return;
        }
        var logType = ['log', 'debug', 'info', 'warn', 'error', 'assert'];
        logType.forEach(function (level) {
            if (!(level in _global.console))
                return;
            replaceOld(_global.console, level, function (originalConsole) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (originalConsole) {
                        notify("console", { args: args, level: level });
                        originalConsole.apply(_global.console, args);
                    }
                };
            });
        });
    },
    transform: function (collectedData) {
        return collectedData;
    },
    consumer: function (transformedData) {
        if (globalVar.isLogAddBreadcrumb) {
            addBreadcrumbInBrowser.call(this, transformedData, "Console", Severity.fromString(transformedData.level));
        }
    }
};

var name = "unhandledrejection";
var unhandlerejectionPlugin = {
    name: name,
    monitor: function (notify) {
        on(_global, name, function (ev) {
            notify(name, ev);
        });
    },
    transform: function (collectedData) {
        console.log('collectedData', collectedData);
        var data = {
            type: "PROMISE",
            message: unknownToString(collectedData.reason),
            url: getLocationHref(),
            name: collectedData.type,
            time: getTimestamp(),
            level: Severity.Low
        };
        if (isError(collectedData.reason)) {
            data = __assign(__assign({}, data), extractErrorStack(collectedData.reason, Severity.Low));
        }
        return data;
    },
    consumer: function (transformedData) {
        var breadcrumbStack = addBreadcrumbInBrowser.call(this, transformedData, "Unhandledrejection", Severity.Error);
        this.transport.send(transformedData, breadcrumbStack);
    }
};

function createBrowserInstance(options, plugins) {
    if (options === void 0) { options = {}; }
    if (plugins === void 0) { plugins = []; }
    var browserClient = new BrowserClient(options);
    var browserPlugins = [
        fetchPlugin,
        xhrPlugin,
        domPlugin,
        errorPlugin,
        hashRoutePlugin,
        historyRoutePlugin,
        consolePlugin,
        unhandlerejectionPlugin
    ];
    browserClient.use(__spreadArray(__spreadArray([], browserPlugins, true), plugins, true));
    return browserClient;
}
var init = createBrowserInstance;

exports.BrowserClient = BrowserClient;
exports.createBrowserInstance = createBrowserInstance;
exports.init = init;
/* follow me on Github! @cjinhuo */
//# sourceMappingURL=browser.js.map
