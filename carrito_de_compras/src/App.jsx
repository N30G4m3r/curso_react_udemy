import { useState, useEffect } from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db'


function App() {
  //State
  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])
  //Effect
  // useEffect(() => {
  //   setData(db)
  // }, [])

  function addToCart(item) {
    const itemExists = cart.findIndex((value) => value.id === item.id)
    console.log(`existe el item con el id (${item.id})?: ${itemExists}`)
    if(itemExists < 0) {
      console.log(`Agregar al carrito el item con ID: ${item.id}`)
      item.quantity = 1
      setCart([...cart, item])
    } else {
      const updatedCart = [...cart]
      console.log(`Ya existe el item con el ID: ${item.id}, que tiene una cantidad ${updatedCart[itemExists].quantity}`)
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    }
  }

  return (
    <>
      <Header cart={cart} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((value) => (
            <Guitar key={value.id} guitar={value} cart={cart} addToCart={addToCart} />
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
