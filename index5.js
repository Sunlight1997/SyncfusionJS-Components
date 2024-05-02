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
    { field: "CustomerID", headerText: "Customer ID", width: 120 },
    {
      field: "Freight",
      headerText: "Freight",
      textAlign: "Right",
      editType: "numericedit",
      width: 120,
      format: "C2",
    },
    {
      field: "ShipCountry",
      headerText: "Ship Country",
      edit: { params: { focus: ddFocus } },
      editType: "dropdownedit",
      width: 150,
    },
  ],
  height: 265,
});
grid.appendTo("#Grid");

function ddFocus(e) {
  e.event.target.querySelector(".e-dropdownlist").ej2_instances[0].showPopup();
}
