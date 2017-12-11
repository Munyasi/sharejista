import {Component, OnInit} from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {Shareholder, Shares} from '../../../shared/sdk/models/index';
import {ShareholderApi, UserAccountApi, ShareTransferApi, SharesApi} from '../../../shared/sdk/services/index';
import {BASE_URL, API_VERSION} from '../../../shared/base.url';
import {StorageBrowser} from '../../../shared/sdk/index';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'shareholders-cmp',
  moduleId: module.id,
  styleUrls: ['shareholder.component.css', '../../home/home.component.css'],
  templateUrl: 'shareholder.component.html',
  providers: [ShareholderApi, UserAccountApi, StorageBrowser, ShareTransferApi]
})

export class ShareholderComponent implements OnInit {
  shareholder: Shareholder;
  company_name: string;
  company_id: number;
  tab_num = "tab1";
  all_transfers = [];
  transfers = [];
  shareEntries = [];

  /* tranfers pagination */
  p: number = 1; // set first page to 1
  transfersPerPage: number = 5; // number of items per page
  totalTransfers: number; // total items in the database

  /*shares pagination */
  sharesPage: number = 1; // set first page to 1
  sharesPerPage: number = 5; // number of items per page
  totalShareEntries: number; // total items in the database

  constructor(private shareholdersService: ShareholderApi,
              private toastr: ToastsManager,
              private route: ActivatedRoute,
              private shareTransferApi: ShareTransferApi,
              private user: UserAccountApi,
              private sharesApi: SharesApi,
              private storageBrowser: StorageBrowser) {
    this.shareholder = new Shareholder();
  }

  showTab(index) {
    this.tab_num = "tab" + index;
  }

  ngOnInit() {
    if (this.storageBrowser.get('company_id')) {
      this.company_id = this.storageBrowser.get('company_id');
      this.company_name = this.storageBrowser.get('company_name');
      this.getShareholder();
    }
    else {
      this.toastr.error('No company selected.', 'Error');
    }
  }

  getShareholder() {
    this.route.params.subscribe(params => {
      let id = +params['id'];
      this.shareholdersService.findById(id)
          .subscribe((shareholder: Shareholder) => {
                this.shareholder = shareholder;
                this.totalTransfers = this.shareholder['transfers'].length;
                this.all_transfers = this.shareholder['transfers'];
                this.transfers = this.getTransfers(this.p);

                //share entries
                this.getTotalSharesEntries();
                this.getShareEntries(this.p);
              },
              (error) => {
                this.toastr.error('Something went wrong while fetching shareholders. Please reload to retry.');
              })
    });
  }

  downloadMLedger(member_id) {
    this.shareholdersService.generateMemberLedger(this.company_id, member_id)
        .subscribe((res) => {
          console.log(res);
          window.location.href = `${BASE_URL}/${API_VERSION}/outputs/ledgers/download/${res.data}`;

        })
  }

  getTransfers(p: number) {
    let start = this.transfersPerPage * (p - 1);
    let end = this.transfersPerPage * p;
    return this.all_transfers.slice(start, end);
  }

  pageChanged(page: number) {
    this.p = page;
    this.transfers = this.getTransfers(page);
  }

  generateCertificate(id) {
    this.sharesApi.generateShareCertificate(id).subscribe(res => {
      window.location.href = `${BASE_URL}/${API_VERSION}/outputs/share_certificates/download/${res.data.path}`;
    });
  }

  getTotalSharesEntries() {
    const id = this.shareholder.id;
    const p = this.sharesApi.count({
      'shareholder_id': id
    });

    p.subscribe(count => {
          this.totalShareEntries = count.count;
        },
        error => {
          this.toastr.error('Something went wrong. Please reload to try again.');
        });

  }

  getShareEntries(page: number) {
    const shareholderId = this.shareholder.id;
    if (this.storageBrowser.get("company_id") && shareholderId) {
      let skip = ( page - 1) * this.sharesPerPage;
      const p = this.sharesApi.find({
        where: {
          company_id: this.company_id,
          shareholder_id: shareholderId,
          status: 'VALID'
        },
        limit: this.sharesPerPage,
        skip: skip
      });

      p.subscribe((shareEntries: Shares[]) => {
            this.shareEntries = shareEntries;
          },
          (error) => {
            this.toastr.error('Something went wrong while fetching shareholders. Please reload to retry.');
          });
    }
    else {
      this.toastr.error('No company is selected.');
    }
  }

  pageChangedShareEntries(page) {
    this.sharesPage = page;
    this.getShareEntries(page);
  }

  assignType(action: string) {
    let type = '';
    //TRANSFER/ALLOTMENT/REPLACEMENT/CF(carried forward from manual system)"
    switch (action) {
      case 'TRANSFER':
        type = 'Share Transfer';
        break;
      case 'ALLOTMENT':
        type = 'Company Allotment';
        break;
      case 'REPLACEMENT':
        type = 'Share Tranfer';
        break;
      case 'CF':
        type = 'Carried Forward';
        break;
      default:
        break;
    }

    return type;
  }
}
