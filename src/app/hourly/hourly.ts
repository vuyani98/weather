export interface Ihourly {
    hourly : [
        {
            dt : number,
            humidity : number,
            temp : number,
            weather : [{
                icon : string,
                description : string
            }]
        }
    ]
}