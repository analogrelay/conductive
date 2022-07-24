import { ConductiveComponentElement } from "./component";
import { ConductiveHost } from "./host";

declare global {
    const define: Function & { amd?: boolean };

    interface Window {
        Conductive?: ConductiveHost
    }
}

function isModule() {
    return (typeof define == "function" && define.amd) ||
        (typeof exports == "object" && typeof module !== "undefined");
}

if (window && !isModule()) {
    // Auto load
    // TODO: Make it possible to disable this?
    document.addEventListener("DOMContentLoaded", () => {
        window.Conductive = new ConductiveHost(document.body, window);
    });
    window.customElements.define("conductive-component", ConductiveComponentElement);
}