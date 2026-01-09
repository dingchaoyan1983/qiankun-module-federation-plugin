import { ModuleFederationPlugin } from "@module-federation/enhanced/webpack";
import {
  type PluginDtsOptions
} from "@module-federation/sdk/dist/src/types/plugins/ModuleFederationPlugin";
import {
  QiankunModuleFederationPluginOptions,
  ModuleFederationPluginOptions
} from "./interface";
import {
  getRemoteDtsTypesUrls,
  getRemoteEntrys
} from "./utils";

export {
  type QiankunModuleFederationPluginOptions
} from "./interface"

export class QiankunModuleFederationPlugin extends ModuleFederationPlugin {
  static getOptions(options: QiankunModuleFederationPluginOptions): ModuleFederationPluginOptions {
    const remoteDtsTypesUrls = getRemoteDtsTypesUrls(options.remoteDtsTypeUrls);
    const remoteEntryLoaders = getRemoteEntrys(options.remotes);
    delete options?.remoteDtsTypeUrls;
    let _dts: PluginDtsOptions = {};
    if (typeof options?.dts === "boolean" || options?.dts === undefined) {
      _dts = {}
    } else {
      _dts = {
        ...options.dts
      }
    }

    if (typeof _dts.consumeTypes === "boolean" || _dts.consumeTypes === undefined) {
      _dts.consumeTypes = {}
    }

    _dts.consumeTypes.remoteTypeUrls = remoteDtsTypesUrls;
    return {
      ...options,
      library: {
        type: "umd",
        name: options?.name
      },
      filename: "remoteEntry.js?t=[contenthash]",
      manifest: false,
      remotes: remoteEntryLoaders,
      dts: _dts
    };
  }
  constructor(options: QiankunModuleFederationPluginOptions) {
    super(QiankunModuleFederationPlugin.getOptions(options));
  }
}

export default QiankunModuleFederationPlugin;
