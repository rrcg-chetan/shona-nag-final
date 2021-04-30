import React, { Fragment } from 'react';

import SideBar from '../../sidebar/SideBar';
import "react-datepicker/dist/react-datepicker.css";
import {withRouter} from 'react-router-dom'

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
  AvRadio,  
} from 'availity-reactstrap-validation-safe'
import axios from 'axios';

class Pathology extends React.Component {
  constructor(props){
    super(props);
    let param = this.props.location.pathname;
    const code = param.split("/").pop()   
    this.state = {            
      showType: false,              
      showHER2: false,
      showGrade: false,
      code: code,  
      pathologytype: "",
      pathology_type: "",
      other_type: "",
      grade: "",    
      pT: "",
      pN: "",
      ypT: "",
      ypN: "",
      pathologicalsizeofcancer: "",
      ER: "",PR: "",
      HER2: "",
      showher: "",
      grade_number: "",
      dcs: "",
    };
    this.showType = this.showType.bind(this);
    this.hideType = this.hideType.bind(this);
    this.showHER2 = this.showHER2.bind(this);
    this.hideHER2 = this.hideHER2.bind(this);
    /*this.handleInputMetastasesChange = this.handleInputMetastasesChange.bind(this);
    this.handleInputTreatmentChange = this.handleInputTreatmentChange.bind(this);      */  
    //console.log(code)
  }

  handleValidSubmit = (event, values) => {  
    //alert(this.state.metastases_types)
    //alert(this.state.code)
    const { history } = this.props;
   axios.post(`/patientpathologydetails`, { pathologytype: this.state.pathologytype, other_type: this.state.other_type, grade: this.state.grade, grade_number: this.state.grade_number, code: this.state.code, pT: this.state.pT, pN: this.state.pN, ypT: this.state.ypT, ypN: this.state.ypN, pathologicalsizeofcancer: this.state.pathologicalsizeofcancer, ER: this.state.ER, PR: this.state.PR, HER2: this.state.HER2, showher: this.state.showher, dcs: this.state.dcs  })
    .then(function (response) {
    if(response.data.success === 'Pathology Sucessfully Submitted!'){            
      history.push(`/treatment/${response.data.value}`)
    }else{
      
    }
  })
  };
  
  showHER2(name) {
    //console.log(document.getElementById("HER2").value)
    if(document.getElementById("HER2").value === "2" || document.getElementById("HER2").value === "3+"){
        this.setState({ showHER2: true, HER2: name });   
        //this.state.HER2 = name 
    }else{
        this.setState({ showHER2: false, HER2: name }); 
        //this.state.HER2 = name        
    }
  }        
  hideHER2(name) {
    switch (name) {
      case "hideHER2":
        this.setState({ showHER2: false });        
        break;
default:            
    }
  }

  showGrade(name) {
    //console.log(name)
    if(name === "Yes"){
      this.setState({ showGrade: true, grade: name });   
      //this.state.grade = name 
    }else if(name === "No"){
        this.setState({ showGrade: false, grade_number: "", dcs: "", grade: name }); 
        //this.state.grade = name        
    }
  }

  showType(name) {
    if(document.getElementById("pathologytype").value === "Other"){
      this.setState({ showType: true, pathologytype: name });   
      //this.state.pathologytype = name 
    }else{
        this.setState({ showType: false, pathologytype: name }); 
        //this.state.pathologytype = name        
    }
  }

  hideType(name) {
    switch (name) {
      case "hideType":
        this.setState({ showType: false });              
        break;
default:            
    }
  }

