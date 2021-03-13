import React, { Component } from 'react';

class Footer extends Component {
    render(): React.ReactNode {
        return (
            <div>
                <button>Calendar</button>
                <button>Home</button>
                <button>Kanban</button>
            </div>
        );
    }
}

export default Footer;
