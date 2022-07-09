import { useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const columnDefs = [
  { field: 'employeeA', headerName: 'Employee ID #1' },
  { field: 'employeeB', headerName: 'Employee ID #2' },
  { field: 'projectId', headerName: 'Project ID' },
  { field: 'maxDaysInCommon', headerName: 'Days worked' }
];

function Table({ rowData }) {
  const onGridReady = useCallback(( param ) => {
    param.api.sizeColumnsToFit();
  }, []);

  return (
    <div className='ag-theme-alpine' style={{ height: 400 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default Table;
