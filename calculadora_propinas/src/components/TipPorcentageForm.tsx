import { useMemo } from "react"
import { tipOptions } from "../data/db"

type TipPorcentageFormProps = {
    tip: number;
    setTipProcentage: (procentage: number) => void;
}

export default function TipPorcentageForm({ tip, setTipProcentage }: TipPorcentageFormProps) {
    const formPorcentaje = useMemo(() => tipOptions.map(tipOption => (
        <div key={tipOption.id} className="flex gap-2">
            <label htmlFor={tipOption.id}>{tipOption.label}</label>
            <input
                id={tipOption.id}
                type="radio"
                name="tip"
                value={tipOption.value}
                onChange={(e) => setTipProcentage(+e.target.value)}
                checked={tipOption.value === tip}
            />
        </div>
    )), [tip])
    return (
        <div>
            <h3 className="font-black text-2xl">Propina:</h3>

            <form>
                {formPorcentaje}
            </form>
        </div>
    )
}