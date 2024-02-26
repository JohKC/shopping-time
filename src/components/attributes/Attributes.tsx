import { useState } from "react";
import { AttributeItem } from "../../models/AttributeItem";
import { Attribute } from "../../models/AttributeSet";
import "./attributes.css";

interface AttributesProps {
  attribute: Attribute;
  handleSelectedAttributes: (newSelectedAttribute: AttributeItem) => void;
  className: string;
}

const Attributes = ({
  attribute,
  handleSelectedAttributes,
  className,
}: AttributesProps) => {
  const [selectedAttribute, setSelectedAttribute] = useState("");

  return (
    <section className={className}>
      <section className='buttons'>
        <h3>{attribute.id}:</h3>
        {attribute?.items?.map((item) => (
          <section
            style={
              selectedAttribute === item.value && attribute.id === "Color"
                ? { border: "2px solid  rgb(240, 97, 97)" }
                : {}
            }
            key={item.id}
            onClick={() =>
              handleSelectedAttributes({ id: attribute.id, value: item.value })
            }>
            {attribute.id === "Color" ? (
              <button
                className='attribute-button color-attribute'
                onClick={() => setSelectedAttribute(item.value)}
                style={{
                  backgroundColor: `${item.value}`,
                  border: `1px solid ${item.value}`,
                }}>
                C
              </button>
            ) : (
              <button
                className='attribute-button'
                onClick={() => setSelectedAttribute(item.value)}
                style={
                  selectedAttribute === item.value || item.isSelected
                    ? {
                        background: "black",
                        color: "white",
                      }
                    : {}
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

export default Attributes;
