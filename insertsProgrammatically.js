function randomPhoneNumber(){
    return "" + 0 + 7 + Math.floor(Math.random()*899999999+100000000)
}

function randomizeMe(list) {
    var i = Math.floor(Math.random() * list.length);
    return list[i];
}

function genDriverID(){
    "dr" + Math.floor(Math.random()*8999+1000)
}

function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function stringGen(len) {
    var text = "";
    
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < len; i++)
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    
    return text;
}

function randomLicenceNumber(){
    return stringGen(3) + " " + stringGen(3);
}

function randomPostCodeNumber(){
    return stringGen(4).toUpperCase() + " " + stringGen(3).toUpperCase();
}

function randomNumber(min, max) {
    if (min < 0) {
        return Math.floor(min + Math.random() * (Math.abs(min)+max));
    }else {
        return Math.floor(min + Math.random() * max);
    }
}

function randomizeStreet(){
    return randomizeMe(rgStreetName) + " " + randomizeMe(rgStreetType);
}

var rgfirstNames = ["Raj", "Muhammad", "Oskar", "Sadeq", "Bill", "Jim", "Drake", "Eminem", "Cosby", "Henry", "William", "Abdul", "Alvin", "Arnold", "August", "Abel", "Brent", "Buster", "Byron", "Calvin", "Cole", "Conrad", "Dale", "Earl", "Ezra", "Erick", "Fabian", "Frank", "Marvin", "Milton", "Mose", "Mike", "Owen", "Oswald"]
var rglastNames = ["Kadir", "Hamza", "Lasota", "Rahman", "Aaron", "Adler", "Bidell", "Knight", "Wood", "Drinkwater", "Townsend", "Young", "Green", "Smith", "Johnson", "William", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Wilson", "Lopez","Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee"]
var rgCars = ["toyota", "ferarri", "hyundai", "kia"]
var rgStreetName = ["High", "Tilbury", "Station", "London", "Church", "Main", "Park", "Main", "Victoria", "Queens", "New", "The", "Manor", "Mill", "West", "East", "North", "South", "Green", "Kings"]
var rgStreetType = ["Street", "St.", "Road", "Avenue", "Lane", "Peaks Lane", "Ave.", "Close", "Cross", "Court", "Place", "Cove", "Branch", "Burg", "Highway", "Bypass"]
var rgCity = ["London", "Manchester", "Birmingham", "Lancaster", "Bath", "Leeds", "Newcastle", "Boston", "Surrey", "Woking", "Bristol", "Coventry", "Milton Keynes", "Exeter", "East London", "Kings Lynn", "Kettering", "Liverpool", "Hull", "Leicester", "Peterborough", "Norwich", "Ipswich", "Brighton", "Southampton", "York", "Chester", "Middlesbrough", "Cardiff", "Swansea", "Nottingham", "Canterbury", "Bournemouth", "Dumfries"]
var rgCarStatus = ["roadworthy", "in for service", "awaiting repair", "written off"]
var rgSeatCaps = [4, 5, 6, 7, 8]

// Insert 10,000 drivers into the system
for(i = 0;  i <= 10000; i++){
    db.employees.insert({
        _id: "dr" + i,
        title: "Driver",
        startDate: randomDate(new Date('2010-01-9'), new Date('2019-01-01')),
        personInfo : {
            name: {
                first: randomizeMe(rgfirstNames),
                last: randomizeMe(rglastNames),
            },
            dob: randomDate(new Date('1960-11-9'), new Date('1990-01-01')),
            address: {
                houseNumber: randomNumber(1, 200),
                streetName: randomizeStreet(),
                city: randomizeMe(rgCity),
                postCode : randomPostCodeNumber()
            },
            contactNumber: randomPhoneNumber()
        },
        shift: {
            startTime: 0,
            endTime: 6
        },
        contractType: {
            type: "fixed",
            amount: randomNumber(18000, 35000)
        },
        carsInfo:{
            registrationNo: randomLicenceNumber(),
            yearOfMake: randomDate(new Date('1990-11-9'), new Date()),
            dateOfLastMot: randomDate(new Date('2016-11-9'), new Date()),
            carStatus: randomizeMe(rgCarStatus),
            seatingCap: randomizeMe(rgSeatCaps)
        }
    });
}

// Required random variables
var rgRandomOperator = ["op001", "op002", "op003", "op004", "op005", "op006", "op007", "op008"]
var rgRandomDriver = ["dr001", "dr002", "dr003", "dr004"]
var rgBookingStatus = ["incomplete", "complete", "cancelled", "refunded"]

// Insert 100,000 bookings into the system, clientContactNo may not necessarily exist in the system.
for(i = 0; i < 100000; i++){
    db.bookings.insert({
        _id: "b" + i,
        type: "regular",
        status: randomizeMe(rgBookingStatus),
        bookingTime: randomDate(new Date('1990-01-01'), new Date()),
        clientContactNo: randomPhoneNumber(),
        passengers: NumberInt(randomNumber(1, 4)),
        operatorID: randomizeMe(rgRandomOperator),
        cost: randomNumber(10, 100),
        journey: {
            startJourney: randomizeStreet(),
            destination: randomizeStreet(),
            startTime: randomDate(new Date('1990-01-01'), new Date()),
            destinationTime: randomDate(new Date('1990-01-01'), new Date()),
            driverID: randomizeMe(rgRandomDriver)
        }
    });
}