exports = function() {
    // Instantiate MongoDB collection handles
    const mongodb = context.services.get("Cluster0"); // Cluster name on atlas - CHANGE ME to match yours
    const bookings = mongodb.db("taxi").collection("bookings"); // taxi database, bookings collection - CHANGE ME to match yours
    const reports = mongodb.db("store").collection("reports"); // store database, reports collection - CHANGE ME to match yours

    // Get an aggregate that looks like this { todaysBookings: "1", date: 2019-...} and insert it into the reports collection
    // Generate the daily report
    return bookings.aggregate([
    // Only report on bookings placed since yesterday morning
    { 
        $match: {
            bookingTime: {
                $gte: getYesterdayMorningDate(),
                $lt: getThisMorningDate()
            }
        }
    },
        {
            $count: "todaysBookings"
        }, 
        {
            $addFields: { "date" : new Date()}
        }
    ]).next()
    .then(dailyReport => {
        reports.insertOne(dailyReport)
        .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
        .catch(err => console.error(`Failed to insert item: ${err}`))
    })
    .catch(err => console.error("Failed to generate report:", err));
};
  
function getThisMorningDate() {
    return getMorningDate(new Date());
}
  
function getYesterdayMorningDate() {
    const thisMorning = getThisMorningDate();
    const yesterdayMorning = new Date(thisMorning);
    yesterdayMorning.setDate(thisMorning.getDate() - 1);
    return yesterdayMorning;
}
  
function getMorningDate(date) {
    date.setHours(7);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}