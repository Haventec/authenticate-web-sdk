/**
 * This Device name service is a TypeScript port from Sniffr https://www.npmjs.com/package/sniffr
 */


export class HT_DeviceService {

    private properties = {
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

    private UNKNOWN = 'Unknown';
    private propertyNames = Object.keys(this.properties);
    private browser = {name: this.UNKNOWN, version: [], versionString: this.UNKNOWN};
    private device = {name: this.UNKNOWN, version: [], versionString: this.UNKNOWN};
    private os = {name: this.UNKNOWN, version: [], versionString: this.UNKNOWN};

    constructor() {

        let userAgent = '';

        if ( typeof(navigator) !== 'undefined' ) {

            userAgent = (navigator.userAgent || "").toLowerCase();

            this.propertyNames.forEach(propertyName => {
                this.determineProperty(propertyName, userAgent);
            });
        }

        // this.trace(userAgent);
        // this.debug('Device: ' + this.device.name + ', Browser: ' + this.browser.name + ', OS: ' + this.os.name);
    }

    getDeviceName(): string {
        if (this.device.name !== this.UNKNOWN) {
            return this.device.name;
        } else if (this.os.name !== this.UNKNOWN || this.browser.name !== this.UNKNOWN) {
            return this.os.name + ' ' + this.browser.name;
        } else {
            return 'Unknown device';
        }
    }

    private determineProperty(propertyName, userAgent): void {
        this.properties[propertyName].forEach(propertyMatcher => {
            let propertyRegex = propertyMatcher[0];
            let propertyValue = propertyMatcher[1];

            let match = userAgent.match(propertyRegex);

            if (match) {
                this[propertyName].name = propertyValue;

                if (match[2]) {
                    this[propertyName].versionString = match[2];
                    this[propertyName].version = [];
                } else if (match[1]) {
                    this[propertyName].versionString = match[1].replace(/_/g, ".");
                    this[propertyName].version = this.parseVersion(match[1]);
                } else {
                    this[propertyName].versionString = this.UNKNOWN;
                    this[propertyName].version = [];
                }
            }
        });
    }

    private parseVersion(versionString): number {
        return versionString.split(/[\._]/).map(versionPart => {
            return parseInt(versionPart);
        });
    }

    private trace(msg: string) {
        console.log(msg);
    }

    private debug(msg: string) {
        console.log(msg);
    }
}
