const runMode = {
  development: "Development",
  test: "Test",
  uat:"Uat",
  release: "Release",
  debugBackEnd:"DebugBackEnd"
};

class RunMode {
  mode: string;
  constructor(mode: string) {
    this.mode = mode;
  }
  getConfig = ():Config => {
    switch (this.mode) {
      case runMode.development:
        return new DevelopmentConfig();
      case runMode.release:
        return new ReleaseConfig();
      case runMode.test:
        return new TestConfig();
      case runMode.uat:
        return new UatConfig();
      case runMode.debugBackEnd:
        return new DebugBackEndConfig();
      default:
        return new DevelopmentConfig();
    }
  }
}

interface Api {
  user: string;
  menus: string;
  v1test: string;
  v2test: string;
}

interface Config {
  name: string;
  prefix: string;
  footerText: string;
  icon:string;
  logo: string;
  logoBig: string;
  logoSmall: string;
  iconFontCSS: string;
  iconFontJS: string;
  
  openPages: string[];
  apiPrefix: string;
  mockApiPrefix: string;
  APIV1: string;
  APIV2: string;
  runMode:string,
  api: Api;
  getApi(): Api;
  systemCode:string;
  URL_SSO:string;
  URL_SCMINDEX:string;
  URL_OMSINDEX:string;
  URL_DRPINDEX:string;
  URL_BIINDEX:string;
}

//开发模式，或者后端开发直连模式
class DevelopmentConfig implements Config{
  name: string;
  prefix: string;
  footerText: string;
  icon:string;
  logo: string;
  logoBig: string;
  logoSmall: string;
  iconFontCSS: string;
  iconFontJS: string;
  openPages: string[];
  apiPrefix: string;
  mockApiPrefix: string;
  APIV1: string;
  APIV2: string;
  runMode:string;
  api: Api;
  systemCode:string;
  URL_SSO:string;
  URL_SCMINDEX:string;
  URL_OMSINDEX:string;
  URL_DRPINDEX:string;
  URL_BIINDEX:string;
  identityCookieKey:string;
  identityHeaderKey:string;
  constructor() {
    const APIV1: string = "/development/api/v1";
    const APIV2 = '/api/v2';
    this.name = 'HMC Admin';
    this.prefix = 'HMC';
    this.footerText = 'HuiMei Cloud  © 2017 HUIMEI GROUP';
    this.icon = "/favicon.ico";
    this.logo = '/hmc.png';
    this.logoBig = "/logo.png";
    this.logoSmall = "/logo_l.png";
    this.iconFontCSS = '/iconfont.css';
    this.iconFontJS = '/iconfont.js';
   
    this.openPages = ['/login','/switchUnit','/changePassword','/switchTenant', '/mobile/login', '/mobile/switchTenant','/mobile/switchUnit','/mobile/changePassword','/dingding/login'];
    this.apiPrefix = APIV1;
    this.mockApiPrefix = "/development/api/v1";
    this.APIV1 = APIV1;
    this.APIV2 = APIV2;
    this.runMode = runMode.development;
    this.api = this.getApi();
    this.systemCode = "UPMS";
    this.URL_SSO = "/login";
    this.URL_SCMINDEX="";
    this.URL_DRPINDEX = "";
    this.URL_OMSINDEX = "";
    this.URL_BIINDEX = "";
    this.identityCookieKey = "auth";
    this.identityHeaderKey = "Authorization";
  }
  getApi() {
    return {
      user: `${this.APIV1}/employee/loginInfo/get/:id`,
      menus: `${this.APIV1}/menus`,
      v1test: `${this.APIV1}/test`,
      v2test: `${this.APIV2}/test`,
    };
  }
}
//生产环境配置，开发人员请勿修改
class ReleaseConfig extends DevelopmentConfig {

  constructor() {
    super();
    const APIV1 = '/api/v1';
    const APIV2 = '/api/v2';

    
    this.apiPrefix = APIV1;
    this.APIV1 = APIV1;
    this.APIV2 = APIV2;
    this.api = this.getApi();
    this.runMode = runMode.release;
    this.URL_SCMINDEX="http://scm.hmcloud.com.cn";
    this.URL_DRPINDEX = "http://shop.hmcloud.com.cn";
    this.URL_OMSINDEX = "http://oms.hmcloud.com.cn";
    this.URL_BIINDEX = "http://bi.hmcloud.com.cn";
  }
  getApi() {
    return {
      user: `${this.APIV1}/employee/loginInfo/get/:id`,
      menus: `${this.APIV1}/test/menus`,
      v1test: `${this.APIV1}/test`,
      v2test: `${this.APIV2}/test`,
    };
  }
}
//测试模式配置，仿真环境
class UatConfig extends ReleaseConfig {

  constructor() {
    super();
    const APIV1 = '/api/v1';
    const APIV2 = '/api/v2';

    this.apiPrefix = APIV1;
    this.APIV1 = APIV1;
    this.APIV2 = APIV2;
    this.api = this.getApi();
    this.runMode = runMode.uat;
    this.URL_SCMINDEX = "http://uat-scm.hmcloud.com.cn";
    this.URL_DRPINDEX = "http://uat-shop.hmcloud.com.cn";
    this.URL_OMSINDEX = "http://uat-oms.hmcloud.com.cn";
    this.URL_BIINDEX = "http://192.168.7.154:8000"

  }
}

//测试模式配置，uat环境
class TestConfig extends ReleaseConfig {

  constructor() {
    super();
    const APIV1 = '/api/v1';
    const APIV2 = '/api/v2';
   
    this.apiPrefix = APIV1;
    this.APIV1 = APIV1;
    this.APIV2 = APIV2;
    this.api = this.getApi();
    this.runMode = runMode.test;
    this.URL_SCMINDEX="http://sand-scm.hmcloud.com.cn";
    this.URL_DRPINDEX = "http://sand-shop.hmcloud.com.cn";
    this.URL_OMSINDEX = "http://sand-oms.hmcloud.com.cn";
    this.URL_BIINDEX = "http://192.168.7.154:8000"
    
  }
}

//内网开发测试环境
class DebugBackEndConfig extends ReleaseConfig {
  constructor() {
    super();
    const APIV1: string = "/api/v1";
    const APIV2: string = "/api/v2";
    this.apiPrefix = APIV1;
    this.api = this.getApi();
    this.runMode = runMode.debugBackEnd;
    this.URL_SCMINDEX="http://192.168.7.210:8001";
    this.URL_DRPINDEX = "http://192.168.7.210:8003";
    this.URL_OMSINDEX = "http://192.168.7.210:8004";
    this.URL_BIINDEX = "http://192.168.7.154:8000"
  }
  getApi(): Api {
    return {
      user: `${this.apiPrefix}/employee/loginInfo/get/:id`,
      menus: `${this.apiPrefix}/menu/init`,
      v1test: `${this.apiPrefix}/test`,
      v2test: `${this.apiPrefix}/test`,
    };
  }
}

//开发人员切换模式只需要切换runMode值
export default new RunMode(runMode.debugBackEnd).getConfig();
