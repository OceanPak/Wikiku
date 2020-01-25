import { computed, observable, action } from "mobx";

export class WelcomeStore {

    constructor(initializer: Partial<WelcomeStore>) {
        Object.assign(this, initializer);
    }

    @observable
    public Width: number = 600;
}
