// @TODO: YOUR CODE HERE!

abbr = []
healthcare = []
smokes = []
poverty = []
age = []
// Retrieve data from the CSV file and execute everything below
d3.csv("../assets/data/data.csv").then(function(healthData) {
    healthData.forEach(function(data){
        abbr.push(data.abbr)
        poverty.push(data.poverty)
        healthcare.push(data.healthcare)
        smokes.push(data.smokes)
        age.push(data.age)
    })
    console.log(abbr)
    console.log(healthcare)
    console.log(smokes)
    console.log(poverty)
    console.log(age)
        }
        );