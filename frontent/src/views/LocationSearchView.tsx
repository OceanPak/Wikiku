import * as React from 'react';
import { observer } from 'mobx-react';

import GoogleMapReact from 'google-map-react'

import { PageControllerStore } from '../stores/PageControllerStore';
import { LocationSearchStore } from "../stores/LocationSearchStore"

import { SearchBar } from "./SearchBar"

import "../styles/LocationSearchStyle.scss"

interface IProps {
    store: LocationSearchStore
}

const API_KEY = "AIzaSyCpgI4jKI3vp0T96ZPo5ZnCRkCd9FlLU9s"

@observer
export class LocationSearchView extends React.Component<IProps> {

    render() {
        let store = this.props.store
        return (
            <div className="location-search">
                <h1>
                    Where would you like to learn about?
                </h1>
                <GoogleMapReact
                    bootstrapURLKeys={{key: API_KEY}}
                    center={store.center}
                    zoom={store.zoom}
                    onChange={(value) => store.handleChange(value)}
                />
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