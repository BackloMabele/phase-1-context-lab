function createEmployeeRecord(employeeArray) {
    const [firstName, familyName, title, payPerHour] = employeeArray
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map((records) => createEmployeeRecord(records))
}

function createTimeInEvent(dateStamp) {
    const [date, time] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date
    }) 
    return this;
}

function createTimeOutEvent(dateStamp) {
    const [date, time] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date
    })
    return this
}

function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
  
    if (!timeInEvent || !timeOutEvent) {
      return 0;
    } else {
        return (timeOutEvent.hour - timeInEvent.hour) / 100;
    }    
  }

  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const payRate = this.payPerHour;
    const payOwed = hoursWorked * payRate;
    return payOwed;
}

  function calculatePayroll(employeeRecordsArray) {
    let payroll = 0
    for(const employeeRecord of employeeRecordsArray) {
      payroll += allWagesFor.call(employeeRecord)
    }
    return payroll
  }

  function findEmployeeByFirstName(employeeRecords, firstName) {
    return employeeRecords.find(employeeRecord => employeeRecord.firstName === firstName)
  }
  
  
  
  
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

