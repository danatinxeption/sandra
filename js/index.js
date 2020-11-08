
const url = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-air-quality-measurements&q=&rows=10&start=1&sort=-measurements_parameter&facet=city&facet=location&facet=measurements_unit&facet=measurements_parameter&facet=measurements_lastupdated';

const getTableData = fetch(url);

getTableData.then(res => res.json())
  .then(data => data.records)
  .then(records => {
    const table = records.map(record => {
      let row = {};
      const fields = (record && record.fields) || [];
      const city = (fields && fields.city) || '';
      const country = (fields && fields.country) || '';
      const measurements_value = (fields && fields.measurements_value) || 0;
      const measurements_lastupdated = (fields && fields.measurements_lastupdated) || 'N/R';
      row.location = `${city}, ${country}`;
      row.pm25 = measurements_value;
      row.lastupdated = measurements_lastupdated;
      return row;
    });
    return table;
  })
  .then(table => {
    const tableBody = document.getElementById('table-body');
    const tableRows = table.map(row => {
      const location = (row && row.location) || '';
      const pm25 = (row && row.pm25) || 0;
      const lastupdated = (row && row.lastupdated) || 'N/R';
      return `
        <tr>
          <td>${location}</td>
          <td>${pm25}</td>
          <td>${lastupdated}</td>      
        </tr>
      `;
    });
    tableBody.innerHTML += tableRows && tableRows.join('');
  })  
  .then(console.log)
  .catch();