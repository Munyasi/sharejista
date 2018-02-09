/* tslint:disable */
import {
  Company,
  Shares
} from '../index';

declare var Object: any;
export interface ShareholderInterface {
  "type": string;
  "entry_number"?: string;
  "name": string;
  "email_address"?: string;
  "phone_number"?: string;
  "id_type": string;
  "id_reg_number": string;
  "appointment_date"?: Date;
  "postal_code"?: string;
  "box"?: string;
  "town"?: string;
  "county"?: string;
  "constituency"?: string;
  "location"?: string;
  "sublocation"?: string;
  "profile_photo"?: string;
  "group_members"?: string;
  "id"?: number;
  "company_id"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  Company?: Company;
  Shares?: Shares[];
}

export class Shareholder implements ShareholderInterface {
  "type": string;
  "entry_number": string;
  "name": string;
  "email_address": string;
  "phone_number": string;
  "id_type": string;
  "id_reg_number": string;
  "appointment_date": Date;
  "postal_code": string;
  "box": string;
  "town": string;
  "county": string;
  "constituency": string;
  "location": string;
  "sublocation": string;
  "profile_photo": string;
  "group_members": string;
  "id": number;
  "company_id": number;
  "createdAt": Date;
  "updatedAt": Date;
  Company: Company;
  Shares: Shares[];
  constructor(data?: ShareholderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Shareholder`.
   */
  public static getModelName() {
    return "Shareholder";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Shareholder for dynamic purposes.
  **/
  public static factory(data: ShareholderInterface): Shareholder{
    return new Shareholder(data);
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
      name: 'Shareholder',
      plural: 'shareholders',
      path: 'shareholders',
      properties: {
        "type": {
          name: 'type',
          type: 'string'
        },
        "entry_number": {
          name: 'entry_number',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "email_address": {
          name: 'email_address',
          type: 'string'
        },
        "phone_number": {
          name: 'phone_number',
          type: 'string'
        },
        "id_type": {
          name: 'id_type',
          type: 'string'
        },
        "id_reg_number": {
          name: 'id_reg_number',
          type: 'string'
        },
        "appointment_date": {
          name: 'appointment_date',
          type: 'Date'
        },
        "postal_code": {
          name: 'postal_code',
          type: 'string'
        },
        "box": {
          name: 'box',
          type: 'string'
        },
        "town": {
          name: 'town',
          type: 'string'
        },
        "county": {
          name: 'county',
          type: 'string'
        },
        "constituency": {
          name: 'constituency',
          type: 'string'
        },
        "location": {
          name: 'location',
          type: 'string'
        },
        "sublocation": {
          name: 'sublocation',
          type: 'string'
        },
        "profile_photo": {
          name: 'profile_photo',
          type: 'string'
        },
        "group_members": {
          name: 'group_members',
          type: 'string'
        },
        "id": {
          name: 'id',
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
      },
      relations: {
        Company: {
          name: 'Company',
          type: 'Company',
          model: 'Company'
        },
        Shares: {
          name: 'Shares',
          type: 'Shares[]',
          model: 'Shares'
        },
      }
    }
  }
}
