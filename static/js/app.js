// import the data from data.js
const tableData = data;
// Reference the HTML table using d3
var tbody = d3.select("tbody");

// clear filtered variables
function clearVariables() {
    buildTable(tableData);
}

// Builds table for webpage (can be filtered or unfiltered)
function buildTable (data) {
    // First, clear out any existing data
    tbody.html("");
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        let row = tbody.append("tr");
        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        }); // end Object.values
    }); // data.forEach
}; // end function buildTable


// function to filter data once button is clicked
function handleClick() {
    // set a default filter and save it
    let filteredData = tableData;
    // capture the filtered choices
    let datetimeElement = d3.select("#datetime");
    let citynameElement = d3.select("#cityname");
    let statenameElement = d3.select("#statename");
    let countrynameElement = d3.select("#countryname");
    let shapenameElement = d3.select("#shapename");
    // capture the value given for the elements
    let datetimeValue = datetimeElement.property("value");
    let citynameValue = citynameElement.property("value").toLowerCase().trim();
    let statenameValue = statenameElement.property("value").toLowerCase().trim();
    let countrynameValue = countrynameElement.property("value").toLowerCase().trim();
    let shapenameValue = shapenameElement.property("value").toLowerCase().trim();
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
        filteredData = filteredData.filter(row => row.country === countrynameValue);
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
d3.selectAll("#filter-btn").on("click", handleClick);
// Allow user to clear the filter choices
d3.selectAll("#clear-btn").on("click",clearVariables);

// Load tableData on startup without filtered data
buildTable(tableData);
