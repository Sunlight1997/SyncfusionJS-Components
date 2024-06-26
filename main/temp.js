// I guess what needs to be added to the html file is 
//   1) a button called "Link Tasks", 
//   2) an action which sends the taskID's and selected order to the backend, 
//   3) a process which refreshes the front end with the new predecessor info 
//   (the gantt library should draw the lines automatically if refreshed in this way)

ej.gantt.Gantt.Inject(
  ej.gantt.Edit,
  ej.gantt.Toolbar,
  ej.gantt.Selection,
  ej.gantt.Filter,
  ej.gantt.Sort,
  ej.gantt.RowDD
);

var ganttChart = new ej.gantt.Gantt({
  dataSource: new ej.data.DataManager({
    url: "ppmreports/ponSF/GanttData",
    adaptor: new ej.data.UrlAdaptor(),
    batchUrl: "ppmreports/ponSF/GanttData",
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
      visible: false,
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
  treeColumnIndex: 1,
  height: "950px",
  splitterSettings: { position: "35%" },
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
  searchSettings: {
    fields: ["TaskName"],
    ignoreCase: true,
  },
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
    console.log("Drag start data:", args.data);
    if (args.data[0].level === 0) {
      args.cancel = true;
    }
  },
  rowDrop: function (args) {
    console.log("Drop event data:", args);
    if (args.dropIndex === 0 || (args.data && args.data[0].level === 0)) {
      args.cancel = true;
    } else {
      var requestData = {
        action: "RowDrop",
        dragTaskId: args.data[0].TaskID,
        dragTaskParentId: args.data[0].parentItem
          ? args.data[0].parentItem.taskId
          : null,
        dropTaskId: args.dropRecord.TaskID,
        dropTaskParentId: args.dropRecord.parentItem
          ? args.dropRecord.parentItem.taskId
          : null,
        dropPosition: args.dropPosition,
      };
      $.ajax({
        url: "ppmreports/ponSF/GanttData",
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
          updateTasks(response.result); // Assuming updateTasks is available in scope
        },
        error: function (xhr, status, error) {
          console.error("Error during row drop AJAX request:", status, error);
        },
      });
    }
  },
});

function updateTasks(updatedTasks) {
  console.log("Called updateTasks with:", updatedTasks);
  ganttChart.dataSource = updatedTasks; // Update the internal data source
  ganttChart.refresh(); // Refresh the Gantt chart to reflect changes
}

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
