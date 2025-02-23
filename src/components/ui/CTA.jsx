const CtaSection = () => {
  return (
    <section className="py-9">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
        <div className="w-full relative py-8 md:py-10 px-6 md:px-8 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-900">
          <div className="absolute right-0 top-0 h-full w-full flex justify-end">
            <div className="w-28 h-28 overflow-hidden flex rounded-xl relative blur-2xl">
              <span className="absolute w-20 h-20 -top-1 -right-1 bg-pink-700 rounded-md rotate-45" />
              <span className="absolute w-20 h-20 -bottom-1 -right-1 bg-purple-500 rounded-md rotate-45" />
              <span className="absolute w-20 h-20 -bottom-1 -left-1 bg-indigo-300 rounded-md rotate-45" />
            </div>
          </div>
          <div className="absolute left-0 bottom-0 h-full w-full flex items-end">
            <div className="w-28 h-28 overflow-hidden flex rounded-xl relative blur-2xl">
              <span className="absolute w-16 h-16 -top-1 -right-1 bg-purple-900 rounded-md rotate-45" />
              <span className="absolute w-16 h-16 -bottom-1 -right-1 bg-pink-500 rounded-md rotate-45" />
              <span className="absolute w-16 h-16 -bottom-1 -left-1 bg-indigo-300 rounded-md rotate-45" />
            </div>
          </div>
          <div className="mx-auto text-center max-w-xl md:max-w-2xl relative space-y-8">
            <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight font-bold text-blue-950 dark:text-white">
              Secure & Optimize Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-800 to-purple-900">
                Web Security
              </span>{" "}
              with Confidence
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              Automate security checks, detect vulnerabilities early, and
              enhance compliance throughout your software development lifecycle.
              Protect your code and deployments seamlessly.
            </p>

            <div className="mx-auto max-w-md sm:max-w-xl flex justify-center">
              <button className="outline-none h-12 px-5 rounded-xl bg-blue-900 text-white flex items-center hover:bg-blue-600 transition-all duration-300 ease-in-out">
                Get In touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
