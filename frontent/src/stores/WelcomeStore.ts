import { computed, observable, action } from "mobx";
import { PageControllerStore } from "./PageControllerStore";

export class WelcomeStore {

    constructor(initializer: Partial<WelcomeStore>) {
        Object.assign(this, initializer);
    }

    readonly PageController: PageControllerStore;

}
