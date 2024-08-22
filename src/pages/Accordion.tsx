import AccordionGroup from '../components/AccordionGroup';

export default function Accordion() {
  return (
    <>
      <div className="mb-10">
        <h2 className="mb-2">Accordion Group 1</h2>
        <AccordionGroup />
      </div>
      <div className="mb-10">
        <h2 className="mb-2">Accordion Group 2</h2>
        <AccordionGroup />
      </div>
    </>
  );
}
