var ddElem;
var timeObject;
ej.base.enableRipple(true);

ej.grids.Grid.Inject(ej.grids.Edit, ej.grids.Toolbar, ej.grids.Page);
var grid = new ej.grids.Grid({
  dataSource: purchaseData,
  allowPaging: true,
  toolbar: ["Add", "Edit", "Delete", "Update", "Cancel"],
  editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
  columns: [
    {
      field: "OrderID",
      headerText: "Order ID",
      type: "number",
      isPrimaryKey: true,
      validationRules: { required: true },
      textAlign: "Right",
      width: 100,
    },
    {
      field: "CustomerID",
      headerText: "Customer ID",
      type: "string",
      width: 140,
    },
    {
      field: "Freight",
      headerText: "Freight",
      type: "number",
      editType: "numericedit",
      format: "C2",
      textAlign: "Right",
      width: 120,
    },
    {
      field: "OrderDate",
      headerText: "Order Date",
      type: "date",
      format: "hh:mm",
      width: 150,
      edit: {
        create: createOrderDateFn,
        destroy: destroyOrderDateFn,
        read: readOrderDateFn,
        write: writeOrderDateFn,
      },
    },
  ],
  pageSettings: { pageSize: 7 },
  height: 255,
});
grid.appendTo("#Grid");

function createOrderDateFn() {
  ddElem = document.createElement("input");
  return ddElem;
}
function destroyOrderDateFn() {
  timeObject.destroy();
}
function readOrderDateFn() {
  return timeObject.value;
}
function writeOrderDateFn(args) {
  timeObject = new ej.calendars.TimePicker({
    value: args.rowData[args.column.field],
    step: 60,
  });
  timeObject.appendTo(ddElem);
}
