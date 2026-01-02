function doPost(e){
  try{
    const sh=SpreadsheetApp.getActive().getSheetByName("Sheet1");
    const d=JSON.parse(e.postData.contents);

    sh.appendRow([
      d.tripId,d.tripType,d.tripDateTime,
      d.cabType,d.cabDetails,d.bookingDescription,
      d.customerName,d.customerPhone,
      d.driverName,d.driverPhone,
      d.pickup,d.drop,
      d.totalAmount,d.advance,d.balance,
      d.driverCollection,d.extraNote,
      new Date()
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({status:"success",tripId:d.tripId})
    ).setMimeType(ContentService.MimeType.JSON);

  }catch(err){
    return ContentService.createTextOutput(
      JSON.stringify({status:"error",message:err.toString()})
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e){
  const sh=SpreadsheetApp.getActive().getSheetByName("Sheet1");
  const data=sh.getDataRange().getValues();
  for(let i=1;i<data.length;i++){
    if(data[i][0]==e.parameter.tripId){
      return ContentService.createTextOutput(JSON.stringify({
        tripId:data[i][0],
        tripType:data[i][1],
        tripDateTime:data[i][2],
        cabType:data[i][3],
        cabDetails:data[i][4],
        bookingDescription:data[i][5],
        customerName:data[i][6],
        customerPhone:data[i][7],
        driverName:data[i][8],
        driverPhone:data[i][9],
        pickup:data[i][10],
        drop:data[i][11],
        totalAmount:data[i][12],
        advance:data[i][13],
        balance:data[i][14]
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
}
