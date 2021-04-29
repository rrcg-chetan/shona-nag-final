import React, { Fragment } from 'react';

import axios from 'axios';
import EditSideBar from '../../sidebar/EditSideBar';
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

class FollowUp extends React.Component {
  constructor(props){
    super(props);
    let param = this.props.location.pathname;
    const code = param.split("/").pop()   
    this.state = {            
        code: code,
        patients: [],  
        isLoading: true,
        errors: null,        
    };
    this.showRecurrence = this.showRecurrence.bind(this);
    this.handleChangeDOR = this.handleChangeDOR.bind(this);
    this.handleChangeDOD = this.handleChangeDOD.bind(this);
    this.handleChangeLFU = this.handleChangeLFU.bind(this);
    //this.handleInputAreaOfRecurrenceChange = this.handleInputAreaOfRecurrenceChange.bind(this);
    this.showRecurrenceMetaStases = this.showRecurrenceMetaStases.bind(this);
    /*this.handleInputMetastasesChange = this.handleInputMetastasesChange.bind(this);
    this.handleInputTreatmentChange = this.handleInputTreatmentChange.bind(this);      */  
    //console.log(code)
  }

  onToggle(index, e){
    let newItems = this.state.patientarea_of_recurrence.slice();
      newItems[index].checked = !newItems[index].checked
    this.setState({
      area_of_recurrence: newItems
  })
  console.log(this.state.area_of_recurrence)
}

onToggleMeta(index, e){
  let Items = this.state.patientif_metastases.slice();
    Items[index].checked = !Items[index].checked
  this.setState({
    if_metastases: Items
})
console.log(this.state.if_metastases)
}

componentDidMount() {
    axios.get(`/getfulldetails/${this.state.code}`)
    .then(response =>
        response.data.results.map(patient => ({
            recurrence: `${patient.recurrence}`, date_of_recurrence: `${patient.date_of_recurrence}`, area_of_recurrence: `${patient.area_of_recurrence}`, code: `${patient.code}`, if_metastases: `${patient.if_metastases}`, metastases_if_other: `${patient.metastases_if_other}`, detection_of_recurrence: `${patient.detection_of_recurrence}`, lost_to_follow_up: `${patient.lost_to_follow_up}`, date_of_death: `${patient.date_of_death}`, date_of_last_follow_up: `${patient.date_of_last_follow_up}`
        })),
        //console.log(this.patient)
    )
    .then(patients => {
        this.setState({
          patients,
          isLoading: false,
          recurrence: patients[0].recurrence,
          dateofrec: patients[0].date_of_recurrence,
          //ifmetastases: patients[0].if_metastases,
          patientarea_of_recurrence: JSON.parse(patients[0].area_of_recurrence),
          patientif_metastases: JSON.parse(patients[0].if_metastases),
          //aor: JSON.parse(patients[0].area_of_recurrence),
          //startDateDOR: new Date(this.state.dateofrec)
          /*othergermlinetesting: patients[0].genetic_testing_done,
          familyhavecancer: patients[0].family_have_cancer,
          typesofmetastases: patients[0].metastases_types,
          pregnancy: patients[0].pregnancy_associated_b_c
          whichrelative: patients[0].which_relative*/
        });
        //document.getElementById('metastases_types')[1].style.display='none';
        console.log(this.state.patients[0].recurrence)
        if(this.state.patients[0].recurrence === 'Yes'){
          this.setState({ showRecurrence: true })
        }
        if(this.state.ifmetastases === "Other"){
          this.setState({ showRecurrenceMetaStases: true })          
        }        
    })
    .catch(error => this.setState({ error, isLoading: false }));     
    }; 

    getAreaCheckedData() {
        return this.state.patientarea_of_recurrence.map((item, i) => {
          var check = item.checked;
          //console.log(check)
          if(check === true){
            //console.log(check);
            return (<div className="col-md-2"><AvCheckbox customInput label={item.text} value={item.text} onChange={this.onToggle.bind(this, i)} checked /></div>) 
          }else{
            return (<div className="col-md-2"><AvCheckbox customInput label={item.text} value={item.text} onChange={this.onToggle.bind(this, i)} /></div>) 
          }
        }    
        )
    }

    getMetaCheckedData() {
      return this.state.patientif_metastases.map((item, i) => {
        var check = item.checked;
        //console.log(check)
        if(check === true){
          //console.log(check);
          return (<div className="col-md-2"><AvCheckbox customInput label={item.text} value={item.text} onChange={this.onToggleMeta.bind(this, i)} checked /></div>) 
        }else{
          return (<div className="col-md-2"><AvCheckbox customInput label={item.text} value={item.text} onChange={this.onToggleMeta.bind(this, i)} /></div>) 
        }
      }    
      )
  }

