import * as React from 'react';
import { observer } from 'mobx-react';

import { PageControllerStore } from '../stores/PageControllerStore';
import { WelcomeStore } from "../stores/WelcomeStore"

import "../styles/WelcomeStyle.scss"

interface IProps {
    store: WelcomeStore
}

@observer
export class WelcomeView extends React.Component<IProps> {

    render() {
        let store = this.props.store
        return (
            <div className="body">
                <div className="welcome">
                    <h1>
                        Welcome
                    </h1>
                    <h2>
                        How shall we direct your learning?
                    </h2>
                    <span className="button-row">
                        <div className="button" onClick={() => store.PageController.ToWordSearch()}>
                            By Search Term
                        </div>
                        <div className="button" onClick={() => store.PageController.ToLocationSearch()}>
                            By Location
                        </div>
                        <div className="button" onClick={() => store.PageController.ToHaikuDisplay("")}>
                            Debug
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}