"use client";

export default function PlanCard({ persona, plan }) {
  return (
    <section className="plan-card">
      <header>
        <h2>Execution Blueprint</h2>
        <p>{persona || "Share a goal to activate the agent persona and receive a mission plan."}</p>
      </header>
      <ol>
        {(plan?.length ? plan : ["Awaiting initial objective..."]).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
      <style jsx>{`
        .plan-card {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          padding: 1.6rem;
          border-radius: 18px;
          background: rgba(12, 16, 28, 0.78);
          border: 1px solid rgba(74, 93, 198, 0.25);
        }

        header {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        h2 {
          font-size: 1.1rem;
          margin: 0;
          color: #d9deff;
        }

        p {
          margin: 0;
          font-size: 0.9rem;
          color: rgba(200, 210, 255, 0.75);
          line-height: 1.45;
        }

        ol {
          margin: 0;
          padding-left: 1.2rem;
          display: grid;
          gap: 0.5rem;
          counter-reset: plan;
        }

        li {
          list-style: decimal;
          color: rgba(230, 233, 255, 0.9);
          line-height: 1.45;
        }
      `}</style>
    </section>
  );
}
