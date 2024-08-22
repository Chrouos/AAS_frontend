export default function ToggleCountItem(props: any) {
  const { groupId } = props;

  return (
    <div>
      <div className="flex justify-end mb-3">
        <div
          id={groupId}
          className="p-0.5 inline-block bg-gray-100 rounded-lg dark:bg-gray-700"
        >
          <label
            htmlFor={`${groupId}-monthly`}
            className="relative inline-block py-2 px-3"
          >
            <span className="inline-block relative z-10 text-sm font-medium text-gray-800 cursor-pointer dark:text-gray-200">
              Monthly
            </span>
            <input
              id={`${groupId}-monthly`}
              name={groupId}
              type="radio"
              className="absolute top-0 end-0 w-full h-full border-transparent bg-transparent bg-none text-transparent rounded-lg cursor-pointer before:absolute before:inset-0 before:w-full before:h-full before:rounded-lg focus:ring-offset-0 checked:before:bg-white checked:before:shadow-sm checked:bg-none focus:ring-transparent dark:checked:before:bg-gray-800 dark:focus:ring-offset-transparent"
            />
          </label>
          <label
            htmlFor={`${groupId}-annual`}
            className="relative inline-block py-2 px-3"
          >
            <span className="inline-block relative z-10 text-sm font-medium text-gray-800 cursor-pointer dark:text-gray-200">
              Annual
            </span>
            <input
              id={`${groupId}-annual`}
              name={groupId}
              type="radio"
              className="absolute top-0 end-0 w-full h-full border-transparent bg-transparent bg-none text-transparent rounded-lg cursor-pointer before:absolute before:inset-0 before:w-full before:h-full before:rounded-lg focus:ring-offset-0 checked:before:bg-white checked:before:shadow-sm checked:bg-none focus:ring-transparent dark:checked:before:bg-gray-800 dark:focus:ring-offset-transparent"
              defaultChecked
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-3 lg:items-center border border-gray-200 rounded-xl dark:border-gray-700">
        <div className="flex flex-col p-4">
          <h4 className="text-gray-800 mb-1 dark:text-gray-200">Startup</h4>
          <div className="flex gap-x-1">
            <span className="text-xl font-normal text-gray-800 dark:text-gray-200">
              $
            </span>
            <p
              data-hs-toggle-count={`{
            "target": "#${groupId}",
            "min": 19,
            "max": 29
          }`}
              className="text-gray-800 font-semibold text-3xl dark:text-gray-200"
            >
              19
            </p>
          </div>
        </div>

        <div className="flex flex-col p-4">
          <div className="flex justify-between">
            <h4 className="text-gray-800 mb-1 dark:text-gray-200">Team</h4>
          </div>
          <div className="flex gap-x-1">
            <span className="text-xl font-normal text-gray-800 dark:text-gray-200">
              $
            </span>
            <p
              data-hs-toggle-count={`{
            "target": "#${groupId}",
            "min": 89,
            "max": 99
          }`}
              className="text-gray-800 font-semibold text-3xl dark:text-gray-200"
            >
              89
            </p>
          </div>
        </div>

        <div className="flex flex-col p-4">
          <h4 className="text-gray-800 mb-1 dark:text-gray-200">Enterprise</h4>
          <div className="flex gap-x-1">
            <span className="text-xl font-normal text-gray-800 dark:text-gray-200">
              $
            </span>
            <p
              data-hs-toggle-count={`{
            "target": "#${groupId}",
            "min": 129,
            "max": 149
          }`}
              className="text-gray-800 font-semibold text-3xl dark:text-gray-200"
            >
              129
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
