import { computed, observable, action } from "mobx";
import { PageControllerStore } from "./PageControllerStore";
import { ChangeEventValue } from "google-map-react";

export class LocationSearchStore {
    constructor(initializer: Partial<LocationSearchStore>) {
        Object.assign(this, initializer);
    }

    readonly PageController: PageControllerStore;

    @observable
    public center: any = {lat: 41.829, lng: -71.4}

    @observable
    public zoom: number = 10;

    @observable
    public isLoading: boolean = false;

    @action
    handleChange(value: ChangeEventValue) {
        this.center = value.center
        this.zoom = value.zoom
    }

    handleSubmit(): void {
        this.isLoading = true;

        let request = new XMLHttpRequest();
        let coordX = encodeURIComponent(this.center.lat)
        let coordY = encodeURIComponent(this.center.lng)
        console.log(coordX.toString() + ", " + coordY)
        let url = `http://localhost:5000/MapArticleTitles?CoordX=${coordX}&CoordY=${coordY}`;

        let displayHaiku = (locations: any) => {this.GetFirstPoem(locations)}
        
        request.open("GET", url, true);

        request.onload = function (e) {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    console.log(request.responseText);
                    let parsed = JSON.parse(request.responseText);
                    displayHaiku(parsed.results);
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

    GetFirstPoem(locations: any): void{
        let xhr = new XMLHttpRequest();
        let title = encodeURIComponent(locations[0][1])
        let keywords = encodeURIComponent(locations[0][1])
        let url = `http://localhost:5000/GenerateMapHaiku?title=${title}&types=${keywords}`

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
                this.PageController.ToHaikuDisplay(titles, response.couplets, true)
            }
        };

        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let parsed = JSON.parse(xhr.responseText)
                    console.log("got first poem")
                    console.log(parsed)
                    submit(locations, parsed)
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
