import React, { Component, useContext, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import { AppContext } from "../store/main.store";
import { useHistory } from 'react-router'


const Table = () => {
    const tableRef = useRef();
    const history = useHistory()
    const {apartsStore} = useContext(AppContext)
    const [aparts, setAparts] = useState([])
    let loadedAparts = []

    let data = async query => {
        if (query.search) {
            if(query.search.length < 3){
                return {
                    data: loadedAparts,
                    page: query.page - 1,
                    totalCount: query.pageSize,
                };
            }
        }
        const response = await apartsStore.loadAparts(query.page+1, query.pageSize, query.search)
        loadedAparts = response.aparts
        return {
            data: response.aparts,
            page: response.page - 1,
            totalCount: response.total,
        };
    }

    useEffect( async () => {
        const aparts = await apartsStore.loadAparts()
        if(aparts.aparts.length){
            setAparts([1])
        }
    }, [])
    return (
        aparts && aparts.length !== 0 && <div style={{maxWidth: '100%', width: '80%'}}>
            <MaterialTable
                tableRef={tableRef}
                columns={[
                    {title: 'Id', field: 'id'},
                    {title: 'Адрес', field: 'location.address'},
                    {title: 'Цена', field: 'price.amount', type: 'numeric',
                        render: rowData => {
                            return  <div><span className="material-icons MuiIcon-root MuiIcon-colorSecondary"
                                               aria-hidden="true">trending-up</span> {rowData.price.amount}</div>
                        }
                    },
                    {title: 'Валюта', field: 'price.currency'}
                ]}
                data={data}
                title="Апартаменты"
                actions={[
                    {
                        icon: 'visibility',
                        tooltip: 'Просмотр',
                        onClick: (event, rowData) => {
                            history.push(`/aparts/${rowData.id}`)
                        }
                    },
                    rowData => ({
                        icon: 'star-border',
                        iconProps: {
                            color:  rowData.isFavourite ? 'secondary' : "action"
                        },
                        tooltip: 'Добавить В Избранное',
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