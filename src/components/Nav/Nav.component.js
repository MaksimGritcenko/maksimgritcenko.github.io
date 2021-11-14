import React from 'react';
import { Link } from 'react-router-dom';
import CsvReportButton from 'Components/CsvReportButton';
import CopyRightComponent from 'Components/CopyRight/CopyRight.component';
import { tabs } from 'Utils/Nav/NavLinks';
import Button from '@mui/material/Button';
import './Nav.styles.scss';

export const NavComponent = ({
    onClick,
    activeTab,
    signOut,
    admin: { isGrandAdmin },
}) => {
    const grandAdminTabIds = [
        'Statistics',
        'Settings',
    ];

    function renderLink({ title, link, id }) {
        const isTabAvailForRegUsr = !grandAdminTabIds.includes(id);

        if (!isTabAvailForRegUsr && !isGrandAdmin) {
            return null;
        }

        return (
            <Link
                key={id}
                to={link}
                onClick={() => onClick(id)}
                className={`Navigation-Links ${activeTab === id ? 'Navigation-Links_isActive' : ''}`}
            >
                {title}
            </Link>
        );
    }

    function renderDownloadBtn() {
        if (!isGrandAdmin) {
            return null;
        }

        return <CsvReportButton />;
    }

    function renderLinks() {
        return tabs.map(renderLink);
    }

    function renderLogoutBtn() {
        return (
            <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={signOut}
            >
                Logout
            </Button>
        );
    }

    function renderCopyRight() {
        return <CopyRightComponent name="Johny" />;
    }

    return (
        <div className="NavigationContainer">
            <nav className="NavigationWrapper">
                <div className="Navigation-Links">
                    { renderLinks() }
                    { renderDownloadBtn() }
                    <div className="CopyRight">
                        { renderLogoutBtn() }
                        { renderCopyRight() }
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavComponent;
