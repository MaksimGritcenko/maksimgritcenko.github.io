import React from 'react';
import { connect } from 'react-redux';

import { updateActiveTreeMenuItem } from 'Store/Settings/Settings.action';

import {
    CONTENT_CUSTOMIZER,
    ONBOARDING_CUSTOMIZE_CONTENT,
    ONBOARDING_SLIDE_CUSTOMIZE_CONTENT,
    INSTRUCTIONS_CONTENT,
} from './TreeNav.config';

import TreeNav from './TreeNav.component';

export const mapStateToProps = (state) => ({
    activeMenuItem: state.SettingsReducer.activeMenuItem,
});

export const mapDispatchToProps = (dispatch) => ({
    updateActiveTreeMenuItem: (activeMenuItem) => dispatch(updateActiveTreeMenuItem(activeMenuItem)),
});

export const TreeNavContainer = (props) => {
    const {
        updateActiveTreeMenuItem,
    } = props;

    const treeStructure = [
        {
            id: CONTENT_CUSTOMIZER,
            label: 'Content customizer',
            children: [
                {
                    id: ONBOARDING_CUSTOMIZE_CONTENT,
                    label: 'Onboarding content',
                    isAddable: true,
                    children: [
                        {
                            id: ONBOARDING_SLIDE_CUSTOMIZE_CONTENT,
                            parent: ONBOARDING_CUSTOMIZE_CONTENT,
                            label: 'Slide 1',
                        },
                        {
                            id: ONBOARDING_SLIDE_CUSTOMIZE_CONTENT,
                            parent: ONBOARDING_CUSTOMIZE_CONTENT,
                            label: 'Slide 2',
                        },
                    ],
                },
                {
                    id: INSTRUCTIONS_CONTENT,
                    label: 'Instructions content',
                    isAddable: true,
                },
            ],
        },
    ];

    function onMeniItemClick(node, index) {
        const { children, id } = node;

        // able to select only last level items
        if (children) {
            return;
        }

        updateActiveTreeMenuItem(`${id}_${index}`);

        const onContentSelectEvent = new CustomEvent('onContentSelect');
        setTimeout(() => window.dispatchEvent(onContentSelectEvent));
    }

    const containerFunctions = {
        onMeniItemClick,
    };

    const containerProps = () => ({
        ...props,
        treeStructure,
    });

    return (
        <TreeNav
            {...containerProps()}
            {...containerFunctions}
        />
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(TreeNavContainer);
