import * as React from 'react';
import { observer } from 'mobx-react';

import { PageControllerStore } from "../stores/PageControllerStore"

import "../styles/HomePageStyle.scss"

interface IProps {
    store: PageControllerStore
}

@observer
export class PageControllerView extends React.Component<IProps> {

    render() {
        let store = this.props.store
        return (
            store.CurrentPages[store.CurrentPageIndex]
        )
    }
}