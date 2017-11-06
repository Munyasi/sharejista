/* tslint:disable */

declare var Object: any;
export interface AnnualReturnInterface {
  "name": string;
  "from": Date;
  "to": Date;
  "date": Date;
  "id"?: number;
}

export class AnnualReturn implements AnnualReturnInterface {
  "name": string;
  "from": Date;
  "to": Date;
  "date": Date;
  "id": number;
  constructor(data?: AnnualReturnInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AnnualReturn`.
   */
  public static getModelName() {
    return "AnnualReturn";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AnnualReturn for dynamic purposes.
  **/
  public static factory(data: AnnualReturnInterface): AnnualReturn{
    return new AnnualReturn(data);
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
      name: 'AnnualReturn',
      plural: 'AnnualReturns',
      path: 'AnnualReturns',
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
      },
      relations: {
      }
    }
  }
}
