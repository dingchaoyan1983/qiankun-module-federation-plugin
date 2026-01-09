import { ModuleFederationPlugin  } from "@module-federation/enhanced/webpack";
import { RemoteTypeUrls  } from "@module-federation/sdk/dist/src/types/plugins/ModuleFederationPlugin"

interface RemoteDtsTypeUrl {
  name: string;
  publicPath: string;
}

export interface Remote {
  alias?: string,
  name: string;
  publicPath?: string;
  origin?: string;
}

export interface GetRemoteDtsTypesUrls {
  (RemoteDtsTypeUrls?: RemoteDtsTypeUrl[]): RemoteTypeUrls;
}

export interface GetRemoteEntryLoader {
  (remote: Remote): string;
}

export interface GetRemoteEntrys {
  (remotes?: Remote[]): Record<string, ReturnType<GetRemoteEntryLoader>>;
}

export type ModuleFederationPluginOptions = ConstructorParameters<typeof ModuleFederationPlugin>[0];

export interface QiankunModuleFederationPluginOptions extends Omit<ModuleFederationPluginOptions, "manifest" | "remotes" | "filename" | "library"> {
  remoteDtsTypeUrls?: RemoteDtsTypeUrl[];
  remotes?: Remote[],
}