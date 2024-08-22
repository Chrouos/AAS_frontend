import InputNumberItem from '../components/InputNumberItem';

export default function InputNumber() {
  return (
    <div>
      <div className="mb-10">
        <h2 className="mb-2">Input Number 1</h2>
        <InputNumberItem />
      </div>
      <div className="mb-10">
        <h2 className="mb-2">Input Number 2</h2>
        <InputNumberItem />
      </div>
    </div>
  );
}
