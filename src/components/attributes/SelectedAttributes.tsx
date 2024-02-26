import { useState } from "react";
import { Attribute } from "../../models/AttributeSet";

interface SelectedAttributesProps {
  attribute: Attribute;
  className: string;
}

const SelectedAttributes = ({
  attribute,
  className,
}: SelectedAttributesProps) => {
  const [selectedAttributeSet] = useState(attribute);

  return (
    <section className={className}>
      <h3>{selectedAttributeSet.id}:</h3>
      <section className='buttons'>
        {selectedAttributeSet?.items?.map((item) => (
          <section
            key={item.id}
            className={
              selectedAttributeSet.id === "Color" && item.isSelected
                ? "selected-color-box-section"
                : "unselected-color-box-section"
            }>
            {selectedAttributeSet.id === "Color" ? (
              <button
                className={
                  item.isSelected
                    ? "selected-color-box"
                    : "unselected-color-box"
                }
                style={{ backgroundColor: `${item.value}` }}></button>
            ) : (
              <button
                className={
                  item.isSelected ? "selected-attr-box" : "unselected-attr-box"
                }>
                {item.value}
              </button>
            )}
          </section>
        ))}
      </section>
    </section>
  );
};

export default SelectedAttributes;
