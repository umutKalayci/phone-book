import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UploadWidgetConfig, UploadWidgetResult, Uploader } from 'uploader';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss'],
})
export class ImageInputComponent {
  uploader = Uploader({
    apiKey: 'free',
  });
  options: UploadWidgetConfig = {
    multi: false,
  };
  @Input() url!: string;
  @Output() urlChange: EventEmitter<string> = new EventEmitter<string>();

  isFileUpload = new FormControl(true);
  onUploadComplete = (files: UploadWidgetResult[]) => {
    this.url = files[0]?.fileUrl;
    this.urlChange.emit(this.url);
  };
  onUrlChange() {
    this.urlChange.emit(this.url);
  }
}
