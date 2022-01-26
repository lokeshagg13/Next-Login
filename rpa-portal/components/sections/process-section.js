import { useRef, useContext } from "react";
import ActiveSectionContext from "../../store/ActiveSectionContext";
import classes from "./process-section.module.css";

function ProcessSection(props) {
  const sectionRef = useRef();
  const activeSectionContext = useContext(ActiveSectionContext);
  const { sectionId, sectionTitle, sectionTiles } = props;

  function activeSectionHandler() {
    activeSectionContext.setActiveSection(sectionId);
  }

  const { activeSectionId } = activeSectionContext;
  let sectionClass = `${classes.section} ${classes.neutralSection}`;
  if (activeSectionId !== null) {
    if (activeSectionId === sectionId) {
      sectionClass = `${classes.section} ${classes.activeSection}`;
    } else {
      sectionClass = `${classes.section} ${classes.inactiveSection}`;
    }
  }

  return (
    <div
      className={sectionClass}
      id={sectionId}
      onMouseEnter={activeSectionHandler}
      ref={sectionRef}
    >
      <div className={classes.title}>
        <h1>{sectionTitle}</h1>
      </div>
      {activeSectionId === sectionId && (
        <div className={classes.actions}>
          {sectionTiles.map((tile, idx) => (
            <button key={`${sectionId}_Tile${idx+1}`} type="button">
              {tile}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProcessSection;