  handleValidSubmit = (event, values) => {
    //alert(this.state.areaofrecurrence)
    //alert(this.state.code)
    const { history } = this.props;
   axios.post(`/updatepatientdetails`, { recurrence: this.state.recurrence, date_of_recurrence: this.state.date_of_recurrence, area_of_recurrence: JSON.stringify(this.state.area_of_recurrence), if_metastases: JSON.stringify(this.state.if_metastases), metastases_if_other: this.state.metastases_if_other, detection_of_recurrence: this.state.detection_of_recurrence, lost_to_follow_up: this.state.lost_to_follow_up, date_of_death: this.state.date_of_death, date_of_last_follow_up: this.state.date_of_last_follow_up, code: this.state.code })
    .then(function (response) {
        if(response.data.success === 'Sucessfully Updated!'){                     
            history.push(`/health-economics/edit/${response.data.value}`)
        }else{      
    }
  })
};

  handleChangeDOR(date) {
      
    this.setState({
      startDateDOR: date,
      date_of_recurrence: moment(date).format('DD-MM-YYYY'),  
    })
    document.getElementById("dateofrecurrence").style.color = "#fff"
    document.getElementById("dateofrecurrence").style.backgroundColor = "#fff"
    //document.getElementById("dateofrecurrence").value = this.state.startDateDOR
  }

  handleChangeDOD(date) {
    this.setState({
      startDateDOD: date,
      date_of_death: moment(date).format('DD-MM-YYYY')
    })
    document.getElementById("dateofdeath").style.color = "#fff"
    document.getElementById("dateofdeath").style.backgroundColor = "#fff"
  }

  handleChangeLFU(date) {
    this.setState({
      startDateLFU: date,
      date_of_last_follow_up: moment(date).format('DD-MM-YYYY')
    })
    document.getElementById("dateoflastfollowup").style.color = "#fff"
    document.getElementById("dateoflastfollowup").style.backgroundColor = "#fff"
  }
  
  showRecurrence(name) {
    if(document.getElementById("recurrence").value === "Yes"){
      this.setState({ showRecurrence: true, recurrence: name });   
      //this.state.recurrence = name 
    }else{
        this.setState({ showRecurrence: false, recurrence: name}); 
        //this.state.recurrence = name        
    }
  }

  showRecurrenceMetaStases(name) {
    if(document.getElementById("recurrenceifmetastases").value === "Other"){
      this.setState({ showRecurrenceMetaStases: true, recurrenceifmetastases: name });   
      //this.state.recurrenceifmetastases = name 
    }else{
        this.setState({ showRecurrenceMetaStases: false, recurrenceifmetastasesifother: "", recurrenceifmetastases: name }); 
        //this.state.recurrenceifmetastases = name        
    }
  }

