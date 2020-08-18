export interface IRpcConnection extends NodeJS.EventEmitter {
  connected: boolean;

  send(payload: any): Promise<any>;
  open(): Promise<void>;
  close(): Promise<void>;
}

export interface RequestParams<T = any> {
  id?: number;
  jsonrpc?: string;
  method: string;
  params: T;
}
