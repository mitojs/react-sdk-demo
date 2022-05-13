export declare const enum BaseBreadcrumbTypes {
    VUE = "Vue",
    REACT = "React"
}

export declare const enum BaseEventTypes {
    VUE = "vue"
}

export declare const enum BREADCRUMBCATEGORYS {
    HTTP = "http",
    USER = "user",
    DEBUG = "debug",
    EXCEPTION = "exception",
    LIFECYCLE = "lifecycle"
}

export declare type BreadcrumbTypes = BrowserBreadcrumbTypes | WxBreadcrumbTypes | BaseBreadcrumbTypes;

export declare const enum BrowserBreadcrumbTypes {
    ROUTE = "Route",
    CLICK = "UI.Click",
    CONSOLE = "Console",
    XHR = "Xhr",
    FETCH = "Fetch",
    UNHANDLEDREJECTION = "Unhandledrejection",
    RESOURCE = "Resource",
    CODE_ERROR = "Code Error",
    CUSTOMER = "Customer"
}

export declare const enum BrowserEventTypes {
    XHR = "xhr",
    FETCH = "fetch",
    CONSOLE = "console",
    DOM = "dom",
    HISTORY = "history",
    ERROR = "error",
    HASHCHANGE = "hashchange",
    UNHANDLEDREJECTION = "unhandledrejection",
    CUSTOMER = "Customer"
}

export declare const ERROR_TYPE_RE: RegExp;

export declare const enum ErrorTypes {
    UNKNOWN = "UNKNOWN",
    UNKNOWN_FUNCTION = "UNKNOWN_FUNCTION",
    JAVASCRIPT = "JAVASCRIPT",
    LOG = "LOG",
    HTTP = "HTTP",
    VUE = "VUE",
    REACT = "REACT",
    RESOURCE = "RESOURCE",
    PROMISE = "PROMISE",
    ROUTE = "ROUTE"
}

export declare type EventTypes = BrowserEventTypes | WxEventTypes | BaseEventTypes;

export declare const globalVar: {
    isLogAddBreadcrumb: boolean;
    crossOriginThreshold: number;
};

export declare const enum HTTP_CODE {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    INTERNAL_EXCEPTION = 500
}

export declare const enum HttpTypes {
    XHR = "xhr",
    FETCH = "fetch"
}

export declare const enum LinstenerTypes {
    Touchmove = "touchmove",
    Tap = "tap",
    Longtap = "longtap",
    Longpress = "longpress"
}

export declare const enum MethodTypes {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Delete = "DELETE"
}

export declare const MitoLog = "Mito.log";

export declare const MitoLogEmptyMsg = "empty.msg";

export declare const MitoLogEmptyTag = "empty.tag";

export declare const SDK_NAME = "mitojs";

export declare const SDK_VERSION: string;

export declare const Silent = "silent";

export declare const enum ToStringTypes {
    String = "String",
    Number = "Number",
    Boolean = "Boolean",
    RegExp = "RegExp",
    Null = "Null",
    Undefined = "Undefined",
    Symbol = "Symbol",
    Object = "Object",
    Array = "Array",
    process = "process",
    Window = "Window",
    Function = "Function"
}

export declare const enum TrackActionType {
    PAGE = "PAGE",
    EVENT = "EVENT",
    VIEW = "VIEW",
    DURATION = "DURATION",
    DURATION_VIEW = "DURATION_VIEW",
    OTHER = "OTHER"
}

export declare const enum WxAppEvents {
    AppOnLaunch = "AppOnLaunch",
    AppOnShow = "AppOnShow",
    AppOnHide = "AppOnHide",
    AppOnError = "AppOnError",
    AppOnPageNotFound = "AppOnPageNotFound",
    AppOnUnhandledRejection = "AppOnUnhandledRejection"
}

export declare const enum WxBaseEventTypes {
    REQUEST = "request",
    CONSOLE = "console",
    ROUTE = "route",
    DOM = "dom",
    MINI_PERFORMANCE = "miniPerformance",
    MINI_MEMORY_WARNING = "miniMemoryWarning",
    MINI_NETWORK_STATUS_CHANGE = "miniNetworkStatusChange",
    MINI_BATTERY_INFO = "miniBatteryInfo"
}

export declare const enum WxBreadcrumbTypes {
    VUE = "Vue",
    REACT = "React",
    ROUTE = "Route",
    CONSOLE = "Console",
    XHR = "Xhr",
    UNHANDLEDREJECTION = "Unhandledrejection",
    RESOURCE = "Resource",
    CODE_ERROR = "Code Error",
    CUSTOMER = "Customer",
    APP_ON_SHOW = "App On Show",
    APP_ON_LAUNCH = "App On Launch",
    APP_ON_HIDE = "App On Hide",
    PAGE_ON_LOAD = "Page On Load",
    PAGE_ON_SHOW = "Page On Show",
    PAGE_ON_READY = "Page On Ready",
    PAGE_ON_HIDE = "Page On Hide",
    PAGE_ON_UNLOAD = "Page On Unload",
    PAGE_ON_SHARE_APP_MESSAGE = "Page On Share App Message",
    PAGE_ON_SHARE_TIMELINE = "Page On Share Timeline",
    PAGE_ON_TAB_ITEM_TAP = "Page On Tab Item Tap",
    TAP = "UI.Tap",
    TOUCHMOVE = "UI.Touchmove"
}

export declare type WxEventTypes = WxAppEvents | WxPageEvents | WxBaseEventTypes;

export declare const enum WxPageEvents {
    PageOnLoad = "PageOnLoad",
    PageOnShow = "PageOnShow",
    PageOnReady = "PageOnReady",
    PageOnUnload = "PageOnUnload",
    PageOnHide = "PageOnHide",
    PageOnShareAppMessage = "PageOnShareAppMessage",
    PageOnShareTimeline = "PageOnShareTimeline",
    PageOnTabItemTap = "PageOnTabItemTap"
}

export declare const enum WxRouteEvents {
    SwitchTab = "switchTab",
    ReLaunch = "reLaunch",
    RedirectTo = "redirectTo",
    NavigateTo = "navigateTo",
    NavigateBack = "navigateBack",
    NavigateToMiniProgram = "navigateToMiniProgram",
    RouteFail = "routeFail"
}

export { }
