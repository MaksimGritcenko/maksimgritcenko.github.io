import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { headers } from 'Utils/Csv/headers';

import CsvReportButtonComponent from 'Components/CsvReportButton/CsvReportButton.component';

export const mapStateToProps = (state) => ({
    patients: state.CustomerReducer.patients,
});

export const CsvReportButtonContainer = (props) => {
    const [csvData, setCsvData] = useState(null);

    useEffect(() => {
        const { patients } = props;
        setCsvData(patients);
    });

    return (
        <CsvReportButtonComponent
            headers={headers}
            data={csvData}
        />
    );
};

export default connect(mapStateToProps, null)(CsvReportButtonContainer);
