import { Optimization } from "./optimization";

export type Performance = {
    today : Optimization[],
    yeserday : Optimization[],
    week : Optimization[],
    month : Optimization[]
}