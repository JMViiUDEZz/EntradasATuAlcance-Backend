interface SeedEvent {
    eventid: string;
    venue: string;
    cat: string;
    date: string;
    eventname: string;
    starttime: string;
    image: string;
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
            image: "https://cdn-3.expansion.mx/dims4/default/f919670/2147483647/strip/true/crop/1000x1007+0+0/resize/1200x1208!/format/webp/quality/90/?url=https%3A%2F%2Fcherry-brightspot.s3.amazonaws.com%2F31%2Ffe%2Fb92f111a4f43a0135ed52ceacae2%2Fcafe-tacvba-buena.jpg",
        },
        {
            eventid: "a88d39a8-7bcd-11ed-a1eb-0242ac120002",
            venue: "0abed886-7bae-11ed-a1eb-0242ac120002",
            cat: "10e26e58-7ba9-11ed-a1eb-0242ac120002",
            date: "7981479c-7bac-11ed-a1eb-0242ac120002",
            eventname: "Gretchen Wilson",
            starttime: "2008-04-03 15:00:00",
            image: "https://townsquare.media/site/204/files/2017/09/Gretchen-Wilson-Women-of-Country.jpg",
        },
    ]
}