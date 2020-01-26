import * as React from 'react';
import { observer } from 'mobx-react';

import { PageControllerStore, Page } from "../stores/PageControllerStore"
import { WelcomeStore } from '../stores/WelcomeStore';
import { WordSearchStore } from '../stores/WordSearchStore';
import { LocationSearchStore } from '../stores/LocationSearchStore';
import { HaikuDisplayStore } from '../stores/HaikuDisplayStore';

import { WelcomeView } from './WelcomeView';
import { WordSearchView } from './WordSearchView';
import { LocationSearchView } from './LocationSearchView';
import { HaikuDisplayView } from './HaikuDisplayView';

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
        else if (store.CurrentPage === Page.WordSearch) {
            return ( 
                <WordSearchView
                    store={new WordSearchStore({PageController: store})}
                />
            )
        }
        else if (store.CurrentPage === Page.LocationSearch) {
            return ( 
                <LocationSearchView
                    store={new LocationSearchStore({PageController: store})}
                />
            )
        }
        else if (store.CurrentPage === Page.HaikuDisplay) {
            return ( 
                <HaikuDisplayView
                    store={new HaikuDisplayStore({PageController: store})}
                />
            )
        }
    }
}