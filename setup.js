// ---------------------------------------------
// Employees
// ---------------------------------------------
db.createCollection("employees", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "_id",
                "title",
                "startDate",
                "personInfo",
                "shift"
            ],
            properties: {
                _id: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                title: {
                    enum: [
                        "Driver",
                        "Operator"
                    ],
                    description: "must be one of the enum value and is required"
                },
                startDate: {
                    bsonType: "date",
                    description: "must be a date and is required"
                },
                personInfo: {
                    bsonType: "object",
                    required: [
                        "name",
                        "dob",
                        "address",
                        "contactNumber"
                    ],
                    properties: {
                        name: {
                            bsonType: "object",
                            required: [
                                "First",
                                "Last"
                            ],
                            properties: {
                                First: {
                                    bsonType: "string",
                                    description: "must be a string and is required"
                                },
                                Last: {
                                    bsonType: "string",
                                    description: "must be a string and is required"
                                }
                            }
                        },
                        dob: {
                            bsonType: "date",
                            description: "must be a date and is required"
                        },
                        address: {
                            bsonType: "object",
                            required: [
                                "houseNumber",
                                "streetName",
                                "city",
                                "postCode"
                            ],
                            properties: {
                                houseNumber: {
                                    bsonType: "string",
                                    description: "must be a string and is required"
                                },
                                streetName: {
                                    bsonType: "string",
                                    description: "must be a string and is required"
                                },
                                city: {
                                    bsonType: "string",
                                    description: "must be a string and is required"
                                },
                                postCode: {
                                    bsonType: "string",
                                    description: "must be a string and is required"
                                }
                            }
                        },
                        contactNumber: {
                            bsonType: "string",
                            description: "must be a string and is required"
                        }
                    }
                },
                shift: {
                    bsonType: "object",
                    required: [
                        "startTime",
                        "endTime"
                    ],
                    properties: {
                        startTime: {
                            bsonType: "int",
                            description: "must be an int and is required"
                        },
                        endTime: {
                            bsonType: "int",
                            description: "must be an int and is required"
                        }
                    },
                    contractType: {
                        bsonType: "object",
                        required: [
                            "type",
                            "amount"
                        ],
                        properties: {
                            type: {
                                enum: [
                                    "fixed",
                                    "percentage"
                                ],
                                description: "can only be either of the enum value and is required"
                            },
                            amount: {
                                bsonType: "double",
                                description: "must be a double and is required"
                            }
                        }
                    },
                    carsInfo: {
                        bsonType: "object",
                        required: [
                            "registrationNo",
                            "yearOfMake",
                            "dateOfLastMot",
                            "carStatus",
                            "seatingCap"
                        ],
                        properties: {
                            registrationNo: {
                                bsonType: "string",
                                description: "must be a string and is required"
                            },
                            yearOfMake: {
                                bsonType: "string",
                                description: "must be a string and is required"
                            },
                            dateOfLastMot: {
                                bsonType: "date",
                                description: "must be a date and is required"
                            },
                            carStatus: {
                                enum: ["roadworthy", "in for service", "awaiting repair", "written off"],
                                description: "can only be one of the enum values"
                            },
                            seatingCap: {
                                bsonType: "int",
                                description: "must be an int and is required"
                            },
                        }
                    }
                }
            }
        }
    }
});

