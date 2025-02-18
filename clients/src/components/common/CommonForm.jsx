import React from "react";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {
  function renderInputsByComponentType(getControlType) {
    let element = null;
    const value = formData[getControlType.name] || "";
    switch (getControlType.componentType) {
      case "input":
        element = (
          <input
            type={getControlType.type}
            name={getControlType.name}
            placeholder={getControlType.placeholder}
            id={getControlType.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlType.name]: e.target.value,
              })
            }
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        );
        break;
      case "select":
        element = (
          <select
            name={getControlType.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlType.name]: e.target.value,
              })
            }
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          >
            <option value="" disabled>{getControlType.placeholder}</option>
            {getControlType.options && getControlType.options.length > 0
              ? getControlType.options.map((optionItem) => (
                  <option key={optionItem.id} value={optionItem.id}>
                    {optionItem.label}
                  </option>
                ))
              : null}
          </select>
        );
        break;
      case "textarea":
        element = (
          <textarea
            name={getControlType.name}
            placeholder={getControlType.placeholder}
            id={getControlType.name}
            value={value}
            onChange={(e) => {
              setFormData({
                ...formData,
                [getControlType.name]: e.target.value,
              });
            }}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        );
        break;
      default:
        element = (
          <input
            type={getControlType.type}
            name={getControlType.name}
            placeholder={getControlType.placeholder}
            id={getControlType.name}
            value={value}
            onChange={(e) => {
              setFormData({
                ...formData,
                [getControlType.name]: e.target.value,
              });
            }}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        );
        break;
    }
    return element;
  }

  return (
    <form onSubmit={onSubmit}  style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {formControls.map((control, index) => (
        <div key={index} style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor={control.name} style={{ marginBottom: "5px" }}>
            {control.label}
          </label>
          {renderInputsByComponentType(control)}
        </div>
      ))}
      <button type="submit" style={{ padding: "10px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        {buttonText || "Submit"}
      </button>
    </form>
  );
}

export default CommonForm;