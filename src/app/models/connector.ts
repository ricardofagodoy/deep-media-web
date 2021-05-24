export type Connector = {
    type: string,
    credentials?: Credentials
}

type Credentials = {
    access_token: string,
    refresh_token: string
}