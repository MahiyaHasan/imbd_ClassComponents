import TableBody from "./table-body.component";
import TableHeader from "./table-header.component";

const Table = ({columns, onSort, sortColumn, item}) => {
  return (
    <>
      <table className="table">
        <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
        <TableBody item={item} columns={columns}/>
      </table>
    </>
  );
};

export default Table;
