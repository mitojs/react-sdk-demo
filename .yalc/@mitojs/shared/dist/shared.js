/* @mitojs/shared version ' + 3.0.1 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.ERROR_TYPE_RE = ERROR_TYPE_RE;
exports.MitoLog = MitoLog;
exports.MitoLogEmptyMsg = MitoLogEmptyMsg;
exports.MitoLogEmptyTag = MitoLogEmptyTag;
exports.SDK_NAME = SDK_NAME;
exports.SDK_VERSION = SDK_VERSION;
exports.Silent = Silent;
exports.globalVar = globalVar;
/* follow me on Github! @cjinhuo */
//# sourceMappingURL=shared.js.map
