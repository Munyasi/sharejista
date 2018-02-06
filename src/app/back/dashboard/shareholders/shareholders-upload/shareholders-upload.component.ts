import { Component, OnInit, EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {StorageBrowser, DocumentApi, ShareholderApi} from '../../../shared/sdk/index';
import { UploadOutput, UploadInput, humanizeBytes, UploadFile, UploaderOptions, UploadStatus } from '../../../shared/ngx-uploader';
import {BASE_URL, API_VERSION } from '../../../base.url';

@Component({
  selector: 'app-shareholders-upload',
  templateUrl: './shareholders-upload.component.html',
  styleUrls: ['./shareholders-upload.component.css'],
  providers: [StorageBrowser, DocumentApi, ShareholderApi]
})
export class ShareholdersUploadComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable: any;
  company_name: string;
  company_id: number;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  options: UploaderOptions;
  uploadedFile: any;
  errors: any;

  constructor(private storageBrowser: StorageBrowser,private toastr: ToastsManager, protected document: DocumentApi, protected shareholders: ShareholderApi) {
    this.options = { concurrency: 1, allowedContentTypes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-excel'] };
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    if(this.storageBrowser.get('company_id')){
      this.company_id = this.storageBrowser.get('company_id');
      this.company_name = this.storageBrowser.get('company_name');
    }
    else{
      this.toastr.error('No company selected.','Error');
    }
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: BASE_URL + '/' + API_VERSION + '/' + 'documents/uploads/upload',
        method: 'POST',
        data: { foo: 'bar' }
      };
      this.uploadInput.emit(event)
    }else if (output.type === 'start') {
      this.errors = false;
      this.uploadedFile = false;
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
      this.toastr.error(output.file.name + ' rejected','Error');
    } else if (output.type === 'done') {
        this.files.forEach(file => {
          if(file.response){
            if(file.response.errors){
              this.errors  = file.response.errors;
            }else if(file.response.error){
              this.errors = ["Error "+file.response.error.statusCode+" occurred"];
            }else{
              this.uploadedFile = file.response.result.files.file[0];
              this.uploadedFile.temp_id = file.response.sheet_data.id;
              this.uploadedFile.temp_key = file.response.sheet_data.temp_key;
            }
          }else{
            this.errors = ["An error occurred"];
          }
        });
        this.myInputVariable.nativeElement.value = "";
    }
    this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
  }



  cancelUpload(): void {
    this.document.removeFile(this.uploadedFile.container,this.uploadedFile.name)
        .subscribe((res)=>{
          this.uploadedFile = null;
          this.toastr.success('Bulk upload process cancelled','Process Cancelled');
        })
  }

  processList() {
    if(this.storageBrowser.get('company_id')){
      this.uploadedFile['company_id'] = this.company_id;
      this.shareholders.bulkUpload(this.uploadedFile)
          .subscribe((res)=>{
            this.uploadedFile = null;
            this.toastr.success('Records added successfully');
          })
    }else{
      this.toastr.error('No company selected.','Error');
    }

  }



  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

  onChange(event:any):void{
    event.srcElement.value = "";

  }
}
