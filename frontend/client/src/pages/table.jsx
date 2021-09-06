import React, { Component, useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import { AppContext } from "../store/main.store";
import { useHistory } from 'react-router'

const Table = () => {
    const history = useHistory()
    const {apartsStore} = useContext(AppContext)
    const [aparts, setAparts] = useState([])
    useEffect( async () => {
        const aparts = await apartsStore.loadAparts()
        setAparts(aparts)
    }, [])
    return (
        aparts && aparts.length !== 0 && <div style={{maxWidth: '100%', width: '80%'}}>
            <MaterialTable
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} из {count}'
                    },
                    toolbar: {
                        nRowsSelected: '{0} строк выбрано',
                        searchPlaceholder: 'Поиск'
                    },
                    header: {
                        actions: 'Действия'
                    },
                    body: {
                        emptyDataSourceMessage: 'нету данных для отображения',
                        filterRow: {
                            filterTooltip: 'Фильтр'
                        }
                    }
                }}
                columns={[
                    {title: 'Id', field: 'id'},
                    {title: 'Адрес', field: 'location.address'},
                    {title: 'Цена', field: 'price.amount', type: 'numeric'},
                    {title: 'Валюта', field: 'price.currency'}
                ]}
                data={aparts}
                title="Апартаменты"
                actions={[
                    {
                        icon: 'visibility',
                        tooltip: 'Просмотр',
                        onClick: (event, rowData) => {
                            history.push(`/aparts/${rowData.id}`)
                        }
                    },
                    {
                        icon: 'star-border',
                        tooltip: 'Добавить В Избранное',
                        onClick: (event, rowData) => {
                            apartsStore.addToFavorites(rowData.id)
                        }
                    }
                ]}
            />
        </div>
    )
}

export default Table