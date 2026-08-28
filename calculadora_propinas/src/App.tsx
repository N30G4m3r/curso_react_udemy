import { useCallback } from "react"
import MenuItem from "./components/MenuItem"
import OrderContents from "./components/OrderContents"
import OrderTotals from "./components/OrderTotals"
import TipPorcentageForm from "./components/TipPorcentageForm"
import { menuItems } from "./data/db"
import useOrder from "./hooks/useOrder"


function App() {
  const { order, tip, setTipProcentage, addItemToOrder, removeItemFromOrder, placeOrder } = useOrder()

  const orderView = useCallback(() => {
    if (order.length <= 0) return (<p className="text-center">La orden esta vacía</p>)
    return (
      <>
        <OrderContents
          order={order}
          removeItemFromOrder={removeItemFromOrder}
        />

        <TipPorcentageForm
          setTipProcentage={setTipProcentage}
        />

        <OrderTotals
          order={order}
          tip={tip}
          placeOrder={placeOrder}
        />
      </>
    )
  }, [order, tip, setTipProcentage, removeItemFromOrder, placeOrder])

  return (
    <>
      <header className="bg-teal-400 py-5">
        <h1 className="text-center text-4xl font-black">Calculadora de Propinas y Consumo</h1>
      </header>

      <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="text-4xl font-black">Menu</h2>

          <div className="space-y-3 mt-10">
            {menuItems.map(item => (
              <MenuItem
                key={item.id}
                item={item}
                addItemToOrder={addItemToOrder}
              />
            ))}
          </div>
        </div>

        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
            {orderView()}
        </div>
      </main>
    </>
  )
}

export default App
