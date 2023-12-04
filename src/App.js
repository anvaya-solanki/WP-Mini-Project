// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './SearchBar';
import Navbar from './Navbar';

function App() {
  const [dogs, setDogs] = useState([]);
  const [newDog, setNewDog] = useState({ name: '', breed: '', age: 0, image: null });

  useEffect(() => {
    axios.get('http://localhost:5000/api/dogs').then((response) => setDogs(response.data));
  }, []);

  const handleAddDog = () => {
    const formData = new FormData();
    formData.append('name', newDog.name);
    formData.append('breed', newDog.breed);
    formData.append('age', newDog.age);
    formData.append('image', newDog.image);

    axios.post('http://localhost:5000/api/dogs', formData).then((response) => {
      setDogs([...dogs, response.data]);
      setNewDog({ name: '', breed: '', age: 0, image: null });
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewDog((prevDog) => ({ ...prevDog, image: file }));
  };

  return (
    <div className='Main'>
    <Navbar/>
    <div className="container">
    
      <h1 className='title'>ADOPT A PAW</h1>
      <div className='bgimg'>
        <div className="dog-form">
        <h1>Register Dog for adoption</h1>
          <input
            className='input'
            type="text"
            placeholder="Dog Name"
            value={newDog.name}

            onChange={(e) => setNewDog({ ...newDog, name: e.target.value })}
            
          />
          <input
            className='input'
            type="text"
            placeholder="Dog Breed"
            value={newDog.breed}
            onChange={(e) => setNewDog({ ...newDog, breed: e.target.value })}
          />
          <input
            className='input'
            type="number"
            placeholder="Dog Age"
            value={newDog.age}
            onChange={(e) => setNewDog({ ...newDog, age: e.target.value })}
          />

          <input type="file" onChange={handleImageUpload} />
          <button onClick={handleAddDog}>Add Dog</button>
        </div></div>
        <SearchBar/>
      <div className="dog-list">
        {dogs.map((dog) => (
          <div key={dog._id} className="dog-card">
            {dog.image && <img src={`http://localhost:5000/uploads/${dog.image}`} alt={dog.name} />}
            <h3>{`Name:${dog.name}`}</h3>
            <p>{`Breed:${dog.breed}`}</p>
            <p>{`Age: ${dog.age}`}</p>
          </div>
        ))}
      </div>
    </div></div>
  );
}

export default App;
