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
      width: 100,
      isPrimaryKey: true,
    },
    {
      field: "CustomerName",
      headerText: "CustomerName",
      textAlign: "Right",
      width: 200,
    },
    {
      field: "OrderDate",
      headerText: "Order Date",
      type: "date",
      width: 120,
      format: { type: "date", format: "dd.MM.yyyy" },
      editType: "datepickeredit",
      edit: { params: { format: "dd.MM.yy" } },
    },
    {
      field: "Freight",
      headerText: "Freight",
      textAlign: "Right",
      editType: "numericedit",
      width: 120,
      format: "C2",
      edit: { params: { decimals: 2, value: 5 } },
    },
    {
      field: "ShipCountry",
      headerText: "Ship Country",
      editType: "dropdownedit",
      width: 150,
      edit: { params: { value: "Germany" } },
    },
    {
      field: "Verified",
      displayAsCheckBox: true,
      editType: "booleanedit",
      textAlign: "Center",
      width: 100,
      edit: { params: { checked: true } },
    },
  ],
  height: 273,
});
grid.appendTo("#Grid");
