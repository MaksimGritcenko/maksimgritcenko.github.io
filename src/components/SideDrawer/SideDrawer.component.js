import React from 'react';

import './SideDrawer.style.scss';
import { Link } from 'react-router-dom';
import CsvReportButton from 'Components/CsvReportButton';
import Loader from 'Components/Loader/Loader.container';
import Popup from 'Components/Popup/Popup.container';
import { tabs } from 'Utils/Nav/NavLinks';

import { SIDE_DRAWER_POPUP_ID } from 'Components/SideDrawer/SideDrawer.config';
import CopyRightComponent from 'Components/CopyRight/CopyRight.component';
import Button from '@mui/material/Button';

const SideDrawerComponent = ({ onClick, activeTab, signOut }) => {
    function renderLinks() {
        return tabs.map(({
            title,
            link,
            id,
        }) => (
            <Link
                key={id}
                to={link}
                onClick={() => onClick(id)}
                className={`Navigation-Links ${activeTab === id ? 'Navigation-Links_isActive' : ''}`}
            >
                {title}
            </Link>
        ));
    }

    return (
        <Popup
            popupId={SIDE_DRAWER_POPUP_ID}
            hookClasses={['SideDrawer open']}
        >
            <nav>
                <div className="Navigation-Links">
                    { renderLinks() }
                    <CsvReportButton />
                    <div className="CopyRight">
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={signOut}
                        >
                            Logout
                        </Button>
                        <CopyRightComponent name="Johny" />
                    </div>
                </div>
            </nav>
            <Loader isLoading={false} />
        </Popup>
    );
};

export default SideDrawerComponent;
