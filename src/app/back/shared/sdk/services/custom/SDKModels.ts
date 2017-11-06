/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Company } from '../../models/Company';
import { CompanyType } from '../../models/CompanyType';
import { ShareType } from '../../models/ShareType';
import { Person } from '../../models/Person';
import { Shares } from '../../models/Shares';
import { ShareTransfer } from '../../models/ShareTransfer';
import { SystemUser } from '../../models/SystemUser';
import { Shareholder } from '../../models/Shareholder';
import { Output } from '../../models/Output';
import { PersonChanges } from '../../models/PersonChanges';
import { CR7 } from '../../models/CR7';
import { CompanyShare } from '../../models/CompanyShare';
import { CR6 } from '../../models/CR6';
import { CR9 } from '../../models/CR9';
import { SharePayment } from '../../models/SharePayment';
import { CR20 } from '../../models/CR20';
import { AnnualReturn } from '../../models/AnnualReturn';
import { UserAccount } from '../../models/UserAccount';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Company: Company,
    CompanyType: CompanyType,
    ShareType: ShareType,
    Person: Person,
    Shares: Shares,
    ShareTransfer: ShareTransfer,
    SystemUser: SystemUser,
    Shareholder: Shareholder,
    Output: Output,
    PersonChanges: PersonChanges,
    CR7: CR7,
    CompanyShare: CompanyShare,
    CR6: CR6,
    CR9: CR9,
    SharePayment: SharePayment,
    CR20: CR20,
    AnnualReturn: AnnualReturn,
    UserAccount: UserAccount,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
