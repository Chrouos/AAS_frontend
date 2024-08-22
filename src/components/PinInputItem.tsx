export default function PinInputItem() {
  return (
    <div className="flex space-x-3" data-hs-pin-input>
      <input
        type="text"
        className="block w-[38px] text-center border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        data-hs-pin-input-item
        autoFocus
      />
      <input
        type="text"
        className="block w-[38px] text-center border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        data-hs-pin-input-item
      />
      <input
        type="text"
        className="block w-[38px] text-center border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        data-hs-pin-input-item
      />
      <input
        type="text"
        className="block w-[38px] text-center border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        data-hs-pin-input-item
      />
    </div>
  );
}
