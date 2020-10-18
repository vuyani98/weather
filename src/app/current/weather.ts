export interface Iweather{
    error?: number,
    main?: {
        temp: any
        humidity: any
    },
    name?: string,
    sys?: {
        country : string
    },
    weather?: [{
        description: string,
        id: any,
        icon: any
    }]
}