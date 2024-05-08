function compareArrays(arr1, arr2) {
  var i = true,
    isA1 = Array.isArray(arr1),
    isA2 = Array.isArray(arr2);

  if (isA1 !== isA2) {
    return false;
  } else if (!(isA1 && isA2)) {
    if (arr1 instanceof Object && arr2 instanceof Object) {
      const keyVal1 = Object.entries(arr1),
        keyVal2 = Object.entries(arr2);
      var res = true;
      if (keyVal1.length !== keyVal2.length) return false;
      keyVal1.forEach(([key1, val1], idx) => {
        if (key1 !== keyVal2[idx][0] || val1 !== keyVal2[idx][1]) res = false;
      });
      return res;
    }
    return arr1 === arr2;
  } else if (arr1.length !== arr2.length) {
    return false;
  }

  arr1.forEach((val, idx) => {
    if (!compareArrays(val, arr2[idx])) i = false;
  });
  return i;
}

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
