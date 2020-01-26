import { computed, observable, action } from "mobx";
import { PageControllerStore } from "./PageControllerStore";

export class HomePageStore {

    constructor(initializer: Partial<HomePageStore>) {
        Object.assign(this, initializer);

        this.PageController = new PageControllerStore({})
    }

    readonly PageController: PageControllerStore;

    @observable
    public Width: number = 600;
}
