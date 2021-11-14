import React from 'react';
import SkeletonAdmin from 'Components/Skeletons/SkeletonAdmin/SkeletonAdmin';
import './StatisticsPage.style.scss';

export const StatisticsPage = ({ admin }) => {
    if (!admin) {
        return (
            <div className="content">
                <SkeletonAdmin />
            </div>
        );
    }

    return (
        <div className="content">
            <h1>Admin</h1>
            <h3>
                Email:
                { admin.email }
            </h3>
            <h3>
                UID:
                { admin.uid }
            </h3>
        </div>
    );
};

export default StatisticsPage;
