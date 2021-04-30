import React, { Fragment } from 'react';

import EditSideBar from '../../sidebar/EditSideBar';
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

class EditPathology extends React.Component {
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
    //this.showType = this.showType.bind(this);
    this.hideType = this.hideType.bind(this);
    this.showHER2 = this.showHER2.bind(this);
    this.hideHER2 = this.hideHER2.bind(this);
    /*this.handleInputMetastasesChange = this.handleInputMetastasesChange.bind(this);
    this.handleInputTreatmentChange = this.handleInputTreatmentChange.bind(this);      */  
    //console.log(code)
  }

  componentDidMount() {
    axios.get(`/getfulldetails/${this.state.code}`)
    .then(response =>
        response.data.results.map(patient => ({
            pathology_type: `${patient.pathology_type}`, pathology_type_if_other: `${patient.pathology_type_if_other}`, pathology_grade: `${patient.pathology_grade}`, grade_number: `${patient.grade_number}`, dcs: `${patient.dcs}`, code: `${patient.code}`, pt: `${patient.pt}`, pn: `${patient.pn}`, ypt: `${patient.ypt}`, ypn: `${patient.ypn}`, pathological_size_of_cancer: `${patient.pathological_size_of_cancer}`, er: `${patient.er}`, pr: `${patient.pr}`, her2: `${patient.her2}`, if_2_plus: `${patient.if_2_plus}`,
        })),
        //console.log(this.patient)
    )
    .then(patients => {
        this.setState({
          patients,
          isLoading: false,
          pathologytype: patients[0].pathology_type,
          her2data: patients[0].her2,
          pgrade: patients[0].pathology_grade,
          /*othergermlinetesting: patients[0].genetic_testing_done,
          familyhavecancer: patients[0].family_have_cancer,
          typesofmetastases: patients[0].metastases_types,
          pregnancy: patients[0].pregnancy_associated_b_c
          whichrelative: patients[0].which_relative*/
        });
        //document.getElementById('metastases_types')[1].style.display='none';
        console.log(this.state.patients)
        if(this.state.pathologytype === 'Other'){
          this.setState({ showType: true })
        }
        if(this.state.her2data === '2' || this.state.her2data === '3+'){
          this.setState({ showHER2: true })          
        }
        if(this.state.pgrade === 'Yes'){
          this.setState({ showGrade: true })          
        }        
    })
    .catch(error => this.setState({ error, isLoading: false })); 
    
}; 

  handleValidSubmit = (event, values) => {
    //alert(this.state.metastases_types)
    //alert(this.state.code)
    const { history } = this.props;
   axios.post(`/updatepatientdetails`, { pathology_type: this.state.pathology_type, pathology_type_if_other: this.state.pathology_type_if_other, pathology_grade: this.state.pathology_grade, grade_number: this.state.grade_number, dcs: this.state.dcs, code: this.state.code, pt: this.state.pt, pn: this.state.pn, ypt: this.state.ypt, ypn: this.state.ypn, pathological_size_of_cancer: this.state.pathological_size_of_cancer, er: this.state.er, pr: this.state.pr, her2: this.state.her2, if_2_plus: this.state.if_2_plus })
    .then(function (response) {
    if(response.data.success === 'Sucessfully Updated!'){            
      history.push(`/treatment/edit/${response.data.value}`)
    }else{
      
    }
  })
  };
  
  showHER2(name) {
    //console.log(document.getElementById("her2").value)
    if(document.getElementById("her2").value === "2" || document.getElementById("her2").value === "3+"){
        this.setState({ showHER2: true, her2: name });   
        //this.state.her2 = name 
    }else{
        this.setState({ showHER2: false, her2: name }); 
        //this.state.her2 = name        
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


  showType(name) {
    //console.log(name)
    if(document.getElementById("pathologytype").value === "Other"){
        this.setState({ showType: true, pathology_type: name });   
        //this.state.pathology_type = name 
    }else{
        this.setState({ showType: false, pathology_type: name }); 
        //this.state.pathology_type = name        
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

  showGrade(name) {
    //console.log(name)
    if(name === "Yes"){
      this.setState({ showGrade: true, pathology_grade: name });   
      //this.state.pathology_grade = name 
    }else if(name === "No"){
        this.setState({ showGrade: false, grade_number: "", dcs: "", pathology_grade: name }); 
        //this.state.pathology_grade = name        
    }
  }

  render(){         
    const { showType, /*showHER2,*/ showGrade, /*grade,*/ isLoading, patients } = this.state; 
  
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
              <h1 className="animate__animated animate__fadeIn">Pathology</h1>
            </CardHeader>
            <CardBody>
                {!isLoading ? (
                    patients.map(patient => {
                        /*const { pathologytype, pathology_type, pathology_type_if_other, pathology_grade, code, pt, pn, ypt, ypn, pathological_size_of_cancer, er, pr, her2, if_2_plus } = patient; */
                        return (
              <AvForm onValidSubmit={this.handleValidSubmit}
                          onInvalidSubmit={this.handleInvalidSubmit}>
              <div className="row">
                
                <div className="col-md-3">
                  <AvGroup>            
                    <Label for='pathologytype'>Type</Label>
                    <AvInput type='select' name='pathologytype' id='pathologytype' required value={patient.pathology_type} onChange={(e) => this.showType(e.target.value)}>
                        <option value="" selected>Select</option>
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
                    <Label for='pathology_type_if_other'>If Other Type Please mention</Label>
                    <AvField name='pathology_type_if_other' id='pathology_type_if_other' value={patient.pathology_type_if_other} onChange={(e) => this.setState({ pathology_type_if_other: e.target.value})} required />
                    <AvFeedback>Please enter the If Other Type!</AvFeedback>
                  </AvGroup>
                  </div>
                )}  
                <div className="col-md-3">
                <Label for='grade'>Grade</Label>
                <AvRadioGroup name='grade' value={patient.pathology_grade} required onChange={(e) => this.setState({ pathology_grade: e.target.value })} >
                  <div className="row">
                    <div className="col-md-4"><AvRadio customInput label='Yes' value='Yes' onChange={ () => this.showGrade("Yes") } /></div>
                    <div className="col-md-4"><AvRadio customInput label='No' value='No' onChange={ () => this.showGrade("No") } /></div>
                  </div>
                  <AvFeedback>Please select the Grade!</AvFeedback>
                </AvRadioGroup>                
                </div> 
                {showGrade && (
                <>
                  <div className="col-md-3">
                  <AvGroup>            
                    <Label for='gradenumber'>Grade</Label>
                    <AvInput type='select' name='gradenumber' id='gradenumber' required value={patient.grade_number} onChange={(e) => this.setState({ grade_number: e.target.value})} >
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
                    <AvInput type='select' name='dcs' id='dcs' required value={patient.dcs} onChange={(e) => this.setState({ dcs: e.target.value})}>
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
                    <Label for='pt'>pT</Label>
                    <AvInput type='select' name='pt' id='pt' required value={patient.pt} onChange={(e) => this.setState({ pt: e.target.value})}>
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
                    <Label for='pn'>pN</Label>
                    <AvInput type='select' name='pn' id='pn' required value={patient.pn} onChange={(e) => this.setState({ pn: e.target.value})}>
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
                    <Label for='ypt'>ypT</Label>
                    <AvInput type='select' name='ypt' id='ypt' required value={patient.ypt} onChange={(e) => this.setState({ ypt: e.target.value})}>
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
                    <Label for='ypn'>ypN</Label>
                    <AvInput type='select' name='ypn' id='ypn' required value={patient.ypn} onChange={(e) => this.setState({ ypn: e.target.value})}>
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
                    <Label for='pathological_size_of_cancer'>Pathological size of cancer</Label>
                    <AvField type="number" placeholder="in CMS" name='pathological_size_of_cancer' id='pathological_size_of_cancer' value={patient.pathological_size_of_cancer} onChange={(e) => this.setState({ pathological_size_of_cancer: e.target.value})} required />
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

export default withRouter(EditPathology);