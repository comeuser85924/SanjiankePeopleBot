function repeatRun(){
  if(new Date().getDay() == 6 || new Date().getDay() == 0) return
  if(new Date().getHours() <= 20) return
  main()
}

function main(){
  const sheetTabName = 'fitness'
  const host = 'https://3musclers.fitbutler.tw/'
  const method = "POST"
  const headers = { 'cookie': cookie }
  const query = {
    'd':'app',
    'm':'getMemberCounter',
    'c':'company'
  }
  const payload = {
    "app_id": "com.appworkout.fitbutler.3musclers",
    "app_version": "2.10.0",
    "build_number": "1",
    "device_name": device_name,
    "device_uuid": device_uuid,
    "lang": "cht",
    "platform": "ios",
    "system_name": "iOS",
    "system_version": "15.5",
    "user_token": user_token
  }
  const options = {
    'method' : method,
    'header': headers,
    'contentType': 'application/json',
    'payload' : payload
  };
  let tableFieldForTime,tableFieldForPeople
  if(new Date().getDay() == 1){
    tableFieldForTime = 'A'
    tableFieldForPeople = 'B'
  }else if(new Date().getDay() == 2){
    tableFieldForTime = 'C'
    tableFieldForPeople = 'D'
  }else if(new Date().getDay() == 3){
    tableFieldForTime = 'E'
    tableFieldForPeople = 'F'
  }else if(new Date().getDay() == 4){
    tableFieldForTime = 'G'
    tableFieldForPeople = 'H'
  }else if(new Date().getDay() == 5){
    tableFieldForTime = 'I'
    tableFieldForPeople = 'J'
  }
  const result = UrlFetchApp.fetch(host + '?' + generateQueryString(query), options)
  const finalResp = JSON.parse(result).data.filter(item =>{ return item.name === '永和店'})[0]
  const peopleCount = finalResp.rooms[0].count
  const nowTime = Utilities.formatDate(new Date(), 'Asia/Taipei', 'HH:mm, yyyy, MMMM dd')
  insertNewData(sheetTabName,[[nowTime]],tableFieldForTime) 
  insertNewData(sheetTabName,[[peopleCount]],tableFieldForPeople) 
}