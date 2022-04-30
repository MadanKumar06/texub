import XLSX from "xlsx";

export default function Index({ productData }) {
  const json = [
    {
      name: "jon",
      surname: "doe",
    },
    {
      name: "jon",
      surname: "doe",
    },
  ];
  const downloadxls = (e, data, data1) => {
      debugger
    e.preventDefault();
    const ws = XLSX.utils.json_to_sheet(data);
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
          downloadxls(e, json, productData);
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
