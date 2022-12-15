interface SeedSale {
    saleid: string;
    list: string[];
    seller: string;
    buyer: string;
    event: string[];
    date: string;  
    qtysold: number; 
    pricepaid: number; 
    commission: number; 
    saletime: string;
}

interface SeedData {
    sales: SeedSale[];
}

export const salesData: SeedData = {
    sales: [
        {
            saleid: "b71d6fb4-7bce-11ed-a1eb-0242ac120002",
            list: 
            [
                "862cc1c0-7bce-11ed-a1eb-0242ac120002",
                "862cc3fa-7bce-11ed-a1eb-0242ac120002",
            ],
            seller: "f563bf90-7baf-11ed-a1eb-0242ac120002",
            buyer: "f563c544-7baf-11ed-a1eb-0242ac120002",
            event: 
            [
                "a88d3732-7bcd-11ed-a1eb-0242ac120002",
                "a88d39a8-7bcd-11ed-a1eb-0242ac120002",
            ],
            date: "798144d6-7bac-11ed-a1eb-0242ac120002",  
            qtysold: 12,
            pricepaid: 2184,
            commission: 328,
            saletime: "2008-02-04 13:31:22",
        },
    ]
}