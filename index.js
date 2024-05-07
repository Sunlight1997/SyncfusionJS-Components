ej.gantt.Gantt.Inject(
  ej.gantt.Edit,
  ej.gantt.Toolbar,
  ej.gantt.Selection,
  ej.gantt.Filter,
  ej.gantt.Sort,
  ej.gantt.RowDD // Ensure Row Drag and Drop module is included
);

var ganttChart = new ej.gantt.Gantt({
  dataSource: new ej.data.DataManager({
    url: "https://portfolion.co.uk/ords/ppmreports/ponSF/gantt",
    adaptor: new ej.data.UrlAdaptor(),
    batchUrl: "https://portfolion.co.uk/ords/ppmreports/ponSF/gantt",
    headers: [
      { P_TENANCY_ID: "996" },
      { P_PROJECT_ID: "2702" },
      { P_TYPE: "Action" },
    ],
    crossDomain: true,
  }),
  allowResizing: true,
  taskFields: {
    id: "TaskID",
    name: "TaskName",
    startDate: "StartDate",
    endDate: "EndDate",
    duration: "Duration",
    progress: "Progress",
    dependency: "Predecessor",
    parentID: "ParentId",
    notes: "info",
    index: "sort_order",
  },

  columns: [
    {
      field: "TaskID",
      headerText: "ID",
      width: "100",
      textAlign: "Right",
      isFrozen: true,
      isPrimaryKey: true,
    },
    {
      field: "TaskName",
      headerText: "Task Name",
      width: "250",
      clipMode: "EllipsisWithTooltip",
      isFrozen: true,
    },
    { field: "sort_order", headerText: "Sort", width: "100" },
    {
      field: "StartDate",
      headerText: "Start Date",
      format: "dd-MMM-yy",
      width: "100",
    },
    {
      field: "EndDate",
      headerText: "End Date",
      format: "dd-MMM-yy",
      width: "100",
    },
    {
      field: "Duration",
      headerText: "Duration",
      width: "100",
      textAlign: "Right",
    },
    {
      field: "Progress",
      headerText: "Progress",
      width: "100",
      textAlign: "Right",
    },
  ],
  treeColumnIndex: 0,
  height: "450px",
  editSettings: {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    showDeleteConfirmDialog: true,
    mode: "Auto",
  },

  allowRowDragAndDrop: true,
  allowTaskbarDragAndDrop: true,
  toolbar: [
    "Add",
    "Delete",
    "Update",
    "Cancel",
    "ExpandAll",
    "CollapseAll",
    "Search",
    "ZoomToFit",
    "Indent",
    "Outdent",
  ],
  allowPdfExport: true,
  searchSettings: { fields: ["TaskName"], ignoreCase: true },
  allowSelection: true,
  gridLines: "Both",
  highlightWeekends: true,
  labelSettings: {
    leftLabel: "TaskName",
  },
  enableContextMenu: true,
  queryCellInfo: function (args) {
    if (args.column.field === "TaskName" && args.data.childRecords.length > 0) {
      args.cell.style.fontWeight = "bold";
    }
  },
  toolbarClick: function (args) {
    if (args.item.id === "Editing_pdfexport") {
      ganttChart.pdfExport({ fileName: "Gantt_Software_MVP.pdf" });
    } else if (args.item.text === "ZoomToFit") {
      zoomToFit();
    }
  },
  rowDragStartHelper: function (args) {
    console.log("Drag start data:", args.data); // Check what is being dragged
    if (args.data[0].level === 0) {
      args.cancel = true;
    }
  },
  rowDrop: function (args) {
    console.log("Drop event data:", args); // Log the entire args to see what's missing
    if (!args.data || args.data.length === 0 || !args.dropRecord) {
      console.error("Drag or drop information is incomplete.");
      args.cancel = true;
      return; // Exit function if the basic data is not available
    }

    // Additional check to prevent dropping on top-level tasks or the first row

    if (args.dropIndex === 0 || args.data[0].level === 0) {
      args.cancel = true; // Cancel the drop
    } else {
      var requestData = {
        action: "RowDrop",

        dragTaskId: args.data[0].TaskID, // Dragged task ID

        dragTaskParentId: args.data[0].parentItem
          ? args.data[0].parentItem.taskId
          : null, // Dragged task parent ID, check if parentItem exists

        dropTaskId: args.dropRecord.TaskID, // Drop target task ID

        dropTaskParentId: args.dropRecord.parentItem
          ? args.dropRecord.parentItem.taskId
          : null, // Drop target task parent ID, check if parentItem exists

        dropPosition: args.dropPosition,
      };

      $.ajax({
        url: "https://portfolion.co.uk/ords/ppmreports/ponSF/gantt",

        type: "POST",

        dataType: "json",

        headers: {
          P_TENANCY_ID: "996",

          P_PROJECT_ID: "2702",

          P_TYPE: "Action",
        },

        crossDomain: true,

        contentType: "application/json; charset=utf-8",

        data: JSON.stringify(requestData),

        success: function (response) {
          console.log("Row drop processed successfully:", response);
        },

        error: function (xhr, status, error) {
          console.error("Error during row drop AJAX request:", status, error);
        },
      });
    }
  },
});

function zoomToFit() {
  var taskData = ganttChart.getTaskData();

  var minDate = new Date(
    Math.min.apply(
      null,
      taskData.map((t) => t.StartDate)
    )
  );

  var maxDate = new Date(
    Math.max.apply(
      null,
      taskData.map((t) => t.EndDate)
    )
  );

  ganttChart.timelineModule.updateTimeLineSettings({
    timelineStartDate: minDate,

    timelineEndDate: maxDate,
  });
}

ganttChart.appendTo("#Editing");
