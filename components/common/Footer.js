import React, { Component } from 'react';
import {Button, ButtonGroup, Icon} from "react-native-elements";
import {CalendarOutlined, BankOutlined, CarryOutOutlined} from "@ant-design/icons";

class Footer extends Component {

    renderIcons() {
        var list = [{element: () => <CalendarOutlined/>}, {element: () => <BankOutlined/>}, {element: () => <CarryOutOutlined/>}];
        return list;
    }

    render(){
        return (
            <ButtonGroup
                buttons={this.renderIcons()}
            />
        );
    }
}

export default Footer;
