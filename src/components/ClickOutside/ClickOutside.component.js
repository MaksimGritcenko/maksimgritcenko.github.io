import {
    Children,
    cloneElement,
    useEffect,
    useRef,
    memo,
} from 'react';

export const ClickOutside = (props) => {
    const { children, onClick = () => {} } = props;

    const childrenRefs = Children.map(children, () => useRef());

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    });

    function handleClick(e) {
        const { target } = e;

        const muiBackDropElem = document.querySelector('#menu- > div.MuiBackdrop-root.MuiBackdrop-invisible.css-g3hgs1-MuiBackdrop-root-MuiModal-backdrop');
        const muiMenu = document.getElementById('menu-');
        const muiLiClassName = 'MuiMenuItem-root MuiMenuItem-gutters';

        if (
            target === document.body
      || target === muiBackDropElem
      || (target.tagName === 'LI' && target.className && target.className.includes(muiLiClassName))
      || target === muiMenu
        ) {
            return;
        }

        if (childrenRefs.every(({ current }) => !current.contains(target))) {
            onClick();
        }
    }

    return Children.map(children, (element, i) => cloneElement(element, { ref: childrenRefs[i] }));
};

export default memo(ClickOutside);
