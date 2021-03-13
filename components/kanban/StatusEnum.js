import Enum from "enum";

const StatusEnum = new Enum(
    [
        'Requested',
        'Todo',
        'In Progress',
        'Done',
        'Failed',
        'Overdue'
    ]
);

export default StatusEnum;
