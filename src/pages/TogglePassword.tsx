import TogglePasswordItem from '../components/TogglePasswordItem';

export default function TogglePassword() {
  return (
    <>
      <div className="mb-10">
        <h2 className="mb-2">Toggle Password 1</h2>
        <TogglePasswordItem groupId="first-group" />
      </div>
      <div className="mb-10">
        <h2 className="mb-2">Toggle Password 2</h2>
        <TogglePasswordItem groupId="second-group" />
      </div>
    </>
  );
}
