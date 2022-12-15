interface SeedListing {
    listid: string;
    seller: string;
    event: string;
    date: string;    
    numtickets: number;
    priceperticket: number;
    totalprice: number;
    listtime: string;
}

interface SeedData {
    listings: SeedListing[];
}


export const listingsData: SeedData = {
    listings: [
        {
            listid: "862cc1c0-7bce-11ed-a1eb-0242ac120002",
            seller: "f563bf90-7baf-11ed-a1eb-0242ac120002",
            event: "a88d3732-7bcd-11ed-a1eb-0242ac120002",
            date: "798141ca-7bac-11ed-a1eb-0242ac120002",   
            numtickets: 10,
            priceperticket: 182.00,
            totalprice: 1820.00,
            listtime: "2008-01-06 06:43:29",
        },
        {
            listid: "862cc3fa-7bce-11ed-a1eb-0242ac120002",
            seller: "f563bf90-7baf-11ed-a1eb-0242ac120002",
            event: "a88d39a8-7bcd-11ed-a1eb-0242ac120002",
            date: "798144d6-7bac-11ed-a1eb-0242ac120002", 
            numtickets: 2,
            priceperticket: 182.00,
            totalprice: 364.00,
            listtime: "2008-02-04 06:43:29",
        },
    ]
}