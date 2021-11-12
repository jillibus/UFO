// import the data from data.js
const tableData = data;
// Reference the HTML table using d3
var tbody = d3.select('tbody');

// Builds table for webpage (can be filtered or unfiltered)
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

// function to filter data once button is clicked
function handleClick() {
    // set a default filter and save it
    let filteredData = tableData;
    // capture the filtered choices
    var datetimeElement = d3.select("#datetime");
    var citynameElement = d3.select("#cityname");
    var statenameElement = d3.select("#stateneme");
    var countrynameElement = d3.select("#countryname");
    var shapenameElement = d3.select("#shapename");
    // capture the value given for the elements
    var datetimeValue = datetimeElement.property("value");
    var citynameValue = citynameElement.propery("value");
    var statenameValue = statenameElement.property("value");
    var countrynameValue = countrynameElement.property("value")
    var shapenameValue = shapenameElement.property("value")
    // now to filter the data with the value, if found
    // apply filter to the table data to only keep the rows where
    // the value matches the filtered value
    if (datetimeValue != "") {
        filteredData = filteredData.filter(row => row.datetime === datetimeValue);
    };
    if (citynameValue != "") {
        filteredData = filteredData.filter(row => row.city === citynameValue);
    };
    if (statenameValue != "") {
        filteredData = filteredData.filter(row => row.state === statenameValue);
    };
    if (countrynameValue != "") {
        filteredData = filteredData.filter(row => row.city === countrynameValue);
    };
    if (shapenameValue != "") {
        filteredData = filteredData.filter(row => row.shape === shapenameValue);
    };
    // Print filteredData to log
    console.log(filteredData);
    // rebuild the table using the filtered data
    // Note: if no date was entered, then filteredData will 
    // just return the original tableData
    buildTable(filteredData);
}; // end of function handleClick

// Event listener to react to button and call function handleClick
d3.selectAll('#filter-btn').on('click', handleClick);

// Load tableData on startup without filtered data
buildTable(tableData);

