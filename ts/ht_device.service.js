"use strict";
/**
 * This Device name service is a TypeScript port from Sniffr https://www.npmjs.com/package/sniffr
 */
Object.defineProperty(exports, "__esModule", { value: true });
var HT_DeviceService = /** @class */ (function () {
    function HT_DeviceService() {
        var _this = this;
        this.properties = {
            browser: [
                [/msie ([\.\_\d]+)/, "IE"],
                [/trident\/.*?rv:([\.\_\d]+)/, "IE"],
                [/firefox\/([\.\_\d]+)/, "Firefox"],
                [/chrome\/([\.\_\d]+)/, "Chrome"],
                [/version\/([\.\_\d]+).*?safari/, "Safari"],
                [/mobile safari ([\.\_\d]+)/, "Safari"],
                [/android.*?version\/([\.\_\d]+).*?safari/, "com.android.browser"],
                [/crios\/([\.\_\d]+).*?safari/, "Chrome"],
                [/opera/, "Opera"],
                [/opera\/([\.\_\d]+)/, "Opera"],
                [/opera ([\.\_\d]+)/, "Opera"],
                [/opera mini.*?version\/([\.\_\d]+)/, "opera.mini"],
                [/opios\/([a-z\.\_\d]+)/, "Opera"],
                [/blackberry/, "Blackberry"],
                [/blackberry.*?version\/([\.\_\d]+)/, "Blackberry"],
                [/bb\d+.*?version\/([\.\_\d]+)/, "Blackberry"],
                [/rim.*?version\/([\.\_\d]+)/, "Blackberry"],
                [/iceweasel\/([\.\_\d]+)/, "iceweasel"],
                [/edge\/([\.\d]+)/, "Edge"]
            ],
            os: [
                [/linux ()([a-z\.\_\d]+)/, "Linux"],
                [/mac os x/, "MacOS"],
                [/mac os x.*?([\.\_\d]+)/, "MacOS"],
                [/os ([\.\_\d]+) like mac os/, "iOS"],
                [/openbsd ()([a-z\.\_\d]+)/, "Openbsd"],
                [/android/, "Android"],
                [/android ([a-z\.\_\d]+);/, "Android"],
                [/mozilla\/[a-z\.\_\d]+ \((?:mobile)|(?:tablet)/, "FirefoxOS"],
                [/windows\s*(?:nt)?\s*([\.\_\d]+)/, "Windows"],
                [/windows phone.*?([\.\_\d]+)/, "windows.phone"],
                [/windows mobile/, "windows.mobile"],
                [/blackberry/, "BlackberryOS"],
                [/bb\d+/, "BlackberryOS"],
                [/rim.*?os\s*([\.\_\d]+)/, "BlackberryOS"]
            ],
            device: [
                [/ipad/, "iPad"],
                [/iphone/, "iPhone"],
                [/lumia/, "Lumia"],
                [/htc/, "HTC"],
                [/nexus/, "Nexus"],
                [/galaxy nexus/, "Galaxy.Nexus"],
                [/nokia/, "Nokia"],
                [/ gt\-/, "Galaxy"],
                [/ sm\-/, "Galaxy"],
                [/ lgms/, "LG"],
                [/xbox/, "Xbox"],
                [/(?:bb\d+)|(?:blackberry)|(?: rim )/, "Blackberry"]
            ]
        };
        this.UNKNOWN = 'Unknown';
        this.propertyNames = Object.keys(this.properties);
        this.browser = { name: this.UNKNOWN, version: [], versionString: this.UNKNOWN };
        this.device = { name: this.UNKNOWN, version: [], versionString: this.UNKNOWN };
        this.os = { name: this.UNKNOWN, version: [], versionString: this.UNKNOWN };
        var userAgent = '';
        if (typeof (navigator) !== 'undefined') {
            userAgent = (navigator.userAgent || "").toLowerCase();
            this.propertyNames.forEach(function (propertyName) {
                _this.determineProperty(propertyName, userAgent);
            });
        }
        // this.trace(userAgent);
        // this.debug('Device: ' + this.device.name + ', Browser: ' + this.browser.name + ', OS: ' + this.os.name);
    }
    HT_DeviceService.prototype.getDeviceName = function () {
        if (this.device.name !== this.UNKNOWN) {
            return this.device.name;
        }
        else if (this.os.name !== this.UNKNOWN || this.browser.name !== this.UNKNOWN) {
            return this.os.name + ' ' + this.browser.name;
        }
        else {
            return 'Unknown device';
        }
    };
    HT_DeviceService.prototype.determineProperty = function (propertyName, userAgent) {
        var _this = this;
        this.properties[propertyName].forEach(function (propertyMatcher) {
            var propertyRegex = propertyMatcher[0];
            var propertyValue = propertyMatcher[1];
            var match = userAgent.match(propertyRegex);
            if (match) {
                _this[propertyName].name = propertyValue;
                if (match[2]) {
                    _this[propertyName].versionString = match[2];
                    _this[propertyName].version = [];
                }
                else if (match[1]) {
                    _this[propertyName].versionString = match[1].replace(/_/g, ".");
                    _this[propertyName].version = _this.parseVersion(match[1]);
                }
                else {
                    _this[propertyName].versionString = _this.UNKNOWN;
                    _this[propertyName].version = [];
                }
            }
        });
    };
    HT_DeviceService.prototype.parseVersion = function (versionString) {
        return versionString.split(/[\._]/).map(function (versionPart) {
            return parseInt(versionPart);
        });
    };
    HT_DeviceService.prototype.trace = function (msg) {
        console.log(msg);
    };
    HT_DeviceService.prototype.debug = function (msg) {
        console.log(msg);
    };
    return HT_DeviceService;
}());
exports.HT_DeviceService = HT_DeviceService;
