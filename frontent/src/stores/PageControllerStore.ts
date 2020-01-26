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

    @observable
    public Opacity: number = 1;

    @observable
    public GlobalState: any = {}

    @action
    ToWordSearch(): void {
        this.TransitionTo(Page.WordSearch)
    }

    @action
    ToLocationSearch(): void {
        this.TransitionTo(Page.LocationSearch)
    }

    @action
    ToHaikuDisplay(firstPoem: string[][], titles: string[]): void {
        console.log("transitioning to haiku display")
        console.log(firstPoem)
        console.log(titles)
        this.GlobalState.articleTitles = titles
        this.GlobalState.firstPoem = firstPoem
        this.TransitionTo(Page.HaikuDisplay)
    }

    @action
    TransitionTo(page: Page) {
        console.log(this.Opacity)
        if (this.Opacity < .01) {
            this.CurrentPage = page
            this.Opacity = 1
        } else {
            this.Opacity *= 5/6
            setTimeout(() => {
                this.TransitionTo(page);
            }, 10);
        }
    }
}
