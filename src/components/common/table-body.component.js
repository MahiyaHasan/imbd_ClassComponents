const TableBody = ({ item, columns }) => {
  return (
    <>
      <tbody>
        {item.map(item => {
            return (
                <tr>
                {
                    columns.map(col => {
                        return col.content(item, col.path);
                    })
                }
                </tr>
            )
        })}
      </tbody>
    </>
  );
};

export default TableBody;
