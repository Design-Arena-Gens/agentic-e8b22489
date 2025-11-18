"use client";

export default function ToolShelf({ tools }) {
  return (
    <section className="tool-shelf">
      <header>
        <h2>Active Tools</h2>
        <span>{tools?.length || 0} selected</span>
      </header>
      <div className="tool-grid">
        {(tools?.length ? tools : [{ id: "placeholder", name: "Awaiting prompt", description: "Provide goals to view the curated tool stack." }]).map(
          (tool) => (
            <article key={tool.id} className="tool-card">
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
            </article>
          )
        )}
      </div>
      <style jsx>{`
        .tool-shelf {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.6rem;
          border-radius: 18px;
          background: rgba(11, 14, 24, 0.72);
          border: 1px solid rgba(69, 94, 200, 0.25);
        }

        header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }

        h2 {
          margin: 0;
          font-size: 1.05rem;
          color: #d7dcff;
        }

        span {
          font-size: 0.82rem;
          color: rgba(190, 201, 255, 0.65);
        }

        .tool-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 0.85rem;
        }

        .tool-card {
          padding: 0.95rem 1rem;
          border-radius: 14px;
          background: rgba(26, 34, 64, 0.5);
          border: 1px solid rgba(92, 129, 255, 0.18);
          box-shadow: inset 0 0 0 1px rgba(88, 110, 218, 0.1);
        }

        h3 {
          margin: 0 0 0.35rem 0;
          font-size: 0.92rem;
          color: #f0f3ff;
        }

        p {
          margin: 0;
          font-size: 0.82rem;
          line-height: 1.4;
          color: rgba(210, 218, 255, 0.75);
        }
      `}</style>
    </section>
  );
}
