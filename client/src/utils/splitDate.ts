export function splitDateAndTime(creationTime: number, index: number) {
    return new Date(creationTime).toLocaleString().split(",")[index]
}
