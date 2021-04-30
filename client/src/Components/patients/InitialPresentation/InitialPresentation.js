import React, { Fragment } from 'react';
//import ReactDOM from 'react-dom';
//import NavBar from '../Components/navbar/NavBar';
import SideBar from '../../sidebar/SideBar';
import "react-datepicker/dist/react-datepicker.css";
import {withRouter} from 'react-router-dom'

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

class InitialPresentation extends React.Component {
  constructor(props){
    super(props);
    let param = this.props.location.pathname;
    const code = param.split("/").pop()    
    //console.log(code)
    this.state = {
      showMetastases: false,
      showOtherMetastases: false,
      showGermLine: false,     
      showGenetics: false, 

      metastases_types: [
      	{ text: 'Liver', checked: false },
        { text: 'Lung', checked: false },
        { text: 'Bone', checked: false },
        { text: 'Brain', checked: false },
        { text: 'Ovaries', checked: false },
        { text: 'Adrenal', checked: false },
        { text: 'Other', checked: false },
      ],      
      first_treatment_given: [
        { text: 'Surgery', checked: false },
        { text: 'Chemotherapy', checked: false },
        { text: 'Targeted Therapy', checked: false },
        { text: 'Immunotherapy', checked: false },
        { text: 'Hormone therapy', checked: false },
        { text: 'Radiotherapy', checked: false },
        { text: 'Trial', checked: false },
        { text: 'Alternative Therapy', checked: false },
        { text: 'Declined All Therapies', checked: false },
      ],
      cTbasedon: [
        { text: 'Clinical', checked: false },
        { text: 'Mammorgam', checked: false },
        { text: 'MRI', checked: false },
        { text: 'Ultrasound', checked: false },
      ],
      cNbasedon: [
        { text: 'Clinical', checked: false },
        { text: 'Mammorgam', checked: false },
        { text: 'MRI', checked: false },
        { text: 'Ultrasound', checked: false },
      ],
      cMbasedon: [
        { text: 'Clinical', checked: false },
        { text: 'CT Scan', checked: false },
        { text: 'Bone', checked: false },
        { text: 'Pet-CT Scan', checked: false },
        { text: 'Pet-MRI', checked: false },
      ],
      code: code,  
      metastases_text: "",
      treatment_text: "",
      presentation: "", at_diagnosis: "", laterality: "", cT: "", cN: "", cM: "", metastases: "", total_number_of_metastases: "", other_metastases_types: "", germline_testing_done: "", genetics: "", other_genetics: "", pregnancy_associated_breast_cancer: ""
    };
    this.showMetastasesComp = this.showMetastasesComp.bind(this);
    this.hideMetastasesComp = this.hideMetastasesComp.bind(this);
    this.showOtherTypesMetastases = this.showOtherTypesMetastases.bind(this);
    this.hideOtherTypesMetastases = this.hideOtherTypesMetastases.bind(this);
    this.showGermlineComponent = this.showGermlineComponent.bind(this);
    this.hideGermlineComponent = this.hideGermlineComponent.bind(this);
    this.showOtherGenetics = this.showOtherGenetics.bind(this);
    this.hideOtherGenetics = this.hideOtherGenetics.bind(this);
    /*this.handleInputMetastasesChange = this.handleInputMetastasesChange.bind(this);
    this.handleInputTreatmentChange = this.handleInputTreatmentChange.bind(this);    
    this.handleChange = this.handleChange.bind(this);
    this.sendInitialPresentationDetails = this.sendInitialPresentationDetails.bind(this);*/
    //console.log(code)
  }

  onToggle(index, e){
  	let newItems = this.state.metastases_types.slice();
		newItems[index].checked = !newItems[index].checked
  	this.setState({
    	metastases_types: newItems
    })
    console.log(this.state.metastases_types)
  }

  onToggleTreatment(index, e){
  	let newItemsTreat = this.state.first_treatment_given.slice();
		newItemsTreat[index].checked = !newItemsTreat[index].checked
  	this.setState({
    	first_treatment_given: newItemsTreat
    })
    console.log(this.state.first_treatment_given)
  }

