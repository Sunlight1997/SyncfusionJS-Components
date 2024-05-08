function rowDrop(e) {
  console.log(e);
  if (0 === e.dropIndex) {
    e.cancel = true;
  } else {
    setTimeout(() => {
      if (0 === e.data[0].level) {
        e.cancel = true;
      } else {
        var i = {
          action: "RowDrop",
          dragTaskId: e.data[0].TaskID,
          dragTaskParentId: e.data[0].parentItem.taskId,
          dropTaskId: e.dropRecord.TaskID,
          dropTaskParentId: e.dropRecord.parentItem.taskId,
          dropPosition: e.dropPosition,
        };
        $.ajax({
          url: t.dataUrl,
          type: "POST",
          dataType: "json",
          headers: {
            P_TENANCY_ID: t.tenancyId,
            P_PROJECT_ID: t.projectId,
            P_TYPE: t.type,
            P_EPIC_ID: this.epicId,
            P_SPRINT_ID: this.sprintId,
          },
          crossDomain: true,
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(i),
          success: (data) => {
            console.log("Received reorder data:", data);
            this.updateTasks(data.result);
          },
          error: function (xhr, status, error) {
            console.error("AJAX reorder error:", status, error);
          },
        });
      }
    }, 100);
  }
}

function updateTasks1(updatedTasks) {
  console.log("CAlled updatetasks with:", updatedTasks);
  this.dataSource = updatedTasks; // Update the internal data source
  this.ganttChart.refresh(); // Refresh the Gantt chart to reflect changes
}
function linkedTasks() {
  if ("chain" === i.item.id) {
    const e = this.selectionModule.getSelectedRecords();
    for (let t = 1; t < e.length; t++) {
      let n = e[t - 1].TaskID + "FS";
      !1 === this.connectorLineEditModule.validatePredecessorRelation(e[t], n)
        ? (alert("Cannot create a circular dependency â€“ Action blocked"),
          (i.cancel = !0))
        : this.connectorLineEditModule.addPredecessor(e[t], e[t - 1].TaskID);
    }
  }
}
