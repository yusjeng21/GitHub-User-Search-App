import React from "react";
import {
  FaJs,
  FaPython,
  FaJava,
  FaPhp,
  //   FaTs,
  //   FaRuby,
  FaSwift,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaVuejs,
  FaAngular,
  FaDocker,
  FaNode,
  FaNpm,
  FaGitAlt,
  FaGithub,
  FaLinux,
  FaApple,
  FaWindows,
  FaDatabase,
  FaCode,
  FaFileCode,
  FaTerminal,
  FaServer,
  FaCloud,
  FaAws,
  FaGoogle,
  FaMicrosoft,
  FaAndroid,
  //   FaApple,
} from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

// Language → icon mapping
const languageIcons = {
  JavaScript: FaJs,
  TypeScript: SiTypescript,
  Python: FaPython,
  Java: FaJava,
  PHP: FaPhp,
  //   Ruby: FaRuby,
  Swift: FaSwift,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  SCSS: FaCss3Alt,
  Sass: FaCss3Alt,
  React: FaReact,
  "React Native": FaReact,
  Vue: FaVuejs,
  "Vue.js": FaVuejs,
  Angular: FaAngular,
  Docker: FaDocker,
  Node: FaNode,
  "Node.js": FaNode,
  NPM: FaNpm,
  Git: FaGitAlt,
  GitHub: FaGithub,
  Linux: FaLinux,
  macOS: FaApple,
  Windows: FaWindows,
  MySQL: FaDatabase,
  PostgreSQL: FaDatabase,
  MongoDB: FaDatabase,
  Redis: FaDatabase,
  Elasticsearch: FaDatabase,
  GraphQL: FaCode,
  Go: FaCode,
  Rust: FaCode,
  C: FaCode,
  "C++": FaCode,
  "C#": FaCode,
  Kotlin: FaCode,
  Dart: FaCode,
  Shell: FaTerminal,
  Bash: FaTerminal,
  PowerShell: FaTerminal,
  Markdown: FaFileCode,
  Django: FaServer,
  Flask: FaServer,
  Laravel: FaServer,
  Spring: FaServer,
  TensorFlow: FaCode,
  Scala: FaCode,
  Elixir: FaCode,
  Clojure: FaCode,
  Haskell: FaCode,
  Julia: FaCode,
  R: FaCode,
  MATLAB: FaCode,
  Solidity: FaCode,
  Perl: FaCode,
};

// Fallback colour
const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Markdown: "#083fa1",
  Vue: "#41b883",
  React: "#61dafb",
};

const RepoList = ({ repos, loading, error }) => {
  const header = (
    <h3 className="text-lg sm:text-xl font-semibold mb-4 border-b border-light-primary-200 dark:border-dark-primary-700 pb-2">
      Repositories
    </h3>
  );

  if (loading) {
    return (
      <div className="col-span-1 md:col-span-4 mt-6 md:mt-8">
        {header}
        <p className="text-center text-light-primary-600 dark:text-dark-primary-300 animate-pulse text-sm sm:text-base">
          Loading repositories…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-1 md:col-span-4 mt-6 md:mt-8">
        {header}
        <p className="text-center text-red-500 text-sm sm:text-base">
          Could not load repositories.
        </p>
      </div>
    );
  }

  if (!repos || repos.length === 0) {
    return (
      <div className="col-span-1 md:col-span-4 mt-6 md:mt-8">
        {header}
        <p className="text-center text-light-primary-600 dark:text-dark-primary-300 text-sm sm:text-base">
          This user has no public repositories.
        </p>
      </div>
    );
  }

  return (
    <div className="col-span-1 md:col-span-4 mt-6 md:mt-8">
      {header}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {repos.map((repo) => {
          const language = repo.language;
          const IconComponent = language ? languageIcons[language] : null;
          const color = language ? languageColors[language] || "#cccccc" : null;

          return (
            <div
              key={repo.id}
              className="bg-light-secondary dark:bg-dark-primary-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 font-medium hover:underline text-sm sm:text-base">
                {repo.name}
              </a>
              {repo.description && (
                <p className="text-xs sm:text-sm text-light-primary-700 dark:text-dark-primary-200 mt-1 line-clamp-2">
                  {repo.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[0.65rem] sm:text-xs text-light-primary-600 dark:text-dark-primary-300">
                {language && (
                  <span className="flex items-center gap-1.5">
                    {IconComponent ? (
                      <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    ) : (
                      <span
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    )}
                    {language}
                  </span>
                )}
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                <span className="hidden xs:inline">
                  📅 {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RepoList;
