interface SeedDate {
    dateid: string;
	caldate: string;
	day: string;
	week: number;
	month: string;
	qtr: number;
	year: number;
	holiday: boolean;
}

interface SeedData {
    dates: SeedDate[];
}


export const datesData: SeedData = {
    dates: [
        {
            dateid: "798141ca-7bac-11ed-a1eb-0242ac120002",
            caldate: "2008-01-06",
            day: "MO",
            week: 2, 
            month: "JAN",
            qtr: 1, 
            year: 2008, 
            holiday: false,
        },
        {
            dateid: "798144d6-7bac-11ed-a1eb-0242ac120002",
            caldate: "2008-02-04",
            day: "TU",
            week: 6, 
            month: "FEB",
            qtr: 1, 
            year: 2008, 
            holiday: false,
        },
        {
            dateid: "79814670-7bac-11ed-a1eb-0242ac120002",
            caldate: "2008-03-05",
            day: "WE",
            week: 10, 
            month: "FEB",
            qtr: 1, 
            year: 2008, 
            holiday: false,
        },
        {
            dateid: "7981479c-7bac-11ed-a1eb-0242ac120002",
            caldate: "2008-04-03",
            day: "TH",
            week: 14, 
            month: "APR",
            qtr: 2, 
            year: 2008, 
            holiday: false,
        },
        {
            dateid: "798148be-7bac-11ed-a1eb-0242ac120002",
            caldate: "2008-05-02",
            day: "FR",
            week: 18, 
            month: "MAY",
            qtr: 2, 
            year: 2008, 
            holiday: false,
        },
        {
            dateid: "798149ea-7bac-11ed-a1eb-0242ac120002",
            caldate: "2008-06-07",
            day: "SA",
            week: 24, 
            month: "JUN",
            qtr: 2, 
            year: 2008, 
            holiday: false,
        },
        {
            dateid: "79814bc0-7bac-11ed-a1eb-0242ac120002",
            caldate: "2008-07-06",
            day: "SU",
            week: 28, 
            month: "JUL",
            qtr: 3, 
            year: 2008, 
            holiday: false,
        },
        {
            dateid: "79814cce-7bac-11ed-a1eb-0242ac120002",
            caldate: "2008-08-04",
            day: "MO",
            week: 32, 
            month: "AUG",
            qtr: 3, 
            year: 2008, 
            holiday: false,
        },
        {
            dateid: "79814e04-7bac-11ed-a1eb-0242ac120002",
            caldate: "2008-09-02",
            day: "TU",
            week: 36, 
            month: "SEP",
            qtr: 3, 
            year: 2008, 
            holiday: false,
        },
        {
            dateid: "79814f26-7bac-11ed-a1eb-0242ac120002",
            caldate: "2008-10-01",
            day: "WE",
            week: 40, 
            month: "OCT",
            qtr: 4, 
            year: 2008, 
            holiday: false,
        },
        {
            dateid: "7981505c-7bac-11ed-a1eb-0242ac120002",
            caldate: "2008-11-27",
            day: "TH",
            week: 48, 
            month: "NOV",
            qtr: 4, 
            year: 2008, 
            holiday: true,
        },
        {
            dateid: "79815160-7bac-11ed-a1eb-0242ac120002",
            caldate: "2008-12-26",
            day: "FR",
            week: 52, 
            month: "DEC",
            qtr: 4, 
            year: 2008, 
            holiday: true,
        },
    ]
}