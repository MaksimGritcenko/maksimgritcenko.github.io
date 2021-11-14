import React from 'react';
import CustomerSkeleton from 'Components/Skeletons/CustomersSceleton/CustomerSkeleton';
import Customer from 'Components/Customer';

import './CustomerPage.style.scss';

export const CustomersPage = ({ patients, isLoading }) => {
    if (!patients || isLoading) {
        return <CustomerSkeleton />;
    }

    function renderCustomerData() {
        return patients.map(({ data }, i) => {
            const {
                email,
                firstname,
                lastname,
                psycho_type,
                gender,
            } = data;

            return (
                <Customer
                    key={i}
                    email={email}
                    firstname={firstname}
                    lastname={lastname}
                    psychoType={psycho_type}
                    gender={gender}
                />
            );
        });
    }

    return (
        <div className="CustomerPage-Container">
            <h1>My Patients</h1>
            <div className="CustomerPage-Wrapper">
                { renderCustomerData() }
            </div>
        </div>
    );
};

export default CustomersPage;
