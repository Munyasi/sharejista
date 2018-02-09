/* tslint:disable */
import {
  ShareType,
  Company,
  ShareTransfer,
  Shareholder
} from '../index';

declare var Object: any;
export interface SharesInterface {
  "certificate_no": number;
  "number_of_shares": number;
  "action": string;
  "status": string;
  "dated"?: Date;
  "id"?: number;
  "sharetype_id"?: number;
  "company_id"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  "sharetransfer_id"?: number;
  "shareholder_id"?: number;
  ShareType?: ShareType;
  Company?: Company;
  ShareTransfer?: ShareTransfer;
  Shareholder?: Shareholder;
}

export class Shares implements SharesInterface {
  "certificate_no": number;
  "number_of_shares": number;
  "action": string;
  "status": string;
  "dated": Date;
  "id": number;
  "sharetype_id": number;
  "company_id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "sharetransfer_id": number;
  "shareholder_id": number;
  ShareType: ShareType;
  Company: Company;
  ShareTransfer: ShareTransfer;
  Shareholder: Shareholder;
  constructor(data?: SharesInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Shares`.
   */
  public static getModelName() {
    return "Shares";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Shares for dynamic purposes.
  **/
  public static factory(data: SharesInterface): Shares{
    return new Shares(data);
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
      name: 'Shares',
      plural: 'shares',
      path: 'shares',
      properties: {
        "certificate_no": {
          name: 'certificate_no',
          type: 'number'
        },
        "number_of_shares": {
          name: 'number_of_shares',
          type: 'number'
        },
        "action": {
          name: 'action',
          type: 'string'
        },
        "status": {
          name: 'status',
          type: 'string'
        },
        "dated": {
          name: 'dated',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "sharetype_id": {
          name: 'sharetype_id',
          type: 'number'
        },
        "company_id": {
          name: 'company_id',
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
        "sharetransfer_id": {
          name: 'sharetransfer_id',
          type: 'number'
        },
        "shareholder_id": {
          name: 'shareholder_id',
          type: 'number'
        },
      },
      relations: {
        ShareType: {
          name: 'ShareType',
          type: 'ShareType',
          model: 'ShareType'
        },
        Company: {
          name: 'Company',
          type: 'Company',
          model: 'Company'
        },
        ShareTransfer: {
          name: 'ShareTransfer',
          type: 'ShareTransfer',
          model: 'ShareTransfer'
        },
        Shareholder: {
          name: 'Shareholder',
          type: 'Shareholder',
          model: 'Shareholder'
        },
      }
    }
  }
}
