var inpuEle;
var autoCompleteIns;
var autoCompleteData = [
  { CustomerID: "VINET", Id: "1" },
  { CustomerID: "TOMSP", Id: "2" },
  { CustomerID: "HANAR", Id: "3" },
  { CustomerID: "VICTE", Id: "4" },
  { CustomerID: "SUPRD", Id: "5" },
];

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
      edit: {
        create: createCustomerIDFn,
        destroy: destroyCustomerIDFn,
        read: readCustomerIDFn,
        write: writeCustomerIDFn,
      },
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
      format: "yMd",
      editType: "datepickeredit",
      width: 150,
    },
  ],
  pageSettings: { pageSize: 7 },
  height: 255,
});
grid.appendTo("#Grid");

function createCustomerIDFn() {
  inpuEle = document.createElement("input");
  return inpuEle;
}
function destroyCustomerIDFn() {
  autoCompleteIns.destroy();
}
function readCustomerIDFn() {
  return autoCompleteIns.value;
}
function writeCustomerIDFn(args) {
  autoCompleteIns = new ej.dropdowns.AutoComplete({
    allowCustom: true,
    value: args.rowData[args.column.field],
    dataSource: autoCompleteData,
    fields: { value: "CustomerID", text: "CustomerID" },
  });
  autoCompleteIns.appendTo(inpuEle);
}
