import React from 'react';
import {Button} from "antd";

export default class ExportExcel extends React.PureComponent {
    exportExcel() {
        window.open('/api/admin/exportExcel');
    }

    render() {
        return (
            <Button
                onClick={() => {
                    this.exportExcel();
                }}
            >导出posts</Button>
        );
    }
}

