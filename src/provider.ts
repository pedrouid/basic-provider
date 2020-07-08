import EventEmitter from 'eventemitter3';

import { IRpcConnection } from './interfaces';
import { payloadId } from './utils';

abstract class BasicProvider extends EventEmitter {
  private _connected = false;
  public connection: IRpcConnection;

  constructor(connection: IRpcConnection) {
    super();
    this.connection = connection;
    if (this.connection.connected) {
      this.connected = true;
    }
  }

  abstract async enable(...opts: any | undefined): Promise<any>;

  set connected(value: boolean) {
    this._connected = value;
    if (value === true) {
      this.emit('open');
      this.emit('connect');
    } else {
      this.emit('close');
      this.emit('disconnect');
    }
  }

  get connected(): boolean {
    return this._connected;
  }

  public open(): Promise<void> {
    if (this.connected) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      this.connection.on('disconnect', () => {
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
