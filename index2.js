var countryElem;
var countryObj;
var stateElem;
var stateObj;

var country = [{ countryName: "United States" }, { countryName: "Australia" }];

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
      field: "ShipCountry",
      headerText: "Ship Country",
      width: 120,
      edit: {
        create: function () {
          countryElem = document.createElement("input");
          return countryElem;
        },
        read: function () {
          return countryObj.text;
        },
        destroy: function () {
          countryObj.destroy();
        },
        write: function () {
          countryObj = new ej.dropdowns.DropDownList({
            dataSource: country,
            fields: { text: "countryName" },
            placeholder: "Select a country",
          });
          countryObj.appendTo(countryElem);
        },
      },
    },
  ],
  height: 265,
});
grid.appendTo("#Grid");
