import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const CloseBtn = (props) => {
    const { className, onClick, fontSize } = props;

    return (
        <IconButton className={className} onClick={onClick}>
            <CloseIcon fontSize={fontSize} />
        </IconButton>
    );
};

export default CloseBtn;
