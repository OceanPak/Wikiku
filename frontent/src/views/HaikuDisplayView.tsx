import * as React from 'react';
import { observer } from 'mobx-react';

import { PageControllerStore } from '../stores/PageControllerStore';
import { HaikuDisplayStore } from "../stores/HaikuDisplayStore"

import { SearchBar } from "./SearchBar"



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
        console.log(e.movementX)
    }

    render() {
        let store = this.props.store
        let deckBottomText = "Wasn't that such fun?\nWe should do it all again!\nPress below for more"
        let content;
        if (store.HaikuIndex >= store.Haikus.length) {
            content = (
                <div className="haiku-display">
                    <div className="deck-bottom">
                        <div className="poem-text">
                            {deckBottomText}
                        </div>
                    </div>
                </div>
            )
        } else if (store.HaikuIndex == store.Haikus.length - 1) {
            content = (
                <div className="haiku-display">
                    <div className="deck-bottom">
                        <div className="poem-text">
                            {deckBottomText}
                        </div>
                    </div>
                    <div className="card" onPointerDown={this.onPointerDown} style={{transform: "translateX(" + store.FlingDelta + "px)"}}>
                        <div className="poem-text">
                            {store.Haikus[store.HaikuIndex]}
                        </div>
                    </div>
                </div>
            )
        } else {
            content = (
                <div className="haiku-display">
                    <div className="card">
                        <div className="poem-text">
                            {store.Haikus[store.HaikuIndex + 1]}
                        </div>
                    </div>
                    <div className="card" onPointerDown={this.onPointerDown} style={{transform: "translateX(" + store.FlingDelta + "px)"}}>
                        <div className="poem-text">
                            {store.Haikus[store.HaikuIndex]}
                        </div>
                    </div>

                </div>
            )
        }
        
        return content
    }
}