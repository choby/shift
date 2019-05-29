import config from "./config";
import { getAuthorization, setLogin } from "./cookies"
import pathToRegexp from "path-to-regexp";
import * as queryString from "query-string";
// import store from "../index";
import { routerRedux } from 'dva/router';
// import { string } from "prop-types";

export function returnToSystem() {
    const match: RegExpExecArray | null = pathToRegexp("?systemCode=:systemCode").exec(location.search);
    if (match) {
        const search = queryString.parse(location.search);
        const  { systemCode, device } = search;
        const authorization = getAuthorization();
        switch (systemCode) {
            case "SCM":
            case "scm":
                location.href = `${config.URL_SCMINDEX}?authorization=${authorization}`;
                break;
            case "OMS":
            case "oms":
                location.href = `${config.URL_OMSINDEX}?authorization=${authorization}`;
                break;
            case "DRP":
            case "drp":
              if(device && device.toLowerCase() === 'android') {
                // @ts-ignore
                androidObj.onSuccess(authorization);
              } else {
                location.href = `${config.URL_DRPINDEX}?authorization=${authorization}`;
              }
              break;
            case "BI":
            case "bi":
                location.href = `${config.URL_BIINDEX}?authorization=${authorization}`;
                break;
            case "UPMS":
            case "upms":
                location.href ="/";
                break;  
        }
    }
    else {
        location.href ="/";
    }
}

function getRequestSysCode(){
    let systemCode = config.systemCode;
    const match: RegExpExecArray | null = pathToRegexp("?systemCode=:systemCode").exec(location.search);
    if (match) {
         systemCode = match[1].split("&")[0];
    }
    return systemCode;
}

export function setLoginCookie(response: any) {
    if (response && response.data && response.data.Authorization) {
        const authorization = response.data.Authorization;
        setLogin(authorization);
    }
}

export function goswitchUnit() {
    // @ts-ignore
    const { dispatch } = window.g_app._store;
    const systemCode = getRequestSysCode();
    const search = queryString.parse(location.search);
    const  { device } = search;
    if (device && (device.toLowerCase() === 'android' || device.toLowerCase() === 'ios' || device.toLowerCase() === 'mobile')) { 
        dispatch(routerRedux.push({
            pathname: `/mobile/switchUnit`,
            search: queryString.stringify({
                systemCode: systemCode,
                device,
            }, {sort: false})
        }));
    } else {
       
            dispatch(routerRedux.push({
                pathname: `/switchUnit`,
                search: queryString.stringify({
                    systemCode: systemCode,
                })
            }));
            
    }
}

export function goSwitchTenant() {
    // @ts-ignore
    const { dispatch } = window.g_app._store;
    const systemCode = getRequestSysCode();
    const search = queryString.parse(location.search);
    const  { device } = search;
    if(device && device.toLowerCase() === 'android') {
        dispatch(routerRedux.push({
            pathname: `/mobile/switchTenant`,
            search: queryString.stringify({
                systemCode: systemCode,
                device,
            }, {sort: false})
        }));              
    } else {
        dispatch(routerRedux.push({
            pathname: `/switchTenant`,
            search: queryString.stringify({
                systemCode: systemCode,
            })
        }));
    }
}

export function goChangePassword() {
    // @ts-ignore
    const { dispatch } = window.g_app._store;
    const systemCode = getRequestSysCode();
    const search = queryString.parse(location.search);
    const  { device } = search;
    if(device && device.toLowerCase() === 'android') {
        dispatch(routerRedux.push({
            pathname: `/mobile/changePassword`,
            search: queryString.stringify({
                systemCode: systemCode,
                device,
            }, {sort: false})
        }));     
    } else {
        dispatch(routerRedux.push({
            pathname: `/changePassword`,
            search: queryString.stringify({
                systemCode: systemCode,
            })
        }));
    }
}

export function goLogin() {
    // @ts-ignore
    const { dispatch } = window.g_app._store;
    const systemCode = getRequestSysCode();
    const search = queryString.parse(location.search);
    const { device } = search;
    if (device && (device.toLowerCase() === 'android' || device.toLowerCase() === 'ios' || device.toLowerCase() === 'mobile')) { 
        dispatch(routerRedux.push({
            pathname: `/mobile/login`,
            search: queryString.stringify({
                systemCode: systemCode,
                device,
            }, { sort: false })
        })); 
    } else { 
        dispatch(routerRedux.push({
            pathname: `/login`,
            search: queryString.stringify({
                systemCode: systemCode,
            })
        }))  
    }
}



