import { Application } from "express";
import * as React from "react";
import applicationModel from "../../../api/types/modelTypes/applicationModel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VehicleBuilder from "./VehicleBuilder";


const initialFormData: applicationModel = {
  firstName: undefined,
  lastName: undefined,
  dateOfBirth: undefined,
  streetAddress: undefined,
  city: undefined,
  state: undefined,  
  zipcode: undefined,
  vehicles: undefined,
};

export default function MultiStepForm({application}) {
  const [currentStep, setCurrentStep] = React.useState(1);

  const [formData, setFormData] = React.useState(application? application : initialFormData);

  console.log("we got: ", application);
  // console.log("applications: ", application? application : initialFormData); 
  // console.log("initialized form with: ", formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateDate = (date: Date | null) => {
    if (!date) return;
    console.log("latest date: ", date);
    setFormData({ ...formData, dateOfBirth: date });
  }

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your submission");
    setCurrentStep(1);
    setFormData(initialFormData);
  };

  if (currentStep === 1) {
    return (
      //todo: return this form only if application has value
      <form onSubmit={handleSubmit}>
        <h2>Fill Out Your Personal Information</h2>
        <div>
          <label>Step {currentStep} of 3</label>
          <progress value={currentStep} max={3} />
        </div>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            required
            name="firstName"
            id="firstName"
            placeholder="Enter your first name"
            value={formData.firstName ? formData.firstName : ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input
            required
            name="lastName"
            id="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date Of Birth: </label>
          <DatePicker 
          name="dateOfBirth" 
          id="dateOfBirth"
          value={formData.dateOfBirth ? formData.dateOfBirth.toDateString() : ''}
          selected={formData.dateOfBirth}
          onChange={(date) => updateDate(date)} />
        </div>
        <div>
          <label htmlFor="streetAddress">Street Address: </label>
          <input
            required
            name="streetAddress"
            id="streetAddress"
            type="address"
            placeholder="Enter your street address"
            value={formData.streetAddress}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="city">City: </label>
          <input
            required
            name="city"
            id="city"
            placeholder="Enter your city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="state">State: </label>
          <input
            required
            name="state"
            id="state"
            placeholder="Enter your state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="zipcode">Zipcode: </label>
          <input
            required
            name="zipcode"
            id="zipcode"
            type="number"
            placeholder="What is your zipcode?"
            value={formData.zipcode}
            onChange={handleChange}
          />
        </div>
        <button type="button" className="secondary" onClick={handleNextStep}>
          Next
        </button>
      </form>
    );
  } else if (currentStep === 2) {
    return (
      // <form onSubmit={handleSubmit}>
      <div>
        <h2>Vehicles</h2>
        <div>
          <label>Step {currentStep} of 3</label>
          <progress value={currentStep} max={3} />
        </div>
        <VehicleBuilder formData={formData} setFormData={setFormData}/>
        <div>
          <button type="button" className="link" onClick={handlePrevStep}>
            Previous
          </button>
          <button className="secondary" type="button" onClick={handleNextStep}>
            Next
          </button>
        </div>
      </div>
      // </form>
    );
  } else if (currentStep === 3) {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Confirm your information:</h2>
        <div>
          <label>Step {currentStep} of 3</label>
          <progress value={currentStep} max={3} />
        </div>
        <table>
          <tbody>
            {/* {Object.keys(formData).map((key) => {
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{formData[key]}</td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
        <div>
          <button className="primary" type="submit">
            Submit
          </button>
          <button type="button" className="link" onClick={handlePrevStep}>
            Previous
          </button>
        </div>
      </form>
    );
  } else {
    return null;
  }
}
