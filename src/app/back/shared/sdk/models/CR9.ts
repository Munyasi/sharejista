/* tslint:disable */
import {
  Company
} from '../index';

declare var Object: any;
export interface CR9Interface {
  "name": string;
  "from": Date;
  "to": Date;
  "date": Date;
  "id"?: number;
  "companyId"?: number;
  Company?: Company;
}

export class CR9 implements CR9Interface {
  "name": string;
  "from": Date;
  "to": Date;
  "date": Date;
  "id": number;
  "companyId": number;
  Company: Company;
  constructor(data?: CR9Interface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CR9`.
   */
  public static getModelName() {
    return "CR9";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CR9 for dynamic purposes.
  **/
  public static factory(data: CR9Interface): CR9{
    return new CR9(data);
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
      name: 'CR9',
      plural: 'CR9s',
      path: 'CR9s',
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
