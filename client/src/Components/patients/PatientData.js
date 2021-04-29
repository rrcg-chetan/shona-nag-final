import React, { useState } from "react";
import PatientsData from '../Components/patinet/PatientsData';

const PatientData = () => {
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h3>Patient Data</h3>
                    <PatientsData />
                </div>
            </div>            
        </>
    );
};

export default PatientData;