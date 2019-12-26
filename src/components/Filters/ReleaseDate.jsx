import React from "react";

import { Select } from "./Select.jsx";

export const ReleaseDate = ({ onChangeFilters, yearsList, year }) => (
  <div className="release-date-wrapper">
    <Select
      id="sort_by_year"
      labelText="Сортировать по годам:"
      name="year"
      value={year}
      onChange={onChangeFilters}
      array={yearsList}
      defaultValue="Выберите год"
    />
  </div>
);
