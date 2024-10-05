
function DisqualifiersCheckBox({ label, checked, onChange }) {
  
  return (
    <>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="cursor-pointer"
      />
    </>
  );
}

export default DisqualifiersCheckBox;