// Drivers
db.employees.insert({
    _id: "dr001",
    title: "Driver",
    startDate: new Date('2017-12-8'),
    personInfo: {
        name: {
            First: 'Sadeq',
            Last: 'Rahman'
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

db.employees.insert({
    _id: "dr002",
    title: "Driver",
    startDate: new Date('2017-12-8'),
    personInfo: {
        name: {
            First: 'Jon',
            Last: 'Targaryen'
        },
        dob: new Date('1989-3-2'),
        address: {
            houseNumber: '54',
            streetName: 'Oxford Street',
            city: 'LONDON',
            postCode: 'W1D 1BS'
        },
        contactNumber: "0770023130"
    },
    shift: {
        startTime: NumberInt(6),
        endTime: NumberInt(12)
    },
    contractType: {
        type: "percentage",
        amount: 0.425
    },
    carsInfo: {
        registrationNo: "DB13 WEI",
        yearOfMake: "2011",
        dateOfLastMot: new Date('2019-10-1'),
        carStatus: "roadworthy",
        seatingCap: NumberInt(7)
    }
});

db.employees.insert({
    _id: "dr003",
    title: "Driver",
    startDate: new Date('2019-1-4'),
    personInfo: {
        name: {
            First: 'Sansa',
            Last: 'Stark'
        },
        dob: new Date('1990-4-2'),
        address: {
            houseNumber: '32',
            streetName: 'Drive Street',
            city: 'LONDON',
            postCode: 'N1 5BE'
        },
        contactNumber: "0720343639"
    },
    shift: {
        startTime: NumberInt(12),
        endTime: NumberInt(18)
    },
    contractType: {
        type: "percentage",
        amount: 0.45
    },
    carsInfo: {
        registrationNo: "PO1 TRI",
        yearOfMake: "2015",
        dateOfLastMot: new Date('2019-5-5'),
        carStatus: "roadworthy",
        seatingCap: NumberInt(7),
    }
});

db.employees.insert({
    _id: "dr004",
    title: "Driver",
    startDate: new Date('2017-12-23'),
    personInfo: {
        name: {
            First: 'Samwell',
            Last: 'Tarly'
        },
        dob: new Date('1990-4-2'),
        address: {
            houseNumber: '60',
            streetName: 'Bury Street',
            city: 'LONDON',
            postCode: 'N22 3CD'
        },
        contactNumber: "07506455439"
    },
    shift: {
        startTime: NumberInt(18),
        endTime: NumberInt(0)
    },
    contractType: {
        type: "fixed",
        amount: 17500
    },
    carsInfo: {
        registrationNo: "PO1 TRI",
        yearOfMake: "2017",
        dateOfLastMot: new Date('2019-11-9'),
        carStatus: "roadworthy",
        seatingCap: NumberInt(5)
    }
});
// Operators
db.employees.insert({
    _id: "op001",
    title: "Operator",
    startDate: new Date('2019-12-5'),
    personInfo: {
        name: {
            First: 'Jack',
            Last: 'Napier '
        },
        dob: new Date('1980-5-10'),
        address: {
            houseNumber: '54',
            streetName: 'Peter Road',
            city: 'MANCHESTER',
            postCode: 'M1 1AG'
        },
        contactNumber: "0742325130"
    },
    shift: {
        startTime: NumberInt(0),
        endTime: NumberInt(6)
    },
});
db.employees.insert({
    _id: "op002",
    title: "Operator",
    startDate: new Date('2019-8-2'),
    personInfo: {
        name: {
            First: 'Alma',
            Last: 'Hall'
        },
        dob: new Date('1979-4-2'),
        address: {
            houseNumber: '914',
            streetName: 'Queensway',
            city: 'DONCASTER',
            postCode: 'DN77 6DS'
        },
        contactNumber: '0743224561'
    },
    shift: {
        startTime: NumberInt(6),
        endTime: NumberInt(12)
    },
});

db.employees.insert({
    _id: "op003",
    title: "Operator",
    startDate: new Date('2018-12-12'),
    personInfo: {
        name: {
            First: 'Ricardo',
            Last: 'Gunn'
        },
        dob: new Date('1979-4-2'),
        address: {
            houseNumber: '11',
            streetName: 'Victoria Road',
            city: 'SOUTH EAST LONDON',
            postCode: 'SE92 6BG'
        },
        contactNumber: '07738886478'
    },
    shift: {
        startTime: NumberInt(12),
        endTime: NumberInt(18)
    },
});

db.employees.insert({
    _id: "op004",
    title: "Operator",
    startDate: new Date('2017-5-4'),
    personInfo: {
        name: {
            First: 'Kayson',
            Last: 'Alfaro'
        },
        dob: new Date('1981-2-3'),
        address: {
            houseNumber: '42',
            streetName: 'Broadway',
            city: 'YORK',
            postCode: 'YO37 1WX'
        },
        contactNumber: '07345667772'
    },
    shift: {
        startTime: NumberInt(18),
        endTime: NumberInt(0)
    },
});

db.employees.insert({
    _id: "op005",
    title: "Operator",
    startDate: new Date('2017-9-14'),
    personInfo: {
        name: {
            First: 'Dolores',
            Last: 'Diya'
        },
        dob: new Date('1987-11-2'),
        address: {
            houseNumber: '49',
            streetName: 'The Grove',
            city: 'HUDDERSFIELD',
            postCode: 'HD99 1CK'
        },
        contactNumber: '07122436472'
    },
    shift: {
        startTime: NumberInt(0),
        endTime: NumberInt(6)
    },
});

db.employees.insert({
    _id: "op006",
    title: "Operator",
    startDate: new Date('2019-1-2'),
    personInfo: {
        name: {
            First: 'Gernot',
            Last: 'Forrest'
        },
        dob: new Date('1989-9-1'),
        address: {
            houseNumber: '9',
            streetName: 'Richmond Road',
            city: 'BATH',
            postCode: 'BA54 3RJ'
        },
        contactNumber: '07431162272'
    },
    shift: {
        startTime: NumberInt(6),
        endTime: NumberInt(12)
    },
});
db.employees.insert({
    _id: "op007",
    title: "Operator",
    startDate: new Date('2018-11-21'),
    personInfo: {
        name: {
            First: 'Valentina',
            Last: 'Dragan'
        },
        dob: new Date('1990-11-23'),
        address: {
            houseNumber: '9130',
            streetName: 'Chester Road',
            city: 'NEWCASTLE',
            postCode: 'NE0 8PV'
        },
        contactNumber: '07934461212'
    },
    shift: {
        startTime: NumberInt(12),
        endTime: NumberInt(18)
    },
});
db.employees.insert({
    _id: "op008",
    title: "Operator",
    startDate: new Date('2017-1-19'),
    personInfo: {
        name: {
            First: 'Blodwen',
            Last: 'Jasna'
        },
        dob: new Date('1989-9-1'),
        address: {
            houseNumber: '6',
            streetName: 'Manor Road',
            city: 'NORTHAMPTON',
            postCode: 'NN21 0MX'
        },
        contactNumber: '07931656215'
    },
    shift: {
        startTime: NumberInt(18),
        endTime: NumberInt(0)
    },
});

// Employees end

// ---------------------------------------
// Clients
// ---------------------------------------
db.createCollection("clients", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "_id",
                "type",
            ],
            properties: {
                _id: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                type: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                pickupTimes: {
                    bsonType: ["array"],
                    minItems: 1,
                    maxItems: 10,
                    items: {
                        bsonType: "object",
                        required: [
                            "repeat",
                            "startJourney",
                            "destination",
                            "startDate",
                            "endDate",
                            "time",
                        ],
                        additionalProperties: false,
                        properties: {
                            repeat: {
                                bsonType: "string",
                                description: "must be a string and is required"
                            },
                            startJourney: {
                                bsonType: "string",
                                description: "must be a string and is required"
                            },
                            destination: {
                                bsonType: "string",
                                description: "must be a string and is required"
                            },
                            startDate: {
                                bsonType: "date",
                                description: "must be a date and is required"
                            },
                            endDate: {
                                bsonType: "date",
                                description: "must be a date and is required"
                            },
                            time: {
                                bsonType: "object",
                                description: "must be an object and is required",
                                required: [
                                    "hour",
                                    "minute"
                                ],
                                properties: {
                                    hour: {
                                        bsonType: "int",
                                        description: "must be an int and is required"
                                    },
                                    minute: {
                                        bsonType: "int",
                                        description: "must be an int and is required"
                                    }
                                }
                            }
                        }
                    },
                    description: "must be a array of objects containing repeat and startJourney"
                }
            }
        },
    },
    validationLevel: "strict",
    validationAction: "error"
});

