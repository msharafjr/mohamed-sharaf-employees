import moment from 'moment';

/**
 * Group records by project id
 *
 * Example input
 * [
 *   [ '1', '1', '2010/1/01', '2010/12/31' ]
 *   [ '2', '1', '2010/6/30', 'NULL' ]
 *   [ '3', '2', '2010/1/15', '2015/1/14' ]
 * ]
 *
 * @param {array} records array of records
 * @returns object
 */
 export function groupRecordsByProjectId( records ) {
  return records.reduce(( accumulator, record ) => {
    const projectId = record[ 1 ];

    // Add project id as a key if not exists
    if ( ! accumulator[ projectId ] ) {
      accumulator[ projectId ] = {
        // Save all records that shares same project id
        projectId,
        records: [],
      };
    }

    // Group all records with the same project id
    accumulator[ projectId ].records.push( record );

    return accumulator;
  }, {});
}

/**
 * Get the longest Period of time
 * @param {array} records A group of records of project id
 * @returns object
 */
export function getLongestPeriodInCommon( records ) {
  // Set longest with initial values
  const longest = {
    employeeA: 0,
    employeeB: 0,
    maxDaysInCommon: 0,
  };
  // One day in milliseconds
  const ONE_DAY = 1000 * 60 * 60 * 24;

  // Compare one record with another
  for ( let i = 0; i < records.length; i++ ) {
    for ( let j = i + 1; j < records.length; j++ ) {
      // Get start and end dates of the first record
      const startDateA = new Date( moment( records[ i ][ 2 ] ).format() );
      const endDateA = records[ i ][ 3 ].trim().toUpperCase() === 'NULL'
        ? new Date() /* Set to today */
        : new Date( moment( records[ i ][ 3 ] ).format() );

      // Get start and end dates of the second record
      const startDateB = new Date( moment( records[ j ][ 2 ] ).format() );
      const endDateB = records[ j ][ 3 ].trim().toUpperCase() === 'NULL'
        ? new Date() /* Set to today */
        : new Date( moment( records[ j ][ 3 ] ).format() );

      const startDate = startDateA < startDateB ? startDateB : startDateA; /* Pick the "oldest" start date */
      const endDate = endDateA < endDateB ? endDateA : endDateB; /* Pick the "newest" end date */

      // Set a flag for invalid dates
      let invalidDate = false;
      [ startDateA, endDateA, startDateB, endDateB ].forEach( d => {
        if ( ! isValidDate( d ) ) {
          invalidDate = true;
          return;
        }
      });

      /**
       * Skip current iteration and ignore
       * the record if any date is invalid
       */
      if ( invalidDate ) {
        continue;
      }

      if ( startDate <= endDate ) { 
        Object.assign( longest, {
          employeeA: records[ i ][ 0 ],
          employeeB: records[ j ][ 0 ],
          maxDaysInCommon: Math.ceil( Math.abs( endDate - startDate ) / ONE_DAY ),
        });
      }
    }
  }

  return longest;
}

/**
 * Formate records
 * @param {array} data array of parsed CSV data
 * @returns array of formatted records
 */
export function formateRecords( data ) {
  const groupRecords = groupRecordsByProjectId( data );
  const longest = Object.values( groupRecords ).map(({ projectId, records }) => {
    const { employeeA, employeeB, maxDaysInCommon } = getLongestPeriodInCommon(
      records
    );

    return {
      employeeA,
      employeeB,
      projectId,
      maxDaysInCommon,
    };
  });

  // Exclude records that has no days in commn
  return longest.filter( l => l.maxDaysInCommon !== 0 );
}

/**
 * Check if a given date is valid
 * @param {object} date A date object instance
 * @returns boolean
 */
function isValidDate( date ) {
  return date instanceof Date && ! isNaN( date );
}
