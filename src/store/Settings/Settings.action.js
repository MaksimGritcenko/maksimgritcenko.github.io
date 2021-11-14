export const UPDATE_ACTIVE_TREE_MENU_ITEM = 'UPDATE_ACTIVE_TREE_MENU_ITEM';
export const UPDATE_ONBOARDING_CONTENT = 'UPDATE_ONBOARDING_CONTENT';

export const updateActiveTreeMenuItem = (activeMenuItem) => ({
    type: UPDATE_ACTIVE_TREE_MENU_ITEM,
    activeMenuItem,
});

export const updateOnboardingContent = (customizableContent) => ({
    type: UPDATE_ONBOARDING_CONTENT,
    customizableContent,
});
