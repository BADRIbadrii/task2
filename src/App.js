import React, { useState } from "react";
import "./App.css";

function App() {
  // State for checkboxes
  const [fruits, setFruits] = useState({
    Apple: false,
    Banana: false,
    Orange: false,
  });

  const [vegetables, setVegetables] = useState({
    Carrot: false,
    Broccoli: false,
    Potato: false,
  });

  const [selectAll, setSelectAll] = useState(false);

  // Handle select all
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setFruits({ Apple: checked, Banana: checked, Orange: checked });
    setVegetables({ Carrot: checked, Broccoli: checked, Potato: checked });
  };

  // Handle category
  const handleCategory = (category, checked) => {
    if (category === "fruits") {
      setFruits({ Apple: checked, Banana: checked, Orange: checked });
    } else {
      setVegetables({ Carrot: checked, Broccoli: checked, Potato: checked });
    }
  };

  // Handle individual item
  const handleItemChange = (category, item, checked) => {
    if (category === "fruits") {
      setFruits({ ...fruits, [item]: checked });
    } else {
      setVegetables({ ...vegetables, [item]: checked });
    }
  };

  // Check if categories are fully/partially selected
  const isCategoryChecked = (items) =>
    Object.values(items).every((val) => val === true);

  const isCategoryIndeterminate = (items) => {
    const values = Object.values(items);
    return values.some((v) => v) && !values.every((v) => v);
  };

  // Update selectAll state
  React.useEffect(() => {
    const allItems = { ...fruits, ...vegetables };
    const values = Object.values(allItems);
    if (values.every((v) => v)) {
      setSelectAll(true);
    } else if (values.every((v) => !v)) {
      setSelectAll(false);
    } else {
      setSelectAll(false);
    }
  }, [fruits, vegetables]);

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h2>Nested Checkbox</h2>

      {/* Select All */}
      <label>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
        Select All
      </label>

      {/* Fruits */}
      <div style={{ marginTop: "10px" }}>
        <label>
          <input
            type="checkbox"
            checked={isCategoryChecked(fruits)}
            ref={(el) => {
              if (el) el.indeterminate = isCategoryIndeterminate(fruits);
            }}
            onChange={(e) => handleCategory("fruits", e.target.checked)}
          />
          Fruits
        </label>
        <div style={{ marginLeft: "20px" }}>
          {Object.keys(fruits).map((fruit) => (
            <label key={fruit} style={{ display: "block", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={fruits[fruit]}
                onChange={(e) =>
                  handleItemChange("fruits", fruit, e.target.checked)
                }
              />
              {fruit}
            </label>
          ))}
        </div>
      </div>

      {/* Vegetables */}
      <div style={{ marginTop: "10px" }}>
        <label>
          <input
            type="checkbox"
            checked={isCategoryChecked(vegetables)}
            ref={(el) => {
              if (el) el.indeterminate = isCategoryIndeterminate(vegetables);
            }}
            onChange={(e) => handleCategory("vegetables", e.target.checked)}
          />
          Vegetables
        </label>
        <div style={{ marginLeft: "20px" }}>
          {Object.keys(vegetables).map((veg) => (
            <label key={veg} style={{ display: "block", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={vegetables[veg]}
                onChange={(e) =>
                  handleItemChange("vegetables", veg, e.target.checked)
                }
              />
              {veg}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
