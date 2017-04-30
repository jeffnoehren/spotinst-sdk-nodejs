import { SDKName } from '../config';
import debug from 'debug';

export default class AwsInstanceService {
  constructor(client) {
    this._debug    = debug(`${SDKName}:aws_instance`);
    this._client   = client;
    this._basePath = '/aws/ec2/instance';
  }

  /**
   * read describes a specific instance.
   * @param params
   * @returns {Promise}
   */
  read(params = {}, callback) {
    return new Promise((resolve, reject) => {
      this._debug('initiating a new read request, id=', params.id);
      const req = this._client._newRequest('GET', `${this._basePath}/${params.id}`);
      this._debug('making read request');
      this._client._requireOK(this._client._doRequest(req))
        .then((res) => {
          this._debug('promise resolved');
          typeof callback === 'function' ?
            callback(null, res.response.items) :
            resolve(res.response.items);
        })
        .catch((err) => {
          this._debug('promise rejected', err);
          typeof callback === 'function' ?
            callback(err.toString()) :
            reject(err.toString());
        });
    });
  }

  /**
   * detach detaches a specific instance from an existing group.
   * @param params
   * @returns {Promise}
   */
  detach(params = {}, callback) {
    return new Promise((resolve, reject) => {
      this._debug('initiating a new detach request, params=', params);
      this._debug('preparing body');
      const body = Object.assign({}, params);
      this._debug('body=', body);
      const req = this._client._newRequest('PUT', `${this._basePath}/detach`, body);
      this._debug('making detach request');
      this._client._requireOK(this._client._doRequest(req))
        .then((res) => {
          this._debug('promise resolved');
          typeof callback === 'function' ?
            callback(null, res.response.items) :
            resolve(res.response.items);
        })
        .catch((err) => {
          this._debug('promise rejected', err);
          typeof callback === 'function' ?
            callback(err.toString()) :
            reject(err.toString());
        });
    });
  }
}