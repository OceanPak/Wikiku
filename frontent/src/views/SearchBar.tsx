import * as React from 'react';
import { observer } from 'mobx-react';

import "../styles/SearchBarStyle.scss"

interface IProps {
    text: string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

@observer
export class SearchBar extends React.Component<IProps> {

    render() {
        return (
            <div className="search-bar">
                <input className="input" type="text" value={this.props.text} onChange={this.props.handleChange} autoFocus={true}/>
            </div>
        )
    }
}