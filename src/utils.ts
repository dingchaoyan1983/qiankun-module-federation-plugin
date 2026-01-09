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
  return `promise new Promise(resolve => {
            const now = new Date().getTime();
            const _origin = !!"${origin}" ? "${origin}" : window.location.origin;
            const remoteUrl = _origin + '${publicPath}remoteEntry.js?t=' + now;
            const remoteScriptId = "mf-remotes-${name}";
            const script = document.createElement('script');
            script.setAttribute("id", remoteScriptId);
            script.src = remoteUrl;
            script.onload = () => {
              resolve({
                get: (...request) => {
                  return window.${name}.get(...request)
                },
                init: (...arg) => {
                  try {
                    return window.${name}.init(...arg);
                  } catch (e) {
                    console.log('remote container already initialized');
                  }
                }
              });
            };
            script.onerror = () => {
              console.log('remote container ${name} load failed');
            };
            document.head.appendChild(script);
          })`;
}

export const getRemoteEntrys: GetRemoteEntrys = (remoteEntryConfs = []) => {
  return remoteEntryConfs?.reduce((prev, curr) => {
    return ({
      ...prev,
      [curr.alias ?? curr.name]: getRemoteEntryLoader(curr)
    })
  }, {})
}
