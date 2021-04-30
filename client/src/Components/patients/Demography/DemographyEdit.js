import React, { Fragment, PureComponent } from 'react';
//import ReactDOM from 'react-dom';
//import NavBar from '../Components/navbar/NavBar';
import EditSideBar from '../../sidebar/EditSideBar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Redirect, withRouter} from 'react-router-dom'
import moment from 'moment'

import '../../mainstyle.css';
import '../../animate.css';
import '../../vertical-menu.css';
import '../../perfect-scrollbar.css';

//import Flatpickr from 'react-flatpickr'
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

      //const Demography = () => {       
      class DemographyEdit extends PureComponent {
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
          this.showProComponent = this.showProComponent.bind(this);
          this.showEthComponent = this.showEthComponent.bind(this);
          this.showCancerComponent = this.showCancerComponent.bind(this);
          this.hideCancerComponent = this.hideCancerComponent.bind(this);
          this.showOtherCancerComponent = this.showOtherCancerComponent.bind(this);
          this.hideOtherCancerComponent = this.hideOtherCancerComponent.bind(this);
          this.showMorbiditiesComponent = this.showMorbiditiesComponent.bind(this);
          this.hideMorbiditiesComponent = this.hideMorbiditiesComponent.bind(this);
          this.changeHeight = this.changeHeight.bind(this);
          this.changeWeight = this.changeWeight.bind(this);
          this.calculateBMI = this.calculateBMI.bind(this);
          this.calculateBSA = this.calculateBSA.bind(this);
          //this.onSubmit = this.onSubmit.bind(this)
          this.handleChange = this.handleChange.bind(this);
          this.sendPatientDemographyDetails = this.sendPatientDemographyDetails.bind(this);
          this.handleChangeDOD = this.handleChangeDOD.bind(this);
          //this.getDemographyDetails = this.getDemographyDetails.bind(this);          
          
        }

        componentDidMount() {          

         

            axios.get(`/getfulldetails/${this.state.code}`)
            .then(response =>
                response.data.results.map(patient => ({
                    patient_name: `${patient.patient_name}`, city: `${patient.city}`, country: `${patient.country}`, hospital_id: `${patient.hospital_id}`, patients_initial: `${patient.patients_initial}`, patients_dob: `${patient.patients_dob}`, age_of_diagnosis: `${patient.age_of_diagnosis}`, date_of_diagnosis_of_bc: `${patient.date_of_diagnosis_of_bc}`, paraffin_blocks: `${patient.paraffin_blocks}`, profession: `${patient.profession}`, profession_if_other: `${patient.profession_if_other}`, indian: `${patient.indian}`, ethnicity: `${patient.ethnicity}`, other_ethnicity: `${patient.ethnicity_if_other}`, patients_height: `${patient.patients_height}`, patients_weight: `${patient.patients_weight}`, patients_bmi: `${patient.patients_bmi}`, bsa: `${patient.bsa}`, family_have_cancer: `${patient.family_have_cancer}`, which_relative: `${patient.which_relative}`, type_other_family_name: `${patient.type_other_family_name}`, type_of_cancer: `${patient.type_of_cancer}`, age_at_diagnosis: `${patient.age_at_diagnosis}`, presenting_symptoms: `${patient.presenting_symptoms}`, family_income_type: `${patient.family_income_type}`, family_income_amount: `${patient.family_income_amount}`, co_morbidities: `${patient.co_morbidities}`, co_morbidities_if_other: `${patient.co_morbidities_if_other}`, tobacco_addiction: `${patient.tobacco_addiction}`, tobacco_addiction_type: `${patient.tobacco_addiction_type}`, tobacco_no_of_years: `${patient.tobacco_no_of_years}`, alcohol_addiction: `${patient.alcohol_addiction}`, no_of_peg_per_day: `${patient.no_of_peg_per_day}`, alcohol_no_of_years: `${patient.alcohol_no_of_years}`, diet: `${patient.diet}`, menstrual_history: `${patient.menstrual_history}`, menstrual_history_if_irregular: `${patient.menstrual_history_if_irregular}`, reproductivew_history_gravida: `${patient.reproductivew_history_gravida}`, reproductivew_history_para: `${patient.reproductivew_history_para}`, reproductivew_history_abortion: `${patient.reproductivew_history_abortion}`, reproductivew_history_age_of_menarcy: `${patient.reproductivew_history_age_of_menarcy}`, reproductivew_history_age_of_menopause: `${patient.reproductivew_history_age_of_menopause}`, reproductivew_history_hrt_use: `${patient.reproductivew_history_hrt_use}`, reproductivew_history_hrt_use_if_yes: `${patient.reproductivew_history_hrt_use_if_yes}`, reproductivew_history_no_of_years_used: `${patient.reproductivew_history_no_of_years_used}`
                })),
                //console.log(this.patient)
            )
            .then(patients => {
                this.setState({
                  patients,
                  isLoading: false,
                  otherprofession: patients[0].profession,
                  otherethnicity: patients[0].ethnicity,
                  othercomorbidities: patients[0].co_morbidities,
                  familyhavecancer: patients[0].family_have_cancer,
                  whichrelative: patients[0].which_relative,
                  india: patients[0].indian,
                  ethnicityifother: patients[0].ethnicity_if_other,
                  pmenstrual_history:patients[0].menstrual_history,
                  patientmenstrual_history_if_irregular: JSON.parse(patients[0].menstrual_history_if_irregular),
                  tobacco: patients[0].tobacco_addiction,
                  alcohol: patients[0].alcohol_addiction,
                  hrt: patients[0].reproductivew_history_hrt_use,
                });
                console.log(this.state.patientmenstrual_history_if_irregular)
                if(this.state.otherprofession === 'Other'){
                  this.setState({ showProfession: true })
                }
                if(this.state.otherethnicity === 'Other'){
                  this.setState({ showEthnicity: true })
                }
                if(this.state.familyhavecancer === 'Yes'){
                  this.setState({ showCancer: true })
                }
                if(this.state.othercomorbidities === 'Other'){
                  this.setState({ showMorbidities: true })
                }
                if(this.state.whichrelative === 'Other'){
                  this.setState({ showOtherCancer: true })
                }
                if(this.state.india === 'Indian'){
                  this.setState({ Indian: true })
                }
                if(this.state.ethnicityifother === 'Other'){
                  this.setState({ showEthnicity: true })
                }
                if(this.state.pmenstrual_history === 'Irregular'){
                  this.setState({ showMenstrualHistory: true })
                }
                if(this.state.tobacco === 'Yes'){
                  this.setState({ showTobaccoAddiction: true })
                }
                if(this.state.alcohol === 'Yes'){
                  this.setState({ showAlcoholAddiction: true })
                }
                if(this.state.alcohol === 'Yes'){
                  this.setState({ showHRTuse: true })
                }
            })
            .catch(error => this.setState({ error, isLoading: false })); 
            
        };        
        
        sendPatientDemographyDetails = e => {   
          const getUser = () => {
              const userStr = localStorage.getItem("users");
              if(userStr) return JSON.parse(userStr);
              else return null
          }
          const user = getUser();
          const { history } = this.props;          
          const name_of_institution = user.institution
          const userid = user.userid
          const hospital_id = user.hospitalid  
          axios.post(`/updatepatientdetails`, { patient_name: this.state.patient_name, city: this.state.city, country: this.state.country, hospital_id: hospital_id, patients_initial: this.state.patients_initial, patients_dob: this.state.patients_dob, age_of_diagnosis: this.state.age_of_diagnosis, date_of_diagnosis_of_bc: this.state.date_of_diagnosis_of_bc, paraffin_blocks: this.state.paraffin_blocks, profession: this.state.profession, profession_if_other: this.state.profession_if_other, indian: this.state.indian, ethnicity: this.state.ethnicity, ethnicity_if_other: this.state.other_ethnicity, patients_height: this.state.height, patients_weight: this.state.weight, patients_bmi: this.state.bmivalue, bmi: this.state.bsavalue, family_have_cancer: this.state.family_have_cancer, which_relative: this.state.which_relative, type_other_family_name: this.state.type_other_family_name, type_of_cancer: this.state.type_of_cancer, age_at_diagnosis: this.state.age_at_diagnosis, presenting_symptoms: this.state.presenting_symptoms, family_income_type: this.state.family_income_type, family_income_amount: this.state.family_income_amount, co_morbidities: this.state.co_morbidities, co_morbidities_if_other: this.state.co_morbidities_if_other, code: this.state.code, name_of_institution: name_of_institution, submited_by: userid, tobacco_addiction: this.state.tobacco_addiction, tobacco_addiction_type: this.state.tobacco_addiction_type, tobacco_no_of_years: this.state.tobacco_no_of_years, alcohol_addiction: this.state.alcohol_addiction, no_of_peg_per_day: this.state.no_of_peg_per_day, alcohol_no_of_years: this.state.alcohol_no_of_years, diet: this.state.diet, menstrual_history: this.state.menstrual_history, menstrual_history_if_irregular: JSON.stringify(this.state.menstrual_history_if_irregular), reproductivew_history_gravida: this.state.reproductivew_history_gravida, reproductivew_history_para: this.state.reproductivew_history_para, reproductivew_history_abortion: this.state.reproductivew_history_abortion, reproductivew_history_age_of_menarcy: this.state.reproductivew_history_age_of_menarcy, reproductivew_history_age_of_menopause: this.state.reproductivew_history_age_of_menopause, reproductivew_history_hrt_use: this.state.reproductivew_history_hrt_use, reproductivew_history_hrt_use_if_yes: this.state.reproductivew_history_hrt_use_if_yes, reproductivew_history_no_of_years_used: this.state.reproductivew_history_no_of_years_used  })
          .then(function (response) {
          //console.log(JSON.stringify(response.data));
          if(response.data.success === 'Sucessfully Updated!'){            
            //let history = useHistory();
            //const { history } = this.props;
            //this.context.history.push(`/initial-presentation/${code}`);
            history.push(`/initial-presentation/edit/${response.data.value}`)
          }else{
            
          }
        })
        };

        onToggle(index, e){
          let newItems = this.state.patientmenstrual_history_if_irregular.slice();
          newItems[index].checked = !newItems[index].checked
          this.setState({
            menstrual_history_if_irregular: newItems
          })
          console.log(this.state.menstrual_history_if_irregular)
        }
        
        getCheckedData() {
          return this.state.patientmenstrual_history_if_irregular.map((item, i) => {
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
        //if(document.getElementById("profession").value === "Other")
        /*redirectToInitial(){
          const { history } = this.props;
          if(history) history.push(`/initial-presentation/${code}`);
         }*/

        handleChange(date) {
          this.setState({
            startDate: date,
            patients_dob: moment(date).format('DD-MM-YYYY'), 
            
          })
          document.getElementById("dob").style.backgroundColor = "white"
          //document.getElementById("patients_dob").value = this.state.startDate   
        }

        handleChangeDOD(date) {
          this.setState({
            startDateDOD: date,
            date_of_diagnosis_of_bc: moment(date).format('DD-MM-YYYY'),        
          })
          document.getElementById("dtofdiag").style.backgroundColor = "white"
        }

        /*setStartDate(e){
          this.setState({ startDate: e.target.value})
        }*/

        showProComponent(name) {
          switch (name) {
            case "showProfession":
              this.setState({ showProfession: true, required: false });              
              break;
default:            
          }
        }        
        hideProComponent(name) {
          switch (name) {
            case "hideProfession":
              this.setState({ showProfession: false, required: true });
              break;
default:            
          }
        } 
        
        showIndComponent(name) {
          console.log(name)
          switch (name) {
            case "Indian":
              this.setState({ Indian: true, required: true });
              break;
default:            
          }
        }

        showEthComponent(name) {
          switch (name) {
            case "showEthnicity":
              this.setState({ showEthnicity: true, required: false });
              break;
default:            
          }
        }
        hideEthComponent(name) {
          switch (name) {
            case "hideEthnicity":
              this.setState({ showEthnicity: false, othere_thnicity: "", required: true });              
              break;
default:            
          }
        }
        
        showCancerComponent(name) {
          switch (name) {
            case "showCancer":
              this.setState({ showCancer: true, showOtherCancer: false });
              break;
default:            
          }
        }
        hideCancerComponent(name) {
          switch (name) {
            case "hideCancer":
              this.setState({ showCancer: false, showOtherCancer: false });              
              break;
default:            
          }
        }

        showOtherCancerComponent(name) {
          switch (name) {
            case "showOtherCancer":
              this.setState({ showOtherCancer: true });
              break;
default:            
          }
        }
        hideOtherCancerComponent(name) {
          switch (name) {
            case "hideOtherCancer":
              this.setState({ showOtherCancer: false });              
              break;
default:            
          }
        }

        showMorbiditiesComponent(name) {
          switch (name) {            
            case "showMorbidities":
              this.setState({ showMorbidities: true });
              break;
default:            
          }
        }
        hideMorbiditiesComponent(name) {
          switch (name) {
            case "hideMorbidities":
              this.setState({ showMorbidities: false });              
              break;
default:            
          }
        }

        showTobaccoAddiction(name) {
          if(document.getElementById("tobaccoaddiction").value === "Yes"){
            this.setState({ showTobaccoAddiction: true, tobacco_addiction: name });   
            //this.state.tobacco_addiction = name 
          }else{
              this.setState({ showTobaccoAddiction: false, tobacco_addiction_type: "", tobacco_no_of_years: "", tobacco_addiction: name }); 
              //this.state.tobacco_addiction = name        
          }
        }

        showAlcoholAddiction(name) {
          if(document.getElementById("alcoholaddiction").value === "Yes"){
            this.setState({ showAlcoholAddiction: true, alcohol_addiction: name });   
            //this.state.alcohol_addiction = name 
          }else{
              this.setState({ showAlcoholAddiction: false, no_of_peg_per_day: "", alcohol_no_of_years: "", alcohol_addiction: name }); 
              //this.state.alcohol_addiction = name        
          }
        }

        showMenstrualHistory(name) {
          if(document.getElementById("menstrualhistory").value === "Irregular"){
            this.setState({ showMenstrualHistory: true, menstrual_history: name });   
            //this.state.menstrual_history = name 
          }else{
              this.setState({ showMenstrualHistory: false, menstrual_history: name, patientmenstrual_history_if_irregular: [
                { text: 'Scanty', checked: false },
                { text: 'Moderate', checked: false },
                { text: 'Severe', checked: false },
                { text: 'Painless', checked: false },      
                { text: 'Painful', checked: false },                     
              ], }); 
              //this.state.menstrual_history = name        
          }          
        }

        showHRTuse(name) {
          if(document.getElementById("hrtuse").value === "Yes"){
            this.setState({ showHRTuse: true, reproductivew_history_hrt_use: name });   
            //this.state.reproductivew_history_hrt_use = name 
          }else{
              this.setState({ showHRTuse: false, reproductivew_history_hrt_use_if_yes: "", reproductivew_history_hrt_use: name }); 
              //this.state.reproductivew_history_hrt_use = name        
          }
        }

        changeHeight(e) {
          document.getElementById('bmi').value= '';
          var newHeight = +(e.target.value)
          this.setState({
              height: newHeight,
              bmivalue: parseFloat((this.state.weight / Math.pow(newHeight, 2))*10000).toFixed(2),
              bsavalue: parseFloat(Math.sqrt((this.state.weight * Math.pow(newHeight, 2)) / 3600)).toFixed(2),
          });          
        }
        
        changeWeight(e) {
          document.getElementById('bmi').value= '';
          var newWeight = +(e.target.value)
          this.setState({ bmivalue: '' })
          this.setState({
              weight: newWeight,
              bmivalue: parseFloat((newWeight / Math.pow(this.state.height, 2))*10000).toFixed(2),
              bsavalue: parseFloat(Math.sqrt((newWeight * Math.pow(this.state.height, 2)) / 3600)).toFixed(2),
          });          
        }

        calculateBMI(e){
          var newWeight = +(this.state.weight)
          var newHeight = +(this.state.height)
          this.setState({            
            bmivalue: parseFloat((newWeight / Math.pow(newHeight, 2))*10000).toFixed(2),
            value: this.state.bmivalue
          });          
          //console.log(this.state.bmivalue);
        }

        calculateBSA(e){
          var newWeight = +(this.state.weight)
          var newHeight = +(this.state.height)
          this.setState({            
            bsavalue: parseFloat(Math.sqrt((newWeight * newHeight) / 3600)).toFixed(2),
            value: this.state.bsavalue
          });          
          //console.log(this.state.bmivalue);
        }

        getUser = () => {
          const userStr = localStorage.getItem("users");
          if(userStr) return JSON.parse(userStr);
          else return null
      }  

        render(){          
          const { showProfession, showEthnicity, showCancer, showOtherCancer, showMorbidities, showTobaccoAddiction, showAlcoholAddiction, showMenstrualHistory, showHRTuse, Indian, isLoading, patients } = this.state;          
          const user = this.getUser();    
          if(user === "null" || user === null || user === '' || user === undefined){
            return <Redirect from="*" to='/login'></Redirect>
          }
      return (
        <div>
            <EditSideBar   />
              <div className="content-wrapper animate__animated animate__fadeIn">
              <div className="app-content content overflow-hidden">
              
                <Fragment>
                
                <Row>
                <Col sm='12'>
                <Card>
                  <CardHeader>
                    <h1 className="animate__animated animate__fadeIn">Patient's Demography</h1>
                  </CardHeader>
                  <CardBody>
                  {!isLoading ? (
                    patients.map(patient => {
                    /*const { patient_name, city, country, hospital_id, patients_initial, patients_dob, age_of_diagnosis, date_of_diagnosis_of_bc, paraffin_blocks, profession, profession_if_other, ethnicity, other_ethnicity, patients_height, patients_weight, patients_bmi, bsa, family_have_cancer, which_relative, type_of_cancer, age_at_diagnosis, presenting_symptoms, family_income_type, family_income_amount, co_morbidities, co_morbidities_if_other, tobacco_addiction, tobacco_addiction_type, tobacco_no_of_years, alcohol_addiction, no_of_peg_per_day, alcohol_no_of_years, diet, menstrual_history, menstrual_history_if_irregular, reproductivew_history_gravida, reproductivew_history_para, reproductivew_history_abortion, reproductivew_history_age_of_menarcy, reproductivew_history_age_of_menopause, reproductivew_history_hrt_use, reproductivew_history_hrt_use_if_yes, reproductivew_history_no_of_years_used, isLoading} = patient;*/
                    return (
                    <AvForm  onSubmit= {() => this.sendPatientDemographyDetails()}>
                    <div className="row">
                    <div className="col-md-4">
                      <AvGroup>            
                        <Label for='name'>Name of Patient</Label>
                        <AvInput name='name' value={patient.patient_name} onChange={(e) => this.setState({ patient_name: e.target.value})} id='name' required />
                        <AvFeedback>Please enter a Patient's name!</AvFeedback>            
                      </AvGroup>
                      </div>
                      <div className="col-md-4">
                      <AvGroup>            
                        <Label for='city'>City</Label>
                        <AvInput name='city' id='city' required value={patient.city} onChange={(e) => this.setState({ city: e.target.value})} />
                        <AvFeedback>Please enter a valid city name!</AvFeedback>            
                      </AvGroup>
                      </div>
                      <div className="col-md-4">
                      <AvGroup>            
                        <Label for='country'>Country</Label>
                        <AvInput name='country' id='country' required value={patient.country} onChange={(e) => this.setState({ country: e.target.value})} />
                        <AvFeedback>Please enter a Country!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-4">
                      <AvGroup>            
                        <Label for='hospitalid'>Hospital ID</Label>
                        <AvField name='hospitalid' disabled id='hospitalid' required value={patient.hospital_id} onChange={(e) => this.setState({ hospital_id: e.target.value})}  />
                        <AvFeedback>Please enter the Hospital ID!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-4">
                      <AvGroup>            
                        <Label for='patientinitial'>Patient's Initial</Label>
                        <AvField name='patientinitial' id='patientinitial' required value={patient.patients_initial} onChange={(e) => this.setState({ patients_initial: e.target.value})}  />
                        <AvFeedback>Please enter the Patient's Initial!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-4">
                      <AvGroup>
                        <Label for='dateofbirth'>Date of Birth</Label><br />
                        <DatePicker peekNextMonth showMonthDropdown showYearDropdown dropdownMode= "scroll" className="form-control date-picker-block w-100" dateFormat="dd-MM-yyyy" name="dob" id="dob" selected={this.state.startDate} onSelect={this.handleSelect} onChange={this.handleChange} />
                        <AvInput value={patient.patients_dob} name="dateofbirth" id="dateofbirth" style={{ color: "#000 !important" }} className="custom-date-input" onChange={(e) => this.setState({ patients_dob: e.target.value})} />
                        <AvFeedback>Please enter your DOB!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-4">
                      <AvGroup>
                        <Label for='ageofdiagnosis'>Age of Diagnosis</Label>
                        <AvInput name='ageofdiagnosis' id='ageofdiagnosis' required value={patient.age_of_diagnosis} onChange={(e) => this.setState({ age_of_diagnosis: e.target.value})}  />
                        <AvFeedback>Please enter Age of Diagnosis!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-4">
                      <AvGroup>
                        <Label for='dateofdiagnosis'>Date of diagnosis of breast cancer</Label><br />
                        <DatePicker peekNextMonth showMonthDropdown showYearDropdown dropdownMode= "scroll" className="form-control date-picker-block w-100" dateFormat="dd-MM-yyyy" name="dtofdiag" id="dtofdiag" selected={this.state.startDateDOD} onSelect={this.handleSelect} onChange={this.handleChangeDOD} />
                        <AvInput value={patient.date_of_diagnosis_of_bc} name="dateofdiagnosis" id="dateofdiagnosis" className="custom-date-input" onChange={(e) => this.setState({ date_of_diagnosis_of_bc: e.target.value})} />
                        <AvFeedback>Please enter your Date of diagnosis of breast cancer!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-12"></div>
                      <div className="col-md-4">
                      <Label for='paraffin'>Paraffin blocks available</Label>
                      <AvRadioGroup name='paraffin' required value={patient.paraffin_blocks} onChange={(e) => this.setState({ paraffin_blocks: e.target.value})} >
                        <div className="row">
                          <div className="col-md-2"><AvRadio customInput label='Yes' value='Yes' /></div>
                          <div className="col-md-2"><AvRadio customInput label='No' value='No' /></div>
                          <div className="col-md-8"><AvRadio customInput label='Not Available' value='Not Available' /></div>
                        </div>
                      </AvRadioGroup>
                      </div>   
                      <div className="col-md-6">
                      <Label for='profession'>Profession</Label>
                      <AvRadioGroup name='profession' id="profession" required value={patient.profession} onChange={(e) => this.setState({ profession: e.target.value})} >
                        <div className="row">
                          <div className="col-md-2"><AvRadio customInput label='Doctor' value='Doctor' onClick={ () => this.hideProComponent("hideProfession") } /></div>
                          <div className="col-md-2"><AvRadio customInput label='Nurse' value='Nurse' onClick={ () => this.hideProComponent("hideProfession") } /></div>
                          <div className="col-md-2"><AvRadio customInput label='Teacher' value='Teacher' onClick={ () => this.hideProComponent("hideProfession") } /></div>
                          <div className="col-md-3"><AvRadio customInput label='Home Maker' value='Home Maker' onClick={ () => this.hideProComponent("hideProfession") } /></div>
                          <div className="col-md-2"><AvRadio customInput label='Other' value='Other' onClick={ () => this.showProComponent("showProfession") } /></div>                          
                        </div>
                      </AvRadioGroup>
                      </div>    
                      {showProfession && (
                            <div className="col-md-5">
                            <AvGroup>
                              <Label for='otherprofession'>If Other Please mention Profession</Label>
                              <AvField name='otherprofession' id='otherprofession' value={patient.profession_if_other} onChange={(e) => this.setState({ profession_if_other: e.target.value})}  />
                              <AvFeedback>Please enter the If Other Please mention Profession!</AvFeedback>
                            </AvGroup>
                            </div>
                          )}
                      <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-12"><Label for='ethnicity'>Ethnicity</Label></div>
                        <div className="col-md-1">
                          <AvRadioGroup name='indian' value={patient.indian} required onChange={(e) => this.setState({ indian: e.target.value})} >
                            <div className="row">
                              <div className="col-md-12"><AvRadio customInput label='Indian' value='Indian' onClick={ () => this.showIndComponent("Indian") } /></div>                                                                             
                            </div>
                          </AvRadioGroup>
                        </div>
                        <div className="col-md-8">
                          <AvRadioGroup name='ethnicity' value={patient.ethnicity} required onChange={(e) => this.setState({ ethnicity: e.target.value})} >
                            {Indian && (
                              <>
                                <div className="col-md-12">
                                <div className="row">
                                <div className="col-md-2"><AvRadio customInput label='Hindu' value='Hindu' onChange={ () => this.hideEthComponent("hideEthnicity") } /></div>
                                <div className="col-md-2"><AvRadio customInput label='Muslim' value='Muslim' onChange={ () => this.hideEthComponent("hideEthnicity") } /></div>
                                <div className="col-md-2"><AvRadio customInput label='Christian' value='Christian' onChange={ () => this.hideEthComponent("hideEthnicity") } /></div>
                                <div className="col-md-2"><AvRadio customInput label='Parsi' value='Parsi' onChange={ () => this.hideEthComponent("hideEthnicity") } /></div>
                                <div className="col-md-2"><AvRadio customInput label='Other' value='Other' onChange={ () => this.showEthComponent("showEthnicity") } /></div>
                                </div>
                                </div>
                              </>
                            )} 
                          </AvRadioGroup>
                        </div>
                      </div>
                      </div>                          
                      {showEthnicity && (
                        <div className="col-md-12">
                        <AvGroup>
                          <Label for='otherethnicity'>If Other Please mention Ethnicity</Label>
                          <AvField name='otherethnicity' id='otherethnicity' value={patient.other_ethnicity} onChange={(e) => this.setState({ other_ethnicity: e.target.value})}  />
                          <AvFeedback>Please enter the If Other Please mention Ethnicity!</AvFeedback>
                        </AvGroup>
                        </div>
                      )}
                      <div className="col-md-3">
                      <AvGroup>            
                        <Label for='height'>Height</Label>
                        <AvInput type="number" name='height' id='height' required value={patient.patients_height} onChange={(e) => this.setState({ height: e.target.value})}  onBlur={this.changeHeight} />
                        <AvFeedback>Please enter a Height in CMS!</AvFeedback>            
                      </AvGroup>
                      </div>
                      <div className="col-md-3">
                      <AvGroup>            
                        <Label for='weight'>weight</Label>
                        <AvInput type="number" name='weight' id='weight' required value={patient.patients_weight} onChange={(e) => this.setState({ weight: e.target.value})}  onBlur={this.changeWeight} />
                        <AvFeedback>Please enter weight in kg!</AvFeedback>            
                      </AvGroup>
                      </div>
                      <div className="col-md-3">
                      <AvGroup>            
                        <Label for='bmi'>BMI</Label>
                        <AvInput name='bmi' id='bmi' required value={patient.patients_bmi} onChange={(e) => this.setState({ bmivalue: e.target.value})}  onBlur={this.calculateBMI} />                        
                      </AvGroup>
                      </div>
                      <div className="col-md-3">
                      <AvGroup>            
                        <Label for='bsa'>BSA</Label>
                        <AvInput name='bsa' id='bsa' value={patient.bsa} required onChange={(e) => this.setState({ bsa: e.target.value})}  onBlur={this.calculateBSA} />                        
                      </AvGroup>
                      </div>
                      <div className="col-md-2">
                      <Label for='hocancer'>Family h/o cancer</Label>
                      <AvRadioGroup name='hocancer' required value={patient.family_have_cancer} onChange={(e) => this.setState({ family_have_cancer: e.target.value})} >
                        <div className="row">
                          <div className="col-md-6"><AvRadio customInput label='Yes' value='Yes' onClick={ () => this.showCancerComponent("showCancer") } /></div>
                          <div className="col-md-6"><AvRadio customInput label='No' value='No' onClick={ () => this.hideCancerComponent("hideCancer") } /></div>                          
                        </div>
                      </AvRadioGroup>
                      </div>
                      {showCancer && (
                        <div className="col-md-7">
                        <Label for='hascancer'>Which relative</Label>
                        <AvRadioGroup name='hascancer' value={patient.which_relative} onChange={(e) => this.setState({ which_relative: e.target.value})} >
                          <div className="row">
                            <div className="col-md-2"><AvRadio customInput label='Mother' value='Mother' onClick={ () => this.hideOtherCancerComponent("hideOtherCancer") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='Father' value='Father' onClick={ () => this.hideOtherCancerComponent("hideOtherCancer") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='Sister' value='Sister' onClick={ () => this.hideOtherCancerComponent("hideOtherCancer") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='Brother' value='Brother' onClick={ () => this.hideOtherCancerComponent("hideOtherCancer") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='Other' value='Other' onClick={ () => this.showOtherCancerComponent("showOtherCancer") } /></div>                          
                          </div>
                        </AvRadioGroup>
                        </div>  
                      )}
                      {showOtherCancer && (
                            <div className="col-md-3">
                            <AvGroup>
                              <Label for='otherfamily'>If Other Please Mention Relation</Label>
                              <AvField name='otherfamily' id='otherfamily' value={patient.type_other_family_name} onChange={(e) => this.setState({ type_other_family_name: e.target.value})}  />
                              <AvFeedback>Please enter the If Other Please Mention Relation!</AvFeedback>
                            </AvGroup>
                            </div>
                          )}
                      <div className="col-md-12"></div>
                      <div className="col-md-3">
                      <AvGroup>            
                        <Label for='typeofcancer'>Type of Cancer</Label>
                        <AvField name='typeofcancer' id='typeofcancer' required value={patient.type_of_cancer} onChange={(e) => this.setState({ type_of_cancer: e.target.value})}  />
                        <AvFeedback>Please enter the Type of Cancer!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-3">
                      <AvGroup>            
                        <Label for='diagnosisofrelativeage'>Age at diagnosis of relative</Label>
                        <AvField name='diagnosisofrelativeage' id='diagnosisofrelativeage' required value={patient.age_at_diagnosis} onChange={(e) => this.setState({ age_at_diagnosis: e.target.value})}  />
                        <AvFeedback>Please enter the Age at diagnosis of relative!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <Label for='presentsymptoms'>Presenting Symptom</Label>
                      <AvRadioGroup name='presentsymptoms' required value={patient.presenting_symptoms} onChange={(e) => this.setState({ presenting_symptoms: e.target.value})} >
                        <div className="row">
                          <div className="col-md-6"><AvRadio name='presentsymptoms' customInput label='Screen Detected' value='Screen Detected'  /></div>
                          <div className="col-md-6"><AvRadio name='presentsymptoms' customInput label='Symptom Detected' value='Symptom Detected'    /></div>                          
                        </div>
                      </AvRadioGroup>
                      </div>
                      <div className="col-md-3">
                      <AvGroup>            
                        <Label for='monthlyfamilyincome'>Monthly Family Income</Label>
                        <AvInput type='select' name='monthlyfamilyincome' id='monthlyfamilyincome'required value={patient.family_income_type} onChange={(e) => this.setState({ family_income_type: e.target.value})}>
                            <option value="" selected>Select</option>
                            <option value="INR">INR</option>
                            <option value="USD">USD</option>                            
                          </AvInput>
                        <AvFeedback>Please enter the Monthly Family Income!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-3">
                        <AvGroup>
                          <Label for='monthlyfamilyincomeamount'>Amount</Label>
                          <AvField name='monthlyfamilyincomeamount' id='monthlyfamilyincomeamount' required value={patient.family_income_amount} onChange={(e) => this.setState({ family_income_amount: e.target.value})}  />
                          <AvFeedback>Please enter the Amount!</AvFeedback>
                        </AvGroup>
                      </div>
                      <div className="col-md-8">
                        <Label for='comorbidities'>Co-morbidities</Label>
                        <AvRadioGroup name='comorbidities' required value={patient.co_morbidities} onChange={(e) => this.setState({ co_morbidities: e.target.value})} >
                          <div className="row">
                            <div className="col-md-2"><AvRadio customInput label='Hypertension' value='Hypertension' onClick={ () => this.hideOtherCancerComponent("hideMorbidities") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='DM' value='DM' onClick={ () => this.hideMorbiditiesComponent("hideMorbidities") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='IHD and CVA' value='IHD and CVA' onClick={ () => this.hideMorbiditiesComponent("hideMorbidities") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='Viral Illness – HIV' value='Viral Illness – HIV' onClick={ () => this.hideMorbiditiesComponent("hideMorbidities") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='Hepatitis B' value='Hepatitis B' onClick={ () => this.hideMorbiditiesComponent("hideMorbidities") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='Hepatitis C' value='Hepatitis C' onClick={ () => this.hideMorbiditiesComponent("hideMorbidities") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='TB' value='TB' onClick={ () => this.hideMorbiditiesComponent("hideMorbidities") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='PCOD' value='PCOD' onClick={ () => this.hideMorbiditiesComponent("hideMorbidities") } /></div>
                            <div className="col-md-2"><AvRadio customInput label='Other' value='Other' onClick={ () => this.showMorbiditiesComponent("showMorbidities") } /></div>                          
                          </div>
                        </AvRadioGroup>
                        </div>
                        {showMorbidities && (
                            <div className="col-md-4">
                            <AvGroup>
                              <Label for='othermorbidities'>If Other Please mention Morbidities</Label>
                              <AvField name='othermorbidities' id='othermorbidities' value={patient.co_morbidities_if_other} onChange={(e) => this.setState({ co_morbidities_if_other: e.target.value})}  />
                              <AvFeedback>Please enter the If Other Please mention Morbidities!</AvFeedback>
                            </AvGroup>
                            </div>
                          )}
                      <div className="col-md-12"><hr /></div>
                      <div className="col-md-12"><h4 style={{ color: "#000" }}>Addiction</h4></div>
                      
                      <div className="col-md-4">
                        <AvGroup>            
                          <Label for='tobaccoaddiction'>Tobacco</Label>
                          <AvInput type='select' name='tobaccoaddiction' id='tobaccoaddiction' required value={patient.tobacco_addiction} onChange={(e) => this.showTobaccoAddiction(e.target.value)}>
                              <option value="" selected>Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>                       
                            </AvInput>                      
                          <AvFeedback>Please select Tobacco Addiction!</AvFeedback>
                        </AvGroup>
                      </div>
                      {showTobaccoAddiction && (
                        <>
                        <div className="col-md-4">
                          <AvGroup>            
                              <Label for='tobaccoaddictiontype'>Type</Label>
                              <AvInput type='select' name='tobaccoaddictiontype' id='tobaccoaddictiontype' required value={patient.tobacco_addiction_type} onChange={(e) => this.setState({ tobacco_addiction_type: e.target.value })}>
                                  <option value="" selected>Select</option>
                                  <option value="Smoking">Smoking</option>
                                  <option value="Chewing">Chewing</option>                                   
                              </AvInput>                      
                              <AvFeedback>Please select Type of Tobacco Addiction!</AvFeedback>
                          </AvGroup>
                        </div>
                        <div className="col-md-4">
                          <AvGroup>
                            <Label for='tobacconoofyears'>Number of Years of Addiction</Label>
                            <AvField name='tobacconoofyears' id='tobacconoofyears' value={patient.tobacco_no_of_years} onChange={(e) => this.setState({ tobacco_no_of_years: e.target.value})}  />
                            <AvFeedback>Please enter the Number of Years of Addiction!</AvFeedback>
                          </AvGroup>
                        </div>
                        </>
                      )}                       

                      <div className="col-md-12"></div>
                      <div className="col-md-4">
                        <AvGroup>            
                          <Label for='alcoholaddiction'>Alcohol</Label>
                          <AvInput type='select' name='alcoholaddiction' id='alcoholaddiction' required value={patient.alcohol_addiction} onChange={(e) => this.showAlcoholAddiction(e.target.value)}>
                              <option value="" selected>Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>                       
                            </AvInput>                      
                          <AvFeedback>Please select Alcohol Addiction!</AvFeedback>
                        </AvGroup>
                      </div>
                      {showAlcoholAddiction && (
                        <>
                        <div className="col-md-4">
                          <AvGroup>
                            <Label for='pegperday'>Number of Peg per Day (ml)</Label>
                            <AvField name='pegperday' id='pegperday' value={patient.no_of_peg_per_day} onChange={(e) => this.setState({ no_of_peg_per_day: e.target.value})} required />
                            <AvFeedback>Please enter the Number of Peg per Day (ml)!</AvFeedback>
                          </AvGroup>
                        </div>
                        <div className="col-md-4">
                          <AvGroup>
                            <Label for='alcoholnoofyears'>Number of Years of Alcohol Addiction</Label>
                            <AvField name='alcoholnoofyears' id='alcoholnoofyears' value={patient.alcohol_no_of_years} onChange={(e) => this.setState({ alcohol_no_of_years: e.target.value})} required />
                            <AvFeedback>Please enter the Number of Years of Alcohol Addiction!</AvFeedback>
                          </AvGroup>
                        </div>
                        </>
                      )} 
                      <div className="col-md-12"></div>
                      <div className="col-md-4">
                        <AvGroup>            
                          <Label for='diet'>Diet</Label>
                          <AvInput type='select' name='diet' id='diet' required value={patient.diet} onChange={(e) => this.setState({ diet: e.target.value })}>
                              <option value="" selected>Select</option>
                              <option value="Veg">Veg</option>
                              <option value="Non-Veg">Non-Veg</option>                       
                            </AvInput>                      
                          <AvFeedback>Please select Diet!</AvFeedback>
                        </AvGroup>
                      </div>
                      <div className="col-md-12"></div>
                      <div className="col-md-4">
                        <AvGroup>            
                          <Label for='menstrualhistory'>Menstrual History</Label>
                          <AvInput type='select' name='menstrualhistory' id='menstrualhistory' required value={patient.menstrual_history} onChange={(e) => this.showMenstrualHistory(e.target.value)}>
                              <option value="" selected>Select</option>
                              <option value="Regular">Regular</option>
                              <option value="Irregular">Irregular</option>                       
                            </AvInput>                      
                          <AvFeedback>Please select Menstrual History!</AvFeedback>
                        </AvGroup>
                      </div>
                      {showMenstrualHistory && (
                        <div className="col-md-4">
                                      
                            <Label for='ifirregular'>If Irregular</Label>
                            <AvCheckboxGroup name='ifirregular' id="ifirregular" required >
                              {this.getCheckedData()}                              
                            </AvCheckboxGroup>                            
                        </div>
                      )} 
                      <div className="col-md-12"><hr /></div>
                      <div className="col-md-12"><h4 style={{ color: "#000" }}>Reproductive History</h4></div>
                      <div className="col-md-3">
                        <AvGroup>
                          <Label for='gravida'>Gravida</Label>
                          <AvField name='gravida' id='gravida' value={patient.reproductivew_history_gravida} onChange={(e) => this.setState({ reproductivew_history_gravida: e.target.value})} required  />
                          <AvFeedback>Please enter Gravida!</AvFeedback>
                        </AvGroup>
                      </div>
                      <div className="col-md-3">
                        <AvGroup>
                          <Label for='para'>Para</Label>
                          <AvField name='para' id='para' value={patient.reproductivew_history_para} onChange={(e) => this.setState({ reproductivew_history_para: e.target.value})} required  />
                          <AvFeedback>Please enter Para!</AvFeedback>
                        </AvGroup>
                      </div>
                      <div className="col-md-3">
                        <AvGroup>
                          <Label for='abortion'>Abortion</Label>
                          <AvField name='abortion' id='abortion' value={patient.reproductivew_history_abortion} onChange={(e) => this.setState({ reproductivew_history_abortion: e.target.value})} required  />
                          <AvFeedback>Please enter Abortion!</AvFeedback>
                        </AvGroup>
                      </div>
                      <div className="col-md-3">
                        <AvGroup>
                          <Label for='ageatmenarcy'>Age at Menarcy</Label>
                          <AvField name='ageatmenarcy' id='ageatmenarcy' value={patient.reproductivew_history_age_of_menarcy} onChange={(e) => this.setState({ reproductivew_history_age_of_menarcy: e.target.value})} required  />
                          <AvFeedback>Please enter Age at Menarcy!</AvFeedback>
                        </AvGroup>
                      </div>
                      <div className="col-md-3">
                        <AvGroup>
                          <Label for='ageatmenopause'>Age at Menopause</Label>
                          <AvField name='ageatmenopause' id='ageatmenopause' value={patient.reproductivew_history_age_of_menopause} onChange={(e) => this.setState({ reproductivew_history_age_of_menopause: e.target.value})} required  />
                          <AvFeedback>Please enter Age at Menopause!</AvFeedback>
                        </AvGroup>
                      </div>
                      <div className="col-md-3">
                        <AvGroup>            
                          <Label for='hrtuse'>HRT use</Label>
                          <AvInput type='select' name='hrtuse' id='hrtuse' required value={patient.reproductivew_history_hrt_use} onChange={(e) => this.showHRTuse(e.target.value)}>
                              <option value="" selected>Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>                       
                            </AvInput>                      
                          <AvFeedback>Please select HRT use!</AvFeedback>
                        </AvGroup>
                      </div>
                      {showHRTuse && (
                        <div className="col-md-3">
                          <AvGroup>            
                            <Label for='ifhrtuseyes'>HRT Type</Label>
                            <AvInput type='select' name='ifhrtuseyes' id='ifhrtuseyes' value={patient.reproductivew_history_hrt_use_if_yes} onChange={(e) => this.setState({ reproductivew_history_hrt_use_if_yes: e.target.value })} required>
                                <option value="" selected>Select</option>
                                <option value="Combination">Combination</option>
                                <option value="Progesterone">Progesterone</option>                      
                              </AvInput>                      
                            <AvFeedback>Please select HRT Type!</AvFeedback>
                          </AvGroup>
                        </div>
                      )}
                      <div className="col-md-3">
                        <AvGroup>
                          <Label for='noofyearsused'>No of years used</Label>
                          <AvField name='noofyearsused' id='noofyearsused' value={patient.reproductivew_history_no_of_years_used} onChange={(e) => this.setState({ reproductivew_history_no_of_years_used: e.target.value})} required  />
                          <AvFeedback>Please enter No of years used!</AvFeedback>
                        </AvGroup>
                      </div>
                      <div className="col-md-12">
                      <Button color='primary' type='submit' /*disabled={!patient_name.length || !city.length || !country.length || !hospital_id.length || !patients_initial.length || !patients_dob.length || !age_of_diagnosis.length || !date_of_diagnosis.length || !paraffin_blocks.length || !profession.length || !ethnicity.length || !family_have_cancer.length || !age_at_diagnosis.length || !presenting_symptoms.length || !family_income_type.length || !amount.length || !co_morbidities.length }*/ onClick={ () => this.sendPatientDetails }>
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
export default withRouter(DemographyEdit);