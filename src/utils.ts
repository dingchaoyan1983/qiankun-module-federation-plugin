import {
  type GetRemoteDtsTypesUrls,
  type GetRemoteEntryLoader,
  type GetRemoteEntrys,
} from "./interface";

export const getRemoteDtsTypesUrls: GetRemoteDtsTypesUrls = (remoteDtsTypeUrls = []) => {
  return remoteDtsTypeUrls?.reduce((prev, curr) => {
    return ({
      ...prev,
      [curr.name]: {
        alias: curr.name,
        zip: `${curr.publicPath}/@mf-types.zip`
      }
    })
  }, {})
}

const getRemoteEntryLoader: GetRemoteEntryLoader = ({ name, publicPath = '/', origin = '' }) => {
  const code = 
`promise new Promise((resolve, reject) => {
  if (typeof window.${name} !== "undefined")
    return resolve(window.${name});
  const _origin = !!"${origin}" ? "${origin}" : window.location.origin;
  const now = new Date().getTime();
  __webpack_require__.l(_origin + "${publicPath}remoteEntry.js?t=" + now, (event) => {
      if (typeof window.${name} !== "undefined")
          return resolve(window.${name});
      var errorType = event && (event.type === 'load' ? 'missing' : event.type);
      var realSrc = event && event.target && event.target.src;
      var __webpack_error__ = new Error();
      __webpack_error__.message = 'Loading script failed.(' + errorType + ': ' + realSrc + ')';
      __webpack_error__.name = 'ScriptExternalLoadError';
      __webpack_error__.type = errorType;
      __webpack_error__.request = realSrc;
      reject(__webpack_error__);
  }, "${name}");
})`
  return code;
}

export const getRemoteEntrys: GetRemoteEntrys = (remoteEntryConfs = []) => {
  return remoteEntryConfs?.reduce((prev, curr) => {
    return ({
      ...prev,
      [curr.alias ?? curr.name]: getRemoteEntryLoader(curr)
    })
  }, {})
}
