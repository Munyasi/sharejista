/* tslint:disable */

declare var Object: any;
export interface CR6Interface {
  "name": string;
  "from": Date;
  "to": Date;
  "data_object": string;
  "date": Date;
  "id"?: number;
}

export class CR6 implements CR6Interface {
  "name": string;
  "from": Date;
  "to": Date;
  "data_object": string;
  "date": Date;
  "id": number;
  constructor(data?: CR6Interface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CR6`.
   */
  public static getModelName() {
    return "CR6";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CR6 for dynamic purposes.
  **/
  public static factory(data: CR6Interface): CR6{
    return new CR6(data);
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
      name: 'CR6',
      plural: 'CR6s',
      path: 'CR6s',
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
      },
      relations: {
      }
    }
  }
}
