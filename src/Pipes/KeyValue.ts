import {PipeTransform, Pipe} from "@angular/core";

@Pipe({
    name: 'keyValue'
})
/**
 * @class
 */
export class KeyValuePipe implements PipeTransform {
    public transform(value : Object) : any {
        return Object.keys(value).map(key => {
            let pair = {};
            pair['key'] = key;
            pair['value'] = value[key];

            return pair;
        });
    }
}