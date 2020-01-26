import { computed, observable, action } from "mobx";
import { PageControllerStore } from "./PageControllerStore";

export class LocationSearchStore {
    constructor(initializer: Partial<LocationSearchStore>) {
        Object.assign(this, initializer);
    }

    readonly PageController: PageControllerStore;

    @observable
    public SearchTerm: string = "";

    @observable
    public isLoading: boolean = false;

    @action
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.SearchTerm = event.target.value;
    }

    handleSubmit(): void {
    
    }
}
