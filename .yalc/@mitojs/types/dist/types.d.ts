import { Breadcrumb } from '@mitojs/core';
import { BREADCRUMBCATEGORYS } from '@mitojs/shared';
import { BreadcrumbPushData as BreadcrumbPushData_2 } from '@mitojs/types';
import { BreadcrumbTypes } from '@mitojs/shared';
import { ErrorTypes } from '@mitojs/shared';
import { EventTypes } from '@mitojs/shared';
import { HttpTypes } from '@mitojs/shared';
import { IAnyObject as IAnyObject_2 } from '@mitojs/types';
import { Severity } from '@mitojs/utils';
import { TrackActionType } from '@mitojs/shared';
import { TransportDataType as TransportDataType_2 } from '@mitojs/types';
import { VueInstance as VueInstance_2 } from '@mitojs/types';

export declare interface AuthInfo {
    apikey?: string;
    sdkVersion: string;
    sdkName: string;
    trackerId?: string;
}

export declare interface BaseClientType<O extends BaseOptionsFieldsIntegrationType = BaseOptionsFieldsIntegrationType> {
    SDK_NAME?: string;
    SDK_VERSION: string;
    options: O;
    getOptions(): O;
}

export declare type BaseOptionsFieldsIntegrationType = BaseOptionsFieldsType & BaseOptionsHooksType;

export declare interface BaseOptionsFieldsType {
    dsn?: string;
    disabled?: boolean;
    apikey?: string;
    debug?: boolean;
    enableTraceId?: boolean;
    traceIdFieldName?: string;
    includeHttpUrlTraceIdRegExp?: RegExp;
    filterXhrUrlRegExp?: RegExp;
    maxBreadcrumbs?: number;
    throttleDelayTime?: number;
    maxDuplicateCount?: number;
    vue?: VueInstance_2;
}

export declare interface BaseOptionsHooksType {
    beforeDataReport?(event: TransportDataType_2): Promise<TransportDataType_2 | null | CANCEL> | TransportDataType_2 | any | CANCEL | null;
    configReportUrl?(event: TransportDataType_2, url: string): string;
    beforePushBreadcrumb?(breadcrumb: Breadcrumb, hint: BreadcrumbPushData_2): BreadcrumbPushData_2 | CANCEL;
    beforeAppAjaxSend?(config: IRequestHeaderConfig, setRequestHeader: IBeforeAppAjaxSendConfig): void;
    backTrackerId?(): string | number;
}

export declare interface BaseOptionsType<O extends BaseOptionsFieldsIntegrationType> extends BaseOptionsFieldsIntegrationType {
    bindOptions(options: O): void;
}

export declare interface BasePluginType<T extends EventTypes = EventTypes, C extends BaseClientType = BaseClientType> {
    name: T;
    monitor: (this: C, notify: (eventName: T, data: any) => void) => void;
    transform?: (this: C, collectedData: any) => any;
    consumer?: (this: C, transformedData: any) => void;
}

export declare interface BaseTransformType {
    type?: ErrorTypes;
    message?: string;
    time?: number;
    name?: string;
    level?: string;
    url: string;
}

export declare interface BreadcrumbPushData {
    type: BreadcrumbTypes;
    data: ReportDataType | RouteChangeCollectType | ConsoleCollectType | TNumStrObj;
    category?: BREADCRUMBCATEGORYS;
    time?: number;
    level: Severity;
}

declare type CANCEL = null | undefined | boolean;

export declare interface ConsoleCollectType {
    args: any[];
    level: string;
}

export declare interface DeviceInfo {
    netType: string;
    clientWidth: number;
    clientHeight: number;
    ratio: number;
}

export declare interface ErrorStack {
    args: any[];
    func: string;
    column: number;
    line: number;
    url: string;
}

export declare interface HttpCollectedType {
    request: {
        httpType?: HttpTypes;
        traceId?: string;
        method?: string;
        url?: string;
        data?: any;
    };
    response: {
        status?: number;
        data?: any;
    };
    errMsg?: string;
    elapsedTime?: number;
    time?: number;
}

export declare type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS';

export declare interface HttpTransformedType extends HttpCollectedType, BaseTransformType {
}

export declare interface IAnyObject {
    [key: string]: any;
}

export declare interface IBeforeAppAjaxSendConfig {
    setRequestHeader: TSetRequestHeader;
}

declare interface IRequestHeaderConfig {
    url: HttpMethod;
    method: string;
}

export declare interface LocalStorageValue<T = any> {
    expireTime?: number;
    value: T | string;
}

export declare interface LogTypes {
    message?: TNumStrObj;
    tag?: TNumStrObj;
    level?: Severity;
    ex?: Error | any;
}

export declare interface MITOXMLHttpRequest extends XMLHttpRequest {
    [key: string]: any;
    httpCollect?: HttpCollectedType;
}

export declare interface ReportDataType extends Partial<HttpTransformedType> {
    stack?: any;
    errorId?: number;
    componentName?: string;
    propsData?: any;
    customTag?: string;
}

export declare interface ResourceErrorTarget {
    src?: string;
    href?: string;
    localName?: string;
}

export declare interface RouteChangeCollectType {
    from: string;
    to: string;
}

export declare type TNumStrObj = number | string | object;

export declare interface TrackReportDataType {
    id?: string;
    trackId?: string;
    actionType?: TrackActionType | any;
    startTime?: number;
    durationTime?: number;
    trackTime?: number;
    isTrack?: boolean;
    [key: string]: any;
}

export declare interface TransportDataType {
    authInfo?: AuthInfo;
    breadcrumb?: BreadcrumbPushData[];
    data?: ReportDataType;
    record?: any[];
    deviceInfo?: DeviceInfo;
}

declare type TSetRequestHeader = (key: string, value: string) => {};

export declare interface ViewModel {
    [key: string]: any;
    $root?: Record<string, unknown>;
    $options?: {
        [key: string]: any;
        name?: string;
        propsData?: IAnyObject_2;
        _componentTag?: string;
        __file?: string;
        props?: IAnyObject_2;
    };
    $props?: Record<string, unknown>;
}

export declare type voidFun = () => void;

export declare interface VueConfiguration {
    silent?: boolean;
    errorHandler?(err: Error, vm: ViewModel | any, info: string): void;
    warnHandler?(msg: string, vm: ViewModel | any, trace: string): void;
    [key: string]: any;
}

export declare interface VueInstance {
    [key: string]: any;
    config?: VueConfiguration;
    version: string;
}

export declare interface WxParsedErrorType {
    message: string;
    name: string;
    stack: ErrorStack[];
}

export { }