db.clients.insert({
    _id: "07900000001",
    type: "Corporate",
    pickupTimes: [{
        repeat: "Daily",
        startJourney: "123 Wakefield Road, Stratford, London",
        destination: "Temple Station, London",
        startDate: new Date('2019-08-01'),
        endDate: new Date('2019-09-01'),
        time: {
            hour: NumberInt(8),
            minute: NumberInt(30)
        }
    }]
});
db.clients.insert({
    _id: "07900000002",
    type: "Private"
});
db.clients.insert({
    _id: "07900000003",
    type: "Private"
});
db.clients.insert({
    _id: "07900000004",
    type: "Private"
});
db.clients.insert({
    _id: "07900000005",
    type: "Private"
});
db.clients.insert({
    _id: "07900000006",
    type: "Corporate"
});
db.clients.insert({
    _id: "07900000007",
    type: "Corporate"
});
db.clients.insert({
    _id: "07900000008",
    type: "Corporate"
});
db.clients.insert({
    _id: "07900000009",
    type: "Corporate"
});
db.clients.insert({
    _id: "07900000010",
    type: "Corporate"
});
// Clients end

// ---------------------------------------
// Bookings
// ---------------------------------------
db.createCollection("bookings", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "_id",
                "type",
                "status",
                "bookingTime",
                "clientContactNo",
                "passengers",
                "operatorID",
                "cost",
                "journey"
            ],
            properties: {
                _id: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                type: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                status: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                bookingTime: {
                    bsonType: "date",
                    description: "must be a date and is required"
                },
                clientContactNo: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                passengers: {
                    bsonType: "int",
                    description: "must be an int and is required"
                },
                operatorID: {
                    enum: [
                        "op001",
                        "op002",
                        "op003",
                        "op004",
                        "op005",
                        "op006",
                        "op007",
                        "op008"
                    ],
                    description: "must be one of the enum value and is required"
                },
                cost: {
                    bsonType: "double",
                    description: "must be a double and is required"
                },
                journey: {
                    bsonType: "object",
                    required: [
                        "startJourney",
                        "destination",
                        "startTime",
                        "destinationTime",
                        "driverID"
                    ],
                    properties: {
                        startJourney: {
                            bsonType: "string",
                            description: "must be a string and is required"
                        },
                        destination: {
                            bsonType: "string",
                            description: "must be a string and is required"
                        },
                        startTime: {
                            bsonType: "date",
                            description: "must be a date and is required"
                        },
                        destinationTime: {
                            bsonType: "date",
                            description: "must be a date and is required"
                        },
                        driverID: {
                            enum: [
                                "dr001",
                                "dr002",
                                "dr003",
                                "dr004"
                            ],
                            description: "must be one of the enum value and is required"
                        }
                    }
                }
            }
        }
    },
    validationLevel: "strict",
    validationAction: "error"
});

