const BlogCard = ({ cover, published_at, title, sumary }) => {
  return (
    <div className="border-2 border-pink-700 rounded-[9px]">
      <a
        href="#"
        className="flex p-px flex-col bg-gray-100 dark:bg-gray-900 group border border-gray-200 dark:border-gray-800 rounded-lg"
      >
        <div className="flex rounded-[7px] m-3 bg-gray-300 ">
          <img
            src={cover}
            className="rounded-[7px] aspect-[4/2.8] w-full object-cover"
            alt="image article"
          />
        </div>
        <div className="flex flex-col p-5 relative space-y-4 ">
          <h1 className="text-xl/tight font-semibold text-gray-800 dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-600">
            {title}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
            {sumary}
          </p>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
            <span>{published_at}</span>
          </div>
        </div>
      </a>
    </div>
  );
};

const posts = [
  {
    id: 1,
    cover: "/public/img1.jpg",
    published_at: "Feb 23, 2025",
    title: "AI-Powered Threat Detection: Securing Systems in Real-Time",
    sumary:
      "Discover how AI-driven cybersecurity solutions detect, analyze, and neutralize threats in real-time, enhancing overall security.",
  },
  {
    id: 2,
    cover: "/public/img2.jpg",
    published_at: "Feb 20, 2025",
    title: "Top Emerging Cyber Threats in 2025 & How to Prevent Them",
    sumary:
      "Stay ahead of the latest cybersecurity risks and learn actionable strategies to safeguard your digital assets from evolving attacks.",
  },
];

const BlogSection = () => {
  return (
    <section className="py-10 ">
      <div className="max-w-6xl mx-auto sm:px-10 md:px-12 lg:px-5 space-y-14">
        <div className="text-center space-y-6 max-w-2xl mx-auto ">
          <h1 className="text-5xl font-bold text-pink-800 dark:text-white capitalize">
            Latest Security Insights
          </h1>
          <p className="text-purple-900">
            Stay ahead of threats with expert articles on DevSecOps, CI/CD
            security, vulnerability detection, and best practices for securing
            your pipelines.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 rounded-t-lg">
          {posts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
          <div className="sm:col-span-2 lg:col-span-1 p-6 sm:p-10 md:p-14 lg:p-8 rounded-lg bg-gray-100 dark:bg-gray-900 flex flex-col space-y-6 relative border-2 border-pink-700 rounded-[9px]">
            <div className="absolute w-14 h-14 rounded-full bg-gradient-to-bl from-blue-600 to-violet-500 blur-2xl z-10 -top-7 -left-7 opacity-40"></div>
            <div className="absolute w-14 h-14 rounded-full bg-gradient-to-bl from-blue-600 to-violet-500 blur-2xl z-10 -bottom-7 -right-7 opacity-40"></div>
            <div className="lg:h-full flex flex-col items-center text-center justify-center space-y-5 mx-auto max-w-2xl">
              <h1 className="font-bold text-gray-900 dark:text-white text-3xl ">
                Join our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-bl from-blue-700 to-violet-400 dark:from-blue-300 dark:to-violet-400">
                  4+ Devlopers
                </span>{" "}
                enhancing DevSecOps
              </h1>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                Strengthen your CI/CD pipeline with real-time threat detection,
                automated security scans, and proactive defense strategies.
              </p>

              <form
                action
                className="w-full flex flex-col sm:items-center sm:flex-row lg:flex-col gap-y-3 gap-x-4"
              >
                <input
                  type="email"
                  className="py-3 px-5 rounded-lg text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-800 outline-none w-full placeholder:text-gray-600 dark:placeholder:text-gray-300"
                  placeholder="johndoe@gmail.com"
                />
                <div className="flex justify-center w-full sm:w-max lg:w-full">
                  <button className="py-3 rounded-lg px-6 bg-blue-900 dark:bg-blue-500 text-white font-medium text-base w-full flex justify-center">
                    Get Touch
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <a
            href="#"
            className="bg-gray-700 hover:bg-gray-500 px-6 py-3 border rounded-lg border-black border-2 text-white  flex items-center gap-x-3"
          >
            See More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
export default BlogSection;
