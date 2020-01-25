import { computed, observable, action } from "mobx";

export enum Page {
    Welcome = 0,
    WordSearch = 1,
    LocationSearch = 2,
    HaikuDisplay = 3
}

export class PageControllerStore {

    constructor(initializer: Partial<PageControllerStore>) {
        Object.assign(this, initializer);
    }

    @observable
    public CurrentPage: Page = Page.Welcome;

    @action
    ToWordSearch(): void {
        this.CurrentPage = Page.WordSearch
    }

    @action
    ToLocationSearch(): void {
        this.CurrentPage = Page.LocationSearch
    }

    @action
    ToHaikuDisplay(content: string): void {
        this.CurrentPage = Page.HaikuDisplay
    }
}
