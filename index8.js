ej.grids.Grid.Inject(ej.grids.Edit, ej.grids.Toolbar);
var grid = new ej.grids.Grid({
  dataSource: data,
  actionComplete: function (args) {
    if (args.requestType === "beginEdit" || args.requestType === "add") {
      var tr = args.row;
      var numericTextBox = tr.querySelector(".e-numerictextbox"); // numeric TextBox component element
      if (numericTextBox) {
        console.log(
          "NumericTextBox instance: ",
          numericTextBox.ej2_instances[0]
        ); // numeric TextBox instance
      }
      var dropDownList = tr.querySelector(".e-dropdownlist"); // dropDownList component element
      if (dropDownList) {
        console.log("DropDownList instance: ", dropDownList.ej2_instances[0]); // dropDownList instance
      }
    }
  },
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
      editType: "dropdownedit",
      width: 150,
    },
  ],
  height: 273,
});
grid.appendTo("#Grid");
