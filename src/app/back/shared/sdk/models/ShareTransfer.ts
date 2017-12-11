/* tslint:disable */
import {
  ShareType,
  Shareholder
} from '../index';

declare var Object: any;
export interface ShareTransferInterface {
  "transferer_id"?: number;
  "transferer_type"?: string;
  "transferee_id": number;
  "company_id": number;
  "par_value": number;
  "share_price": number;
  "total_cash_amount": number;
  "total_non_cash_amount": number;
  "initiated_by"?: number;
  "dated"?: Date;
  "comment"?: any;
  "id"?: number;
  "share_type_id"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  sharetype?: ShareType;
  transferer?: Shareholder;
  transferee?: Shareholder;
}

export class ShareTransfer implements ShareTransferInterface {
  "transferer_id": number;
  "transferer_type": string;
  "transferee_id": number;
  "company_id": number;
  "par_value": number;
  "share_price": number;
  "total_cash_amount": number;
  "total_non_cash_amount": number;
  "initiated_by": number;
  "dated": Date;
  "comment": any;
  "id": number;
  "share_type_id": number;
  "createdAt": Date;
  "updatedAt": Date;
  sharetype: ShareType;
  transferer: Shareholder;
  transferee: Shareholder;
  constructor(data?: ShareTransferInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ShareTransfer`.
   */
  public static getModelName() {
    return "ShareTransfer";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ShareTransfer for dynamic purposes.
  **/
  public static factory(data: ShareTransferInterface): ShareTransfer{
    return new ShareTransfer(data);
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
      name: 'ShareTransfer',
      plural: 'sharetransfers',
      path: 'sharetransfers',
      properties: {
        "transferer_id": {
          name: 'transferer_id',
          type: 'number'
        },
        "transferer_type": {
          name: 'transferer_type',
          type: 'string'
        },
        "transferee_id": {
          name: 'transferee_id',
          type: 'number'
        },
        "company_id": {
          name: 'company_id',
          type: 'number'
        },
        "par_value": {
          name: 'par_value',
          type: 'number'
        },
        "share_price": {
          name: 'share_price',
          type: 'number'
        },
        "total_cash_amount": {
          name: 'total_cash_amount',
          type: 'number',
          default: 0
        },
        "total_non_cash_amount": {
          name: 'total_non_cash_amount',
          type: 'number',
          default: 0
        },
        "initiated_by": {
          name: 'initiated_by',
          type: 'number'
        },
        "dated": {
          name: 'dated',
          type: 'Date'
        },
        "comment": {
          name: 'comment',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "share_type_id": {
          name: 'share_type_id',
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
        sharetype: {
          name: 'sharetype',
          type: 'ShareType',
          model: 'ShareType'
        },
        transferer: {
          name: 'transferer',
          type: 'Shareholder',
          model: 'Shareholder'
        },
        transferee: {
          name: 'transferee',
          type: 'Shareholder',
          model: 'Shareholder'
        },
      }
    }
  }
}
