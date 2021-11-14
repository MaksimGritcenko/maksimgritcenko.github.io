import { getCollectionDocsByWhere } from 'Utils/Query';

// Need to rename table in database as 'patients'
const PATIENTS = 'customers';

export const getPatients = async (adminId) => {
    try {
        const patients = await getCollectionDocsByWhere(PATIENTS, 'admin_id', adminId);

        return patients;
    } catch (e) {
        alert(e);
    }
};
