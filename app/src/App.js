import Form from "./components/Form";
import React, { useState, useEffect } from 'react';
import ImagesList from "./components/ImagesList";

function App() {
  const [search, setSearch] = useState('')
  const [images, setImages] = useState([])
  useEffect(() => {
    if (search === '') return
    const fetchApi = async () => {
      const imagesOnPage = 30
      const key = '20207494-b463ec48faf99f1ad0e64ff2b'
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesOnPage}`
      const response = await fetch(url)
      const result = await response.json()
      setImages(result.hits)
    }
    fetchApi()
  }, [search])

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Images Browser</p>
        <Form
          setSearch={setSearch}
        />
      </div>
      <div className="row justify-content-center">
        <ImagesList
          images={images}
        />
      </div>
    </div>
  );
}

export default App;
