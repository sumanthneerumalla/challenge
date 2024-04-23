import * as React from "react";

export default function VehicleBuilder({formData, setFormData}) {
  const [vehicles, setVehicles] = React.useState(formData.vehicles || []);
  let formFields = [];

  const handleAddVehicle = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newVehicle = {
      id: new Date().getTime(),
      vin: formData.get("vin"),
      year: formData.get("year"),
      make: formData.get("make"),
      model: formData.get("model"),
    };
    //   @ts-ignore
    setVehicles([...vehicles, newVehicle]);

    // setFormFields([...formFields, newField]);
    e.target.reset();
  };

  const handleUpdateVehicleField = (id, updatedField) => {

    const updatedVehicles = vehicles.map((vehicle) =>
        vehicle.id === id ? { ...vehicle, ...updatedField } : vehicle
    );
    setVehicles(updatedVehicles);
  };

  const handleDeleteVehicle = (id) => {
    const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== id);
    setVehicles(updatedVehicles);
  };

  const saveVehicles = (e) => {
    e.preventDefault();

    let vehiclesToSave = vehicles.map((vehicle) => {
      const { id, ...vehicleWithoutId } = vehicle;
      return vehicleWithoutId;
    });
    
    setFormData({...formData,["vehicles"]: vehiclesToSave});
  };

  return (
    <div>
      <h1>Add vehicles to your policy</h1>
      <form id="vehicle-builder" onSubmit={handleAddVehicle}>
        <fieldset>
          <legend>Add a Vehicle</legend>
          <label htmlFor="vin">Vin</label>
          <input
            required
            type="text"
            name="vin"
            id="vin"
            placeholder="Enter a VIN"
          />
          <label htmlFor="year">Year</label>
          <input
            required
            type="numeric"
            id="year"
            name="year"
            placeholder="Enter a Year"
          />
          <label htmlFor="make">Make</label>
          <input
            required
            type="text"
            id="make"
            name="make"
            placeholder="Enter a Make"
          />
          <label htmlFor="model">Model</label>
          <input
            required
            type="text"
            id="model"
            name="model"
            placeholder="Enter a model"
          />
          <button type="submit" className="secondary">
            Add Vehicle
          </button>
        </fieldset>
      </form>
        <fieldset>
          <legend>Vehicles</legend>
          <ul>
            {vehicles.map((vehicle) => (
              <li key={vehicle.id}>
                <label htmlFor={`vin-${vehicle.id}`}>Vin</label>
                <input
                  type="text"
                  id={`vin-${vehicle.id}`}
                  name={`vin`}
                  placeholder="Enter a Vin"
                  value={vehicle.vin}
                  onChange={(e) =>
                    handleUpdateVehicleField(vehicle.id, {[e.target.name]: e.target.value })
                  }
                />
                <label htmlFor={`year-${vehicle.id}`}>Year</label>
                <input
                  type="numeric"
                  id={`year-${vehicle.id}`}
                  name={`year`}
                  placeholder="Enter a Year"
                  value={vehicle.year}
                  onChange={(e) =>
                    handleUpdateVehicleField(vehicle.id, {[e.target.name]: e.target.value })
                  }
                />
                <label htmlFor={`make-${vehicle.id}`}>Make</label>
                <input
                  type="text"
                  id={`make-${vehicle.id}`}
                  name={`make`}
                  placeholder="Enter a Make"
                  value={vehicle.make}
                  onChange={(e) =>
                    handleUpdateVehicleField(vehicle.id, {[e.target.name]: e.target.value })
                  }
                />
                <label htmlFor={`model-${vehicle.id}`}>Model</label>
                <input
                  type="text"
                  id={`model-${vehicle.id}`}
                  name={`model`}
                  placeholder="Enter a Model"
                  value={vehicle.model}
                  onChange={(e) =>
                    handleUpdateVehicleField(vehicle.id, {[e.target.name]: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="secondary"
                  onClick={() => handleDeleteVehicle(vehicle.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <span>Your vehicles will show here</span>
          <button className="primary" onClick={saveVehicles}>Save Vehicles</button>
        </fieldset>
    </div>
  );
}