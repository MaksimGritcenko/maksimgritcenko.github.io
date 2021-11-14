import { SET_ADMIN_PATIENTS } from 'Store/Customer/Customer.action';

const getInitialState = () => ({
    patients: [],
});

export const CustomerReducer = (state = getInitialState(), action) => {
    switch (action.type) {
    case SET_ADMIN_PATIENTS:
        const { patients } = action;

        return {
            ...state,
            patients,
        };

    default:
        return state;
    }
};

export default CustomerReducer;
