import React, { useState } from 'react';
import Error from './Error';

const Form = ({ setSearch }) => {
  const [word, setWord] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.trim() === '') {
      setError(true)
    }
    setError(false)
    setSearch(word)
  }

  return (
    <form
      onSubmit={e => handleSubmit(e)}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type='text'
            className="form-control form-control-lg"
            placeholder='Search image, ex: coffee'
            onChange={e => setWord(e.target.value)}
            value={word}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type='submit'
            className="btn btn-lg btn-danger btn-block"
            placeholder='Search'
          />
        </div>
      </div>
      {error && <Error msg='Type something' />}
    </form>
  );
}

export default Form;
