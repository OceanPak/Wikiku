import * as React from 'react';
import { observer } from 'mobx-react';

import { PageControllerStore } from '../stores/PageControllerStore';
import { LocationSearchStore } from "../stores/LocationSearchStore"

import { SearchBar } from "./SearchBar"



import "../styles/LocationSearchStyle.scss"

interface IProps {
    store: LocationSearchStore
}

@observer
export class LocationSearchView extends React.Component<IProps> {

    render() {
        let store = this.props.store
        return (
            <div className="word-search">
                <h1>
                    What would you like to learn about?
                </h1>
                <SearchBar text={store.SearchTerm} handleChange={store.handleChange.bind(store)} />
                { !store.isLoading ?
                    <div className="button" onClick={() => store.handleSubmit()}>
                        I'm Feeling Lucky
                    </div>
                :
                    <div className="sk-chase">
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                    </div>
                }
            </div>
        )
    }
}