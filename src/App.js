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

      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imgPerPages}`
      const respuesta = await fetch(url)
      const result =  await respuesta.json()

      saveImages(result.hits)

      const calcTotalPages = Math.ceil(result.totalHits / imgPerPages);
      saveTotalPages(calcTotalPages)

    }
    consultApi()
  }, [search])

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
      </div>
    </div>
  );
}

export default App;
