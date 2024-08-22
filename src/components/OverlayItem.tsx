export default function OverlayItem(props: any) {
  const { contentId, title, content } = props;

  return (
    <>
      <button
        type="button"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        data-hs-overlay={`#${contentId}`}
      >
        Open offcanvas
      </button>

      <div
        id={contentId}
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-xs w-full w-full z-[60] bg-white border-e dark:bg-gray-800 dark:border-gray-700 hidden"
        tabIndex={-1}
      >
        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
          <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>
          <button
            type="button"
            className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            data-hs-overlay={`#${contentId}`}
          >
            <span className="sr-only">Close modal</span>
            <svg
              className="flex-shrink-0 w-4 h-4"
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-800 dark:text-gray-400">{content}</p>
        </div>
      </div>
    </>
  );
}
