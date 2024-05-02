ej.grids.Grid.Inject(ej.grids.Edit, ej.grids.Toolbar);
var grid = new ej.grids.Grid({
  dataSource: data,
  toolbar: ["Add", "Edit", "Delete", "Update", "Cancel"],
  editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
  columns: [
    {
      field: "OrderID",
      headerText: "Order ID",
      textAlign: "Right",
      width: 150,
      isPrimaryKey: true,
    },
    { field: "CustomerID", headerText: "Customer ID", width: 150 },
    {
      field: "Freight",
      headerText: "Freight",
      textAlign: "Right",
      editType: "numericedit",
      width: 150,
      edit: {
        params: {
          validateDecimalOnType: true,
          decimals: 0,
          format: "N",
        },
      },
    },
    {
      field: "ShipCity",
      headerText: "Ship City",
      editType: "dropdownedit",
      width: 150,
    },
  ],
  height: 265,
});
grid.appendTo("#Grid");
