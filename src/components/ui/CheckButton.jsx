export default function RadioButton({ name, isChecked, onChange }) {
  return (
    <div className="flex items-center justify-center">
      <label className="radio-label">
        <input type="checkbox" name={name} checked={isChecked} onChange={onChange} />
        <span className="radio-input-span"></span>
      </label>
    </div>
  );
}
