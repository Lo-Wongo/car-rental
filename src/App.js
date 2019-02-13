import React, { Component } from 'react';
// import logo from './mainStreetAuto.svg';
import axios from 'axios';
import './App.css';
import renters from './data/renters.json'
// import SecondComponent from './SecondComponent';

// Toast notification dependencies
import { ToastContainer, toast } from 'react-toastify';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehiclesToDisplay: [],
      rentersToDisplay: []
    };

    this.getVehicles = this.getVehicles.bind(this);
    this.getPotentialBuyers = this.getPotentialBuyers.bind(this);
    this.sellCar = this.sellCar.bind(this);
    this.addCar = this.addCar.bind(this);
    this.filterByColor = this.filterByColor.bind(this);
    this.filterByMake = this.filterByMake.bind(this);
    this.addRenter = this.addRenter.bind(this);
    this.nameSearch = this.nameSearch.bind(this);
    this.resetData = this.resetData.bind(this);
    this.byYear = this.byYear.bind(this);
    this.deleteBuyer = this.deleteBuyer.bind(this);
  }

  getVehicles() {
    // axios (GET), makes a GET request to receive all the vehicles
    axios.get('https://joes-autos.herokuapp.com/api/vehicles').then(results => {
      toast.success("Successfully got Vehicles.");
      //or toast.success(`${results.data.lenth} cars found`)
      // setState with response -> vehiclesToDisplay
      this.setState({ 'vehiclesToDisplay': results.data });
    }).catch(() => toast.error("Failed at fetching Vehicles"));
  }

  getPotentialBuyers() {
    // axios (GET)
    // setState with response -> buyersToDisplay
  }

  sellCar(id) {
    // axios (DELETE)
    axios.delete(`https://joes-autos.herokuapp.com/api/vehicles/${id}`).then(results => {
      toast.success("Successfully sold car.");
      // setState with response -> vehiclesToDisplay
      this.setState({ 'vehiclesToDisplay': results.data.vehicles });
    }).catch(() => toast.error("Failed at selling car."));
  }

  filterByMake() {
    let make = this.refs.selectedMake.value;

    // axios (GET)
    // setState with response -> vehiclesToDisplay
  }

  filterByColor() {
    let color = this.refs.selectedColor.value;

    // axios (GET)
    // setState with response -> vehiclesToDisplay

    axios.get(`https://joes-autos.herokuapp.com/api/vehicles?color=${color}`)
      .then((results) => {
        this.setState({
          vehiclesToDisplay: results.data
        })
        toast.success(`Found ${results.data.length} cars`);
      })
  }

  updatePrice(priceChange, id) {
    // axios (PUT)
    axios.put(`https://joes-autos.herokuapp.com/api/vehicles/${id}/${priceChange}`).then(results => {
      toast.success("Successfully updated price.");
      // setState with response -> vehiclesToDisplay
      this.setState({ 'vehiclesToDisplay': results.data.vehicles });
    }).catch(() => toast.error("Failed at updating price"));
  }

  addCar() {
    let newCar = {
      make: this.refs.make.value,
      model: this.refs.model.value,
      color: this.refs.color.value,
      year: this.refs.year.value * 1,
      price: this.refs.price.value * 1
    };

    // axios (POST)
    axios.post('https://joes-autos.herokuapp.com/api/buyers', newCar).then(results => {
      toast.success("Successfully added vehicle.");
      // setState with response -> vehiclesToDisplay
      this.setState({ vehiclesToDisplay: results.data.vehicles });
    }).catch(() => toast.error('Failed at adding new vehicle.'));
  }

  addRenter() {
    let newRenter = {
      name: this.refs.name.value,
      phone: this.refs.phone.value,
      address: this.refs.address.value
    };

    //axios (POST)
    // setState with response -> buyersToDisplay
    axios.post('/api/renters.json', newRenter).then(results => {
      toast.success("Successfully added New Buyer.");
      this.setState({ rentersToDisplay: results.data.renters });
    }).catch(() => toast.error('Failed at adding new renters'));
  }

  deleteBuyer(id) {
    // axios (DELETE)
    //setState with response -> buyersToDisplay
  }

  nameSearch() {
    let searchLetters = this.refs.searchLetters.value;

    // axios (GET)
    // setState with response -> buyersToDisplay
  }

  byYear() {
    let year = this.refs.searchYear.value;

    // axios (GET)
    // setState with response -> vehiclesToDisplay
  }

  // Do not edit the code below
  resetData(dataToReset) {
    axios.get('https://joes-autos.herokuapp.com/api/' + dataToReset + '/reset').then(res => {
      if (dataToReset === 'vehicles') {
        this.setState({ vehiclesToDisplay: res.data.vehicles });
      } else {
        this.setState({ buyersToDisplay: res.data.buyers });
      }
    });
  }
  // Do not edit the code above

  render() {
    const vehicles = this.state.vehiclesToDisplay.map(v => {
      return (
        <div key={v.id}>
          {/* <SecondComponent prop1="Conner" prop2="Jensen" prop3="whatever" /> */}
          <p>Make: {v.make}</p>
          <p>Model: {v.model}</p>
          <p>Year: {v.year}</p>
          <p>Color: {v.color}</p>
          <p>Price: {v.price}</p>

          <button className='btn btn-sp'
            onClick={() => this.updatePrice('up', v.id)}>
            Increase Price
          </button>

          <button className='btn btn-sp'
            onClick={() => this.updatePrice('down', v.id)}>
            Decrease Price
          </button>

          <button className='btn btn-sp'
            onClick={() => this.sellCar(v.id)}>
            RENTED!
          </button>

          <hr className='hr' />
        </div>
      )
    });

    const renters = this.state.rentersToDisplay.map(person => {
      return (
        <div key={person.id}>
          <p>Name: {person.name}</p>
          <p>Phone: {person.phone}</p>
          <p>Address: {person.address}</p>

          <button className='btn'
            onClick={() => { this.deleteBuyer(person.id) }}>
            No longer interested
          </button>

          <hr className='hr' />
        </div>
      )
    });

    return (
      <div className=''>
        <ToastContainer />

        <header className='header'>
          {/* <img src={logo} alt="" /> */}

          <button className="header-btn1 btn"
            onClick={() => this.resetData('vehicles')}>
            Reset Vehicles
          </button>

          <button className='header-btn2 btn'
            onClick={() => this.resetData('buyers')}>
            Reset Renters
          </button>
        </header>

        <div className='btn-container'>
          <button className='btn-sp btn'
            onClick={this.getVehicles}>
            Get All Vehicles
          </button>

          <select onChange={this.filterByMake}
            ref='selectedMake'
            className='btn-sp'
            value="">
            <option value="" disabled>Filter by make</option>
            <option value="Suzuki">Suzuki</option>
            <option value="GMC">GMC</option>
            <option value="Ford">Ford</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Cadillac">Cadillac</option>
            <option value="Dodge">Dodge</option>
            <option value="Chrysler">Chrysler</option>
          </select>

          <select ref='selectedColor'
            onChange={this.filterByColor}
            className='btn-sp'
            value="">
            <option value="" disabled>Filter by color</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="Purple">Purple</option>
            <option value="indigo">Indigo</option>
            <option value="violet">Violet</option>
            <option value="teal">Teal</option>
          </select>

          <input onChange={this.nameSearch}
            placeholder='Search by name'
            type="text"
            ref='searchLetters' />

          <input ref='searchYear'
            className='btn-sp'
            type='number'
            placeholder='Year' />

          <button onClick={this.byYear}
            className='btn-inp'>
            Go
          </button>

          <button className='btn-sp btn'
            onClick={this.getPotentialBuyers}>
            Get Potential Renters
          </button>
        </div>

        <br />

        <p className='form-wrap'>
          <input className='btn-sp' placeholder='make' ref="make" />
          <input className='btn-sp' placeholder='model' ref='model' />
          <input type='number' className='btn-sp' placeholder='year' ref='year' />
          <input className='btn-sp' placeholder='color' ref='color' />
          <input type='number' className='btn-sp' placeholder='price' ref='price' />

          <button className='btn-sp btn'
            onClick={this.addCar}>
            Add vehicle
          </button>
        </p>

        <p className='form-wrap'>
          <input className='btn-sp' placeholder='name' ref='name' />
          <input className='btn-sp' placeholder='phone' ref='phone' />
          <input className='btn-sp' placeholder='address' ref='address' />

          <button onClick={this.addRenter}
            className='btn-sp btn' >
            Add Renter
          </button>
        </p>

        <main className='main-wrapper'>
          <section className='info-box'>
            <h3>Inventory</h3>

            {vehicles}
          </section>

          <section className='info-box'>
            <h3>Potential Renters</h3>

            {renters}
          </section>
        </main>
      </div>
    );
  }
}

export default App;

