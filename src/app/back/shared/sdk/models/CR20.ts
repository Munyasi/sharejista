/* tslint:disable */
import {
  Company
} from '../index';

declare var Object: any;
export interface CR20Interface {
  "name": string;
  "from": Date;
  "to": Date;
  "data_object": string;
  "date": Date;
  "id"?: number;
  "companyId"?: number;
  Company?: Company;
}

export class CR20 implements CR20Interface {
  "name": string;
  "from": Date;
  "to": Date;
  "data_object": string;
  "date": Date;
  "id": number;
  "companyId": number;
  Company: Company;
  constructor(data?: CR20Interface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CR20`.
   */
  public static getModelName() {
    return "CR20";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CR20 for dynamic purposes.
  **/
  public static factory(data: CR20Interface): CR20{
    return new CR20(data);
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
      name: 'CR20',
      plural: 'CR20s',
      path: 'CR20s',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "from": {
          name: 'from',
          type: 'Date'
        },
        "to": {
          name: 'to',
          type: 'Date'
        },
        "data_object": {
          name: 'data_object',
          type: 'string'
        },
        "date": {
          name: 'date',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "companyId": {
          name: 'companyId',
          type: 'number'
        },
      },
      relations: {
        Company: {
          name: 'Company',
          type: 'Company',
          model: 'Company'
        },
      }
    }
  }
}
