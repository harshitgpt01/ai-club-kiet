
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import sections from "../data/results.json";

export default function Results() {
  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <section className="page-hero gutter pb-12 text-center">
          <div className="container-page">
            <span className="eyebrow">AI Club KIET</span>
            <h1 className="cyber-title mt-6 text-4xl font-black text-white sm:text-5xl">Results are <span className="neon-text">Out.</span></h1>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-300">Find your name and explore your learning and working domains.</p>
          </div>
        </section>
        <section className="gutter pb-20" aria-label="Results spreadsheet">
          <div className="container-page">
            {sections.map((section) => (
              <section className="results-sheet" key={section.domain} aria-label={section.domain}>
                <h2>{section.domain}<span>{section.students.length} entries</span></h2>
                <div className="results-table-scroll" tabIndex={0} role="region" aria-label={`${section.domain} results table. Scroll horizontally for all columns.`}>
                  <table>
                    <caption className="sr-only">{section.domain} results</caption>
                    <thead><tr>{["Name", "Branch", "Learning Domain", "Working Domain", "Year"].map((label) => <th scope="col" key={label}>{label}</th>)}</tr></thead>
                    <tbody>{section.students.map((student, index) => (
                      <tr key={`${section.domain}-${index}`}>
                        <th scope="row">{student.name}</th><td>{student.branch}</td><td>{student.learningDomain}</td><td>{student.workingDomain}</td><td>{student.year}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
