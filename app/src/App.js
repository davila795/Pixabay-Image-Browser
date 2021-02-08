import Form from "./components/Form";
import React, { useState, useEffect } from 'react';
import ImagesList from "./components/ImagesList";

function App() {
  const [search, setSearch] = useState('')
  const [images, setImages] = useState([])
  const [currentpage, setCurrentPage] = useState(1)
  const [totalpages, setTotalPages] = useState(1)

  useEffect(() => {
    if (search === '') return
    const fetchApi = async () => {
      const imagesOnPage = 30
      const key = '20207494-b463ec48faf99f1ad0e64ff2b'
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesOnPage}&page=${currentpage}`
      const response = await fetch(url)
      const result = await response.json()
      setImages(result.hits)
      const AmountOfPages = Math.ceil(result.totalHits / imagesOnPage)
      setTotalPages(AmountOfPages)
      const jumbotron = document.querySelector('.jumbotron')  //  Move to the top of the page every time you have a other images
      jumbotron.scrollIntoView({ behavior: "smooth" })
    }
    fetchApi()
  }, [search, currentpage])

  const previousPage = (e) => {
    const newCurrentPage = currentpage - 1
    if (newCurrentPage < 1) return
    setCurrentPage(newCurrentPage)
  }

  const nextPage = (e) => {
    const newCurrentPage = currentpage + 1
    if (newCurrentPage > totalpages) return
    setCurrentPage(newCurrentPage)
  }

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
        {(currentpage !== 1) && (
          <button
            type='button'
            className='bbtn btn-info mr-1'
            onClick={e => previousPage(e)}
          >&laquo; Previous</button>
        )}
        {(currentpage !== totalpages) && (
          <button
            type='button'
            className="bbtn btn-info"
            onClick={e => nextPage(e)}
          >Next &raquo;</button>
        )}
      </div>
    </div>
  );
}

export default App;
