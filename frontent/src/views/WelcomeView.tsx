import * as React from 'react';
import { observer } from 'mobx-react';

import { WelcomeStore } from "../stores/WelcomeStore"

import "../styles/HomePageStyle.scss"

interface IProps {
    store: WelcomeStore
}

@observer
export class WelcomeView extends React.Component<IProps> {

    render() {
        return (
            <div className="body">
                <div className="welcome">
                    <h1>
                        Welcome
                    </h1>
                    <h2>
                        How shall we direct your learning?
                    </h2>
                </div>
            </div>
        )
    }
}