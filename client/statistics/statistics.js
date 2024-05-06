//import { create } from 'domain';
import { createElement, getElement, appendChildren, createButton, createSelect, createLabelInput, createSelectWithOption } from '../helperFunctions.js';
import * as tabBar from '../RunningFeed/tabBar.js';


//--------------------------------------------------------------------------------------------------------------------set up page 

//when the page loads fetch and display data
window.onload = () => {


    // sort data into past and future runs 
    fetch('/updateToPastRun')
        .then(res => res.json())
        .then(jsn => {
            console.log(jsn);
            // retrieve data
            return fetch('/api/fetchRuns');
        })
        .then(res => res.json())
        .then(jsn => {
            console.log(jsn);
            let user = jsn[0];
            //filter for the user
            GLOBALdata = jsn[1].filter(run =>
                run.username == user || run.participants.some(participant => participant.name == user)
            );
            let yearOptions = getUniqueYears(GLOBALdata);
            console.log("YEAR", yearOptions);

            let selectFilter = getElement("selectYear");

            selectFilter.innerHTML = '';

            // create Dropdown for the years
            yearOptions.forEach(year => {
                let option = createElement("option");
                option.text = year;
                option.value = year;
                selectFilter.appendChild(option);

                if (year == yearOptions[1]) {
                    option.selected = true
                }
            });

            selectFilter.addEventListener("change", () => {
                createBarChart(GLOBALdata)

            })


            console.log('filtered data: ', GLOBALdata)

            displayUserInfo(user);
            populateRecommendations(user)
            displayTable(GLOBALdata);
            displayStatistics(GLOBALdata);
            populateRecommendations(user)


            const pastRuns = GLOBALdata.filter(run => run.finished === true);
            const futureRuns = GLOBALdata.filter(run => run.finished === false);
            updateTable(pastRuns);
            scheduledTable(futureRuns);
            topScoresTable(pastRuns);

            //displayGoalResources();
        })
        .catch(error => console.log(error));
};

// retrieve the unique years from the data
const getUniqueYears = (data) => {

    data = data.filter(run => run.finished === true)

    let yearOptions = []

    for (let year of data) {
        let years = year.date.split('-')[0]

        if (!yearOptions.includes(years)) {
            yearOptions.push(years)
        }
    }
    return yearOptions
}

// create the user information section
function displayUserInfo(user) {
    fetch(`/fetchUserInfo/${user}`)
        .then(res => res.json())
        .then(userData => {

            let userProfile = document.getElementById('user-profile');
            // Add a class to the userProfile for styling
            userProfile.id = "userProfil"
            userProfile.classList.add('user-profile');



            let topProfileDiv = createElement("div", "topProfileDiv")

            let emoji = document.createElement('h1');
            console.log(userData.userEmoji);
            emoji.textContent = userData.userEmoji;
            emoji.classList.add('user-emoji');
            userProfile.appendChild(emoji);


            let heading = document.createElement('h1');
            heading.textContent = user;
            heading.classList.add('user-heading');
            userProfile.appendChild(heading);

            appendChildren(topProfileDiv, emoji, heading)
            let profileDiv = document.getElementById('profile');
            profileDiv.insertBefore(topProfileDiv, profileDiv.firstChild);

            let userInfo = document.createElement('div');
            userInfo.classList.add('user-info');
            userProfile.appendChild(userInfo);

            // Display age
            let ageInfo = document.createElement('p');
            ageInfo.textContent = `Age: ${userData.ageUser} years`;
            ageInfo.classList.add('user-age');
            userInfo.appendChild(ageInfo);

            // Display height
            let heightInfo = document.createElement('p');
            heightInfo.id = "heightInfo"
            heightInfo.textContent = `Height: ${userData.heightUser}m`;
            heightInfo.classList.add('user-height');
            userInfo.appendChild(heightInfo);

            // Display weight
            let weightInfo = document.createElement('p');
            weightInfo.id = "weightInfo"
            weightInfo.textContent = `Weight: ${userData.weightUser}kg`;
            weightInfo.classList.add('user-weight');
            userInfo.appendChild(weightInfo);

            // Display goal
            let goalInfo = document.createElement('p');
            goalInfo.id = "goalInfo"
            goalInfo.textContent = `Goal: ${userData.goalUser}`;
            goalInfo.classList.add('user-goal');
            userInfo.appendChild(goalInfo);

            //Button to Change goals and Emoji
            let changeSettingsButton = createButton("Update Profile")
            changeSettingsButton.addEventListener("click", () => {
                updateProfilLayout(userData)
                populateRecommendations(userData)
            })
            userInfo.appendChild(changeSettingsButton)
            populateRecommendations(userData)


        })
        .catch(err => console.log(err))
}

