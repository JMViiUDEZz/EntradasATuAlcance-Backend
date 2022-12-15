interface SeedEvent {
    eventid: string;
    venue: string;
    cat: string;
    date: string;
    eventname: string;
    starttime: string;
}

interface SeedData {
    events: SeedEvent[];
}


export const eventsData: SeedData = {
    events: [
        {
            eventid: "a88d3732-7bcd-11ed-a1eb-0242ac120002",
            venue: "0abed264-7bae-11ed-a1eb-0242ac120002",
            cat: "10e26e58-7ba9-11ed-a1eb-0242ac120002",
            date: "79814670-7bac-11ed-a1eb-0242ac120002",
            eventname: "Cafe Tacuba",
            starttime: "2008-03-05 20:00:00",
        },
        {
            eventid: "a88d39a8-7bcd-11ed-a1eb-0242ac120002",
            venue: "0abed886-7bae-11ed-a1eb-0242ac120002",
            cat: "10e26e58-7ba9-11ed-a1eb-0242ac120002",
            date: "7981479c-7bac-11ed-a1eb-0242ac120002",
            eventname: "Gretchen Wilson",
            starttime: "2008-04-03 15:00:00",
        },
    ]
}