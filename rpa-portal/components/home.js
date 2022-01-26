import { ActiveSectionContextProvider } from "../store/ActiveSectionContext";
import classes from "./home.module.css";
import ProcessSection from "./sections/process-section";

function Home() {
  return (
    <ActiveSectionContextProvider>
      <div className={classes.home}>
        <ProcessSection sectionId="complianceSection" sectionTitle="Compliance" sectionTiles={['Tile 1', 'Tile 2', 'Tile 3']} />
        <ProcessSection sectionId="rpaSection" sectionTitle="RPA" sectionTiles={['Tile 1', 'Tile 2', 'Tile 3', 'Tile 4']} />
        <ProcessSection sectionId="generalSection" sectionTitle="General Automation" sectionTiles={['Tile 1', 'Tile 2']} />
      </div>
    </ActiveSectionContextProvider>
  );
}

export default Home;
