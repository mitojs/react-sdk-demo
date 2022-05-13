/* @mitojs/core version ' + 3.0.1 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
function isEmpty(wat) {
    return (variableTypeDetection.isString(wat) && wat.trim() === '') || wat === undefined || wat === null;
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

var defaultFunctionName = '<anonymous>';
function getFunctionName(fn) {
    if (!fn || typeof fn !== 'function') {
        return defaultFunctionName;
    }
    return fn.name || defaultFunctionName;
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
    callback();
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
function validateOptionsAndSet(targetArr) {
    var _this = this;
    targetArr.forEach(function (_a) {
        var target = _a[0], targetName = _a[1], expectType = _a[2];
        return toStringValidateOption(target, targetName, expectType) && (_this[targetName] = target);
    });
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

exports.BaseClient = BaseClient;
exports.BaseOptions = BaseOptions;
exports.BaseTransport = BaseTransport;
exports.Breadcrumb = Breadcrumb;
exports.Subscribe = Subscribe;
/* follow me on Github! @cjinhuo */
//# sourceMappingURL=core.js.map
