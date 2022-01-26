import { createContext, useState } from "react";

const ActiveSectionContext = createContext({
    activeSectionId: null,
    resetSections: () => {},
    setActiveSection: (id) => {},
})

export function ActiveSectionContextProvider(props) {
    const [activeSectionId, setActiveSectionId] = useState(null);
    function resetSections() {
        setActiveSectionId(null)
    }
    function setActiveSection(id) {
        setActiveSectionId(id)
    }

    const currentActiveSectionContext = {
        activeSectionId,
        resetSections,
        setActiveSection,
    }
    return <ActiveSectionContext.Provider value={currentActiveSectionContext}>
        {props.children}
    </ActiveSectionContext.Provider>
}

export default ActiveSectionContext;