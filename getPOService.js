

class GetPOService extends Service {
  stationName
  stationFilter
  stationFilters
  stationQueryParam

  stationPlant

  serviceFilter
  serviceQueryParam
  serviceProfileIDs

  serviceProfileFilterIDs
  serviceProfileFilterPlant
  serviceProfileFilters
  serviceProfileQueryParam
  serviceProfileMappingIDs

  profileMappingFilterIDs
  profileMappingsQueryParam
  profileMappingsRecords

  SAPGetOperationsFilter = {
    SAPWorkCenterID: "",
    SAPOrderType: ""
  }

  profileMappingFunctionIDs
  profileMappingFunctionsFilterIDs
  profileMappingFunctionsQueryParam

  response
  resData
  constructor(serviceName) {
    super(serviceName);
    // overwrite this one for the different steps in your service
    this.steps = ["1. get station", "2. get plant", "3. get service", "4. get service profile", "5. get profile Mapping", "6. get service profile Mapping function"];
    console.log("GetPOService is defined");
    console.log("this", this)

  }

  getValues() {
    super.getValues();
    //TODO: replace with connstant interface
    this.inputs["station"] = getValue("station")
  }

  async execute() {
    try {
      
      ///////////////////////////////////////
    //   // 1. get station
    ///////////////////////////////////////
    this.stationFilter = new Filter(tableFieldNames["config.stations.stationID"], FunctionTypes.equal, this.inputs.station["id"])
    this.stationFilters = [this.stationFilter];
    console.log(this.stationFilter.parse());
    this.stationQueryParam = new QueryParams(globalVars.partnerURL, tableCodes["config.stations"], this.stationFilters);
    this.response = await callAPI2(this.stationQueryParam)
    this.resData = await this.response.json();
    console.log("station response: ", this.resData);

    if (this.resData.length !== 1) {
      fireEvent("Error", "amount of stations is wrong. there are " + this.resData.length + "stations");
      return;
    }
    //TODO: replace reliance on station name with station ID
    this.stationName = this.resData[0][tableFieldNames["config.stations.stationName"]]
    console.log("stationName: ", this.stationName);
    this.setButtonProgress(100 * (this.currentStep + 1) / (this.steps.length));
    this.currentStep++;

    //   /////////////////////////////////////
    //   // 2. get plant
    //   /////////////////////////////////////
    this.stationPlant = this.resData[0][tableFieldNames["config.stations.plant"]]
    console.log("plant is: ", this.stationPlant);

    if (this.stationPlant == "") {
      fireEvent("Error", "Plant is null");
      return;
    }
    this.setButtonProgress(100 * (this.currentStep + 1) / (this.steps.length));
    this.currentStep++;


    //   /////////////////////////////////////
    //   // 3. get service
    //   /////////////////////////////////////
    this.serviceFilter = new Filter(tableFieldNames["config.services.id"], FunctionTypes.equal, serviceIDs.GetProcessOrderOperations);
    this.serviceQueryParam = new QueryParams(globalVars.partnerURL, tableCodes["config.services"], [this.serviceFilter]);
    console.log("serviceQueryParam:", this.serviceQueryParam);
    this.response, this.resData = null;
    this.response = await callAPI2(this.serviceQueryParam)
    this.resData = await this.response.json();
    console.log("service response: ", this.resData);
    if (this.resData.length !== 1) {
      fireEvent("Error", "The amount of service records that does not fit the criteria is: " + this.resData.length);
      return;
    }
    if (this.resData[0][tableFieldNames["config.services.serviceProfileIDs"]].length == 0) {
      fireEvent("Error", "No service profiles ");
      return;
    }
    this.serviceProfileIDs = this.resData[0][tableFieldNames["config.services.serviceProfileIDs"]]
    console.log(tableFieldNames["config.services.serviceProfileIDs"], this.resData[0][tableFieldNames["config.services.serviceProfileIDs"]])
    //   incrementBar();
    this.setButtonProgress(100 * (this.currentStep + 1) / (this.steps.length));
    this.currentStep++;

    //   /////////////////////////////////////
    //   // 4. get service profile
    //   /////////////////////////////////////
    this.serviceProfileFilterIDs = new Filter(tableFieldNames["config.serviceProfiles.id"], FunctionTypes.isIn, this.serviceProfileIDs);
    this.serviceProfileFilterPlant = new Filter(tableFieldNames["config.serviceProfiles.plant"], FunctionTypes.equal, this.stationPlant);
    this.serviceProfileFilters = [];
    this.serviceProfileFilters.push(this.serviceProfileFilterIDs);
    this.serviceProfileFilters.push(this.serviceProfileFilterPlant);

    //TODO: add filter by status

    console.log(this.serviceProfileFilters);
    this.serviceProfileQueryParam = new QueryParams(globalVars.partnerURL, tableCodes["config.serviceProfiles"], this.serviceProfileFilters);
    console.log("serviceProfileQueryParam:", this.serviceProfileQueryParam);
    this.response, this.resData = null;
    this.response = await callAPI2(this.serviceProfileQueryParam)
    this.resData = await this.response.json();
    console.log("service profile response: ", this.resData);
    if (this.resData.length !== 1) {
      fireEvent("Error", "The amount of service profile records that does not fit the criteria is:  " + this.resData.length);
      return;
    }
    this.serviceProfileMappingIDs = this.resData[0][tableFieldNames["config.serviceProfiles.ProfileMappingIDs"]]
    console.log(tableFieldNames["config.serviceProfiles.ProfileMappingIDs"], this.serviceProfileMappingIDs)
    if (this.serviceProfileMappingIDs == 0) {
      fireEvent("Error", "The amount of service profile mapping links does not fit the criteria is:  " + this.serviceProfileMappingIDs.length);
      return;
    }
    //   incrementBar();
    this.setButtonProgress(100 * (this.currentStep + 1) / (this.steps.length));
    this.currentStep++;

    //   /////////////////////////////////////
    //   // 5. get profile Mapping
    //   /////////////////////////////////////

    this.profileMappingFilterIDs = new Filter(tableFieldNames["config.profileMappings.id"], FunctionTypes.isIn, this.serviceProfileMappingIDs);
      console.log(this.profileMappingFilterIDs);
      this.profileMappingsQueryParam = new QueryParams(globalVars.partnerURL, tableCodes["config.profileMappings"], this.profileMappingFilterIDs);
      console.log("profileMappingsQueryParam:", this.profileMappingsQueryParam);
      this.response, this.resData = null;
      this.response = await callAPI2(this.profileMappingsQueryParam)
      this.resData = await this.response.json();
      console.log("profile mapping response: ", this.resData);
      if (this.resData.length == 0) {
        fireEvent("Error", "There should be at least one profile mapping record");
        return;
      }
      // incrementBar();
      this.setButtonProgress(100 * (this.currentStep + 1) / (this.steps.length));
    this.currentStep++;
      this.profileMappingsRecords = this.resData;
      await Promise.all(this.profileMappingsRecords.map(async (profileMappingsRecord) => {
        // filter out inactive records
        if (this.isActive(profileMappingsRecord[tableFieldNames["config.profileMappings.statusId"]][0])) {
          switch (profileMappingsRecord[tableFieldNames["config.profileMappings.TargetFieldId"]][0]) {
            case fieldNameIDs.SAPOrderType:
              await this.mapSAPOrderType(profileMappingsRecord)
              break;
            case fieldNameIDs.SAPWorkCenterID:
              await this.mapSAPWorkCenterID(profileMappingsRecord)
              break;
            default:
              fireEvent("Error", "no mapping for field ID: " + profileMappingsRecord[tableFieldNames["config.profileMappings.TargetFieldId"]][0])
              break;
          }
        }
      }))
      // incrementBar()
      this.setButtonProgress(100 * (this.currentStep + 1) / (this.steps.length));
    this.currentStep++;
      console.log("SAPGetOperationsFilter", JSON.stringify(this.SAPGetOperationsFilter));
      fireEvent("SAPGetOperationsFilter", this.SAPGetOperationsFilter)
      this.resetBar(0);
    // }

    } catch (error) {
      console.log("error => ", error);
      fireEvent("error",error);
    }

    

  }