  onTogglecT(index, e){
  	let cTItems = this.state.cTbasedon.slice();
		cTItems[index].checked = !cTItems[index].checked
  	this.setState({
    	cTbasedon: cTItems
    })
    console.log(this.state.cTbasedon)
  }

  onTogglecN(index, e){
  	let cNItems = this.state.cNbasedon.slice();
		cNItems[index].checked = !cNItems[index].checked
  	this.setState({
    	cNbasedon: cNItems
    })
    console.log(this.state.cNbasedon)
  }

  onTogglecM(index, e){
  	let cMItems = this.state.cMbasedon.slice();
		cMItems[index].checked = !cMItems[index].checked
  	this.setState({
    	cMbasedon: cMItems
    })
    console.log(this.state.cMbasedon)
  }

  /*handleInputMetastasesChange = (e) =>{
   var {name, checked} = e.target;

    this.setState((e) =>{
      var SelectedMetastases = e.metastases_types
      this.state.metastases_text = Object.keys(this.state.metastases_types).filter((x) => this.state.metastases_types[x]);
      return SelectedMetastases[name] = checked      
    });    
  };

  handleInputTreatmentChange = (e) =>{
    var {name, checked} = e.target;
 
     this.setState((e) =>{
       var SelectedTreatment = e.first_treatment_given  
       this.state.treatment_text = Object.keys(this.state.first_treatment_given).filter((x) => this.state.first_treatment_given[x]);;     
       return SelectedTreatment[name] = checked
     });    
   };*/

   handleValidSubmit = (event, values) => {
    //alert(this.state.metastases_types)
    //alert(this.state.code)
    const { history } = this.props;
   axios.post(`/patientinitialpresentationdetails`, { presentation: this.state.presentation, at_diagnosis: this.state.at_diagnosis, laterality: this.state.laterality, cT: this.state.cT, cTbasedon: this.state.cTbasedon, cN: this.state.cN, cNbasedon: this.state.cNbasedon, cM: this.state.cM, cMbasedon: this.state.cMbasedon, metastases: this.state.metastases, total_number_of_metastases: this.state.total_number_of_metastases, metastases_types: this.state.metastases_types, other_metastases_types: this.state.other_metastases_types, first_treatment_given: this.state.first_treatment_given, germline_testing_done: this.state.germline_testing_done, genetics: this.state.genetics, other_genetics: this.state.other_genetics, pregnancy_associated_breast_cancer: this.state.pregnancy_associated_breast_cancer, treatment_text: this.state.treatment_text, metastases_text: this.state.metastases_text, code: this.state.code })
    .then(function (response) {
    //console.log(JSON.stringify(response.data));
    if(response.data.success === 'Initial Presentation Sucessfully Submitted!'){            
      //let history = useHistory();
      //const { history } = this.props;
      //this.context.history.push(`/initial-presentation/${code}`);
      history.push(`/pathology/${response.data.value}`)
    }else{
      
    }
  })
  };

  showMetastasesComp(name) {
    switch (name) {
      case "showMetastases":
        this.setState({ showMetastases: true, required: false });              
        break;
default:            
    }
  }        
  hideMetastasesComp(name) {
    switch (name) {
      case "hideMetastases":
        this.setState({ showMetastases: false, showOtherMetastases:false, required: true });        
        break;
default:            
    }
  } 
  
  showOtherTypesMetastases(name) {
    switch (name) {
      case "showOtherMetastases":
        this.setState({ showOtherMetastases: true, required: false });
        break;
default:            
    }
  }
  hideOtherTypesMetastases(name) {
    switch (name) {
      case "hideOtherMetastases":
        this.setState({ showOtherMetastases: false, required: true });              
        //showOtherMetastases
        break;
default:            
    }
  }
  