db.bookings.insert({
    _id: "b001",
    type: "daily",
    status: "incomplete",
    bookingTime: new Date(),
    clientContactNo: "07900000001",
    passengers: NumberInt(1),
    operatorID: "op001",
    cost: 10.25,
    journey: {
        startJourney: "123 Wakefield Road, Stratford, London",
        destination: "Temple Station, London",
        startTime: new Date(2018, 8, 12, 8, 30),
        destinationTime: new Date(2018, 8, 12, 9, 30),
        driverID: "dr002"
    }
});
db.bookings.insert({
    _id: "b002",
    type: "regular",
    status: "incomplete",
    bookingTime: new Date(),
    clientContactNo: "07900000002",
    passengers: NumberInt(1),
    operatorID: "op002",
    cost: 40.73,
    journey: {
        startJourney: "Oxford",
        destination: "London",
        startTime: new Date(2019, 1, 9, 5, 30),
        destinationTime: new Date(2019, 1, 9, 7, 30),
        driverID: "dr001"
    }
});
db.bookings.insert({
    _id: "b003",
    type: "regular",
    status: "incomplete",
    bookingTime: new Date(),
    clientContactNo: "07900000003",
    passengers: NumberInt(1),
    operatorID: "op003",
    cost: 10.50,
    journey: {
        startJourney: "Romford",
        destination: "Mile End",
        startTime: new Date(2019, 6, 2, 22, 30),
        destinationTime: new Date(2019, 6, 3, 1, 30),
        driverID: "dr004",
    }
});
db.bookings.insert({
    _id: "b004",
    type: "regular",
    status: "incomplete",
    bookingTime: new Date(),
    clientContactNo: "07900000004",
    passengers: NumberInt(2),
    operatorID: "op004",
    cost: 16.12,
    journey: {
        startJourney: "Romford",
        destination: "Mile End",
        startTime: new Date(2018, 5, 24, 18, 30),
        destinationTime: new Date(2018, 5, 24, 19, 00),
        driverID: "dr004"
    }
});

