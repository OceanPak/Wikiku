import { computed, observable, action } from "mobx";
import { PageControllerStore } from "./PageControllerStore";

export class WordSearchStore {
    constructor(initializer: Partial<WordSearchStore>) {
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
        this.isLoading = true;

        let request = new XMLHttpRequest();
        let url = "http://localhost:5000/generatehaiku?source=text&data=" + encodeURIComponent(this.SearchTerm)

        let displayHaiku = (response: string) => {this.PageController.ToHaikuDisplay(response)}

        request.open("GET", url, true);

        request.onload = function (e) {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    console.log(request.responseText);
                    displayHaiku(request.responseText);
                } else {
                    console.error(request.statusText);
                }
            }
        };
        request.onerror = function (e) {
            console.error(request.statusText);
        };

        request.send(null);
    }
}
