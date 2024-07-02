import "../styles/ListOptions.css";
import GenresOptions from "../models/GenresOptions";

//interface GenresOptions contiene value, label.

interface OptionProps {
  options: GenresOptions[];
  selected: GenresOptions | null;
  onChangeOption: (e: any) => void;
}

const SelectComponent: React.FC<OptionProps> = ({
  options,
  selected,
  onChangeOption,
}) => {

  return (
    //renderizado

    <div>
      <select
        className="select-nav-bar"
        // selectoption no es null, usamos selectedoption.value
        // selectedOption es null, usamos una cadena vacía ''
        value={selected ? selected.value : ""}
        // maneja los cambios en select
        onChange={onChangeOption}
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
