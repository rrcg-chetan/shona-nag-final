import React, { Fragment } from 'react';

import SideBar from '../../sidebar/SideBar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {withRouter} from 'react-router-dom'
import moment from 'moment'

import '../../mainstyle.css';
import '../../animate.css';
import '../../vertical-menu.css';
import '../../perfect-scrollbar.css';

import { Card, CardHeader, CardBody, Label, Button, Row, Col } from 'reactstrap'
import {
  AvForm,
  AvGroup,
  AvField,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvCheckboxGroup,
  AvRadio,
  AvCheckbox
} from 'availity-reactstrap-validation-safe'
import axios from 'axios';

class FollowUp extends React.Component {
  constructor(props){
    super(props);
    let param = this.props.location.pathname;
    const code = param.split("/").pop()   
    this.state = {         
      code: code,     
      showFertilityOption: false,  
      showRecurrence: false,
      startDateDOR: "",
      startDateDOD: "",   
      startDateLFU: "",   
      showRecurrenceMetaStases: false,
      showRebiopsy: false,
              
      recurrence: "",
      dateofrecurrence: "",
      areaofrecurrence: [
      	{ text: 'Local', checked: false },
        { text: 'Regional', checked: false },
        { text: 'Contra lateral breast', checked: false },
        { text: 'Distant Metastases', checked: false },        
      ],    
      metastases_types: [
        { text: 'Liver', checked: false },
        { text: 'Lung', checked: false },
        { text: 'Bone', checked: false },
        { text: 'Brain', checked: false },
        { text: 'Ovaries', checked: false },
        { text: 'Adrenal', checked: false },
        { text: 'Other', checked: false },
      ], 
      types_of_rebiopsy: [
      	{ text: 'ER', checked: false },
        { text: 'PR', checked: false },
        { text: 'HER2', checked: false },        
      ], 
      detectionofrecurrence: "",
      recurrenceifmetastases: "",
      recurrenceifmetastasesifother: "",
      lostfollowup: "",    
      dateofdeath: "",
      dateoflastfollowup: "",  
      loading: false,
    };
    this.showRecurrence = this.showRecurrence.bind(this);
    this.showRebiopsy = this.showRebiopsy.bind(this);
    this.handleChangeDOR = this.handleChangeDOR.bind(this);
    this.handleChangeDOD = this.handleChangeDOD.bind(this);
    this.handleChangeLFU = this.handleChangeLFU.bind(this);
    //this.handleInputAreaOfRecurrenceChange = this.handleInputAreaOfRecurrenceChange.bind(this);
    this.showRecurrenceMetaStases = this.showRecurrenceMetaStases.bind(this);
    /*this.handleInputMetastasesChange = this.handleInputMetastasesChange.bind(this);
    this.handleInputTreatmentChange = this.handleInputTreatmentChange.bind(this);      */  
    //console.log(code)
  }

  handleValidSubmit = (event, values) => {
    //alert(this.state.areaofrecurrence)
    //alert(this.state.code)
    const { history } = this.props;
    this.setState({ loading: true });
   axios.post(`/patientfollowupdetails`, { recurrence: this.state.recurrence, fertilityoptionundertaken: this.state.fertilityoptionundertaken, dateofrecurrence: this.state.dateofrecurrence, areaofrecurrence: this.state.areaofrecurrence, detectionofrecurrence: this.state.detectionofrecurrence, recurrenceifmetastases: this.state.recurrenceifmetastases, recurrenceifmetastasesifother: this.state.recurrenceifmetastasesifother, lostfollowup: this.state.lostfollowup, dateofdeath: this.state.dateofdeath, dateoflastfollowup: this.state.dateoflastfollowup, metastases_types: this.state.metastases_types, if_metastases: this.state.metastases_types, rebiopsy: this.state.rebiopsy, types_of_rebiopsy: this.state.types_of_rebiopsy, code: this.state.code })
    .then(function (response) {
    if(response.data.success === 'Followup Sucessfully Submitted!'){  
      history.push(`/health-economics/${response.data.value}`)
    }else{      
    }
  })
  };

