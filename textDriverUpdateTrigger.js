exports = function(dbEvent) {
    // Only run if this event is for a newly inserted document
    if(dbEvent.operationType !== "INSERT") { return }
  
    // Format a message with the inserted document's `_id` and `journey` field.
    const { journey } = dbEvent.fullDocument;
    
    // Create the message to send to the driver via text message
    const msg = `New trip, pickup location is : ${journey.startJourney} and the destination is: ${journey.destination}`;
  
    // Get the Twilio messaging service number and the number that
    // should receive the SMS from stored global values.
    const fromPhone = context.values.get("twilioPhoneNumber");
    
    // store driverID into a variable
    const driverID = journey.driverID;
    
    // Get the drivers phone number from the driverID, this booking has been assigned to 
    const toPhone = getDriversNumber(driverID);
  
    // Get the twilio service
    const twilio = context.services.get("myTwilio");
  
    // Send the SMS Message
    twilio.send({ To: toPhone, From: fromPhone, Body: msg });
  };
  
  
  function getDriversNumber(driverID){
      
    const mongodb = context.services.get("Cluster0"); // Cluster name on atlas - CHANGE ME to match yours
    const employees = mongodb.db("taxi").collection("employees"); // taxi database, bookings collection - CHANGE ME to match yours

    var number =
    employees.findOne({
        _id: driverID
    }, {
        "personInfo.contactNumber": 1
    }).personInfo.contactNumber;

    return number;
  }