db.bookings.insert({
    _id: "b005",
    type: "regular",
    status: "incomplete",
    bookingTime: new Date(),
    clientContactNo: "07900000005",
    passengers: NumberInt(3),
    operatorID: "op005",
    cost: 36.10,
    journey: {
        startJourney: "Stansted Airport",
        destination: "Birmingham",
        startTime: new Date(2017, 1, 10, 1, 30),
        destinationTime: new Date(2017, 1, 10, 5, 30),
        driverID: "dr001",
    }
});
db.bookings.insert({
    _id: "b006",
    type: "regular",
    status: "incomplete",
    bookingTime: new Date(),
    clientContactNo: "07900000006",
    passengers: NumberInt(6),
    operatorID: "op006",
    cost: 32.75,
    journey: {
        startJourney: "Finsbury Park",
        destination: "Heathrow Airport",
        startTime: new Date(2018, 3, 2, 10, 30),
        destinationTime: new Date(2018, 3, 2, 12, 30),
        driverID: "dr002",
    }
});
db.bookings.insert({
    _id: "b007",
    type: "regular",
    status: "incomplete",
    bookingTime: new Date(),
    clientContactNo: "07900000007",
    passengers: NumberInt(7),
    operatorID: "op007",
    cost: 27.15,
    journey: {
        startJourney: "Arnos Grove",
        destination: "Manchester",
        startTime: new Date(2019, 2, 14, 8, 15),
        destinationTime: new Date(2019, 2, 14, 12, 30),
        driverID: "dr002"
    }
});

db.bookings.insert({
    _id: "b008",
    type: "regular",
    status: "incomplete",
    bookingTime: new Date(),
    clientContactNo: "07900000008",
    passengers: NumberInt(6),
    operatorID: "op008",
    cost: 25.25,
    journey: {
        startJourney: "Finsbury Park",
        destination: "Alexandra Palace",
        startTime: new Date(2019, 9, 12, 12, 30),
        destinationTime: new Date(2019, 9, 12, 14, 30),
        driverID: "dr003"
    }
});
db.bookings.insert({
    _id: "b009",
    type: "regular",
    status: "incomplete",
    bookingTime: new Date(),
    clientContactNo: "07900000009",
    passengers: NumberInt(6),
    operatorID: "op001",
    cost: 5.25,
    journey: {
        startJourney: "Wood Green",
        destination: "Tottenham",
        startTime: new Date(2019, 11, 2, 8, 00),
        destinationTime: new Date(2019, 11, 2, 12, 00),
        driverID: "dr002"
    }
});
db.bookings.insert({
    _id: "b010",
    type: "regular",
    status: "incomplete",
    bookingTime: new Date(),
    clientContactNo: "07900000010",
    passengers: NumberInt(6),
    operatorID: "op001",
    cost: 54.0,
    journey: {
        startJourney: "Arnos Grove",
        destination: "Holborn",
        startTime: new Date(2019, 12, 10, 12, 30),
        destinationTime: new Date(2019, 12, 10, 15, 30),
        driverID: "dr003"
    }
});
// Bookings end

// -------------------------------------------
// Revenues
// -------------------------------------------
db.createCollection("revenues", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "revs"
            ],
            properties: {
                revs: {
                    bsonType: ["array"],
                    items: {
                        bsonType: "object",
                        required: [
                            "driverID",
                            "totalEarned",
                            "amountPaid",
                        ],
                        additionalProperties: false,
                        properties: {
                            driverID: {
                                bsonType: "string",
                                description: "must be a string and is required"
                            },
                            totalEarned: {
                                bsonType: "double",
                                description: "must be a double and is required"
                            },
                            amountPaid: {
                                bsonType: "double",
                                description: "must be a double and is required"
                            }
                        }
                    },
                    description: "must be a array of objects"
                }
            }
        }
    },
    validationLevel: "strict",
    validationAction: "error"
});
db.revenues.insert({
    revs: [{
            driverID: "dr001",
            totalEarned: 32420.75,
            amountPaid: 25000.0
        },
        {
            driverID: "dr002",
            totalEarned: 34535.75,
            amountPaid: 23232.20
        },
        {
            driverID: "dr003",
            totalEarned: 42425.0,
            amountPaid: 35000.0
        },
        {
            driverID: "dr004",
            totalEarned: 27221.25,
            amountPaid: 15000.0
        }
    ]
});