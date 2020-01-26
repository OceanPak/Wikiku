import * as React from 'react';
import { observer } from 'mobx-react';

import { HaikuDisplayStore } from "../stores/HaikuDisplayStore"

import "../styles/HaikuDisplayStyle.scss"

interface IProps {
    store: HaikuDisplayStore
}

@observer
export class HaikuDisplayView extends React.Component<IProps> {

    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();

        this.props.store.PointerDown = true;
        this.props.store.RestoringForceTimer = setTimeout(() => {}, 10);

        document.removeEventListener("pointermove", this.onPointerMove);
        document.addEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
        document.addEventListener("pointerup", this.onPointerUp);
    }

    onPointerUp = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();

        this.props.store.PointerDown = false;
        this.props.store.UpdatePosition();

        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    }

    onPointerMove = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.props.store.PointerDown) {
            return;
        }
        this.props.store.FlingDelta += e.movementX
    }

    render() {
        let store = this.props.store
        let deckBottomText = "Wasn't that such fun?\nWe should do it all again!\nPress below for more"
        let content;
        let loading = (
            <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
        )

        if (store.HaikuIndex >= store.TotalHaikus) {
            content = (
                <div className="haiku-display">
                    <div className="deck-bottom">
                        <div className="poem-text">
                            {deckBottomText}
                            {"\n"}
                            <div className="button" onClick={() => store.PageController.ToWelcome()}>
                                Again
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (store.HaikuIndex == store.TotalHaikus - 1) {
            content = (
                <div className="haiku-display">
                    <div className="deck-bottom">
                        <div className="poem-text">
                            {deckBottomText}
                            {"\n"}
                            <div className="button" onClick={() => store.PageController.ToWelcome()}>
                                Again
                            </div>
                        </div>
                    </div>
                    <div className="card" onPointerDown={this.onPointerDown} style={{transform: "translateX(" + store.FlingDelta + "px)"}}>
                        <div className="poem-text">
                            {store.HaikuIndex < store.Haikus.length ?
                                store.Haikus[store.HaikuIndex]
                            :
                                loading
                            }
                        </div>
                    </div>
                </div>
            )
        } else {
            content = (
                <div className="haiku-display">
                    <div className="card">
                        <div className="poem-text">
                            {store.HaikuIndex + 1 < store.Haikus.length ?
                                store.Haikus[store.HaikuIndex + 1]
                            :
                                loading
                            }
                        </div>
                    </div>
                    <div className="card" onPointerDown={this.onPointerDown} style={{transform: "translateX(" + store.FlingDelta + "px)"}}>
                        <div className="poem-text">
                            {store.HaikuIndex < store.Haikus.length ?
                                store.Haikus[store.HaikuIndex]
                            :
                                loading
                            }
                        </div>
                    </div>

                </div>
            )
        }
        
        return content
    }
}