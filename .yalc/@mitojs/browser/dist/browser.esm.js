/* @mitojs/browser version ' + 3.0.1 */
import { BaseOptions, BaseTransport, Breadcrumb, BaseClient } from '@mitojs/core';
import { Silent, MitoLog, MitoLogEmptyMsg, MitoLogEmptyTag, globalVar, ERROR_TYPE_RE } from '@mitojs/shared';
import { validateOptionsAndSet, toStringValidateOption, safeStringify, firstStrtoUppercase, Severity, isError, extractErrorStack, unknownToString, getTimestamp, getLocationHref, getBreadcrumbCategoryInBrowser, _global, replaceOld, variableTypeDetection, on, fromHttpStatus, getRealPath, throttle, htmlElementAsString, interceptStr, isExistProperty, parseUrlToObj, supportsHistory } from '@mitojs/utils';

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
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

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

export { BrowserClient, createBrowserInstance, init };
/* follow me on Github! @cjinhuo */
//# sourceMappingURL=browser.esm.js.map
