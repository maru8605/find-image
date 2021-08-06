import './app.css'
import Form from './components/Form';

function App() {
  return (
    <div className='container'>
      <div className='jumbotron  heading'>
        <p className='h3 text-center'>Buscador de Imágenes</p>

        <Form/>
      </div>
    </div>
  );
}

export default App;
