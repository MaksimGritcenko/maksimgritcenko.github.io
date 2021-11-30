import {
    UPDATE_ACTIVE_TREE_MENU_ITEM,
    UPDATE_ONBOARDING_CONTENT,
} from './Settings.action';

export const updateOnboardingContent = (state, action) => {
    const { customizableContent } = action;

    return {
        ...state,
        customizableContent,
    };
};

export const getInitialState = () => ({
    activeMenuItem: '',
    customizableContent: [],
});

export const SettingsReducer = (
    state = getInitialState(),
    action,
) => {
    switch (action.type) {
    case UPDATE_ACTIVE_TREE_MENU_ITEM:
        const { activeMenuItem } = action;

        return {
            ...state,
            activeMenuItem,
        };

    case UPDATE_ONBOARDING_CONTENT:
        return updateOnboardingContent(state, action);

    default:
        return state;
    }
};

export default SettingsReducer;
