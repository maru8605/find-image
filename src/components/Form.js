import React from 'react'
import {useState} from 'react'
import Error from './Error'

const Form = ({saveSearch}) => {

    const [terms, saveTerms] = useState('')
    const [error, saveError] = useState(false)


    const searchImage = e => {
        e.preventDefault()

        // validar form
        if(terms.trim()=== ''){
            saveError(true)
            return
        }
        // enviar busqueda al componente principal.
        saveError(false)
        saveSearch(terms)
    }

    return (
        <form onSubmit={searchImage}>
            <div className='row'>
                <div className='form-group col-md-8'>
                    <input
                        type='text'
                        className='form-control form-control-lg'
                        placeholder='Buscar Imagen..'
                        onChange={e => saveTerms(e.target.value)}
                    />
                </div >
                <div className='form-group col-md-4'>
                    <input
                        type='submit'
                        className='btn btn-lg btn-danger btn-block'
                        value='Buscar'
                    />
                </div>
            </div>
            {error ? <Error mensaje='Agrega un término de búsqueda'/> : null}
        </form>
    )
}

export default Form
