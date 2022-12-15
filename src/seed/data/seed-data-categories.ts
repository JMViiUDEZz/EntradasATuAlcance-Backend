interface SeedCategory {
    catid: string;
	catgroup: string;
	catname: string;
	catdesc: string;
}

interface SeedData {
    categories: SeedCategory[];
}


export const categoriesData: SeedData = {
    categories: [
        {
            catid: "10e25c2e-7ba9-11ed-a1eb-0242ac120002",
            catgroup: "Sports",
            catname: "MLB",
            catdesc: "Major League Baseball",
        },
        {
            catid: "10e25fee-7ba9-11ed-a1eb-0242ac120002",
            catgroup: "Sports",
            catname: "NHL",
            catdesc: "National Hockey League",
        },
        {
            catid: "10e261ec-7ba9-11ed-a1eb-0242ac120002",
            catgroup: "Sports",
            catname: "NFL",
            catdesc: "National Football League",
        },
        {
            catid: "10e263d6-7ba9-11ed-a1eb-0242ac120002",
            catgroup: "Sports",
            catname: "NBA",
            catdesc: "National Basketball Association",
        },
        {
            catid: "10e268cc-7ba9-11ed-a1eb-0242ac120002",
            catgroup: "Sports",
            catname: "MLS",
            catdesc: "Major League Soccer",
        },
        {
            catid: "10e26a20-7ba9-11ed-a1eb-0242ac120002",
            catgroup: "Shows",
            catname: "Musicals",
            catdesc: "Musical theatre",
        },
        {
            catid: "10e26b42-7ba9-11ed-a1eb-0242ac120002",
            catgroup: "Shows",
            catname: "Plays",
            catdesc: "All non-musical theatre",
        },
        {
            catid: "10e26caa-7ba9-11ed-a1eb-0242ac120002",
            catgroup: "Shows",
            catname: "Opera",
            catdesc: "All opera and light opera",
        },
        {
            catid: "10e26e58-7ba9-11ed-a1eb-0242ac120002",
            catgroup: "Concerts",
            catname: "Pop",
            catdesc: "All rock and pop music concerts",
        },
        {
            catid: "10e2702e-7ba9-11ed-a1eb-0242ac120002",
            catgroup: "Concerts",
            catname: "Jazz",
            catdesc: "All jazz singers and bands",
        },
        {
            catid: "10e2801e-7ba9-11ed-a1eb-0242ac120002",
            catgroup: "Concerts",
            catname: "Classical",
            catdesc: "All symphony, concerto, and choir concerts",
        },
    ]
}