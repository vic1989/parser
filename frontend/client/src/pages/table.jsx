import React, { Component, useContext, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import { AppContext } from "../store/main.store";
import { useHistory } from 'react-router'
import { NavLink } from 'react-router-dom';


const Table = () => {
    const tableRef = useRef();
    const history = useHistory()
    const {apartsStore} = useContext(AppContext)
    const [aparts, setAparts] = useState([])

    const checkPrice = () => {

    }

    let data = async query => {
        if (query.search) {
            if (query.search.length < 3) {
                return {
                    data: apartsStore.getAparts(),
                    page: query.page - 1,
                    totalCount: query.pageSize,
                };
            }
        }
        const response = await apartsStore.loadAparts(query.page + 1, query.pageSize, query.search)
        return {
            data: response.aparts,
            page: response.page - 1,
            totalCount: response.total,
        };
    }

    useEffect(async () => {
        const aparts = await apartsStore.loadAparts()
        if (aparts.aparts.length) {
            setAparts([1])
        }
    }, [])
    return (
        aparts && aparts.length !== 0 && <div style={{maxWidth: '100%', width: '80%'}}>
            <MaterialTable
                tableRef={tableRef}
                options={{
                    headerStyle: {
                        backgroundColor: "#378FC3",
                        color: "#FFF",
                        fontSize: "17px",
                        textAlign: "center",
                        fontWeight: "bold"
                    },
                    rowStyle: rowData => {
                        // if(rowData.new) {
                        //     return {backgroundColor: 'green'};
                        // }
                        return {};
                    }
                }}
                columns={[
                    {title: 'Id', field: 'id'},
                    {
                        title: '??????????', field: 'location.address',
                        render: rowData => {
                            return <div><NavLink to={`/aparts/${rowData.id}`}>{rowData.location.address}{rowData.new &&
                            <sup style={{color: '#57b43e'}}>new</sup>}</NavLink> </div>
                        }
                    },
                    {
                        title: '????????', field: 'price.amount', type: 'numeric',
                        render: rowData => {
                            return <div><span className="material-icons">arrow_upward</span> {rowData.price.amount}</div>
                        }
                    },
                    {title: '????????????', field: 'price.currency'}
                ]}
                data={data}
                title="??????????????????????"
                actions={[
                    {
                        icon: 'visibility',
                        tooltip: '????????????????',
                        onClick: (event, rowData) => {
                            history.push(`/aparts/${rowData.id}`)
                        }
                    },
                    rowData => ({
                        icon: 'star-border',
                        iconProps: {
                            color: rowData.isFavourite ? 'secondary' : "action"
                        },
                        tooltip: '???????????????? ?? ??????????????????',
                        onClick: async (event, rowData) => {
                            await apartsStore.addToFavorites(rowData.id)
                            const aparts = await apartsStore.loadAparts()
                            setAparts(aparts)
                            tableRef.current.onQueryChange()
                        }
                    })
                ]}
            />
        </div>
    )
}

export default Table