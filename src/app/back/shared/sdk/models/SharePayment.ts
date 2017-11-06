/* tslint:disable */
import {
  ShareTransfer
} from '../index';

declare var Object: any;
export interface SharePaymentInterface {
  "amount": number;
  "payment_type": string;
  "id"?: number;
  "share_transfer_id"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  shareTransfer?: ShareTransfer;
}

export class SharePayment implements SharePaymentInterface {
  "amount": number;
  "payment_type": string;
  "id": number;
  "share_transfer_id": number;
  "createdAt": Date;
  "updatedAt": Date;
  shareTransfer: ShareTransfer;
  constructor(data?: SharePaymentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SharePayment`.
   */
  public static getModelName() {
    return "SharePayment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SharePayment for dynamic purposes.
  **/
  public static factory(data: SharePaymentInterface): SharePayment{
    return new SharePayment(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'SharePayment',
      plural: 'SharePayments',
      path: 'SharePayments',
      properties: {
        "amount": {
          name: 'amount',
          type: 'number'
        },
        "payment_type": {
          name: 'payment_type',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "share_transfer_id": {
          name: 'share_transfer_id',
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
        shareTransfer: {
          name: 'shareTransfer',
          type: 'ShareTransfer',
          model: 'ShareTransfer'
        },
      }
    }
  }
}
