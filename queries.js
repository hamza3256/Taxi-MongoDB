/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 1. Total cost of bookings for a specific month/date
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
db.bookings.aggregate({
    $match: {
        'bookingTime': {
            $gte: ISODate("2018-00-01T00:00:00.000Z")
        },
        'bookingTime': {
            $lte: ISODate("2020-11-31T23:59:59.000Z")
        }
    }
}, {
    $group: {
        _id: null,
        totalBooking: {
            $sum: "$cost"
        }
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 2.  Find the top 10 most expensive bookings in the last 30 days and print them in order of most expensive to least
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
db.bookings.aggregate({
    $match: {
        bookingTime: {
            $gte: new Date(new Date(ISODate().getTime() - 1000 * 60 * 60 * 24 * 30))
        }
    }
}, {
    $sort: {
        cost: -1
    }
}, {
    $limit: 10
}).pretty();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 3. (Following from the previous query) Specific booking id’s from the above query can then be used to find the trips 
//    that are most profitable by looking at the start/destination of the journeys.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
db.bookings.find({
    "_id": "b006"
}, {
    "journey.startJourney": 1,
    "journey.destination": 1,
    _id: 0
}).pretty()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 4. Find booking information for a client which includes important information such as duration and car registration number
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
db.bookings.aggregate({
    $lookup: {
        from: "employees",
        localField: "journey.driverID",
        foreignField: "_id",
        as: "driverInfo"
    }
}, {
    $unwind: "$driverInfo"
}, {
    $lookup: {
        from: "employees",
        localField: "operatorID",
        foreignField: "_id",
        as: "operatorInfo"
    }
}, {
    $unwind: "$operatorInfo"
}, {
    $lookup: {
        from: "clients",
        localField: "clientContactNo",
        foreignField: "_id",
        as: "clientInfo"
    }
}, {
    $unwind: "$clientInfo"
}, {
    $project: {
        _id: 1,
        clientMobNo: "$clientInfo.clientContactNo",
        driverName: "$driverInfo.personInfo.name.first",
        operatorName: "$operatorInfo.personInfo.name.first",
        departingFrom: "$journey.startJourney",
        departureTime: {
            $hour: "$journey.startTime"
        },
        departingTo: "$journey.destination",
        duration: {
            $toString: {
                $divide: [{
                    $subtract: [
                        "$journey.destinationTime", "$journey.startTime"
                    ]
                }, 3600000]
            }
        },
        carRegNo: "$driverInfo.carsInfo.registrationNo",
        costOfJourney: {
            $toInt: "$cost"
        }
    }
}).pretty()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 5. Given the client’s phone number find the client’s pick up times.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
db.clients.find({
    _id: "07900000001"
}, {
    "pickupTimes": 1,
    _id: 0
}).pretty();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 6. Diven a driver's full name, find the total income earned from all bookings
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var driverID = db.employees.find({
    "personInfo.name.First": "Jon",
    "personInfo.name.Last": "Targaryen"
}, {
    "_id": 1
}).next()._id
db.bookings.aggregate({
    $group: {
        _id: driverID,
        total: {
            $sum: '$cost'
        }
    }
}, {
    $project: {
        _id: 0,
        total: {
            $toString: {
                $cond: [{
                        $gte: [{
                            $subtract: ["$total", {
                                $floor: "$total"
                            }]
                        }, 0.5]
                    },
                    {
                        $ceil: "$total"
                    },
                    {
                        $floor: "$total"
                    }
                ]
            }
        }
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 7. Given a clients number, find all the bookings associated with it
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
db.bookings.find({
    ClientContactNo: "07900000004"
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 8. Query to update a booking to 'complete' status
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// References this booking
/*
db.bookings.insert({
    _id: "b003",
    type: "regular",
    status: "incomplete",
    bookingTime: new Date(),
    clientContactNo: "07900000003",
    passengers: NumberInt(1),
    operatorID: "op003",
    cost: NumberDecimal(10.50),
    journey: {
        startJourney: "Romford",
        destination: "Mile End",
        startTime: new Date(2019, 6, 2, 22, 30),
        destinationTime: new Date(2019, 6, 3, 1, 30),
        driverID: "dr004",
    }
});*/
// Updates a booking to complete
db.bookings.find({
    "_id": "b003"
}).pretty();
// Show before
db.bookings.update({
    "_id": "b003"
}, {
    $set: {
        "status": "Complete"
    }
});
// Show after
db.bookings.find({
    "_id": "b003"
}).pretty();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 9. Updates a bookings journey destinationTime for example the driver finishes the journey earlier than expected/later
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
db.bookings.update({
    "_id": "b003"
}, {
    $set: {
        "journey.destinationTime": new Date(2019, 6, 3, 1, 45)
    }
});
db.bookings.find({
    "_id": "b003"
}).pretty();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 10. Find the avarage booking price
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
db.bookings.aggregate(
    [{
        $group: {
            _id: "null",
            'averageTravelCost': {
                $avg: "$cost"
            }
        }
    }]
).next().averageTravelCost

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 11. A client (07900000002) adds a daily booking every day at 10PM for the next 3 months 
//      starting from todays date from Chaplin Road, Wembley, London to Flood Walk, Chelsea, London
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
db.clients.find({
    _id: "07900000002"
}).pretty();
db.clients.update({
    _id: "07900000002"
}, {
    $push: {
        pickupTimes: {
            repeat: "Daily",
            startJourney: "24 Chaplin Road, Wembley, London",
            destination: "17 Flood Walk, Chelsea, London",
            // YYYY-mm-ddTHH:MM:ss
            startDate: new Date('2019-10-01T22:00:00'),
            endDate: new Date('2020-01-01T22:00:00'),
            time: {
                hour: NumberInt(22),
                minute: NumberInt(0)
            }
        }
    }
});
db.clients.find({
    _id: "07900000002"
}).pretty();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 12. Total money earned by the company less total salary paid to employees for each year since 2017
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var bookingTotal = db.bookings.aggregate(
    [{
        $group: {
            _id: "null",
            "bookingsTotal": {
                $sum: "$cost"
            }
        }
    }]
).next().bookingsTotal
var salaryPercentage = db.employees.aggregate(
    [{
        $group: {
            _id: "null",
            "salaryTotal": {
                $sum: {
                    $multiply: {
                        $cond: [{
                            $eq: ["$contractType.type", "percentage"]
                        }, "$contractType.amount", bookingTotal]
                    }
                }
            }
        }
    }]
).next().salaryTotal
var salaryFixed = db.employees.aggregate(
    [{
        $group: {
            _id: "null",
            "salaryTotal": {
                $sum: {
                    $cond: [{
                        $eq: ["$contractType.type", "fixed"]
                    }, "$contractType.amount", 0]
                }
            }
        }
    }]
).next().salaryTotal
var totalRevenue = db.revenues.aggregate([{
    $group: {
        _id: "null",
        "sum": {
            $sum: {
                $sum: "$revs.totalEarned"
            }
        }
    }
}]).next().sum
print(totalRevenue - salaryPercentage + salaryFixed)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 13. Given a car (using a specific registration), find all the journeys it has done
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var driverRegID = db.employees.find({
    "carsInfo.registrationNo": "DB13 WEI",
}, {
    "_id": 1
}).next()._id

db.bookings.find({
    "journey.driverID": driverRegID
}, {
    "journey.startJourney": 1,
    "journey.destination": 1,
    _id: 0
}).pretty();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 14. Delete query - a driver has left the company, delete him from the system
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
db.employees.insert({
    _id: "dr009",
    title: "Driver",
    startDate: new Date('2017-12-8'),
    personInfo: {
        name: {
            First: 'Delete',
            Last: 'Me'
        },
        dob: new Date('1995-4-13'),
        address: {
            houseNumber: '10',
            streetName: 'Albert Road',
            city: 'LEEDS',
            postCode: 'LS19 6CK'
        },
        contactNumber: "0770000370"
    },
    shift: {
        startTime: NumberInt(0),
        endTime: NumberInt(6)
    },
    contractType: {
        type: "fixed",
        amount: 15000.0
    },
    carsInfo: {
        registrationNo: "CS15 NET",
        yearOfMake: "2019",
        dateOfLastMot: new Date('2019-10-1'),
        carStatus: "roadworthy",
        seatingCap: NumberInt(5)
    }
});
db.employees.deleteOne({
    _id: "dr009"
});