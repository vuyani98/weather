export interface Idaily {
    daily : [{
        dt : number,
        temp : {
            morn : number ,
            day : number,
            night: number
        },
        weather : [{
            description : string,
            icon : string
    }]}
    ]
}