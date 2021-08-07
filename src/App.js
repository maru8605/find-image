import './app.css'
import {useState, useEffect} from 'react'
import Form from './components/Form';

function App() {

  const [search, saveSearch] = useState('')

  useEffect(() => {
    
    const consultApi = async() =>{
      if(search === '') return; 

      const imgPerPages = 30;
      const key = '22817022-cf6b144122a13df89ef5829cd'

      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imgPerPages}`
      const respuesta = await fetch(url)
      const result =  await respuesta.json()

      saveSearch(result.hits)

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
    </div>
  );
}

export default App;
