import {Pipe, PipeTransform} from "@angular/core";
import {SafeUrl, DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Pipe({
    name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {

    constructor(public domSanitizer : DomSanitizer) {}

    transform(value: string, type: string) : SafeUrl|SafeHtml {
        if (type === "url") {
            return this.domSanitizer.bypassSecurityTrustUrl(value);
        } else if (type === "html") {
            return this.domSanitizer.bypassSecurityTrustHtml(value);
        }
    }
}