  async  isActive(statusRecord) {
      //TODO: implement real logic
      return true;
    }

     async mapSAPWorkCenterID(mappingRecord) {
      this.profileMappingFunctionIDs = mappingRecord[tableFieldNames["config.profileMappings.profileMappingFunctionIds"]]
      console.log(this.profileMappingFunctionIDs);


      this.profileMappingFunctionsFilterIDs = new Filter(tableFieldNames["config.profileMappingsFunction.id"], FunctionTypes.isIn, this.profileMappingFunctionIDs);
      console.log(this.profileMappingFilterIDs);
      this.profileMappingFunctionsQueryParam = new QueryParams(globalVars.partnerURL, tableCodes["config.profileMappingFunctions"], this.profileMappingFunctionsFilterIDs);
      console.log("profileMappingFunctionsQueryParam:", this.profileMappingFunctionsQueryParam);
      this.response, this.resData = null;
      this.response = await callAPI2(this.profileMappingFunctionsQueryParam)
      this.resData = await this.response.json();
      console.log("profile mapping functions response: ", this.resData);
      if (this.resData.length == 0) {
        fireEvent("Error", "There should be at least one profile mapping record");
        return;
      }
      this.resData.map((profileMappingFunction) => {
        console.log(profileMappingFunction[tableFieldNames["config.profileMappingsFunction.sourceValue"]]);
        if (profileMappingFunction[tableFieldNames["config.profileMappingsFunction.sourceValue"]] == this.stationName) {
          //TODO: replace hardcoded value ("SAPWorkCenterID") with the current value from the db
          this.SAPGetOperationsFilter.SAPWorkCenterID = profileMappingFunction[tableFieldNames["config.profileMappingsFunction.targetValues"]]
        }
      })
    }

  async  mapSAPOrderType(mappingRecord) {
    this.profileMappingFunctionIDs = mappingRecord[tableFieldNames["config.profileMappings.profileMappingFunctionIds"]]
      console.log(this.profileMappingFunctionIDs);
      this.profileMappingFunctionsFilterIDs = new Filter(tableFieldNames["config.profileMappingsFunction.id"], FunctionTypes.isIn, this.profileMappingFunctionIDs);
      console.log(this.profileMappingFilterIDs);
      this.profileMappingFunctionsQueryParam = new QueryParams(globalVars.partnerURL, tableCodes["config.profileMappingFunctions"], this.profileMappingFunctionsFilterIDs);
      console.log("profileMappingFunctionsQueryParam:", this.profileMappingFunctionsQueryParam);
      this.response, this.resData = null;
      this.response = await callAPI2(this.profileMappingFunctionsQueryParam)
      this.resData = await this.response.json();
      console.log("profile mapping functions response: ", this.resData);
      if (this.resData.length == 0) {
        fireEvent("Error", "There should be at least one profile mapping record");
        return;
      }
      this.resData.map((profileMappingFunction) => {
        //TODO: replace hardcoded value ("SAPOrderType") with the current value from the db
        this.SAPGetOperationsFilter.SAPOrderType = profileMappingFunction[tableFieldNames["config.profileMappingsFunction.targetValues"]]
      }
      )
    }



}