// call functions to populate the tables
function displayTable(GLOBALdata) {

    createSelectionLayout(GLOBALdata);
    scheduledTable(GLOBALdata);
    formSubmit(GLOBALdata)
}

// display the user's statistics
function displayStatistics(GLOBALdata) {
    createGraphs(GLOBALdata);
}


// let the user update the information 
// 1. create the layout for the update
function updateProfilLayout(userData) {
    console.log("pressed");
    let userProfil = getElement("userProfil")

    userProfil.innerHTML = ""

    console.log(userData)

    let formUpdateProfil = document.createElement("form");
    formUpdateProfil.id = "formUpdateProfil"

    let heightOptions = [];
    for (let i = 100; i <= 230; i++) {
        heightOptions.push(i);
    }

    let weightOptions = [];
    for (let i = 40; i <= 150; i++) {
        weightOptions.push(i);
    }

    let trainingGoalOptions = ["Get Fit", "5km PB", "10km PB", "Halfmarathon", "Marathon"]


    createSelect(formUpdateProfil, heightOptions, "heightUpdate", "New Height: ", userData.heightUser);
    createSelect(formUpdateProfil, weightOptions, "weightUpdate", "New Weight: ", userData.weightUser);
    createSelect(formUpdateProfil, trainingGoalOptions, "goalUpdate", "New Goal: ", userData.goalUser)
    let saveButton = createButton("Save Changes", "saveButton")
    let goBackButton = createButton("Go Back", "goBackButton")
    saveButton.addEventListener("click", () => {
        updateProfil()
    })
    goBackButton.addEventListener("click", () => {
        let heightSelect = getElement("heightUpdate");
        heightSelect.value = userData.heightUser;

        let weightSelect = getElement("weightUpdate");
        weightSelect.value = userData.weightUser;

        let goalSelect = getElement("goalUpdate");
        goalSelect.value = userData.goalUser;

        updateProfil()
    })

    appendChildren(userProfil, formUpdateProfil, saveButton, goBackButton)
}


// 2. function that would make the post request for the updates
const updateProfil = () => {
    let height = getElement("heightUpdate").value
    let weight = getElement("weightUpdate").value
    let goal = getElement("goalUpdate").value

    let data = { height: height, weight: weight, goal: goal };
    console.log(data)
    fetch("/updateUserProfil", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(reponse => {
            if (reponse.ok) {
                console.log("Information updated")
            }
            else {
                alert("Something went wrong. Try again")
            }
        })

    window.location.reload()
}





//-------------------------------------------create table and submission of user for filtering options
var GLOBALdata;

// create the filter section for the tables
const createSelectionLayout = (data) => {
    let filteredData = data.filter(run => run.finished === true)
    let heading = createElement("h1")
    heading.innerHTML = "Filter Past Runs";
    let dropDownDiv = createElement("form", "dropDownDiv");


    createSelect(dropDownDiv, uniqueLocations(filteredData), "location", "Select Location : ");
    createSelectWithOption(dropDownDiv, uniqueMonths(filteredData), "date", "Select Month : ", "monthName", "monthNumber");
    let submitSelection = createButton("Submit Selection", "submitButton");
    appendChildren(submitSelection);

    let run = getElement("form-container");
    appendChildren(heading, dropDownDiv);
    appendChildren(run, dropDownDiv);
    appendChildren(run, submitSelection);

    //add event listener to button
    submitSelection.addEventListener('click', () => {
        console.log("submission of selection")
        formSubmit(GLOBALdata);


    });
}

//populate location dropdown with unique locations
function uniqueLocations(data) {
    const uniqueLocal = ["All"];

    data.forEach(item => {
        if (!uniqueLocal.includes(item.city)) {
            uniqueLocal.push(item.city);
        }
    });
    return uniqueLocal;
}

// added the actual months to it
function uniqueMonths(data) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const uniqueMonths = [{ monthNumber: 0, monthName: "All" }];


    data.forEach(date => {
        const monthNumber = parseInt(date.date.split('-')[1]);
        const monthName = monthNames[monthNumber - 1];

        if (!uniqueMonths.some(month => month.monthName === monthName)) {
            uniqueMonths.push({
                monthNumber: monthNumber,
                monthName: monthName
            });
        }
    });



    return uniqueMonths;
}



