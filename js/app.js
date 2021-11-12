// import the data from data.js
const tableData = data;
// Reference the HTML table using d3
var tbody = d3.select('tbody');


function buildTable (data) {
    // First, clear out any existing data
    tbody.html('');
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        let row = tbody.append('tr');
        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append('td');
            cell.text(val);
        }); // end Object.values
    }); // data.forEach
}; // end function buildTable

function handleClick() {
    // Search for dates and times and grab the data
    let date = d3.select('#datetime').property('value');
    // set a default filter and save it
    let filteredData = tableData;
    // now to filter the data with the date, if found
    if (date) {
        // apply filter to the table data to only keep the rows where
        // the datetime value matches the filtered value
        filteredData = filteredData.filter(row => row.datetime === date);
    };

    // rebuild the table using the filtered data
    // Note: if no date was entered, then filteredData will 
    // just return the original tableData
    buildTable(filteredData);
}; // end of function handleClick

d3.selectAll('#filter-btn').on('click', handleClick);

buildTable(tableData);

