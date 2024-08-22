export default function InputNumberItem() {
  return (
    <div
      className="py-2 px-3 bg-white border border-gray-200 rounded-lg dark:bg-slate-900 dark:border-gray-700"
      data-hs-input-number
    >
      <div className="w-full flex justify-between items-center gap-x-5">
        <div className="grow">
          <span className="block text-xs text-gray-500 dark:text-gray-400">
            Select quantity
          </span>
          <input
            className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white"
            type="text"
            defaultValue="1"
            data-hs-input-number-input
          />
        </div>
        <div className="flex justify-end items-center gap-x-1.5">
          <button
            type="button"
            className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            data-hs-input-number-decrement
          >
            <svg
              className="flex-shrink-0 w-3.5 h-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
            </svg>
          </button>
          <button
            type="button"
            className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            data-hs-input-number-increment
          >
            <svg
              className="flex-shrink-0 w-3.5 h-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
