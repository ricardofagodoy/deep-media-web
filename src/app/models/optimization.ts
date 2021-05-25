export type Optimization = {
    future: string,
    history: History[]
}

type History = {
    date: string,
    campaign: string,
    target: number,
    margin: number,
    optimize: string,
    before: number,
    after: number
}