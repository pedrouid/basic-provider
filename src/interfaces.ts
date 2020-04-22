export interface IRpcConnection extends NodeJS.EventEmitter {
  connected: boolean;

  send(payload: any): Promise<any>;
  open(): Promise<void>;
  close(): Promise<void>;
}
