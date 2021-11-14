import React from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import './TreeNav.styles.scss';

export const TreeNav = (props) => {
    const {
        treeStructure,
        onMeniItemClick,
    } = props;

    function renderTreeItem(node, i) {
        const {
            id,
            label,
            children,
        } = node;

        const nodeId = `${id}_${i}`;

        return (
            <TreeItem
                nodeId={nodeId}
                label={label}
                onClick={() => onMeniItemClick(node, i)}
            >
                { children && renderTree(children) }
            </TreeItem>
        );
    }

    function renderTree(tree) {
        return tree.map(renderTreeItem);
    }

    return (
        <div className="TreeNav">
            <TreeView
                aria-label="settings menu tree"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                { renderTree(treeStructure) }
            </TreeView>
        </div>
    );
};

export default TreeNav;
