import LogoWhite from "./assets/logo-white.svg";
import LogoDark from "./assets/logo-dark.svg";

import UserStat from "./components/UserStat";
import UserMeta from "./components/UserMeta";
import IconLocation from "./components/icons/IconLocation";
import IconTwitter from "./components/icons/IconTwitter";
import IconWebsite from "./components/icons/IconWebsite";
import IconCompany from "./components/icons/IconCompany";
import IconSun from "./components/icons/IconSun";
import IconSearch from "./components/icons/IconSearch";
import RepoList from "./components/RepoList";

import { useState, useEffect } from "react";

function App() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const [user, setUser] = useState(undefined);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [reposError, setReposError] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    fetchUser("yusjeng21");
  }, []);

  const fetchUser = async (username) => {
    setLoading(true);
    setUser(undefined);
    setRepos([]);
    setReposError(null);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error("User not found");
      const data = await response.json();
      setUser(data);
      await fetchRepos(username);
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepos = async (username) => {
    setReposLoading(true);
    setReposError(null);
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
      );
      if (!response.ok) throw new Error("Failed to fetch repositories");
      const data = await response.json();
      setRepos(data);
    } catch (error) {
      console.error(error);
      setReposError(error.message);
    } finally {
      setReposLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      fetchUser(username.trim());
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const formatJoinDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-light-secondary dark:bg-dark-primary-800 min-h-screen flex items-center justify-center text-light-primary-800 dark:text-light-secondary">
      <div className="w-full max-w-screen-md 2xl:max-w-[840px] mx-auto py-4 px-4 sm:px-8">
        {/* Header – Logo + Theme toggle */}
        <div className="flex justify-between items-center">
          <h1>
            <img
              src={isDark ? LogoWhite : LogoDark}
              alt="Logo"
              className="h-6 sm:h-auto"
            />
          </h1>
          <button
            onClick={() => setIsDark((prev) => !prev)}
            className="inline-flex items-center space-x-3 sm:space-x-4 focus:outline-none">
            <span className="font-semibold uppercase text-xs sm:text-sm tracking-wider">
              {isDark ? "Light" : "Dark"}
            </span>
            <IconSun className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="w-full mt-6 sm:mt-10">
          <form onSubmit={handleSubmit}>
            <div className="w-full relative">
              <IconSearch className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-primary-500" />

              <input
                type="text"
                value={username}
                onChange={handleInputChange}
                className="w-full bg-light-primary-200 dark:bg-dark-primary-600 text-light-primary-800 dark:text-white border-0 leading-10 py-3 sm:py-4 rounded-xl pl-12 sm:pl-20 pr-24 sm:pr-36 text-sm sm:text-lg tracking-wider placeholder:text-inherit placeholder:text-xs sm:placeholder:text-base"
                placeholder="Search GitHub username..."
              />

              <button className="bg-primary-500 text-white leading-8 py-1.5 sm:py-2.5 px-3 sm:px-5 rounded-xl font-semibold tracking-wide absolute right-2 sm:right-3.5 top-1/2 -translate-y-1/2 text-xs sm:text-base">
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Result area */}
        <div className="mt-6 sm:mt-10">
          {loading && (
            <p className="text-center text-lg font-semibold animate-pulse">
              Loading...
            </p>
          )}

          {!loading && user === null && (
            <p className="text-center text-red-500 font-semibold text-lg">
              User not found.
            </p>
          )}

          {!loading && user && (
            <div className="bg-white dark:bg-dark-primary-600 text-light-primary-800 dark:text-white rounded-xl py-6 px-4 sm:py-[3.25rem] sm:px-12 grid grid-cols-1 md:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6">
              {/* Avatar */}
              <div className="flex justify-center md:block col-span-1">
                <img
                  src={user?.avatar_url || yusjeng21}
                  alt={user?.login || "User avatar"}
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-full md:h-auto md:max-w-full rounded-full md:absolute md:-top-[0.55rem] md:relative"
                />
              </div>

              {/* Name + Joined */}
              <div className="col-span-1 md:col-span-3 flex flex-col sm:flex-row sm:items-start sm:justify-between text-center sm:text-left">
                <div>
                  <h2 className="text-xl sm:text-[1.65rem] font-semibold leading-5">
                    {user?.name || "Not Available"}
                  </h2>
                  <span className="text-primary-500 inline-block mt-1 sm:mt-2.5 text-sm sm:text-base">
                    @{user?.login || "username"}
                  </span>
                </div>
                <div className="mt-1 sm:mt-0">
                  <p className="text-sm sm:text-base">
                    Joined{" "}
                    {user?.created_at ? formatJoinDate(user.created_at) : "N/A"}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="col-span-1 md:col-span-3 md:col-start-2 text-center sm:text-left">
                <p className="text-sm sm:text-base">
                  {user?.bio || "This profile has no bio."}
                </p>
              </div>

              {/* Stats */}
              <div className="col-span-1 md:col-span-3 md:col-start-2 bg-light-secondary dark:bg-dark-primary-800 text-light-primary-800 dark:text-white py-3 sm:py-4 px-4 sm:px-6 grid grid-cols-3 gap-x-4 sm:gap-x-6 rounded-lg mt-4 sm:mt-6 shadow-lg">
                <UserStat label="Repos" number={user?.public_repos ?? 0} />
                <UserStat label="Followers" number={user?.followers ?? 0} />
                <UserStat label="Following" number={user?.following ?? 0} />
              </div>

              {/* User Meta */}
              <div className="col-span-1 md:col-span-3 md:col-start-2 grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-5 gap-x-4 sm:gap-x-16 mt-4 sm:mt-6 text-light-primary-800 dark:text-white text-sm sm:text-base">
                <UserMeta
                  icon={<IconLocation />}
                  text={user?.location || "Not Available"}
                  className="space-x-3 sm:space-x-5"
                />
                <UserMeta
                  icon={<IconTwitter />}
                  text={
                    user?.twitter_username ? `@${user.twitter_username}` : null
                  }
                  link={
                    user?.twitter_username
                      ? `https://twitter.com/${user.twitter_username}`
                      : null
                  }
                />
                <UserMeta
                  icon={<IconWebsite />}
                  text={user?.blog || null}
                  link={user?.blog || null}
                  className="space-x-3 sm:space-x-4"
                />
                <UserMeta
                  icon={<IconCompany />}
                  text={user?.company || "Not Available"}
                />
              </div>
            </div>
          )}
        </div>
        {/* Repos List*/}
        <RepoList repos={repos} loading={reposLoading} error={reposError} />
      </div>
    </div>
  );
}

export default App;
