import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useParams,useSearchParams } from 'react-router-dom';
import { Application } from '@prisma/client';


function App() {

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')

    const [application, setApplication] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch(`http://localhost:8000/applications/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("fetched data: ", data);
        setApplication(data.application);

        };
        fetchData();
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
          <p>Loading application...</p>
        )}
      </div>
        </>
    );
}

export default App;
