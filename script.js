// Set the array to store team data
var teamData = [];
var currentID = 0;

// Add event listener to the "Calculate" button
document.getElementById('calculate').addEventListener('click', calculationProcess);

// Add event listener to the "Add Team" button
document.getElementById('addTeam').addEventListener('click', addProcess);

// Add event listener to the "Edit Team" button
document.getElementById('editTeam').addEventListener('click', editProcess);

// Add event listener to the "Remove Team" button
document.getElementById('removeTeam').addEventListener('click', removalProcess);

function removalProcess(event){
    event.preventDefault(); // Prevent the form from resetting

    // Remove the last element
    teamData.pop();

    //Add message
    alert("Team has been successfully deleted");
}

function calculationProcess(event) {
  event.preventDefault(); // Prevent the form from resetting

  // Transform user inputs into variables
  var yearlyBudget = parseFloat(document.getElementById('budget').value.replace(/,/g, ''));

  //Calculate the cost of all teams
  var hourlyCostPerTeam = 0.0; //Establish cost for each team
  var workPerHourPerTeam = 0.0; //Establish work per hour for each team
  var daysOfWorkPerTeam = 0.0; //Establish days of work for each team
  var numberOfEmployeesPerTeam = 0.0; //Establish number of employees per team
  var totalCostOfAllTeams = 0.0; //Establish total cost of all teams

  for(var i=0; i < teamData.length; i++){ //Iterate through
    hourlyCostPerTeam += currencyToDouble(teamData[i].hourlySalaryData);
    workPerHourPerTeam += teamData[i].hoursOfWorkData;
    daysOfWorkPerTeam += teamData[i].daysOfWorkData;
    numberOfEmployeesPerTeam += teamData[i].numberOfEmployeesData;
  }
  totalCostOfAllTeams = calculateYearlyCost(hourlyCostPerTeam,workPerHourPerTeam,daysOfWorkPerTeam,numberOfEmployeesPerTeam);

  // Format the total payment as currency
  var formattedPayment = totalCostOfAllTeams.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });

  // Calculate the remaining budget
  var remainingBudget = yearlyBudget - totalCostOfAllTeams;

  // Format the remaining budget as currency
  var formattedBudget = remainingBudget.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });

  //Determine whether to remove if balance is negative
  if(remainingBudget < 0){
    alert("We are removing one team from your list because your balance is minus");
    teamData.pop();
  } else {
    // Display the result in an alert message
    alert("This project will cost around " + formattedPayment + " with " + teamData.length + " team(s) " +
    ". Therefore, the remaining balance will be " + formattedBudget);
  }
}

function calculateYearlyCost(hourlySalary,hoursOfWork,daysOfWork,numberOfEmployees){
    // Calculate daily payment
    var dailyPayment = hourlySalary * hoursOfWork;

    // Calculate total payment
    return numberOfEmployees * (dailyPayment * daysOfWork);
}

function currencyToDouble(currencyValue) {
    // Remove currency symbol and commas from the string
    var numericValue = currencyValue.replace(/[^0-9.-]+/g, '');
  
    // Parse the resulting string as a floating-point number
    var floatValue = parseFloat(numericValue);
  
    return floatValue;
  }

function addProcess(event) {
  event.preventDefault(); // Prevent the form from resetting

  // Transform user inputs into variables
  var teamID = currentID;
  currentID++; // Increment the currentID before assigning it to teamNumberData
  var teamName = document.getElementById('team').value;
  var hourlySalary = parseFloat(document.getElementById('salary').value);
  var hoursOfWork = parseFloat(document.getElementById('hours').value);
  var daysOfWork = parseFloat(document.getElementById('days').value);
  var numberOfEmployees = parseFloat(document.getElementById('employeeNumber').value);

  // Format hourly salary as currency
  var formattedhourlySalary = hourlySalary.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });

  // Create a new object with the required properties
  var teamDataObject = {
    Id: teamID,
    teamNameData: teamName,
    teamNumberData: currentID,
    hourlySalaryData: formattedhourlySalary,
    hoursOfWorkData: hoursOfWork,
    daysOfWorkData: daysOfWork,
    numberOfEmployeesData: numberOfEmployees
  };

  // Add the object to the teamData array
  teamData.push(teamDataObject);

  //Add message
  alert("Team has been successfully added");
}

function editProcess(event) {
    event.preventDefault(); // Prevent the form from resetting
  
    var teamNumber = parseInt(document.getElementById('teamNumber').value) - 1; // Get the team number of the object
  
    // Assign the element into form by Id
    var teamNameInput = document.getElementById('team');
    var hourlySalaryInput = document.getElementById('salary');
    var hoursOfWorkInput = document.getElementById('hours');
    var daysOfWorkInput = document.getElementById('days');
    var numberOfEmployeesInput = document.getElementById('employeeNumber');
  
    // Assign the team number
    teamNameInput.value = teamData[teamNumber].teamNameData;
    hourlySalaryInput.value = teamData[teamNumber].hourlySalaryData;
    hoursOfWorkInput.value = teamData[teamNumber].hoursOfWorkData;
    daysOfWorkInput.value = teamData[teamNumber].daysOfWorkData;
    numberOfEmployeesInput.value = teamData[teamNumber].numberOfEmployeesData;
  
// Commit changes
  teamNameInput.addEventListener('input', function() {
    teamData[teamNumber].teamNameData = teamNameInput.value;
  });
  hourlySalaryInput.addEventListener('input', function() {
    teamData[teamNumber].hourlySalaryData = hourlySalaryInput.value;
  });
  hoursOfWorkInput.addEventListener('input', function() {
    teamData[teamNumber].hoursOfWorkData = hoursOfWorkInput.value;
  });
  daysOfWorkInput.addEventListener('input', function() {
    teamData[teamNumber].daysOfWorkData = daysOfWorkInput.value;
  });
  numberOfEmployeesInput.addEventListener('input', function() {
    teamData[teamNumber].numberOfEmployeesData = numberOfEmployeesInput.value;
  });
  }
  