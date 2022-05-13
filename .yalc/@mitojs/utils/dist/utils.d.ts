/// <reference types="wechat-miniprogram" />

import { BREADCRUMBCATEGORYS } from '@mitojs/shared';
import { BrowserBreadcrumbTypes } from '@mitojs/shared';
import { DeviceInfo } from '@mitojs/types';
import { EventTypes } from '@mitojs/shared';
import { IAnyObject } from '@mitojs/types';
import { ReportDataType } from '@mitojs/types';
import { ToStringTypes } from '@mitojs/shared';
import { WxBreadcrumbTypes } from '@mitojs/shared';
import { WxParsedErrorType } from '@mitojs/types';

export declare function createErrorId(data: ReportDataType, apikey: string, maxDuplicateCount: number): number | null;

export declare const defaultFunctionName = "<anonymous>";

export declare function extractErrorStack(ex: any, level: Severity): {
    time: number;
    url: string;
    name: any;
    level: Severity;
    message: any;
} | {
    stack: any[];
    time: number;
    url: string;
    name: any;
    level: Severity;
    message: any;
};

export declare function firstStrtoLowerCase(str: string): string;

export declare function firstStrtoUppercase(str: string): string;

export declare function fromHttpStatus(httpStatus: number): SpanStatus.Ok | SpanStatus.DeadlineExceeded | SpanStatus.Unauthenticated | SpanStatus.PermissionDenied | SpanStatus.NotFound | SpanStatus.ResourceExhausted | SpanStatus.InvalidArgument | SpanStatus.Unimplemented | SpanStatus.Unavailable | SpanStatus.InternalError | SpanStatus.UnknownError | SpanStatus.AlreadyExists | SpanStatus.FailedPrecondition;

export declare function generateUUID(): string;

export declare function getAppId(): string;

export declare function getBigVersion(version: string): number;

export declare function getBreadcrumbCategoryInBrowser(type: BrowserBreadcrumbTypes): BREADCRUMBCATEGORYS;

export declare function getBreadcrumbCategoryInWx(type: WxBreadcrumbTypes): BREADCRUMBCATEGORYS;

export declare function getCurrentRoute(): string;

export declare function getFlutterRealOrigin(url: string): string;

export declare function getFlutterRealPath(url: string): string;

export declare function getFunctionName(fn: unknown): string;

export declare function getGlobal<T>(): MITOGlobal & T;

export declare function getLocationHref(): string;

export declare function getObjectWithForIn<T = IAnyObject>(obj: IAnyObject): T;

export declare function getRealPath(url: string): string;

export declare function getTimestamp(): number;

export declare function getUrlWithEnv(): string;

export declare const _global: MITOGlobal & Window & WechatMiniprogram.Wx;

export declare function hashCode(str: string): number;

export declare function htmlElementAsString(target: HTMLElement): string;

export declare function interceptStr(str: string, interceptLength: number): string;

export declare const isBrowserEnv: boolean;

export declare function isEmpty(wat: any): boolean;

export declare function isEmptyObject(obj: Object): boolean;

export declare function isError(wat: any): boolean;

export declare function isExistProperty(obj: Object, key: string | number | symbol): boolean;

export declare function isInclude(origin: string, target: string): boolean;

export declare function isInstanceOf(wat: any, base: any): boolean;

export declare const isNodeEnv: boolean;

export declare function isType(type: string): (value: any) => boolean;

export declare const isWxMiniEnv: boolean;

export declare class Logger {
    private enabled;
    private _console;
    constructor();
    disable(): void;
    bindOptions(debug: boolean): void;
    enable(): void;
    getEnableStatus(): boolean;
    log(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}

export declare const logger: Logger;

declare interface MITOGlobal {
    console?: Console;
    __MITO__?: MitoSupport;
}

export declare interface MitoSupport {
    logger: Logger;
    replaceFlag: {
        [key in EventTypes]?: boolean;
    };
    record?: any[];
    deviceInfo?: DeviceInfo;
}

export declare const nativeToString: () => string;

export declare function nativeTryCatch(fn: () => void, errorFn?: (err: any) => void): void;

export declare function on(target: {
    addEventListener: Function;
}, eventName: TotalEventName, handler: Function, opitons?: boolean | unknown): void;

export declare function parseErrorString(str: string): WxParsedErrorType;

export declare function parseUrlToObj(url: string): {
    host?: string;
    path?: string;
    protocol?: string;
    relative?: string;
};

export declare class Queue {
    private readonly micro;
    private stack;
    private isFlushing;
    constructor();
    addTask(fn: () => void): void;
    clear(): void;
    getStack(): any[];
    flushStack(): void;
}

export declare function removeHashPath(url: string): string;

export declare function replaceOld(source: IAnyObject, name: string, replacement: (...args: any[]) => any, isForced?: boolean): void;

export declare function safeStringify(obj: object): string;

export declare function setUrlQuery(url: string, query: object): string;

export declare enum Severity {
    Else = "else",
    Error = "error",
    Warning = "warning",
    Info = "info",
    Debug = "debug",
    Low = "low",
    Normal = "normal",
    High = "high",
    Critical = "critical"
}

export declare namespace Severity {
    export function fromString(level: string): Severity;
}

export declare function silentConsoleScope(callback: Function): void;

export declare function sleepRun(fn: () => void, delay?: number): void;

export declare function sortObjByKey<T = object>(obj: T): T;

export declare const enum SpanStatus {
    Ok = "ok",
    DeadlineExceeded = "deadline_exceeded",
    Unauthenticated = "unauthenticated",
    PermissionDenied = "permission_denied",
    NotFound = "not_found",
    ResourceExhausted = "resource_exhausted",
    InvalidArgument = "invalid_argument",
    Unimplemented = "unimplemented",
    Unavailable = "unavailable",
    InternalError = "internal_error",
    UnknownError = "unknown_error",
    Cancelled = "cancelled",
    AlreadyExists = "already_exists",
    FailedPrecondition = "failed_precondition",
    Aborted = "aborted",
    OutOfRange = "out_of_range",
    DataLoss = "data_loss"
}

export declare function stringToObjAndOrder(reason: string): string;

export declare const _support: MitoSupport;

export declare function supportsHistory(): boolean;

export declare function throttle(fn: Function, delay: number): Function;

export declare function toStringAny(target: any, type: ToStringTypes): boolean;

export declare function toStringValidateOption(target: any, targetName: string, expectType: ToStringTypes): boolean;

declare type TotalEventName = keyof GlobalEventHandlersEventMap | keyof XMLHttpRequestEventTargetEventMap | keyof WindowEventMap;

export declare function unknownToString(target: unknown): string;

export declare function validateOptionsAndSet(this: any, targetArr: [any, string, ToStringTypes][]): void;

export declare const variableTypeDetection: {
    isNumber: (value: any) => boolean;
    isString: (value: any) => boolean;
    isBoolean: (value: any) => boolean;
    isNull: (value: any) => boolean;
    isUndefined: (value: any) => boolean;
    isSymbol: (value: any) => boolean;
    isFunction: (value: any) => boolean;
    isObject: (value: any) => boolean;
    isArray: (value: any) => boolean;
    isProcess: (value: any) => boolean;
    isWindow: (value: any) => boolean;
};

export { }