  showGermlineComponent(name) {
    switch (name) {
      case "showGermLine":
        this.setState({ showGermLine: true, showOtherGermline: false });
        break;
default:            
    }
  }
  hideGermlineComponent(name) {
    switch (name) {
      case "hideGermLine":
        this.setState({ showGermLine: false, showOtherGermline: false });   
        this.setState({ showGenetics: false, showOtherGenetics: false });           
        break;
default:            
    }
  }

  showOtherGenetics(name) {
    //alert(name)
    if(document.getElementById("genetics").value === "Other"){
        this.setState({ showGenetics: true, showOtherGenetics: false, genetics: name });    
        //this.state.genetics = name
    }else{
        this.setState({ showGenetics: false, showOtherGenetics: false, genetics: name });
        //this.state.genetics = name
    }
  }
  hideOtherGenetics(name) {
    switch (name) {
      case "hideGenetics":
        this.setState({ showGenetics: false, showOtherGenetics: false });              
        break;
default:            
    }
  }

  render(){          
    const { showMetastases, showOtherMetastases, showGermLine, showGenetics, /*showOtherGermline, showMorbidities, presentation, at_diagnosis, laterality, cT, cTbasedon, cN, cNbasedon, cM, cMbasedon, metastases, total_number_of_metastases, metastases_types, other_metastases_types, first_treatment_given, germline_testing_done, genetics, other_genetics, pregnancy_associated_breast_cancer, treatment_text, metastases_text, code*/ } = this.state; 
    
return (
  <div>
        <SideBar   />
        <div className="content-wrapper animate__animated animate__fadeIn">
        <div className="app-content content overflow-hidden">
        
          <Fragment>
          
          <Row>
          <Col sm='12'>
          <Card>
            <CardHeader>
              <h1 className="animate__animated animate__fadeIn">Patient's Initial Presentation</h1>
            </CardHeader>
            <CardBody>
              <AvForm onValidSubmit={this.handleValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit}>
              <div className="row">
              <div className="col-md-4">
                <AvGroup>            
                  <Label for='presentation'>Presentation</Label>
                  <AvInput type='select' name='presentation' id='presentation'required value={this.state.presentation} onChange={(e) => this.setState({ presentation: e.target.value})}>
                      <option value="" selected>Select</option>
                      <option value="Screen Detected">Screen Detected</option>
                      <option value="Symptomatic">Symptomatic</option>                            
                    </AvInput>
                  <AvFeedback>Please select Presentation!</AvFeedback>
                </AvGroup>
                </div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='at_diagnosis'>At diagnosis</Label>
                    <AvInput type='select' name='at_diagnosis' id='at_diagnosis'required value={this.state.at_diagnosis} onChange={(e) => this.setState({ at_diagnosis: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="Early">Early</option>
                        <option value="Locally Advanced">Locally Advanced</option>                            
                      </AvInput>
                    <AvFeedback>Please select At diagnosis!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-4">
                  <AvGroup>            
                    <Label for='laterality'>Laterality</Label>
                    <AvInput type='select' name='laterality' id='laterality'required value={this.state.laterality} onChange={(e) => this.setState({ laterality: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="Right">Right</option>
                        <option value="Left">Left</option>
                        <option value="Bilateral">Bilateral</option>                            
                      </AvInput>
                    <AvFeedback>Please select Laterality!</AvFeedback>
                  </AvGroup>
                </div>
                <div class="col-md-12 mt-2"><h4>Original clinical stage</h4><hr /></div>
                <div className="col-md-1">
                  <AvGroup>            
                    <Label for='cT'>cT</Label>
                    <AvInput type='select' name='cT' id='cT'required value={this.state.cT} onChange={(e) => this.setState({ cT: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="X">X</option>
                        <option value="1">1</option>
                        <option value="2">2</option>                            
                        <option value="3">3</option>
                        <option value="4">4</option>                                                                             
                      </AvInput>
                    <AvFeedback>Please select cT!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-3">
                  <AvGroup>            
                    <Label for='cTbasedon'>Based On Criteria</Label>
                    <AvCheckboxGroup name='cTbasedon' required>                      
                      {this.state.cTbasedon.map((itemTreat, i) =>
                        <div className="col-md-12"><AvCheckbox customInput label={itemTreat.text} value={itemTreat.text} onChange={this.onTogglecT.bind(this, i)} /></div>                      
                      )}                                               
                    </AvCheckboxGroup>                  
                  </AvGroup>
                </div>

                <div className="col-md-1">
                  <AvGroup>            
                    <Label for='cN'>cN</Label>
                    <AvInput type='select' name='cN' id='cN'required value={this.state.cN} onChange={(e) => this.setState({ cN: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="X">X</option>
                        <option value="0">0</option>                            
                        <option value="1">1</option>
                        <option value="2">2</option>                            
                        <option value="3">3</option>                                                                        
                      </AvInput>
                    <AvFeedback>Please select cN!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-3">
                  <AvGroup>            
                    <Label for='cNbasedon'>Based On Criteria</Label>
                    <AvCheckboxGroup name='cNbasedon' required>                      
                      {this.state.cNbasedon.map((itemTreat, i) =>
                        <div className="col-md-12"><AvCheckbox customInput label={itemTreat.text} value={itemTreat.text} onChange={this.onTogglecN.bind(this, i)} /></div>                      
                      )}                                               
                    </AvCheckboxGroup>  
                  </AvGroup>
                </div>

                <div className="col-md-1">
                  <AvGroup>            
                    <Label for='cM'>cM</Label>
                    <AvInput type='select' name='cM' id='cM'required value={this.state.cM} onChange={(e) => this.setState({ cM: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="X">X</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                      </AvInput>
                    <AvFeedback>Please select cM!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-3">
                  <AvGroup>            
                    <Label for='cMbasedon'>Based On Criteria</Label>
                    <AvCheckboxGroup name='cMbasedon' required>                      
                      {this.state.cMbasedon.map((itemTreat, i) =>
                        <div className="col-md-12"><AvCheckbox customInput label={itemTreat.text} value={itemTreat.text} onChange={this.onTogglecM.bind(this, i)} /></div>                      
                      )}                                               
                    </AvCheckboxGroup>
                  </AvGroup>
                </div>
                <div className="col-md-2">
                <Label for='metastases'>Metastases</Label>
                <AvRadioGroup name='metastases' required value={this.state.metastases} onChange={(e) => this.setState({ metastases: e.target.value})} >
                  <div className="row">
                    <div className="col-md-6"><AvRadio customInput label='Yes' value='Yes' onClick={ () => this.showMetastasesComp("showMetastases") } /></div>
                    <div className="col-md-6"><AvRadio customInput label='No' value='No' onClick={ () => this.hideMetastasesComp("hideMetastases") } /></div>
                  </div>
                </AvRadioGroup>
                </div>
                {showMetastases && (    
                <>
                <div className="col-md-4">
                <Label for='total_number_of_metastases'>Total number of metastatic (Lesions)</Label>
                <AvRadioGroup name='total_number_of_metastases' required value={this.state.total_number_of_metastases} onChange={(e) => this.setState({ total_number_of_metastases: e.target.value})} >
                  <div className="row">
                    <div className="col-md-6"><AvRadio customInput label='Less than 5' value='Less than 5' /></div>
                    <div className="col-md-6"><AvRadio customInput label='More than 5' value='More than 5' /></div>                          
                  </div>                  
                </AvRadioGroup>
                
                </div> 
                  <div className="col-md-12"></div>
                  <div className="col-md-8">
                  <Label for='type_of_metastases'>Types of Metastases</Label>
                  <AvCheckboxGroup name='type_of_metastases' required >
                    <div className="row">
                    {this.state.metastases_types.map((item, i) =>
                      <div className="col-md-2"><AvCheckbox customInput label={item.text} value={item.text} onChange={this.onToggle.bind(this, i)} /></div>                      
                    )}                          
                    </div>
                  </AvCheckboxGroup>
                  </div> 
                  </>
                )}     
                {showOtherMetastases && (
                  <div className="col-md-3">
                  <AvGroup>
                    <Label for='other_metastases_types'>If Other Please mention metastases</Label>
                    <AvField name='other_metastases_types' id='other_metastases_types' value={this.state.other_metastases_types} onChange={(e) => this.setState({ other_metastases_types: e.target.value})} required />
                    <AvFeedback>Please enter the If Other Please mention metastases!</AvFeedback>
                  </AvGroup>
                  </div>
                )}                          
                <div className="col-md-12"></div>
                
                  <hr />
                  <div className="col-md-12">
                  <Label for='first_treatment_given'><h4>First treatment given</h4></Label>
                  <AvCheckboxGroup name='first_treatment_given' required>
                    <div className="row">
                    {this.state.first_treatment_given.map((itemTreat, i) =>
                      <div className="col-md-2"><AvCheckbox customInput label={itemTreat.text} value={itemTreat.text} onChange={this.onToggleTreatment.bind(this, i)} /></div>                      
                    )}                         
                    </div>
                  </AvCheckboxGroup>                  
                  </div>
                <div className="col-md-12"></div>
                <div className="col-md-4">
                <Label for='germline_testing_done'>Germline testing done</Label>
                <AvRadioGroup name='germline_testing_done' required value={this.state.germline_testing_done} onChange={(e) => this.setState({ germline_testing_done: e.target.value})} >
                  <div className="row">
                    <div className="col-md-6"><AvRadio customInput label='Yes' value='Yes' onClick={ () => this.showGermlineComponent("showGermLine") } /></div>
                    <div className="col-md-6"><AvRadio customInput label='No' value='No' onClick={ () => this.hideGermlineComponent("hideGermLine") } /></div>
                  </div>
                </AvRadioGroup>
                </div>
                {showGermLine && (    
                <>
                <div className="col-md-3">
                  <AvGroup>            
                    <Label for='genetics'>Genetics</Label>
                    <AvInput type='select' name='genetics' id='genetics'required value={this.state.genetics} onChange={(e) => this.showOtherGenetics(e.target.value)}>
                        <option value="" selected>Select</option>
                        <option value="BRCA 1">BRCA 1</option>
                        <option value="BRCA 2">BRCA 2</option>
                        <option value="PALB2"> PALB2</option>                            
                        <option value="ATM">ATM</option>
                        <option value="CHEK 2">CHEK 2</option>   
                        <option value="p53">p53</option>                        
                        <option value="Other">Other</option>                        
                      </AvInput>
                    <AvFeedback>Please select Genetics!</AvFeedback>
                  </AvGroup>
                </div>
                </>
                )}
                {showGenetics && (
                  <div className="col-md-3">
                  <AvGroup>
                    <Label for='other_genetics'>If Other Please mention Genetics</Label>
                    <AvField name='other_genetics' id='other_genetics' value={this.state.other_genetics} onChange={(e) => this.setState({ other_genetics: e.target.value})} required />
                    <AvFeedback>Please enter the If Other Please mention Genetics!</AvFeedback>
                  </AvGroup>
                  </div>
                )} 
                <div className="col-md-12"></div>
                <div className="col-md-4">
                <Label for='pregnancy_associated_breast_cancer'>Pregnancy associated breast cancer:</Label>
                <AvRadioGroup name='pregnancy_associated_breast_cancer' required value={this.state.pregnancy_associated_breast_cancer} onChange={(e) => this.setState({ pregnancy_associated_breast_cancer: e.target.value})} >
                  <div className="row">
                    <div className="col-md-6"><AvRadio customInput label='Yes' value='Yes' /></div>
                    <div className="col-md-6"><AvRadio customInput label='No' value='No' /></div>
                  </div>
                </AvRadioGroup>
                </div>
                <div className="col-md-12">
                <a href={`/demography/edit/${this.state.code}`} className="mr-2 btn btn-primary" color='primary'><span className="fa fa-angle-left"></span> Back to Demography</a>
                <Button color='primary' type='submit' onClick={ () => this.sendInitialPresentationDetails }>
                  Submit
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

export default withRouter(InitialPresentation);