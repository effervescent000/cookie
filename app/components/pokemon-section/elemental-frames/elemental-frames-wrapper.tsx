import ElementalFrame from "./elemental-frame";

const ElementalFramesWrapper = () => {
  return (
    <div>
      <ElementalFrame title="Defensive" tableType="defensive" />
      <ElementalFrame title="Offensive" tableType="offensive" />
    </div>
  );
};

export default ElementalFramesWrapper;
