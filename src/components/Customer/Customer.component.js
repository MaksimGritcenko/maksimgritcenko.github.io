import React from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import { MALE } from 'Components/Customer/Customer.config';

import './Customer.style.scss';

const CustomerComponent = (props) => {
    const {
        email,
        firstname,
        lastname,
        psychoType,
        gender,
    } = props;

    function renderSexIcon() {
        if (gender === MALE) {
            return <MaleIcon className="Male" />;
        }

        return <FemaleIcon className="Female" />;
    }

    function renderAvatarIcon() {
        return (
            <div className="Customer-Avatar">
                <PersonOutlineIcon />
            </div>
        );
    }

    function renderContent() {
        return (
            <div className="Customer-Content">
                { renderName() }
                { renderPsychoType() }
                { renderEmail() }
                { renderGender() }
            </div>
        );
    }

    function renderName() {
        return (
            <div className="Customer-Name">
                <span className="Customer-Firstname">{ firstname }</span>
                <span className="Customer-Lastname">{ lastname }</span>
            </div>
        );
    }

    function renderPsychoType() {
        return (
            <div className="Customer-PsychoType">
                <span>
                    <b>Psycho Type: </b>
                    { psychoType }
                </span>
            </div>
        );
    }

    function renderGender() {
        return (
            <div className="Customer-Sex">
                { renderSexIcon() }
                <span>{ gender }</span>
            </div>
        );
    }

    function renderEmail() {
        return (
            <div className="Customer-Email">
                <MailOutlineIcon />
                <span>{ email }</span>
            </div>
        );
    }

    return (
        <div className="Customer">
            { renderAvatarIcon() }
            { renderContent() }
        </div>
    );
};

export default CustomerComponent;
