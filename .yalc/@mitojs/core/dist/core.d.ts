import { AuthInfo } from '@mitojs/types';
import { BaseClientType } from '@mitojs/types';
import { BaseOptionsFieldsIntegrationType } from '@mitojs/types';
import { BaseOptionsType } from '@mitojs/types';
import { BasePluginType } from '@mitojs/types';
import { BreadcrumbPushData } from '@mitojs/types';
import { EventTypes } from '@mitojs/shared';
import { LogTypes } from '@mitojs/types';
import { Queue } from '@mitojs/utils';
import { ReportDataType } from '@mitojs/types';
import { TransportDataType } from '@mitojs/types';
import { VueInstance } from '@mitojs/types';

export declare abstract class BaseClient<O extends BaseOptionsFieldsIntegrationType = BaseOptionsFieldsIntegrationType, E extends EventTypes = EventTypes> implements BaseClientType {
    SDK_NAME: string;
    SDK_VERSION: string;
    options: BaseOptionsFieldsIntegrationType;
    abstract breadcrumb: Breadcrumb;
    abstract transport: BaseTransport;
    constructor(options: O);
    use(plugins: BasePluginType<E>[]): void;
    getOptions(): BaseOptionsFieldsIntegrationType;
    abstract isPluginEnable(name: EventTypes): boolean;
    abstract log(data: LogTypes): void;
}

export declare class BaseOptions<O extends BaseOptionsFieldsIntegrationType = BaseOptionsFieldsIntegrationType> implements BaseOptionsType<O> {
    enableTraceId: boolean;
    filterXhrUrlRegExp: RegExp;
    includeHttpUrlTraceIdRegExp: RegExp;
    traceIdFieldName: string;
    throttleDelayTime: number;
    beforeAppAjaxSend: any;
    vue: VueInstance;
    constructor();
    bindOptions(options: O): void;
    isFilterHttpUrl(url: string): boolean;
    setTraceId(httpUrl: string, callback: (headerFieldName: string, traceId: string) => void): void;
}

export declare abstract class BaseTransport<O extends BaseOptionsFieldsIntegrationType = BaseOptionsFieldsIntegrationType> {
    apikey: string;
    dsn: string;
    queue: Queue;
    beforeDataReport: Promise<TransportDataType | null | undefined | boolean> | TransportDataType | any | null | undefined | boolean;
    backTrackerId: unknown;
    configReportUrl: unknown;
    maxDuplicateCount: number;
    constructor();
    getAuthInfo(): AuthInfo;
    getTrackerId(): string | number;
    isSelfDsn(targetUrl: string): boolean;
    bindOptions(options?: Partial<O>): void;
    send(data: any, breadcrumb?: BreadcrumbPushData[]): Promise<void>;
    abstract post(data: TransportDataType | any, url: string): void;
    abstract sendToServer(data: TransportDataType | any, url: string): void;
    abstract getTransportData(data: ReportDataType): TransportDataType;
}

export declare class Breadcrumb<O extends BaseOptionsFieldsIntegrationType = BaseOptionsFieldsIntegrationType> {
    private maxBreadcrumbs;
    private beforePushBreadcrumb;
    private stack;
    constructor(options?: Partial<O>);
    push(data: BreadcrumbPushData): BreadcrumbPushData[];
    private immediatePush;
    private shift;
    clear(): void;
    getStack(): BreadcrumbPushData[];
    bindOptions(options?: Partial<O>): void;
}

declare type MonitorCallback = (data: any) => void;

export declare class Subscribe<T> {
    dep: Map<T, MonitorCallback[]>;
    constructor();
    watch(eventName: T, callBack: (data: any) => any): void;
    notify<D = any>(eventName: T, data: D): void;
}

export { }
