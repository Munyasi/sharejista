import {Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {ShareType} from '../../../shared/sdk/models/index';
import {ShareTypeApi} from '../../../shared/sdk/services/index';
import {StorageBrowser} from '../../../shared/sdk/index';

@Component({
    selector: 'officer-create-cmp',
    moduleId: module.id,
    styleUrls: ['create.shareclass.component.css'],
    templateUrl: 'create.shareclass.component.html',
    providers: [ShareTypeApi, StorageBrowser]
})

export class CreateShareClassComponent implements OnInit {
    sharetype = new ShareType();
    company_name: string;

    constructor(private sharesTypeApi: ShareTypeApi,
                private route: ActivatedRoute,
                private router: Router,
                private storageBrowser: StorageBrowser,
                private toastr: ToastsManager) {
    }

    ngOnInit() {
        if (this.storageBrowser.get("company_id")) {
            this.company_name = this.storageBrowser.get("company_name");
            this.route.params.subscribe(params => {
                if (params['id']) {
                    this.getShareClassById(params['id']);
                }
            });
        } else {
            this.toastr.error('No company is selected.');
        }
    }

    getShareClassById(id: number) {
        this.sharesTypeApi.findById(id)
            .subscribe((sc: ShareType) => {
                    this.sharetype = sc;
                },
                ((error) => {
                    // console.log(error);
                }));

    }

    createOrUpdate() {
        if (this.storageBrowser.get('company_id')) {
            this.sharetype.company_id = this.storageBrowser.get('company_id');
            if (this.sharetype.id)
                this.updateShareClass(this.sharetype);
            else
                this.createShareClass(this.sharetype)
        }
    }

    createShareClass(shareclass: ShareType) {
        this.sharesTypeApi.create(shareclass).subscribe((sharetype: ShareType) => {
                this.toastr.success('Share class created successfully', 'Success.');
                this.goToList();
            },
            this.handleError);
    }

    updateShareClass(sharetype: ShareType) {
        this.sharesTypeApi.upsert(sharetype)
            .subscribe((updatedShareType: ShareType) => {
                    this.toastr.success('Share class updated successfully', 'Success.');
                    this.goToList();
                },
                this.handleError);
    }

    goToList() {
        this.router.navigate(['/en/dashboard/shareclasses']);
    }

    handleError(error) {
        this.toastr.error('Something went wrong.', 'Error.');
    }
}