  onToggle(index, e){
  	let newItems = this.state.areaofrecurrence.slice();
		newItems[index].checked = !newItems[index].checked
  	this.setState({
    	areaofrecurrence: newItems
    })
    console.log(this.state.areaofrecurrence)
  }

  onToggleMeta(index, e){
  	let Items = this.state.metastases_types.slice();
		Items[index].checked = !Items[index].checked
  	this.setState({
    	metastases_types: Items
    })
    console.log(this.state.metastases_types)
  }

  onToggleReBiopsy(index, e){
  	let ReItems = this.state.types_of_rebiopsy.slice();
		ReItems[index].checked = !ReItems[index].checked
  	this.setState({
    	types_of_rebiopsy: ReItems
    })
    console.log(this.state.types_of_rebiopsy)
  }

  handleChangeDOR(date) {
    this.setState({
      startDateDOR: date,
      dateofrecurrence: moment(date).format('DD-MM-YYYY')
    })
    document.getElementById("dateofrecurrence").style.color = "#fff"
    document.getElementById("dateofrecurrence").style.backgroundColor = "#fff"
  }

  handleChangeDOD(date) {
    this.setState({
      startDateDOD: date,
      dateofdeath: moment(date).format('DD-MM-YYYY')
    })
    document.getElementById("dateofdeath").style.color = "#fff"
    document.getElementById("dateofdeath").style.backgroundColor = "#fff"
  }

  handleChangeLFU(date) {
    this.setState({
      startDateLFU: date,
      dateoflastfollowup: moment(date).format('DD-MM-YYYY')
    })
    document.getElementById("dateoflastfollowup").style.color = "#fff"
    document.getElementById("dateoflastfollowup").style.backgroundColor = "#fff"
  }
  
  showRecurrence(name) {
    if(document.getElementById("recurrence").value === "Yes"){
      this.setState({ showRecurrence: true, recurrence: name });   
      //this.state.recurrence = name 
    }else{
        this.setState({ showRecurrence: false, recurrence: name, areaofrecurrence: [
          { text: 'Local', checked: false },
          { text: 'Regional', checked: false },
          { text: 'Contra lateral breast', checked: false },
          { text: 'Distant Metastases', checked: false },        
        ],    
        metastases_types: [
          { text: 'Liver', checked: false },
          { text: 'Lung', checked: false },
          { text: 'Bone', checked: false },
          { text: 'Brain', checked: false },
          { text: 'Ovaries', checked: false },
          { text: 'Adrenal', checked: false },
          { text: 'Other', checked: false },
        ], }); 
        //this.state.recurrence = name        
    }
  }

  showRecurrenceMetaStases(name) {
    if(document.getElementById("recurrenceifmetastases").value === "Other"){
      this.setState({ showRecurrenceMetaStases: true, recurrenceifmetastases: name });   
      //this.state.recurrenceifmetastases = name 
    }else{
        this.setState({ showRecurrenceMetaStases: false, recurrenceifmetastasesifother: "", recurrenceifmetastases: name}); 
        //this.state.recurrenceifmetastases = name        
    }
  }

  showRebiopsy(name) {
    if(document.getElementById("rebiopsy").value === "Yes"){
      this.setState({ showRebiopsy: true, rebiopsy: name });   
      //this.state.rebiopsy = name 
    }else{
        this.setState({ showRebiopsy: false, rebiopsy: name, types_of_rebiopsy: [
          { text: 'ER', checked: false },
          { text: 'PR', checked: false },
          { text: 'HER2', checked: false },          
        ],
      }); 
        //this.state.rebiopsy = name        
    }
  }

