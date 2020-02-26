import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Contest extends Component {
    render() {
        return(
            <div className="Contest">
                <div className="contest-description">
                    {this.props.description}
                </div>
                <div className="home-link link" onClick={this.props.contentListClick}>
                    Content List
                </div>
            </div>
        );
    }
}

Contest.PropTypes = {
    description: PropTypes.string.isRequired,
    contentListClick: PropTypes.func.isRequired,
};

export default Contest;