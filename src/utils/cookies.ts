
import Cookies from "js-cookie";
import pathToRegexp from "path-to-regexp";

export function setCookie(key:string,value:any): void {
    Cookies.set(key, value);
}
export function clearCookie(key:string): void {
    Cookies.remove(key);
}

export function getCookie(key:string):string|undefined{
    return Cookies.get(key);
}

export function setLogin(authorization:string):void{
    setCookie("authorization",authorization);
}

export function clearLogin():void {
    clearCookie("authorization");
}

export function getAuthorization():string | undefined{
    return getCookie("authorization");
}


