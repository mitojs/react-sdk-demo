/* @mitojs/shared version ' + 3.0.1 */
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

export { ERROR_TYPE_RE, MitoLog, MitoLogEmptyMsg, MitoLogEmptyTag, SDK_NAME, SDK_VERSION, Silent, globalVar };
/* follow me on Github! @cjinhuo */
//# sourceMappingURL=shared.esm.js.map