//function to handle user selections
function formSubmit(data) {
    // Get selected month and location
    let selectedMonth = document.getElementById("date").value;
    let selectedLocation = document.getElementById("location").value;


    data = data.filter(run => run.finished === true);

    let filteredData = data;

    console.log(selectedLocation, selectedMonth)

    if (selectedMonth != "0") {
        filteredData = filteredData.filter(run => parseInt(run.date.slice(5, 7)) == selectedMonth);
    }


    if (selectedLocation != "All") {
        filteredData = filteredData.filter(run => run.city == selectedLocation);
    }

    console.log('filtered data', filteredData);

    updateTable(filteredData);
}




// update the table
function updateTable(filteredData) {
    const tableBody = getElement(`pastTableBody`);
    tableBody.innerHTML = ""; //to clear the previous data

    filteredData.sort((a,b) => {
        return Date.parse(a.date) - Date.parse(b.date);
    });

    filteredData.forEach(run => {
        const row = createElement(`tr`);
        const dateCell = createElement(`td`);
        const timeCell = createElement(`td`);
        const locationCell = createElement(`td`);
        const distanceCell = createElement(`td`);
        const paceCell = createElement(`td`);

        dateCell.innerHTML = run.date;
        timeCell.innerHTML = run.time;
        locationCell.innerHTML = run.city;
        distanceCell.innerHTML = run.distance;
        paceCell.innerHTML = run.pace;

        appendChildren(row, dateCell, timeCell, locationCell, distanceCell, paceCell);
        tableBody.appendChild(row);

    });
}

// 
function scheduledTable(data) {
    const tableBody = getElement(`futureTableBody`);
    tableBody.innerHTML = "";

    let filteredData = data.filter(run => run.finished === false)
    filteredData.sort((a,b) => {
        return Date.parse(a.date) - Date.parse(b.date);
    });

    filteredData.forEach(run => {
        const row = createElement(`tr`);
        const dateCell = createElement(`td`);
        const timeCell = createElement(`td`);
        const locationCell = createElement(`td`);
        const distanceCell = createElement(`td`);
        const paceCell = createElement(`td`);

        dateCell.innerHTML = run.date;
        timeCell.innerHTML = run.time;
        locationCell.innerHTML = run.city
        distanceCell.innerHTML = run.distance;
        paceCell.innerHTML = run.pace;

        appendChildren(row, dateCell, timeCell, locationCell, distanceCell, paceCell);
        tableBody.appendChild(row);
    });
}


//table for best runs
function topScoresTable(filteredData) {
    const tableBody = getElement(`bestRunsTable`);
    tableBody.innerHTML = "";


    let data = filteredData;
    let longestRun = data[0];
    let fastestRun = data[0];

    for (let i = 1; i < data.length; i++) {
        if (data[i].distance > longestRun.distance) {
            longestRun = data[i];
        }
        if (data[i].pace > fastestRun.pace) {
            fastestRun = data[i];
        }
    }

    const averageDistanceOverall = avgDistancePerRun(data);

    // Define createRow function
    function createRow(label, value) {
        const row = document.createElement('tr');
        const labelCell = document.createElement('td');
        labelCell.textContent = label;
        const valueCell = document.createElement('td');
        valueCell.textContent = value;

        row.appendChild(labelCell);
        row.appendChild(valueCell);

        return row;
    }

    const longCell = createRow("Longest Run:", longestRun.date + ' - ' + longestRun.distance + ' km');
    const fastCell = createRow("Fastest Pace:", fastestRun.date + ' - ' + fastestRun.pace + ' min/km');
    const avgDistanceCell = createRow("Average Distance:", averageDistanceOverall + " km");

    appendChildren(tableBody, longCell, fastCell, avgDistanceCell);
}

//average distance per run
function avgDistancePerRun(data) {
    let totalDistance = 0;
    let totalRuns = data.length;

    //sum up the distances
    data.forEach(run => {
        totalDistance += run.distance;
    });

    const averageDistancePerRun = totalDistance / totalRuns;

    return averageDistancePerRun;
}

