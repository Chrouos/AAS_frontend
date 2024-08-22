import TabsItem from '../components/TabsItem';

export default function Tabs() {
  return (
    <div>
      <div className="mb-10">
        <h2 className="mb-2">Tabs 1</h2>
        <TabsItem groupId="first-group" />
      </div>
      <div className="mb-10">
        <h2 className="mb-2">Tabs 2</h2>
        <TabsItem groupId="second-group" />
      </div>
    </div>
  );
}
