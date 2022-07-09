import React, { useState, useRef, useCallback } from 'react';
import Papa from 'papaparse';

import { formateRecords } from './utils';

function CSV({ onSuccess }) {
  const [ error, setError ] = useState( '' );
  const fileNameRef = useRef( null );

  const handleFileChange = useCallback(( e ) => {
    function handleChange( e ) {
      setError( '' );
      if ( e.target.files.length ) {
        const inputFile = e.target.files[ 0 ];
        const fileType = inputFile.type.split( '/' )[ 1 ];

        // Display an error if the selected file type is not .csv
        if ( fileType !== 'csv' ) {
          setError( 'Only CSV file type supported, please try again!' );
          return;
        }

        handleParse( inputFile );
        // Display the file name
        fileNameRef.current.innerText = inputFile.name;
      }
    }

    function handleParse( inputFile ) {        
      const reader = new FileReader();

      reader.readAsText( inputFile );

      reader.onload = ({ target }) => {
        // Parse the file using papaparse
        Papa.parse( target.result, {
          comments: "#",
          skipEmptyLines: true,
          complete: results => {
            onSuccess( formateRecords( results.data ) );
          },
        });
      };
    };

    handleChange( e );
  }, [onSuccess]);

  return (
    <>
      <label id='fileLabel' htmlFor='csvInput'>
        Enter <b>CSV</b> File
        <input
          onChange={handleFileChange}
          id='csvInput'
          name='file'
          type='file'
          accept='.csv'
          style={{ display: 'none' }}
        />
        <p id='fileName' ref={fileNameRef} style={{ color: 'green' }}></p>
      </label>
      <p id='errorMessage'>{error}</p>
    </>
  );
};

export default CSV;