  render(){          
    const { showRecurrence, showRecurrenceMetaStases, showRebiopsy, /*recurrence, dateofrecurrence, areaofrecurrence, areaofrecurrence_text, detectionofrecurrence, recurrenceifmetastases, recurrenceifmetastasesifother, lostfollowup, dateofdeath, dateoflastfollowup, metastases_types, rebiopsy, types_of_rebiopsy,*/ loading, code } = this.state; 
  
return (
  <div>
        <SideBar   />
        <div className="content-wrapper animate__animated animate__fadeIn">
        <div className="app-content content overflow-hidden1">
        
          <Fragment>
          {code}
          <Row>
          <Col sm='12'>
          <Card>
            <CardHeader>
              <h1 className="animate__animated animate__fadeIn">Follow Up</h1>
            </CardHeader>
            <CardBody>
            <AvForm onValidSubmit={this.handleValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit}>
              <div className="row">
                
                <div className="col-md-2">
                  <AvGroup>            
                    <Label for='recurrence'>Recurrence</Label>
                    <AvInput type='select' name='recurrence' id='recurrence' required value={this.state.recurrence} onChange={(e) => this.showRecurrence(e.target.value)}>
                        <option value="" selected>Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option> 
                        <option value="Not Required">Not Required</option>                         
                      </AvInput>                      
                    <AvFeedback>Please select Recurrence!</AvFeedback>
                  </AvGroup>
                </div>
                {showRecurrence && (
                  <>
                  <div className="col-md-2">
                    <AvGroup>
                        <Label for='dor'>Date of Recurrence</Label><br />
                        <DatePicker peekNextMonth showMonthDropdown showYearDropdown dropdownMode= "scroll" className="form-control w-100 date-picker-block" dateFormat="dd-MM-yyyy" name="dor" id="dor" selected={this.state.startDateDOR} onSelect={this.handleSelect} onChange={this.handleChangeDOR} required />   
                        <AvInput value={this.state.date_of_recurrence} name="dateofrecurrence" id="dateofrecurrence" style={{ color: "#fff !important"}} className="custom-date-input" onChange={(e) => this.setState({ date_of_recurrence: e.target.value})} required />
                        <AvFeedback>Please enter Date of Recurrence!</AvFeedback>
                      </AvGroup>
                  </div>
                  <div className="col-md-8">
                  <Label for='areofrecurrence'>Area of Recurrence</Label>
                  <AvCheckboxGroup name='areofrecurrence' required >
                    <div className="row">
                    {this.state.areaofrecurrence.map((itemTreat, i) =>
                      <div className="col-md-2"><AvCheckbox customInput label={itemTreat.text} value={itemTreat.text} onChange={this.onToggle.bind(this, i)} /></div>                      
                    )} 
                    </div>
                  </AvCheckboxGroup>                  
                  </div> 
                  <div className="col-md-4">
                    <AvGroup>            
                        <Label for='detectionofrecurrence'>Detection of recurrence</Label>
                        <AvInput type='select' name='detectionofrecurrence' id='detectionofrecurrence' required value={this.state.detectionofrecurrence} onChange={(e) => this.setState({ detectionofrecurrence: e.target.value })}>
                            <option value="" selected>Select</option>
                            <option value="Surveillance">Surveillance</option>
                            <option value="Symptom">Symptom</option> 
                            <option value="Not Known">Not Known</option>                         
                        </AvInput>                      
                        <AvFeedback>Please select Detection of recurrence!</AvFeedback>
                    </AvGroup>
                    </div>
                    <div className="col-md-4">
                      <Label for='type_of_metastases'>Types of Metastases</Label>
                      <AvCheckboxGroup name='type_of_metastases' required >
                        <div className="row">
                        {this.state.metastases_types.map((item, i) =>
                          <div className="col-md-2"><AvCheckbox customInput label={item.text} value={item.text} onChange={this.onToggleMeta.bind(this, i)} /></div>                      
                        )}                          
                        </div>
                      </AvCheckboxGroup>
                    </div>
                  <div className="col-md-12"></div>   
                  <div className="col-md-4">
                    <AvGroup>            
                        <Label for='rebiopsy'>Rebiopsy</Label>
                        <AvInput type='select' name='rebiopsy' id='rebiopsy' required value={this.state.rebiopsy} onChange={(e) => this.showRebiopsy(e.target.value)}>
                            <option value="" selected>Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>                             
                        </AvInput>                      
                        <AvFeedback>Please select Rebiopsy!</AvFeedback>
                    </AvGroup>
                  </div> 
                  </>
                )}                                       
                {showRecurrenceMetaStases && (
                <div className="col-md-4">
                    <AvGroup>
                    <Label for='recurrenceifmetastasesifother'>If Other</Label>
                    <AvField placeholder="" name='recurrenceifmetastasesifother' id='recurrenceifmetastasesifother' value={this.state.recurrenceifmetastasesifother} onChange={(e) => this.setState({ recurrenceifmetastasesifother: e.target.value})} required />
                    <AvFeedback>Please enter the If Other!</AvFeedback>
                  </AvGroup>
                </div>
                )}  
                {showRebiopsy && (
                  <div className="col-md-4">
                  <Label for='type_of_rebiopsy'>Types of Rebiopsy</Label>
                    <AvCheckboxGroup name='type_of_rebiopsy' required >                      
                      {this.state.types_of_rebiopsy.map((item, i) =>
                        <div className="col-md-3"><AvCheckbox customInput label={item.text} value={item.text} onChange={this.onToggleReBiopsy.bind(this, i)} /></div>                      
                      )}                                                
                    </AvCheckboxGroup>
                  </div>
                )}              
                <div className="col-md-12"><hr /></div>
                <div className="col-md-4">
                <Label for='lostfollowup'>Lost to follow-up</Label>
                <AvRadioGroup name='lostfollowup' required value={this.state.lostfollowup} onChange={(e) => this.setState({ lostfollowup: e.target.value})} >
                  <div className="row">
                    <div className="col-md-6"><AvRadio customInput label='Yes' value='Yes' /></div>
                    <div className="col-md-6"><AvRadio customInput label='No' value='No' /></div>                    
                  </div>
                  <AvFeedback>Please select an Option!</AvFeedback>
                </AvRadioGroup>
                </div>
                <div className="col-md-4">
                  <AvGroup>
                      <Label for='dod'>Date of Death</Label><br />
                      <DatePicker peekNextMonth showMonthDropdown showYearDropdown dropdownMode= "scroll" className="form-control w-100 date-picker-block" dateFormat="dd-MM-yyyy" name="dod" id="dod" selected={this.state.startDateDOD} onSelect={this.handleSelect} onChange={this.handleChangeDOD} />  
                      <AvInput value={this.state.dateofdeath} name="dateofdeath" id="dateofdeath" style={{ color: "#fff !important"}} className="custom-date-input" onChange={(e) => this.setState({ dateofdeath: e.target.value})} required />                      
                      <AvFeedback>Please enter Date of Death!</AvFeedback>
                    </AvGroup>
                </div>
                <div className="col-md-4">
                  <AvGroup>
                      <Label for='dolf'>Date of Last Follow Up</Label><br />
                      <DatePicker peekNextMonth showMonthDropdown showYearDropdown dropdownMode= "scroll" className="form-control w-100 date-picker-block" dateFormat="dd-MM-yyyy" name="dolf" id="dolf" selected={this.state.startDateLFU} onSelect={this.handleSelect} onChange={this.handleChangeLFU} /> 
                      <AvInput value={this.state.dateoflastfollowup} name="dateoflastfollowup" id="dateoflastfollowup" style={{ color: "#fff !important"}} className="custom-date-input" onChange={(e) => this.setState({ dateoflastfollowup: e.target.value})} required />                        
                      <AvFeedback>Please enter Date of Last Follow Up!</AvFeedback>
                    </AvGroup>
                </div>
                <div className="col-md-12">
                <Button color='primary' type='submit' disabled={loading}>
                      {loading && (<svg width="30px" height="30px" viewBox="0 0 40 40" enable-background="new 0 0 40 40">
                  <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                  <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                    C22.32,8.481,24.301,9.057,26.013,10.047z">
                    <animateTransform attributeType="xml"
                      attributeName="transform"
                      type="rotate"
                      from="0 20 20"
                      to="360 20 20"
                      dur="0.5s"
                      repeatCount="indefinite"/>
                    </path>
                  </svg>)}
                {loading && <span> Please wait...</span>}
                {!loading && <span>Submit</span>}
                      </Button> 
                </div>
              </div>
              </AvForm>
              
            </CardBody>
          </Card>
          </Col>
          </Row>
          </Fragment>
          </div>
          </div>
          </div>
        
);      
}
}

export default withRouter(FollowUp);