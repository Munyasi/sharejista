/* tslint:disable */

declare var Object: any;
export interface DocumentInterface {
  "id"?: number;
}

export class Document implements DocumentInterface {
  "id": number;
  constructor(data?: DocumentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Document`.
   */
  public static getModelName() {
    return "Document";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Document for dynamic purposes.
  **/
  public static factory(data: DocumentInterface): Document{
    return new Document(data);
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
      name: 'Document',
      plural: 'Documents',
      path: 'Documents',
      properties: {
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
