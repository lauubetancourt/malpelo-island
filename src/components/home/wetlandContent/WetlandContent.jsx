import React from "react";
import "./WetlandContent.css";

const WetlandContent = ({
    title,
    subtitle,
    paragraphs,
    items,
    types,
    subsystems,
    principles,
    feedbackLoops,
    bibliography,
    highlight,
    className = "",
}) => {
    return (
        <section className={`wetland-section ${className}`}>
            <div className="wetland-section__container">
                {title && <h2 className="wetland-section__title">{title}</h2>}
                {subtitle && <p className="wetland-section__subtitle">{subtitle}</p>}

                {highlight && (
                    <div className="wetland-highlight">
                        <p className="wetland-highlight__text">{highlight}</p>
                    </div>
                )}

                {paragraphs &&
                    paragraphs.map((p, i) => (
                        <p key={i} className="wetland-section__text">
                            {p}
                        </p>
                    ))}

                {types && (
                    <div className="wetland-types-grid">
                        {types.map((type, i) => (
                            <div key={i} className="wetland-type-card">
                                <span className="wetland-type-card__icon">{type.icon}</span>
                                <h3 className="wetland-type-card__title">{type.title}</h3>
                                <p className="wetland-type-card__description">
                                    {type.description}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {items && (
                    <div className="wetland-items">
                        {items.map((item, i) => (
                            <div key={i} className="wetland-item">
                                <span className="wetland-item__bullet">●</span>
                                <p className="wetland-item__text">
                                    {item.bold && (
                                        <strong className="wetland-item__bold">{item.bold}: </strong>
                                    )}
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {subsystems && (
                    <div className="wetland-subsystems-grid">
                        {subsystems.map((sub, i) => (
                            <div key={i} className="wetland-subsystem-card">
                                <span className="wetland-subsystem-card__icon">{sub.icon}</span>
                                <h4 className="wetland-subsystem-card__title">{sub.title}</h4>
                                <p className="wetland-subsystem-card__desc">
                                    {sub.description}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {feedbackLoops && (
                    <div className="wetland-feedback-loops">
                        {feedbackLoops.map((loop, i) => (
                            <div key={i} className="wetland-feedback-card">
                                <h4 className="wetland-feedback-card__title">{loop.title}</h4>
                                <div className="wetland-feedback-card__chain">
                                    {loop.steps.map((step, j) => (
                                        <React.Fragment key={j}>
                                            <span className="wetland-feedback-card__step">
                                                {step}
                                            </span>
                                            {j < loop.steps.length - 1 && (
                                                <span className="wetland-feedback-card__arrow">↓</span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {principles && (
                    <div className="wetland-principles-grid">
                        {principles.map((p, i) => (
                            <div key={i} className="wetland-principle-card">
                                <div className="wetland-principle-card__header">
                                    <span className="wetland-principle-card__number">
                                        {i + 1}
                                    </span>
                                    <h3 className="wetland-principle-card__title">{p.title}</h3>
                                </div>
                                <p className="wetland-principle-card__description">
                                    {p.description}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {bibliography && (
                    <div className="wetland-bibliography">
                        <h3 className="wetland-bibliography__title">Bibliografía</h3>
                        <div className="wetland-bibliography__list">
                            {bibliography.map((ref, i) => (
                                <p key={i} className="wetland-bibliography__item">
                                    <span className="wetland-bibliography__number">
                                        [{i + 1}]
                                    </span>{" "}
                                    {ref}
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default WetlandContent;
