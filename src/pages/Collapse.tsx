import CollapseItem from '../components/CollapseItem';

export default function Collapse() {
  return (
    <>
      <div className="mb-10">
        <h2 className="mb-2">Collapse 1</h2>
        <CollapseItem
          contentId="collapse-1"
          title="Collapse"
          content="This is a collapse 1 body. It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions."
        />
      </div>
      <div className="mb-10">
        <h2 className="mb-2">Collapse 2</h2>
        <CollapseItem
          contentId="collapse-2"
          title="Collapse"
          content="This is a collapse 2 body. It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions."
        />
      </div>
    </>
  );
}
