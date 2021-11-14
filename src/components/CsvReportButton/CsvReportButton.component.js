import React from 'react';
import { CSVLink } from 'react-csv';

export const CsvReportButtonComponent = (props) => {
    const { data, headers } = props;

    if (!data) return null;

    return (
        <CSVLink data={data} headers={headers}>Download</CSVLink>
    );
};

export default CsvReportButtonComponent;
