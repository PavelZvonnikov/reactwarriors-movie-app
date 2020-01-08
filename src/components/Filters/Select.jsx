import React from "react";

/**
 * Компонент выбора элементов
 *
 * @param labelText - подпись текста
 * @param name - имя селекта
 * @param id - уникальный ID для привязки тайтла
 * @param value - выбранное значение
 * @param onChange - обработчик изменения значения
 * @param array - массив элементов для выбора
 */
export const Select = ({
  labelText,
  name,
  value,
  onChange,
  id,
  array,
  defaultValue = ""
}) => {
  return (
    <div>
      <label htmlFor={id}>{labelText}</label>
      <select
        className="form-control my-form-control"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      >
        {defaultValue ? <option value="0">{defaultValue}</option> : "0"}
        {array.map(elem => (
          <option key={elem.value} value={elem.value}>
            {elem.label}
          </option>
        ))}
      </select>
    </div>
  );
};
