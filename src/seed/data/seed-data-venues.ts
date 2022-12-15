interface SeedVenue {
    venueid: string;
    venuename: string;
    venuecity: string;
    venuestate: string;
    venueseats?: number;
}


interface SeedData {
    venues: SeedVenue[];
}


export const venuesData: SeedData = {
    venues: [
        {
            venueid: "0abec95e-7bae-11ed-a1eb-0242ac120002",
            venuename: "Toyota Park",
            venuecity: "Bridgeview",
            venuestate: "IL",
            venueseats: 0,
        },
        {
            venueid: "0abeccf6-7bae-11ed-a1eb-0242ac120002",
            venuename: "Columbus Crew Stadium",
            venuecity: "Columbus",
            venuestate: "OH",
            venueseats: 0,
        },
        {
            venueid: "0abecfee-7bae-11ed-a1eb-0242ac120002",
            venuename: "RFK Stadium",
            venuecity: "Washington",
            venuestate: "DC",
            venueseats: 0,
        },
        {
            venueid: "0abed138-7bae-11ed-a1eb-0242ac120002",
            venuename: "CommunityAmerica Ballpark",
            venuecity: "Kansas City",
            venuestate: "KS",
            venueseats: 0,
        },
        {
            venueid: "0abed264-7bae-11ed-a1eb-0242ac120002",
            venuename: "Gillette Stadium",
            venuecity: "Foxborough",
            venuestate: "MA",
            venueseats: 68756,
        },
        {
            venueid: "0abed3ea-7bae-11ed-a1eb-0242ac120002",
            venuename: "New York Giants Stadium",
            venuecity: "East Rutherford",
            venuestate: "NJ",
            venueseats: 80242,
        },
        {
            venueid: "0abed886-7bae-11ed-a1eb-0242ac120002",
            venuename: "BMO Field",
            venuecity: "Toronto",
            venuestate: "ON",
            venueseats: 0,
        },
        {
            venueid: "0abed9e4-7bae-11ed-a1eb-0242ac120002",
            venuename: "The Home Depot Center",
            venuecity: "Carson",
            venuestate: "CA",
            venueseats: 0,
        },
        {
            venueid: "0abedc5a-7bae-11ed-a1eb-0242ac120002",
            venuename: "Dick's Sporting Goods Park",
            venuecity: "Commerce City",
            venuestate: "CO",
            venueseats: 0,
        },
        {
            venueid: "0abedd9a-7bae-11ed-a1eb-0242ac120002",
            venuename: "Pizza Hut Park",
            venuecity: "Frisco",
            venuestate: "TX",
            venueseats: 0,
        },
        {
            venueid: "0abedfe8-7bae-11ed-a1eb-0242ac120002",
            venuename: "Robertson Stadium",
            venuecity: "Houston",
            venuestate: "TX",
            venueseats: 0,
        },
    ]
}