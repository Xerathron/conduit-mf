import axios from 'axios';
import { LoadRemoteModuleOptions } from '../models/micro-frontend.model';
import { AXIOS_CONFIG } from './axios.config';

type Scope = unknown;
type Factory = () => any;

type Container = {
  init(shareScope: Scope): void;
  get(module: string): Factory;
};

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };


/**
 * Inserts code in a new <script> tag on the bottom of the document
 *
 * The code will be execute immediately after resolve
 */
const loadScript = (code: any): Promise<void> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.type = "text/javascript";
    script.appendChild(document.createTextNode(code));
    document.body.appendChild(script);
    resolve();
  });
}

// Holds a list with all loaded remotes
const moduleMap = {};

/**
 * Loads a micro frontend by the remote entry point.
 *
 * Rejects if something went wrong
 *
 * @param remoteEntry Webpack's entry point to retrieve code from remote
 * @returns
 */
const loadRemoteEntry = async(remoteEntry: string): Promise<void> => {
  if (moduleMap[remoteEntry]) {
    return;
  }

  const { data } = await axios.get<any>(remoteEntry, AXIOS_CONFIG);
  moduleMap[remoteEntry] = true;
  await loadScript(data);
}

async function lookupExposedModule<T>(remoteName: string, exposedModule: string): Promise<T> {
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__('default');
  const container = window[remoteName] as Container; // or get the container somewhere else
  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(exposedModule); // returns a Promise.resolve(() => Module loading or Error throw)
  const Module = factory(); // executes function from one line above
  return Module as T;
}

export async function loadRemoteModule(options: LoadRemoteModuleOptions): Promise<any> {
  await loadRemoteEntry(options.remoteEntry);
  return await lookupExposedModule<any>(options.remoteName, options.exposedModule);
}
