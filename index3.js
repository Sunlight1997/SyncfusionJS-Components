var country = [
  { ShipCountry: "United States", countryId: "1" },
  { ShipCountry: "Australia", countryId: "2" },
  { ShipCountry: "India", countryId: "2" },
];
ej.grids.Grid.Inject(ej.grids.Edit, ej.grids.Toolbar);
var grid = new ej.grids.Grid({
  dataSource: cascadeData,
  toolbar: ["Add", "Edit", "Delete", "Update", "Cancel"],
  editSettings: {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Normal",
  },
  columns: [
    {
      field: "OrderID",
      headerText: "Order ID",
      textAlign: "Right",
      width: 100,
      isPrimaryKey: true,
      validationRules: { required: true },
    },
    {
      field: "CustomerID",
      headerText: "Customer ID",
      width: 120,
      validationRules: { required: true, minLength: 3 },
    },
    {
      field: "ShipCountry",
      headerText: "Ship Country",
      width: 120,
      editType: "dropdownedit",
      edit: {
        params: {
          query: new ej.data.Query(),
          dataSource: country,
          fields: { value: "ShipCountry", text: "ShipCountry" },
          allowFiltering: true,
        },
      },
    },
  ],
  height: 273,
});
grid.appendTo("#Grid");
