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
        let url = "http://localhost:5000/ArticleTitles?source=text&data=" + encodeURIComponent(this.SearchTerm)

        let displayHaiku = (response: any) => {this.GetFirstPoem(response)}
        

        request.open("GET", url, true);

        request.onload = function (e) {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    console.log(request.responseText);
                    let parsed = JSON.parse(request.responseText);
                    displayHaiku(parsed.listOfTitles);
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

    GetFirstPoem(articleTitles: string[]): void{
        let xhr = new XMLHttpRequest();
        let url = "http://localhost:5000/GenerateHaiku?articletitle=" + encodeURIComponent(articleTitles[0])

        xhr.open("GET", url, true);

        let submit = (titles: any, response: any) => {
            console.log("trying to submit with first poem")
            console.log(response)
            console.log(response.couplets)
            console.log(titles)
            if (response.couplets.length === 0) {
                console.log("retrying getting first poem")
                this.GetFirstPoem(titles.slice(1))
            } else {
                this.PageController.ToHaikuDisplay(titles, response.couplets)
            }
        };

        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let parsed = JSON.parse(xhr.responseText)
                    console.log("got first poem")
                    console.log(parsed)
                    submit(articleTitles, parsed)
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function (e) {
            console.error(xhr.statusText);
        };

        xhr.send(null);   
    }
}
