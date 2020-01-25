import { computed, observable, action } from "mobx";

export class PageControllerStore {

    constructor(initializer: Partial<PageControllerStore>) {
        Object.assign(this, initializer);
    }

    @observable
    public CurrentPageIndex: number = 0;

    @observable
    public CurrentPages: JSX.Element[] = [];
}
