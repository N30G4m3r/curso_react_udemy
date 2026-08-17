import { useState, useEffect } from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db'


function App() {
  //State
  const [data, setData] = useState(db)
  //Effect
  // useEffect(() => {
  //   setData(db)
  // }, [])

  return (
    <>
      <Header />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((value) => (
            <Guitar key={value.id + 'a'} id={value.id} name={value.name} image={value.image} description={value.description} price={value.price} />
          ))}
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
