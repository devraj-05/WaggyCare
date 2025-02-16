import React from "react";
import "./DogOwner.css";

const DogOwner = () => {
  const owner = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Pet Street, Dogtown, USA",
  };

  const dogs = [
    {
      name: "Buddy",
      breed: "Golden Retriever",
      age: 3,
      weight: "30kg",
      image: "https://placedog.net/300/200",
    },
    {
      name: "Max",
      breed: "German Shepherd",
      age: 5,
      weight: "35kg",
      image: "https://placedog.net/301/200",
    },
  ];

  return (
    <div className="dog-owner-container">
      <h1>Dog Owner Details</h1>
      <div className="owner-card">
        <h2>{owner.name}</h2>
        <p>Email: {owner.email}</p>
        <p>Phone: {owner.phone}</p>
        <p>Address: {owner.address}</p>
      </div>

      <h2>Dogs</h2>
      <div className="dog-list">
        {dogs.map((dog, index) => (
          <div key={index} className="dog-card">
            <img src={dog.image} alt={dog.name} />
            <h3>{dog.name}</h3>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age} years</p>
            <p>Weight: {dog.weight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogOwner;
