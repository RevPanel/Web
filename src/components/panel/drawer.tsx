export default function Drawer() {
  return (
    <div className="collapse-arrow card collapse">
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-xl font-medium">
        Click to open this one and close others
      </div>
      <div className="collapse-content">
        <p>hello</p>
      </div>
    </div>
  );
}
