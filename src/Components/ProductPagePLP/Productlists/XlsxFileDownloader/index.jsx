import XLSX from "xlsx";

export default function Index({ productData }) {
  const downloadxls = (e, tableData) => {
    let temp = tableData?.map((itm) => ({
      brand: `${itm?.main_product?.brand_name}`,
      model_number: itm?.main_product?.model_number,
      part_number: itm?.main_product?.part_number,
      description: itm?.main_product?.description,
      condition: itm?.main_product?.condition,
      hub: itm?.sub_products?.[0]?.hub,
      moq: itm?.sub_products?.[0]?.moq,
      price: itm?.sub_products?.[0]?.price,
      in_stock: itm?.sub_products?.[0]?.in_stock,
    }));
    e.preventDefault();
    const ws = XLSX.utils.json_to_sheet(temp);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "Products Details.xlsx");
  };
  return (
    <>
      <svg
        id="Icon"
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 40 40"
        onClick={(e) => {
          downloadxls(e, productData);
        }}
      >
        <rect id="Area" width="40" height="40" fill="#fff" opacity="0" />
        <g id="Icon-2" data-name="Icon" transform="translate(4.5 4.5)">
          <path
            id="Path"
            d="M35.5,22.5v6a3.245,3.245,0,0,1-3.444,3H7.944a3.245,3.245,0,0,1-3.444-3v-6"
            transform="translate(-4.5 -0.5)"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          <path
            id="Path-2"
            data-name="Path"
            d="M10.5,15,20,22.5,29.5,15"
            transform="translate(-4.5 -2.346)"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          <line
            id="Line"
            y1="18"
            transform="translate(15.5)"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />{" "}
        </g>
      </svg>
    </>
  );
}
