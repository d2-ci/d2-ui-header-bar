import React from 'react';
import styles from '../header-bar-styles';

export default function HeaderMenus(props) {
    return React.createElement(
        'div',
        { style: styles.menusWrap },
        props.children
    );
}