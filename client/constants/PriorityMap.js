export const priority = [
    {
        name: "critical",
        value: "0"
    },
    {
        name: "low",
        value: "3"
    },
    {
        name: "high",
        value: "1"
    },
    {
        name: "medium",
        value: "2"
    }
]

export const sortedPriorityArray = Object.assign([],priority.sort((a,b) => a.value - b.value).map(o => o.name));

export const priorityCSSMap = {
    critical: "danger",
    high: "danger",
    medium: "warning",
    low: "success"
}