  render(){          
    const { showType, showGrade, /*pathologytype, pathology_type, other_type, grade, grade_number, dcs, pT, pN, ypT, ypN, pathologicalsizeofcancer, ER, PR, HER2, showHER2, showher, code*/ } = this.state; 
    
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
              <h1 className="animate__animated animate__fadeIn">Pathology</h1>
            </CardHeader>
            <CardBody>
              <AvForm onValidSubmit={this.handleValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit}>
              <div className="row">
                
                <div className="col-md-3">
                  <AvGroup>            
                    <Label for='pathologytype'>Type</Label>
                    <AvInput type='select' name='pathologytype' id='pathologytype' required value={this.state.pathologytype} onChange={(e) => this.showType(e.target.value)}>
                        <option value="">Select</option> 
                        <option value="Lobular">Lobular</option> 
                        <option value="Not Classified">Not Classified</option> 
                        <option value="Invasive Ductal">Invasive Ductal</option> 
                        <option value="Invasive Lobular, Pleomorphic">Invasive Lobular, Pleomorphic</option>
                        <option value="Metaplastic">Metaplastic</option>
                        <option value="Neuroendocrine">Neuroendocrine</option>
                        <option value="Medullary">Medullary</option>
                        <option value="Myoepithelial">Myoepithelial</option>
                        <option value="Apocrine">Apocrine</option>
                        <option value="Adenoid Cystic">Adenoid Cystic</option>
                        <option value="Other">Other</option>                        
                      </AvInput>
                      
                    <AvFeedback>Please select Type!</AvFeedback>
                  </AvGroup>
                </div>
                {showType && (
                  <div className="col-md-3">
                  <AvGroup>
                    <Label for='other_type'>If Other Type Please mention</Label>
                    <AvField name='other_type' id='other_type' value={this.state.other_type} onChange={(e) => this.setState({ other_type: e.target.value})} required />
                    <AvFeedback>Please enter the If Other Type!</AvFeedback>
                  </AvGroup>
                  </div>
                )}  
                <div className="col-md-3">
                <Label for='grade'>Grade</Label>
                <AvRadioGroup name='grade' value={this.state.grade} required onChange={(e) => this.setState({ grade: e.target.value })} >
                  <div className="row">
                    <div className="col-md-3"><AvRadio customInput label='Yes' value='Yes' onChange={ () => this.showGrade("Yes") } /></div>
                    <div className="col-md-3"><AvRadio customInput label='No' value='No' onChange={ () => this.showGrade("No") } /></div>
                  </div>
                  <AvFeedback>Please select the Grade!</AvFeedback>
                </AvRadioGroup>                
                </div> 
                {showGrade && (
                <>
                  <div className="col-md-3">
                  <AvGroup>            
                    <Label for='gradenumber'>Grade</Label>
                    <AvInput type='select' name='gradenumber' id='gradenumber' required value={this.state.grade_number} onChange={(e) => this.setState({ grade_number: e.target.value})} >
                        <option value="" selected>Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>                            
                        <option value="3">3</option>                        
                      </AvInput>
                    <AvFeedback>Please select Grade!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-3">
                  <AvGroup>            
                    <Label for='dcs'>DCIS</Label>
                    <AvInput type='select' name='dcs' id='dcs' required value={this.state.dcs} onChange={(e) => this.setState({ dcs: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="Present">Present</option>
                        <option value="Not Present">Not Present</option>                        
                      </AvInput>
                    <AvFeedback>Please select DCS!</AvFeedback>
                  </AvGroup>
                </div>
                </>
                )} 
                <div className="col-md-12">Pathological stage of cancer<hr /></div>
                <div className="col-md-2">
                  <AvGroup>            
                    <Label for='pT'>pT</Label>
                    <AvInput type='select' name='pT' id='pT' required value={this.state.pT} onChange={(e) => this.setState({ pT: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="X">X</option>
                        <option value="1">1</option>
                        <option value="2">2</option>                            
                        <option value="3">3</option>
                        <option value="4">4</option>                        
                      </AvInput>
                    <AvFeedback>Please select pT!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-2">
                  <AvGroup>            
                    <Label for='pN'>pN</Label>
                    <AvInput type='select' name='pN' id='pN' required value={this.state.pN} onChange={(e) => this.setState({ pN: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="X">X</option>
                        <option value="1">1</option>
                        <option value="2">2</option>                            
                        <option value="3">3</option>                                            
                      </AvInput>
                    <AvFeedback>Please select pN!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-2">
                  <AvGroup>            
                    <Label for='ypT'>ypT</Label>
                    <AvInput type='select' name='ypT' id='ypT' required value={this.state.ypT} onChange={(e) => this.setState({ ypT: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="X">X</option>
                        <option value="1">1</option>
                        <option value="2">2</option>                            
                        <option value="3">3</option>                                            
                      </AvInput>
                    <AvFeedback>Please select ypT!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-2">
                  <AvGroup>            
                    <Label for='ypN'>ypN</Label>
                    <AvInput type='select' name='ypN' id='ypN' required value={this.state.ypN} onChange={(e) => this.setState({ ypN: e.target.value})}>
                        <option value="" selected>Select</option>
                        <option value="X">X</option>
                        <option value="1">1</option>
                        <option value="2">2</option>                            
                        <option value="3">3</option>                                            
                      </AvInput>
                    <AvFeedback>Please select ypN!</AvFeedback>
                  </AvGroup>
                </div>
                <div className="col-md-4">
                  <AvGroup>
                    <Label for='pathologicalsizeofcancer'>Pathological size of cancer</Label>
                    <AvField type="number" placeholder="in CMS" name='pathologicalsizeofcancer' id='pathologicalsizeofcancer' value={this.state.pathologicalsizeofcancer} onChange={(e) => this.setState({ pathologicalsizeofcancer: e.target.value})} required />
                    <AvFeedback>Please enter the Pathological size of cancer!</AvFeedback>
                  </AvGroup>
                </div>
                
                <div className="col-md-12">
                <Button color='primary' type='submit'>
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

export default withRouter(Pathology);