//calculate average distance, total distance and number of runs of the user
function avgDistancePerMonth(data) {
    let selectedYear = getElement("selectYear").value
    data = data.filter(run => run.finished === true)

    data = data.filter(run => run.date.split("-")[0] == selectedYear)



    console.log("AVG", data)
    let temp = uniqueMonths(data);
    temp = temp.slice(1)

    let months = []
    for (let el of temp) {
        months.push(el.monthNumber)
    }
    const monthData = {};

    months.forEach(month => {
        monthData[month] = { totalDistance: 0, runCount: 0 };
    });

    console.log("monthData", monthData)

    //calculate total distance and count of runs
    data.forEach(item => {
        const month = parseInt(item.date.split('-')[1]);


        monthData[month].totalDistance += parseInt(item.distance);
        monthData[month].runCount++;
    });

    //calculate average distance for each month
    const averageDistances = months.map(month => {
        const totalDistance = monthData[month].totalDistance;
        const runCount = monthData[month].runCount;
        return {
            month: month,
            totalDistance: totalDistance,
            numberofRuns: runCount,
            averageDistance: totalDistance / runCount,


        };
    });

    //turn months into names
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const formattedData = averageDistances.map(item => {
        return {
            month: monthNames[item.month - 1],
            averageDistance: item.averageDistance,
            numberofRuns: item.numberofRuns,
            totalDistance: item.totalDistance,



        };
    });
    console.log(formattedData);
    return formattedData;
}

// Give the user tips for his runs based on the goals selected
const populateRecommendations = (data) => {

    let videoDiv = getElement("videoDiv")

    if (data.goalUser == "Get Fit") {

        videoDiv.innerHTML = '<iframe width="100%" height="315" src="https://www.youtube.com/embed/AdgWxAEH2y0?si=KL2xNf12E3YMMTJ3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'

    }
    else if (data.goalUser == "5km PB") {
        videoDiv.innerHTML = '<iframe width="100%" height="315" src="https://www.youtube.com/embed/pQSUQ0s_8h0?si=WPfm5hYyYnGmKkcC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
    }
    else if (data.goalUser == "10km PB") {
        videoDiv.innerHTML = '<iframe width="100%" height="315" src="https://www.youtube.com/embed/gsEgSFmPP1Y?si=vhiohhulV6d6DHD7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
    }
    else if (data.goalUser == "Halfmarathon") {
        videoDiv.innerHTML = '<iframe width="100%" height="315" src="https://www.youtube.com/embed/RSY7ypEYO1s?si=1tdkPzDY1AJxJ5wE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
    }
    else if (data.goalUser == "Marathon") {
        videoDiv.innerHTML = '<iframe width="100%" height="315" src="https://www.youtube.com/embed/vCKmK7vOEqs?si=O3HMps7irrbM2Lwy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
    }




}








//--------------------------------------------------------------------------------------------------------------------create the charts
let selected_month = "0"
let selected_run = "0"


//function to create the initial graphs
function createGraphs(data) {

    createBarChart(data);
    // createMonthlyBarChart(data);
    createScatterChart(data)
    topScoresTable(data)
}




//---------------------create bar chart for distance of run and individual date
function createBarChart(data) {


    data = avgDistancePerMonth(GLOBALdata)
    console.log("AVG TEST: ", data)

    //data = data.filter(run => run.finished === true)





    function parseDistancetoInt(d) {
        d.distance = parseInt(d.totalDistance);
        return d;
    }

    data.forEach(parseDistancetoInt)

    const barChartMargin = { top: 100, right: 30, bottom: 105, left: 60 },
        barChartWidth = 310 - barChartMargin.left - barChartMargin.right,
        barChartHeight = 400 - barChartMargin.top - barChartMargin.bottom;

    getElement("barChart").innerHTML = ""

    const svg_a_bar = d3.select('#barChart')
        .append("svg")
        .attr("width", barChartWidth + barChartMargin.left + barChartMargin.right)
        .attr("height", barChartHeight + barChartMargin.top + barChartMargin.bottom)
        .append("g")
        .attr("transform", `translate(${barChartMargin.left}, ${barChartMargin.top})`)

    //create x axis
    var a_bar_x = d3.scaleBand()
        .range([0, barChartWidth])
        .domain(data.map(function (d) { return d.month; }))
        .padding(0.2);
    svg_a_bar.append("g")
        .attr("transform", "translate(0," + barChartHeight + ")")
        .call(d3.axisBottom(a_bar_x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    //create y axis
    // const a_bar_max = d3.max(data, d =>d.totalDistance)

    let totalDistances = [];


    for (let obj of data) {
        totalDistances.push(parseInt(obj.totalDistance));
    }

    let maxDistance = Math.max(...totalDistances);




    var a_bar_y = d3.scaleLinear()
        .domain([0, maxDistance])
        .range([barChartHeight, 0]);
    var yAxis = d3.axisLeft(a_bar_y)
        .tickSize(6)
    svg_a_bar.append("g")
        .call(yAxis);

    //bars
    svg_a_bar.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) { return a_bar_x(d.month); })
        .attr("y", function (d) { return a_bar_y(d.totalDistance); })
        .attr("width", a_bar_x.bandwidth())
        .attr("height", function (d) { return barChartHeight - a_bar_y(d.totalDistance); })
        .attr("fill", "#3288bd")



    svg_a_bar.append("text")
        .attr("class", "header")
        .attr("text-anchor", "end")
        .attr("x", barChartWidth - 20)
        .attr("y", -20)
        .text("Total Distance per Month");


    // y-axis label
    svg_a_bar.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "end")
        .attr("x", - 45)
        .attr("y", - 40)
        .attr("transform", "rotate(-90)")
        .text("Distance (km)");
}



