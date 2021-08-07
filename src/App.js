import './app.css'
import {useState, useEffect} from 'react'
import Form from './components/Form';
import ListadoImagenes from './components/ListadoImagenes';


function App() {

  const [search, saveSearch] = useState('')
  const [imagenes, saveImages] = useState([])
  const [actualpage, saveActualPage] = useState(1)
  const [totalpages, saveTotalPages] = useState(1)

  useEffect(() => {
    
    const consultApi = async() =>{
      if(search === '') return; 

      const imgPerPages = 30;
      const key = '22817022-cf6b144122a13df89ef5829cd'

      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imgPerPages}&page=${actualpage}`
      const respuesta = await fetch(url)
      const result =  await respuesta.json()

      saveImages(result.hits)

      const calcTotalPages = Math.ceil(result.totalHits / imgPerPages);
      saveTotalPages(calcTotalPages)


      // mover la vista hacia arriba cuando pasamos pagina
      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({behavior: 'smooth'})
    }
    consultApi()
  }, [search, actualpage])

// pagina anterior
  const previusPage = () => {

    const newActualPage = actualpage - 1

     if(newActualPage === 0) return;

    saveActualPage(newActualPage)
  }
  // pagina siguiente
  const nextPage =()=>{
    const newActualPage = actualpage + 1

    if(newActualPage > totalpages) return;

    saveActualPage(newActualPage)
  }

  return (
    <div className='container'>
      <div className='jumbotron  heading'>
        <p className='h3 text-center'>Buscador de Imágenes</p>

        <Form
          saveSearch={saveSearch}
        />
        
      </div>
      <div className='row justify-content-center'>
        <ListadoImagenes
          imagenes={imagenes}
        />

        { (actualpage === 1) ? null : (
          <button
            type='button'
            className='btn btn-info mr-1'
            onClick={previusPage}
          >&laquo; Anterior</button>
        )}

       { (actualpage === totalpages) ? null : (
          <button
          type='button'
          className='btn btn-info '
          onClick={nextPage}
        > Siguiente &raquo; </button>
       )}
      </div>
    </div>
  );
}

export default App;
