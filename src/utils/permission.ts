import config from "./config";

const permission = {
  verify: (permissionCode: string): boolean => {
    if(config.runMode === "Development")
      return true;
    const permissionList = JSON.parse(sessionStorage.getItem("permissionCodes"));
    if (permissionList.includes(permissionCode))
      return true;
    return false;
  },
  setCache: (permissionCodes: string[]): void => {
    sessionStorage.removeItem("permissionCodes");
    sessionStorage.setItem("permissionCodes", JSON.stringify(permissionCodes));
  },
}

export default permission;
