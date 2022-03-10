import React from 'react'
import './styles.scss'
import MUIDataTable from "mui-datatables";

function Index({ table, columns,options, className, title }) {

  return (
    <MUIDataTable
        title={title ? title : ""}
        data={table}
        columns={columns}
        options={options}
        className={className && className}
    />
  )
}

export default Index