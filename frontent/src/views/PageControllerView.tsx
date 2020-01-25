import * as React from 'react';
import { observer } from 'mobx-react';

import { PageControllerStore, Page } from "../stores/PageControllerStore"
import { WelcomeStore } from '../stores/WelcomeStore';

import { WelcomeView } from './WelcomeView';

import "../styles/HomePageStyle.scss"

interface IProps {
    store: PageControllerStore
}

@observer
export class PageControllerView extends React.Component<IProps> {

    render() {
        let store = this.props.store

        if (store.CurrentPage === Page.Welcome) {
            return ( 
                <WelcomeView
                    store={new WelcomeStore({PageController: store})}
                />
            )
        }
    }
}