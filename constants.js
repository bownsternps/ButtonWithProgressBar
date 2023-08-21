var SAPGetOperationsFilter = {

}

const inputParamsNames = {
    "serviceID": "serviceID",
}

const globalVars = {
  "partnerURL": "https://partner-bns.tulip.co/api/v3/",
  "tables": "tables/",
  "authorizationBasic": "Basic YXBpa2V5LjJfQlJkeGdjTjRKV0VCZHBLS3A6bTNHUzVQU1djOGRXZHROTlZlcEVNbHd4QUE1UW5WeTdmakdiZTFfVno4Mw==",
  "queryConst": "/records"

}

const tableCodes = {
  "config.services": "kSS2bmzT46FxMkvuo",
  "config.stations": "BNzCSjFLyE6mrJ8c9",
  "config.serviceProfiles": "PcMha9wZ5Yq8jrgky",
  "config.profileMappings": "nQAYM3G2q9jnAk2wE",
  "config.profileMappingFunctions": "uvkWHx9Hs9KDgb55c",
  "config.fields": "t3QmdhZpK37yTZaT5",

  "config.serviceMapping": "FLsxvmThWc6txHDgC", // TODO: outdated
}

const tableFieldNames = {
  "config.services.id": "id",
  "config.services.serviceProfileIDs": "eFXRrA3tMqCeEDM27_link_right_column",

  "config.stations.stationID": "grssb_station_obj",
  "config.stations.stationName": "bkyoy_station_name",
  "config.stations.plant": "dlvzm_plant",

  "config.serviceProfiles.id": "id",
  "config.serviceProfiles.plant": "cgcdl_plant",
  "config.serviceProfiles.serviceIDs": "eFXRrA3tMqCeEDM27_link_left_column",
  "config.serviceProfiles.ProfileMappingIDs": "CxKLBtxdfWER5KtDK_link_right_column",


  "config.profileMappings.id": "id",
  "config.profileMappings.statusId": "AzLBngB3k5KSfx3RZ_link_left_column",
  "config.profileMappings.mappingTypeId": "NDDW6nnqh5ytk96e3_link_left_column",
  "config.profileMappings.sourceFieldId": "tFZBCkFpZLBJQusG5_link_left_column",
  "config.profileMappings.TargetFieldId": "NxY7mqLePnSvuyttr_link_left_column",
  "config.profileMappings.profileMappingFunctionIds": "afiJhxmdK3Rop57bJ_link_right_column",

  "config.profileMappingsFunction.id": "id",
  "config.profileMappingsFunction.targetValues": "jxzbt_target_values",
  "config.profileMappingsFunction.sourceValue": "ngabj_source_value",
}

const serviceIDs = {
  "GetProcessOrderOperations": "001",
  "ProcessOrderGoodsIssue": "002",
  "ProcessOrderGoodsReceipt": "003",

}
//// Important. these are hardcoded values
const fieldNameIDs = {
  SAPWorkCenterID: "79ea8636-5da6-4963-95cd-630f62eb7452",
  SAPOrderType: "6735d5d1-161f-42ce-9438-ad9445603743"
}


const FunctionTypes = {
    equal: "equal",
    notEqual: "notEqual",
    blank: "blank",
    notBlank: "notBlank",
    greaterThanOrEqual: "greaterThanOrEqual",
    lessThanOrEqual: "lessThanOrEqual",
    greaterThan: "greaterThan",
    lessThan: "lessThan",
    contains: "contains",
    notContains: "notContains",
    startsWith: "startsWith",
    notStartsWith: "notStartsWith",
    endsWith: "endsWith",
    notEndsWith: "notEndsWith",
    isIn: "isIn",
    notIsIn: "notIsIn",
  }
  
  // &filters=[{"field":"grsdx_station_name","functionType": "equal","arg":"Amir's Station"}]
  class Filter {
    constructor(field, functionType, arg) {
      this.field = field
      this.functionType = functionType;
      this.arg = arg
    }
    parse() {
      return JSON.stringify(this);
    }
  };
  
  class QueryParams {
    // this is an example of a query with filter
    //https://partner-bns.tulip.co/api/v3/tables/BNzCSjFLyE6mrJ8c9/records?filters=[{"field":"grsdx_station_name","functionType": "equal","arg":"TestStationAmir"}]
    URL = "";
    constructor(partnerURL, tableCode, filtersArray) {
      this.partnerURL = partnerURL
      this.tableCode = tableCode;
      this.filtersArray = filtersArray;
    }
    parse() {
      this.URL = "";
      this.URL += this.partnerURL + "tables/";
      this.URL += this.tableCode;
      this.URL += "/records";
      if (typeof this.filtersArray !== 'undefined' && this.filtersArray.length > 0) {
        this.URL += "?filters=" + JSON.stringify(this.filtersArray);
      }
      return this.URL;
    }
  };
  async function callAPI2(queryParams) {
    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", globalVars.authorizationBasic);
  
    myHeaders.append(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
  
    const myInit = {
      method: "GET",
      headers: myHeaders,
      mode: "cors",
      cache: "default"
    };
  
    requestURL = queryParams.parse();
    let myRequest = new Request(
      requestURL
    );
  
    var response;
    try {
      response = await fetch(myRequest, myInit);
    } catch (error) {
      fireEvent("Error", error)
    }
  
    return response;
  }
  