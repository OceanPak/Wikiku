import { computed, observable, action } from "mobx";
import { PageControllerStore } from "./PageControllerStore";

export class HaikuDisplayStore {
    constructor(initializer: Partial<HaikuDisplayStore>) {
        Object.assign(this, initializer);

        console.log("deciding which mode to intialize with")
        if (initializer.PageController?.GlobalState.isMapQuery) {
            console.log("initialized haiku maker in map mode")
            this.Locations = initializer.PageController?.GlobalState.locations;
            this.Haikus = []
            this.MakePoem(initializer.PageController.GlobalState.firstPoem)
            this.RequestMapPoem(1);
        } else {
            console.log("initialized with titles " + initializer.PageController?.GlobalState.articleTitles)
            this.ArticleTitles = initializer.PageController?.GlobalState.articleTitles;
            this.Haikus = []
            this.MakePoem(initializer.PageController?.GlobalState.firstPoem)
            this.RequestPoem(1);
        }
            
    }

    readonly PageController: PageControllerStore;

    @observable
    public Haikus: string[] = [
        "An error it seems\nYou should not be seeing this\nContact Developer",
        "An old silent pond\nA frog jumps into the pond,\nsplash! Silence again.",
        "Autumn moonlight\na worm digs silent\ninto the chestnut",
        "In the twilight rain\nthese brilliant-hued hibiscus - \n A lovely sunset."
    ];

    readonly ArticleTitles: string[];

    readonly Locations: any;

    @observable
    public HaikuIndex: number = 0;

    @observable
    public TotalHaikus: number = 10;

    @observable
    public FlingDelta: number = 0;

    @observable
    public PointerDown: boolean = false;

    @observable
    public RestoringForceTimer: NodeJS.Timeout;

    UpdatePosition() {
        if (Math.abs(this.FlingDelta) > (window.innerWidth / 6)) {
            this.RestoringForceTimer = setTimeout(() => {
                this.FlingDelta *= (5/4)
                if (Math.abs(this.FlingDelta) > window.innerWidth) {
                    this.HaikuIndex += 1;
                    this.FlingDelta = 0;
                } else {
                    this.UpdatePosition()
                }
            }, 10);
        } else {
            this.RestoringForceTimer = setTimeout(() => {
                this.FlingDelta *= (3/4);
                if (Math.abs(this.FlingDelta) < 10) {
                    this.FlingDelta = 0
                } else {
                    this.UpdatePosition()
                }
            }, 10);
        }
    }

    MakePoem(couplets: string[][]): void {
        console.log("Attempting to make poem")
        if (couplets.length !== 0) {
            console.log("Made poem successfully");
            let poem = couplets[0][0] + "\n" + couplets[0][1];
            this.Haikus.push(poem);
        } else {
            console.log("Rejected empty couplets")
        }
    }

    RequestPoem(titleIndex: number) {
        if (titleIndex >= this.ArticleTitles.length) {
            console.log("Reached end of article titles")
            this.TotalHaikus = this.Haikus.length
            return
        }
        let xhr = new XMLHttpRequest();
        let url = "http://localhost:5000/GenerateHaiku?articletitle=" + encodeURIComponent(this.ArticleTitles[titleIndex])

        let addHaiku = (response: any) => {
            this.MakePoem(response);
            this.RequestPoem(titleIndex+1)
        }
        
        xhr.open("GET", url, true);

        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("Received couplet response for poem " + titleIndex)
                    console.log(xhr.responseText);
                    let parsed = JSON.parse(xhr.responseText);
                    addHaiku(parsed.couplets);
                } else {
                    console.error(xhr.statusText);
                    addHaiku([]);
                }
            }
        };
        xhr.onerror = function (e) {
            console.error(xhr.statusText);
            addHaiku([]);
        };

        xhr.send(null);
    }

    RequestMapPoem(titleIndex: number) {
        if (titleIndex >= this.Locations.length) {
            console.log("Reached end of article titles")
            this.TotalHaikus = this.Haikus.length
            return
        }
        let xhr = new XMLHttpRequest();
        let title = encodeURIComponent(this.Locations[titleIndex][0])
        let keywords = encodeURIComponent(this.Locations[titleIndex][1])
        let url = `http://localhost:5000/GenerateMapHaiku?title=${title}&types=${keywords}`

        let addHaiku = (response: any) => {
            this.MakePoem(response);
            this.RequestMapPoem(titleIndex+1)
        }
        
        xhr.open("GET", url, true);

        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("Received couplet response for poem " + titleIndex)
                    console.log(xhr.responseText);
                    let parsed = JSON.parse(xhr.responseText);
                    addHaiku(parsed.couplets);
                } else {
                    console.error(xhr.statusText);
                    addHaiku([]);
                }
            }
        };
        xhr.onerror = function (e) {
            console.error(xhr.statusText);
            addHaiku([]);
        };

        xhr.send(null);
    }

}
