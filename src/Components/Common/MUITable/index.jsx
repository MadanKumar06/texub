import React from "react";
import "./styles.scss";
import clsx from "clsx";
import MUIDataTable from "mui-datatables";

function Index({ table, columns, options, className, title }) {
  return (
    <MUIDataTable
      title={title ? title : ""}
      data={table}
      columns={columns}
      options={options}
      className={clsx(className && className, "default_appearance")}
    />
  );
}

export default Index;
