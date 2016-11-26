import {Directive, TemplateRef, ViewContainerRef, IterableDiffers, ChangeDetectorRef, IterableDiffer, DoCheck, ViewRef} from "@angular/core";

@Directive({
    selector: '[mapIterator][mapIteratorOf]',
    inputs: ['mapIteratorOf']
})
/**
 * https://github.com/angular/angular/blob/2.2.2/modules/%40angular/common/src/directives/ng_for.ts#L23-L167
 */
export class MapIteratorDirective implements DoCheck {
    private collection: any;
    private differ: IterableDiffer;
    private viewMap: Map<any, ViewRef> = new Map<any, ViewRef>();

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef,
                private differs: IterableDiffers, private changeDetector: ChangeDetectorRef) {

    }

    set mapIteratorOf(value: any) {
        this.collection = value;
        if (value) {
            this.differ = this.differs.find(value).create(this.changeDetector);
        }
    }

    public ngDoCheck() : void {
        if (this.differ) {
            let changes = this.differ.diff(this.collection);
            if (changes) {
                changes.forEachAddedItem((change) => {
                    let view = this.viewContainer.createEmbeddedView(this.templateRef);
                    view.context.$implicit = change.item;
                    this.viewMap.set(change.item, view);
                });
                changes.forEachRemovedItem((change) => {
                    let view = this.viewMap.get(change.item);
                    let viewIndex = this.viewContainer.indexOf(view);
                    this.viewContainer.remove(viewIndex);
                    this.viewMap.delete(change.item);
                });
            }
        }
    }
}

interface MapDiffer {
    diff(map: Map<any, any>) : any;
    onDestroy() : any;
}

/**
 * @class
 */
class DefaultMapDiffer implements MapDiffer {
    private _length: number = null;
    private _map: Map<any, any> = null;

    get map() { return this._map; }

    get length() { return this._length; }

    /**
     *
     * @param map
     * @returns {any}
     */
    public diff(map: Map<any, any>) : DefaultMapDiffer {
        if (!map) map = new Map<any, any>();

        //if (this.check(map)) {
            return this;
        //} else {
            return null;
        //}
    }

    /**
     *
     *
     * @param map
     */
    //public check(map: Map<any, any>) : boolean {
        //this.reset();
    //}

    /**
     *
     */
    public onDestroy() {}
}