  render(){          
    const { showRecurrence, showRecurrenceMetaStases, isLoading, patients } = this.state; 
    
return (
  <div>
        <EditSideBar   />
        <div className="content-wrapper animate__animated animate__fadeIn">
        <div className="app-content content overflow-hidden1">
        
          <Fragment>         
          <Row>
          <Col sm='12'>
          <Card>
            <CardHeader>
              <h1 className="animate__animated animate__fadeIn">Follow Up</h1>
            </CardHeader>
            <CardBody>
            {!isLoading ? (
                patients.map(patient => {
                    /*const {recurrence, date_of_recurrence, area_of_recurrence, code, if_metastases, metastases_if_other, detection_of_recurrence, lost_to_follow_up, date_of_death, date_of_last_follow_up } = patient;*/
                    return (
              <AvForm onValidSubmit={this.handleValidSubmit}
                      onInvalidSubmit={this.handleInvalidSubmit}>
              <div className="row">
                
                <div className="col-md-2">
                  <AvGroup>            
                    <Label for='recurrence'>Recurrence</Label>
                    <AvInput type='select' name='recurrence' id='recurrence' required value={patient.recurrence} onChange={(e) => this.showRecurrence(e.target.value)}>
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
                        <Label for='dateofrecurrence'>Date of Recurrence</Label><br />
                        <DatePicker peekNextMonth showMonthDropdown showYearDropdown dropdownMode= "scroll" className="form-control date-picker-block w-100" dateFormat="dd-MM-yyyy" name="date_of_recurrence" id="date_of_recurrence" selected={ this.state.startDateDOR } onSelect={this.handleSelect} onChange={this.handleChangeDOR} /> 
                        <AvInput type="text" value={patient.date_of_recurrence} name="dateofrecurrence" id="dateofrecurrence" className="custom-date-input" onChange={(e) => this.setState({ date_of_recurrence: e.target.value})} />
                        <AvFeedback>Please enter Date of Recurrence!</AvFeedback>
                      </AvGroup>
                  </div>
                  <div className="col-md-8">
                  <Label for='areofrecurrence'>Area of Recurrence</Label>                  
                  <AvCheckboxGroup name='areofrecurrence' >
                    <div className="row">
                        {this.getAreaCheckedData()}
                    </div>
                  </AvCheckboxGroup>
                  </div> 
                  <div className="col-md-4">
                    <AvGroup>            
                        <Label for='detectionofrecurrence'>Detection of recurrence</Label>
                        <AvInput type='select' name='detectionofrecurrence' id='detectionofrecurrence' required value={patient.detection_of_recurrence} onChange={(e) => this.setState({ detection_of_recurrence: e.target.value })}>
                            <option value="" selected>Select</option>
                            <option value="Surveillance">Surveillance</option>
                            <option value="Symptom">Symptom</option> 
                            <option value="Not Known">Not Known</option>                         
                        </AvInput>                      
                        <AvFeedback>Please select Detection of recurrence!</AvFeedback>
                    </AvGroup>
                    </div>
                    <div className="col-md-8">
                      <Label for='recurrenceifmetastases'>If Metastases</Label>
                      <AvCheckboxGroup name='recurrenceifmetastases' >
                        <div className="row">
                            {this.getMetaCheckedData()}
                        </div>
                      </AvCheckboxGroup>                  
                    </div>                     
                  </>
                )}                                       
                {showRecurrenceMetaStases && (
                <div className="col-md-4">
                    <AvGroup>
                    <Label for='recurrenceifmetastasesifother'>If Other</Label>
                    <AvField placeholder="" name='recurrenceifmetastasesifother' id='recurrenceifmetastasesifother' value={patient.metastases_if_other} onChange={(e) => this.setState({ metastases_if_other: e.target.value})} required />
                    <AvFeedback>Please enter the If Other!</AvFeedback>
                  </AvGroup>
                </div>
                )}     
                <div className="col-md-12"><hr /></div>
                <div className="col-md-4">
                <Label for='lostfollowup'>Lost to follow-up</Label>
                <AvRadioGroup name='lostfollowup' required value={patient.lost_to_follow_up} onChange={(e) => this.setState({ lost_to_follow_up: e.target.value})} >
                  <div className="row">
                    <div className="col-md-6"><AvRadio customInput label='Yes' value='Yes' /></div>
                    <div className="col-md-6"><AvRadio customInput label='No' value='No' /></div>                    
                  </div>
                  <AvFeedback>Please select an Option!</AvFeedback>
                </AvRadioGroup>
                </div>
                <div className="col-md-4">
                  <AvGroup>
                      <Label for='dateofdeath'>Date of Death</Label><br />
                      <DatePicker peekNextMonth showMonthDropdown showYearDropdown dropdownMode= "scroll" className="form-control date-picker-block w-100" dateFormat="dd-MM-yyyy" name="dod" id="dod" selected={this.state.startDateDOD} onSelect={this.handleSelect} onChange={this.handleChangeDOD} required />    
                      <AvInput type="text" value={patient.date_of_death} name="dateofdeath" id="dateofdeath" className="custom-date-input" onChange={(e) => this.setState({ date_of_death: e.target.value})} />                    
                      <AvFeedback>Please enter Date of Death!</AvFeedback>
                    </AvGroup>
                </div>
                <div className="col-md-4">
                  <AvGroup>
                      <Label for='dateoflastfollowup'>Date of Last Follow Up</Label><br />
                      <DatePicker peekNextMonth showMonthDropdown showYearDropdown dropdownMode= "scroll" className="form-control date-picker-block w-100" dateFormat="dd-MM-yyyy" name="dolf" id="dolf" selected={this.state.startDateLFU} onSelect={this.handleSelect} onChange={this.handleChangeLFU} required />       
                      <AvInput type="text" value={patient.date_of_last_follow_up} name="dateoflastfollowup" id="dateoflastfollowup" className="custom-date-input" onChange={(e) => this.setState({ date_of_last_follow_up: e.target.value })} />                 
                      <AvFeedback>Please enter Date of Last Follow Up!</AvFeedback>
                    </AvGroup>
                </div>
                <div className="col-md-12">
                <Button color='primary' type='submit'>
                  Submit
                </Button>              
                </div>
              </div>
              </AvForm>
              );
            })
            ) : (
              <div className="center"><svg width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40">
                  <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                    C22.32,8.481,24.301,9.057,26.013,10.047z">
                    <animateTransform attributeType="xml"
                      attributeName="transform"
                      type="rotate"
                      from="0 20 20"
                      to="360 20 20"
                      dur="0.5s"
                      repeatCount="indefinite"/>
                    </path>
                  </svg></div>
            )}
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