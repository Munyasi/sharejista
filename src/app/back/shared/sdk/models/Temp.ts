/* tslint:disable */

declare var Object: any;
export interface TempInterface {
  "key": string;
  "value": string;
  "id"?: number;
}

export class Temp implements TempInterface {
  "key": string;
  "value": string;
  "id": number;
  constructor(data?: TempInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Temp`.
   */
  public static getModelName() {
    return "Temp";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Temp for dynamic purposes.
  **/
  public static factory(data: TempInterface): Temp{
    return new Temp(data);
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
      name: 'Temp',
      plural: 'Temps',
      path: 'Temps',
      properties: {
        "key": {
          name: 'key',
          type: 'string'
        },
        "value": {
          name: 'value',
          type: 'string'
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
