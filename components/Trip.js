import React from 'react'


const Trip=(props)=>(

  <div className="container">
    <h1>Select your destination</h1>
    <form  className="form" onSubmit={props.selectDest}>
      <div className="form-group row">
        <div className="col-md-12">
          <input type="radio" name="dest"  value="CBD/Athi River" className='form-check-input'/>
          <label>CBD/Athi River</label>
        </div>
      </div>

      <div className="form-group row">
        <div className="col-md-12">
          <input type="radio" name="dest"  value="Donholm" className='form-check-input'/>
          <label>Donholm</label>
        </div>
      </div>

      <div className="form-group row">
        <div className="col-md-12">
          <input type="radio" name="dest"  value="Strathmore" className='form-check-input'/>
          <label>Strathmore</label>
        </div>
      </div>

      <div className="form-group row">
        <div className="col-md-12">
          <input type="radio" name="dest"  value="Langata" className='form-check-input'/>
          <label>Langata</label>
        </div>
      </div>

      <div className="form-group row">
        <div className="col-md-12">
          <button type="submit" className="btn-success btn">Start trip</button>
        </div>
      </div>
    </form>
  </div>

)

export default Trip;
