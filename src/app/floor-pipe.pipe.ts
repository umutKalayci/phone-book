import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floorPipe',
})
export class FloorPipePipe implements PipeTransform {
  /**
   *
   * @param value
   * @returns {number}
   */
  transform(value: number): number {
    return Math.floor(value);
  }
}
