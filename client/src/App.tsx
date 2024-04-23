import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useParams,useSearchParams } from 'react-router-dom';
import { Application } from '@prisma/client';
import MultiStepForm from './components/MultiStepForm';



function App() {

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')

    let dbApp = undefined;

    const fetchData = async () => {
                
        const response = await fetch(`http://localhost:8000/applications/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dbApp = data.application;
        return dbApp;
    }

    if(id){
        let dbApp = fetchData();
    }
    
    const [application, setApplication] = useState(dbApp);

    useEffect(() => {
        const fetchData = async () => {
                
        const response = await fetch(`http://localhost:8000/applications/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("fetched data: ", data);

        // Convert null db values to undefined so we can display them in the form
        let newApp = data.application
        
        // newApp = Object.fromEntries(
        //     Object.entries(newApp).map(([key, value]) => [key, value === null ? undefined : value])
        //   );

        // console.log("new obj: ", newApp);
        setApplication(newApp);

        };

        if(id){
            fetchData();
        }
    }, [id]);

    return (
        <>
            <div>
            <p>ID from URL: {id}</p>
        </div>
        <div className="card">
        {application ? (
          <p>Application: {JSON.stringify(application)}</p>
        ) : (
          <p>Provide a valid id in the URL parameters (ie: <a href='http://localhost:5173/?id=5'>http://localhost:5173/?id=5</a>) to display an application</p>
        )}

        {/* <MultiStepForm application={application} setApplication={setApplication}  /> */}
        <MultiStepForm   application={application}/>
      </div>
        </>
    );
}

export default App;
