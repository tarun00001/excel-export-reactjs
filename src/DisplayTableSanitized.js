import React, { useState, useEffect } from "react";

import { forwardRef } from "react";
import Avatar from "react-avatar";
import Grid from "@material-ui/core/Grid";
import { CsvBuilder } from "filefy";

import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
//api that the data is manipulated from
const api = axios.create({
    baseURL: `https://reqres.in/api/users?page=2`,
});

function DisplayTableSanitized() {
    var COLUMNS = [
        {
            title: "Icon",
            render: (rowData) => (
                <Avatar
                    maxInitials={1}
                    size={40}
                    round={true}
                    src={rowData.avatar}
                />
            ),
        },
        { title: "First Name", field: "first_name" },
        { title: "Last Name", field: "last_name" },
        { title: "Email", field: "email" },
    ];

    //table data
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState(COLUMNS);

    useEffect(() => {
        api.get("")
            .then((res) => {
                setData(res.data.data);
            })
            .catch((error) => {
                console.log("Error");
                console.log(error.data.data);
            });
    }, []);

    return (
        <div className="DisplayTable" style={{ marginTop: "5vh" }}>
            <Grid container spacing={1}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <MaterialTable
                        title="TestDate_Table"
                        columns={columns}
                        data={data}
                        icons={tableIcons}
                        options={{
                            selection: true,
                            exportButton: true,
                            emptyRowsWhenPaging: false,
                            pageSize: 5,
                            pageSizeOptions: [5, 10, 25, 50, 100, 200],
                            overflowX: "hidden",
                            overflowY: "auto",
                        }}
                        actions={[
                            {
                                position: "toolbarOnSelect",
                                icon: SaveAlt,
                                tooltip: "Export the selected rows!",
                                onClick: (e, rowData) => {
                                    const fileName = "TestDate_Table";
                                    const builder = new CsvBuilder(
                                        fileName + ".csv"
                                    );
                                    builder
                                        .setColumns(
                                            columns.map(
                                                (columnDef) => columnDef.title
                                            )
                                        )
                                        .addRows(
                                            rowData.map((rowData) =>
                                                columns.map(
                                                    (columnDef) =>
                                                        rowData[columnDef.field]
                                                )
                                            )
                                        )
                                        .exportFile();
                                },
                            },
                        ]}
                    />
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    );
}

export default DisplayTableSanitized;