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
  isValidUrl = true;
  @Input() isPerson!: boolean;
  @Input() url!: string;
  @Output() urlChange: EventEmitter<string> = new EventEmitter<string>();

  isFileUpload = new FormControl(true);
  onUploadComplete = (files: UploadWidgetResult[]) => {
    this.url = files[0]?.fileUrl;
    this.urlChange.emit(this.url);
  };
  onUrlChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checkImage(this.url).then((result) => {
      if (!result) input.value = '';
      this.urlChange.emit(this.url);
    });
  }
  checkImage(url: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(true); // Resim yüklenebilirse true döndür
      };
      img.onerror = () => {
        resolve(false); // Resim yüklenemezse veya hatalıysa false döndür
      };
      img.src = url;
    });
  }
}
