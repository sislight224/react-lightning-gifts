// NPM Dependencies
import React from 'react';
import PropTypes from 'prop-types';

const Emoji = ({ symbol, label }) => (
    <span
        className="emoji"
        role="img"
        aria-label={label}
        aria-hidden={label}
    >
        {symbol}
    </span>
);

Emoji.propTypes = {
    symbol: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default Emoji;
