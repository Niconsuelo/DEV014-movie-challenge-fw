import React, { useState } from "react";
import "../styles/SelectNav.css";

type OptionType = {
  value: string;
  label: string;
};

const options: OptionType[] = [
  { value: "Option 1", label: "Option 1" },
  { value: "Option 2", label: "Option 2" },
  { value: "Option 3", label: "Option 3" },
  { value: "Option 4", label: "Option 4" },
];

const SelectComponent: React.FC = () => {
  //el estado selectoption es null
  //selectOption puede ser optiontype o null
  //setSelectOption funcion actualiza el estado
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  return (
    //renderizado

    <div >
      <select className="select-nav-bar"
        // selectoption no es null, usamos selecedoption.value
        // selectedOption es null, usamos una cadena vacía ''
        value={selectedOption ? selectedOption.value : ""}
        // maneja los cambios en select
        onChange={(e) => {
          //e.target.value obtiene el valor seleccionado
          const value = e.target.value;
          //busca opcion en options
          //value es el valor seleccionado
          //si no encuentra ninguna opcion, option sera null
          //opt representa cada elemento de options
          const option = options.find((opt) => opt.value === value) || null;
          // opt.value accede a la propiedad value del objeto opt.
          // value es el valor que se seleccionó en el evento onChange.

          setSelectedOption(option);
        }}
      >
        <option value="" disabled>
          Select option
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
//map itera sobre options
//renderiza option
//key clave unica para cada opcion
// value valor de la opcion
//option laber texto visible de la opcion
export default SelectComponent;
