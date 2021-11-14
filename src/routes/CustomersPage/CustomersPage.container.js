import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import WithAuthRedirect from 'Hoc/WithAuthRedirect';
import { getPatients } from 'Store/Customer/Customer.dispatcher';

import { setAdminPatients } from 'Store/Customer/Customer.action';
import CustomersPage from './CustomersPage.component';

export const mapStateToProps = (state) => ({
    isLoggedIn: state.AdminReducer.isLoggedIn,
    adminId: state.AdminReducer.admin.uid,
    patients: state.CustomerReducer.patients,
});

export const mapDispatchToProps = (dispatch) => ({
    setAdminPatients: (patients) => dispatch(setAdminPatients(patients)),
});

export const CustomersPageContainer = (props) => {
    const { adminId, setAdminPatients, patients } = props;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        setIsLoading(true);
        const patients = await getPatients(adminId);
        setAdminPatients(patients);
        setIsLoading(false);
    }, []);

    const containerProps = {
        patients,
        isLoading,
    };

    return (
        <CustomersPage
            {...containerProps}
        />
    );
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect(),
)(CustomersPageContainer);
