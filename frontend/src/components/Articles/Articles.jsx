import React from "react";
import "./Articles.css";

const Articles = () => {
  return (
    <div>
      <div className="articles">
        <h2 className="articles-text">Articles</h2>

        <div className="articles-lists">
          <div className="articles-list">
            <img src="assets/Rectangle 53.png" alt="first-photo" />
            <h1 className="article-text" >Anger suppression and its impact on the brain</h1>
            <span className="articles-final">
              Anger is an emotion as old as humanity itself. It can be a potent
              force, propelling us to address injustice and confront challenges.
              However, when left unchecked, anger can also be a destructive
              force, causing harm to ourselves and those around us...
            </span>
          </div>

          <div className="articles-list">
            <img src="assets/Rectangle 54.png" alt="first-photo" />
            <h1 className="article-text">
              How to eliminate viral hepatitis in Africa by 2030 – EXPERTS
            </h1>
            <span className="articles-final">
              Experts from the African region on Monday said the integration of
              hepatitis elimination services in existing health systems,
              political will, adequate funding and vaccination are some of the
              pathways to achieving the elimination of viral hepatitis by
              2030...
            </span>
          </div>

          <div className="articles-list">
            <img src="assets/Frame 291.png" alt="first-photo" />
            <h1 className="article-text">Why COVID-19 revaccination is important— WHO</h1>
            <span className="articles-final">
              The World Health Organisation, WHO, has explained the importance
              of re-vaccination against COVID-19, to prevent infection or
              re-infection. The WHO’s Technical Lead for COVID-19, Dr. Maria Van
              Kerkhove, said re-vaccination is important because as the
              COVID-19...
            </span>
          </div>
        </div>

        <button className="articles-btn">read more articles</button>
      </div>
    </div>
  );
};

export default Articles;
