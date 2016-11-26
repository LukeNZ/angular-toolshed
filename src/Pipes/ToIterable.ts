import {PipeTransform, Pipe} from "@angular/core";

@Pipe({
    name: 'toIterable'
})
/**
 * @class
 */
export class ToIterablePipe implements PipeTransform {
    public transform(value : Object) : any {
        return Object.keys(value).map(key => value[key]);
    }
}