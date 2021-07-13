export const COLUMNS = [
    {
        Header:'ID',
        keyof:"id",
        accessor:"id",
        visible: false,
        ordered:false
    },
    {
        Header:'Key',
        key:"key",
        accessor:"key",
        visible: false,
        ordered:false
    },
    {
        Header: "Country",
        key: "country",
        accessor: "country",
        visible: true,
        ordered: true
    },
    {
        Header:"State",
        key: "state",
        accessor: "state",
        visible: true,
        ordered:true
    },
    {
        Header:"City",
        key: "city",
        accessor: "city",
        visible: true,
        ordered:true
    },
    {
        Header:"Postcode",
        key: "postcode",
        accessor: "postcode",
        visible: true,
        ordered:true
    },
    {
        Header:"Line of Business",
        key: "line_of_business",
        accessor: "line_of_business",
        visible: true,
        ordered: false
    },
    {
        Header:"Service Type",
        key: "service_type",
        accessor: "service_type",
        visible: true,
        ordered: false

    },
    {
        Header:"Service Level",
        key: "service_level",
        accessor: "service_level",
        visible: true,
        ordered: false

    },
    {
        Header:"Period",
        key: "period",
        accessor: "period",
        visible: true,
        ordered: false

    },
    {
        Header:"Provider",
        key: "provider",
        accessor: "provider",
        visible: true,
        ordered: false

    },
    {
        Header:"Sales Avaliability",
        key: "sales_avaliability",
        accessor: "sales_avaliability",
        visible: true,
        ordered: false
    }
]
