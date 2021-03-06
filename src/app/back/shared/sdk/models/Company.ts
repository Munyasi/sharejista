/* tslint:disable */
import {
  CompanyType,
  ShareType,
  CompanyShare
} from '../index';

declare var Object: any;
export interface CompanyInterface {
  "company_name": string;
  "registration_no": string;
  "avg_turn_over"?: number;
  "primary_activity": string;
  "phone_numbers": string;
  "email_address": string;
  "incorporation_date": Date;
  "accounting_reference_month": number;
  "accounting_reference_day": number;
  "annual_return_month": number;
  "annual_return_day": number;
  "ro_land_reference_no": string;
  "ro_building_estate": string;
  "ro_road_street": string;
  "ro_postal_address": string;
  "ro_postal_code": string;
  "ro_town_city": string;
  "o_land_reference_no"?: string;
  "o_building_estate"?: string;
  "o_road_street"?: string;
  "o_postal_address"?: string;
  "o_postal_code"?: string;
  "o_town_city"?: string;
  "nominal_share_capital": number;
  "current"?: number;
  "id"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  "company_type_id"?: number;
  CompanyType?: CompanyType;
  ShareType?: ShareType[];
  CompanyShare?: CompanyShare[];
}

export class Company implements CompanyInterface {
  "company_name": string;
  "registration_no": string;
  "avg_turn_over": number;
  "primary_activity": string;
  "phone_numbers": string;
  "email_address": string;
  "incorporation_date": Date;
  "accounting_reference_month": number;
  "accounting_reference_day": number;
  "annual_return_month": number;
  "annual_return_day": number;
  "ro_land_reference_no": string;
  "ro_building_estate": string;
  "ro_road_street": string;
  "ro_postal_address": string;
  "ro_postal_code": string;
  "ro_town_city": string;
  "o_land_reference_no": string;
  "o_building_estate": string;
  "o_road_street": string;
  "o_postal_address": string;
  "o_postal_code": string;
  "o_town_city": string;
  "nominal_share_capital": number;
  "current": number;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "company_type_id": number;
  CompanyType: CompanyType;
  ShareType: ShareType[];
  CompanyShare: CompanyShare[];
  constructor(data?: CompanyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Company`.
   */
  public static getModelName() {
    return "Company";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Company for dynamic purposes.
  **/
  public static factory(data: CompanyInterface): Company{
    return new Company(data);
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
      name: 'Company',
      plural: 'companies',
      path: 'companies',
      properties: {
        "company_name": {
          name: 'company_name',
          type: 'string'
        },
        "registration_no": {
          name: 'registration_no',
          type: 'string'
        },
        "avg_turn_over": {
          name: 'avg_turn_over',
          type: 'number'
        },
        "primary_activity": {
          name: 'primary_activity',
          type: 'string'
        },
        "phone_numbers": {
          name: 'phone_numbers',
          type: 'string'
        },
        "email_address": {
          name: 'email_address',
          type: 'string'
        },
        "incorporation_date": {
          name: 'incorporation_date',
          type: 'Date'
        },
        "accounting_reference_month": {
          name: 'accounting_reference_month',
          type: 'number'
        },
        "accounting_reference_day": {
          name: 'accounting_reference_day',
          type: 'number'
        },
        "annual_return_month": {
          name: 'annual_return_month',
          type: 'number'
        },
        "annual_return_day": {
          name: 'annual_return_day',
          type: 'number'
        },
        "ro_land_reference_no": {
          name: 'ro_land_reference_no',
          type: 'string'
        },
        "ro_building_estate": {
          name: 'ro_building_estate',
          type: 'string'
        },
        "ro_road_street": {
          name: 'ro_road_street',
          type: 'string'
        },
        "ro_postal_address": {
          name: 'ro_postal_address',
          type: 'string'
        },
        "ro_postal_code": {
          name: 'ro_postal_code',
          type: 'string'
        },
        "ro_town_city": {
          name: 'ro_town_city',
          type: 'string'
        },
        "o_land_reference_no": {
          name: 'o_land_reference_no',
          type: 'string'
        },
        "o_building_estate": {
          name: 'o_building_estate',
          type: 'string'
        },
        "o_road_street": {
          name: 'o_road_street',
          type: 'string'
        },
        "o_postal_address": {
          name: 'o_postal_address',
          type: 'string'
        },
        "o_postal_code": {
          name: 'o_postal_code',
          type: 'string'
        },
        "o_town_city": {
          name: 'o_town_city',
          type: 'string'
        },
        "nominal_share_capital": {
          name: 'nominal_share_capital',
          type: 'number'
        },
        "current": {
          name: 'current',
          type: 'number'
        },
        "id": {
          name: 'id',
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
        "company_type_id": {
          name: 'company_type_id',
          type: 'number'
        },
      },
      relations: {
        CompanyType: {
          name: 'CompanyType',
          type: 'CompanyType',
          model: 'CompanyType'
        },
        ShareType: {
          name: 'ShareType',
          type: 'ShareType[]',
          model: 'ShareType'
        },
        CompanyShare: {
          name: 'CompanyShare',
          type: 'CompanyShare[]',
          model: 'CompanyShare'
        },
      }
    }
  }
}
