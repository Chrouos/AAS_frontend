import ToggleCountItem from '../components/ToggleCountItem';

export default function ToggleCount() {
  return (
    <>
      <div className="mb-10">
        <h2 className="mb-2">Toggle Count 1</h2>
        <ToggleCountItem groupId="first-group" />
      </div>
      <div className="mb-10">
        <h2 className="mb-2">Toggle Count 2</h2>
        <ToggleCountItem groupId="second-group" />
      </div>
    </>
  );
}
