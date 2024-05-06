import dayjs from 'dayjs'
export const PendingOnlineOrderColumns = [
    {
      Header: `Order No.`,
      accessor: `order_number`,
    },
    {
      Header: `Service`,
      accessor: `service_type`,
    },
    {
      Header: `Date ordered`,
      accessor: `order_date`,
      Cell: ({ value }) => (
       dayjs(value).format('MM/DD/YYYY hh:mm A')
      ),
    },
    {
      Header: `Status`,
      accessor: `status`,
    }
  ];