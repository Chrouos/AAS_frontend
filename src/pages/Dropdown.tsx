import DropdownItem from '../components/DropdownItem';

export default function Dropdown() {
  return (
    <div className="flex gap-4">
      <div>
        <h2 className="mb-2">Dropdown 1</h2>
        <DropdownItem title="Action" />
      </div>
      <div>
        <h2 className="mb-2">Dropdown 2</h2>
        <DropdownItem title="Action" />
      </div>
    </div>
  );
}
