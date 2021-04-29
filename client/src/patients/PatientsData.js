import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import axios from 'axios';
import { Button } from 'react-bootstrap'
import { withRouter, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

//export const history = createBrowserHistory();

const PatientsData = props => {
    //const { history } = useHistory();
    const [accountStatus, setAccountStatus] = useState([])
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const countPerPage = 3;    

    const columns = [
        {
          name: 'Hospital ID',
          selector: 'id',
          sortable: true,
        },
        {
          name: 'Generated Id',
          selector: 'code',
          sortable: true
        },
        {
          name: 'Date of Birth',
          selector: 'patients_dob',
          sortable: false
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: false
        },
        {
            name: 'Institution Name',
            selector: 'name_of_institution',
            sortable: true
        },
        {
            name: 'City',
            selector: 'city',
            sortable: true
        },
        {
            name: 'Country',
            selector: 'country',
            sortable: true
        },
        {
            name: "Options",
            sortable: false,
            cell: d => <div><a href={'demography/share/'+d.code}><svg data-v-9a6e255c="" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" id="invoice-row-4996-send-icon" className="cursor-pointer feather feather-send"><line data-v-9a6e255c="" x1="22" y1="2" x2="11" y2="13"></line><polygon data-v-9a6e255c="" points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></a><a style={{ color: "#7367f0"}} id={d.code} onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deletePatientRecord(e) } }><svg data-v-9a6e255c="" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="cursor-pointer mx-1 feather feather-trash"><polyline data-v-9a6e255c="" points="3 6 5 6 21 6"></polyline><path data-v-9a6e255c="" d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a><a href={'demography/edit/'+d.code}><svg data-v-9a6e255c="" xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-edit"><path data-v-9a6e255c="" d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path data-v-9a6e255c="" d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></a>
            </div>
        }
      ];

    /*useEffect(() => {
        fetch("/accounts")
            .then(response => response.json())
            .then((json) => setAccountStatus(json))
            accounts();
    }, [page]);*/

    const accounts = () => {
        const getUser = () => {
            const userStr = localStorage.getItem("users");
            if(userStr) return JSON.parse(userStr);
            else return null
        }
        const user = getUser();           
        if(user == null){
            return <Redirect to='/login' />
        }
        const userid = user.userid
        const role = user.role
        axios.get(`/question?page=${page}&per_page=${countPerPage}&submited_by=${userid}&role=${role}`).then(response => {
            setAccountStatus(response.data);
            setIsLoading(false)
            
        }).catch(err => {
            setAccountStatus([]);             
        });
        
                    
    }

    let data = accountStatus.data;
    const tableData = { columns, data };
    /*const  {isLoading } = state*/
    useEffect(() => {
        accounts();
    }, [page]);

    const deletePatientRecord = (e) => {
        //console.log(e.currentTarget.id)
        //const { history } = this.props;
        axios.post("/deletepatientdata/", { code: e.currentTarget.id }).then(response => {
            console.log(response.data.success)
            if(response.data.success == 'Details Deleted!'){
                //return <Redirect to='/dashboard'></Redirect>
                //this.props.history.push('/')
                //return (<Redirect from="*" to='/' />)
                window.location.reload();
            }            
        }).catch(err => {            
        });
    }
    return (
        <>
            <div className="card">
                <a href="/demography"><Button className="position-right-dash">Add New</Button></a>
                
                <DataTableExtensions {...tableData}>    
                {!isLoading ? (
                    <DataTable
                    columns={columns.data}
                    data={accountStatus.data}
                    highlightOnHover
                    pagination
                    title="Patients List"
                    paginationServer
                    searchPlaceholder
                    search
                    paginationTotalRows={accountStatus.total}
                    paginationPerPage={countPerPage}
                    paginationComponentOptions={{
                        noRowsPerPage: true
                    }}
                    onChangePage={page => setPage(page-1)}  
                    defaultSortField="id"
                    defaultSortAsc={false}                      
                    PageLength={3}                
                    />
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
                    </DataTableExtensions>            
               
            </div>
        </>
    );
};

export default withRouter(PatientsData);