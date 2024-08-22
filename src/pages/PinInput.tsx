import PinInputItem from '../components/PinInputItem';

export default function PinInput() {
  return (
    <>
      <div className="mb-10">
        <h2 className="mb-2">Pin Input 1</h2>
        <PinInputItem />
      </div>
      <div className="mb-10">
        <h2 className="mb-2">Pin Input 2</h2>
        <PinInputItem />
      </div>
    </>
  );
}
