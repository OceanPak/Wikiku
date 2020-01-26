import { computed, observable, action } from "mobx";
import { PageControllerStore } from "./PageControllerStore";

export class HaikuDisplayStore {
    constructor(initializer: Partial<HaikuDisplayStore>) {
        Object.assign(this, initializer);
    }

    readonly PageController: PageControllerStore;

    readonly Haikus: string[] = [
        "An error it seems\nYou should not be seeing this\nContact Developer",
        "An old silent pond\nA frog jumps into the pond,\nsplash! Silence again.",
        "Autumn moonlight\na worm digs silent\ninto the chestnut",
        "In the twilight rain\nthese brilliant-hued hibiscus - \n A lovely sunset."
    ];

    @observable
    public HaikuIndex: number = 0;

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
}
