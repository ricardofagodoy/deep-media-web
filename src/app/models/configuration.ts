export type Configuration = {
    id?: string,
    type: string,
    name: string,
    ads_account: string,
    ads_campaign: string,
    adcost_target: number,
    margin: number,
    ga_account: string,
    ga_property: string,
    ga_metric: string,
    active: boolean
}