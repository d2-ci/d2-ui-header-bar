import React from 'react';

export default function HeaderMenuItems(props) {
    var innerMenuStyle = {
        height: props.height,
        width: props.width,
        overflowY: 'scroll',
        marginRight: props.marginRight,
        display: 'flex',
        flexWrap: 'wrap',
        boxSizing: 'content-box',
        overflow: 'auto',
        padding: props.padding
    };

    return React.createElement(
        'div',
        { style: innerMenuStyle, onScroll: props.onScroll },
        props.children
    );
}