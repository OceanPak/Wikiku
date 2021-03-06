import * as React from 'react';
import { observer } from 'mobx-react';

import { PageControllerStore } from '../stores/PageControllerStore';
import { WordSearchStore } from "../stores/WordSearchStore"

import { SearchBar } from "./SearchBar"



import "../styles/WordSearchStyle.scss"

interface IProps {
    store: WordSearchStore
}

@observer
export class WordSearchView extends React.Component<IProps> {

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