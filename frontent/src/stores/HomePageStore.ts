import { computed, observable, action } from "mobx";

export class HomePageStore {

    constructor(initializer: Partial<HomePageStore>) {
        Object.assign(this, initializer);
    }

    @observable
    public Width: number = 600;
}
