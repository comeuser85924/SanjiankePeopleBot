function insertNewData(tabName, data, rows='A') {
  const values = getTableList(tabName, rows);
  const valuesIndex = (values.length === 0) ? 2 : values.length + 1;
  const rangeName = `${tabName}!${rows}${valuesIndex}:${rows}`;
  const requestData = {
      majorDimension: "ROWS",
      values: data
  };
  Sheets.Spreadsheets.Values.update(
      requestData,
      sheetID,
      rangeName,
      {valueInputOption: "USER_ENTERED"}
    );
}

function getTableList(tabName, rows='A') {
  const rangeName = `${tabName}!${rows}:${rows}`;
  const values = Sheets.Spreadsheets.Values.get(sheetID, rangeName).values;
  if(!values) {
    return []
  }
  return values;
}
