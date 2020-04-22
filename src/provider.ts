import EventEmitter from 'eventemitter3';

import { IRpcConnection } from './interfaces';
import { payloadId } from './utils';

abstract class BasicProvider extends EventEmitter {
  private _connected = false;
  public connection: IRpcConnection;

  constructor(connection: IRpcConnection) {
    super();
    this.connection = connection;
  }

  abstract async enable(...opts: any | undefined): Promise<any>;

  set connected(value: boolean) {
    this._connected = value;
    if (value === true) {
      this.emit('connect');
    } else {
      this.emit('close');
    }
  }

  get connected(): boolean {
    return this._connected;
  }

  public open(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.on('close', () => {
        this.connected = false;
        reject();
      });

      this.connection.on('connect', () => {
        this.connected = true;
        resolve();
      });

      this.connection.open();
    });
  }

  public close(): Promise<void> {
    this.connected = false;
    return this.connection.close();
  }

  public async send(method: string, params: any = {}): Promise<any> {
    return this.connection.send({
      id: payloadId(),
      jsonrpc: '2.0',
      method,
      params,
    });
  }
}

export default BasicProvider;