//------------------create scatter plot chart for the distance in km and the pace in km
function createScatterChart(data) {
    
    const pastRuns = data.filter(run => run.finished);
    
    function parsePacetoInt(d) {
        d.pace = parseInt(d.pace);
        return d;
    }

    pastRuns.forEach(parsePacetoInt);

    function parseDistancetoInt(d) {
        d.distance = parseInt(d.distance);
        return d;
    }

    pastRuns.forEach(parseDistancetoInt)

    const scatterChartMargin = { top: 100, right: 30, bottom: 105, left: 60 },
        scatterChartWidth = 310 - scatterChartMargin.left - scatterChartMargin.right,
        scatterChartHeight = 400 - scatterChartMargin.top - scatterChartMargin.bottom;

    // specify dimension for the chart
    var svg_a_scatter = d3.select("#scatterChart")
        .append("svg")
        .attr("width", scatterChartWidth + scatterChartMargin.left + scatterChartMargin.right)
        .attr("height", scatterChartHeight + scatterChartMargin.top + scatterChartMargin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + scatterChartMargin.left + "," + scatterChartMargin.top + ")");


    // Add X axis 
    var x_scatter = d3.scaleLinear()
        .domain([0, d3.max(pastRuns, d => d.distance + 1)])
        .range([0, scatterChartWidth])
    svg_a_scatter.append("g")
        .attr("transform", "translate(0," + scatterChartHeight + ")")
        .call(d3.axisBottom(x_scatter));

    // Add Y axis
    const a_scatter_max = d3.max(pastRuns, d => d.pace + 0.5)
    var y_scatter = d3.scaleLinear()
        .domain([2, a_scatter_max])
        .range([scatterChartHeight, 0]);

    //append graph to the chart   
    svg_a_scatter.append("g")
        .call(d3.axisLeft(y_scatter));

    //make and place circles
    svg_a_scatter.append("g")
        .selectAll("dot")
        .data(pastRuns)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x_scatter(d.distance); })
        .attr("cy", function (d) { return y_scatter(d.pace); })
        .attr("r", 5)
        .attr("fill", "#3288bd");

    // Add X axis label
    svg_a_scatter.append("text")
        .attr("text-anchor", "end")
        .attr("x", scatterChartWidth / 2 + scatterChartMargin.left - 10)
        .attr("y", scatterChartHeight + scatterChartMargin.top - 40)
        .text("Distance (km)");

    // Y axis label
    svg_a_scatter.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -scatterChartMargin.left + 20)
        .attr("x", -scatterChartMargin.top - scatterChartHeight / 2 + 140)
        .text("Pace in min/km")

    //scatter title
    svg_a_scatter.append("text")
        .attr("class", "header")
        .attr("text-anchor", "end")
        .attr("x", scatterChartWidth - 40)
        .attr("y", -20)
        .text("Pace per Distance");
}




//---------------------------------------------------------------------------------------------------------------------- create nav bar 



// add the navbar to the page
let navigationBar = tabBar.createNavigationBar();
document.body.insertBefore(navigationBar, document.body.firstChild);
