import React, { Component } from 'react';

class KanbanTask extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            title: "",
            duedate: "",
            estimate: -1,
            status: ""
        };
    }

    render(): React.ReactNode {
        return (
            <div>
                <h3 className="kanban-task-title">{this.state.title}</h3>
                <h5 className="kanban-task-duedate">{this.state.duedate}</h5>
            </div>
        );
    }
}

export default KanbanTask;
