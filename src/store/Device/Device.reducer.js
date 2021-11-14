import { IS_MOBILE } from './Device.action';

const getIsMobile = () => {
    const windowWidth = window.innerWidth;
    const newIsMobile = windowWidth < 769;
    return newIsMobile;
};

export const getInitialState = () => ({
    isMobile: getIsMobile(),
});

export const DeviceReducer = (
    state = getInitialState(),
    action,
) => {
    switch (action.type) {
    case IS_MOBILE:
        const { isMobile } = action;

        return {
            ...state,
            isMobile,
        };

    default:
        return state;
    }
};

export default DeviceReducer;
