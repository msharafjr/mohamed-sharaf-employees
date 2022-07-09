import { useState } from 'react';
import CSV from './csv';
import Table from './table';

function App() {
  const [ data, setData ] = useState( [] );

  return (
    <>
      <CSV onSuccess={setData} />
      <Table rowData={data} />
    </>
  );
}

export default App;
