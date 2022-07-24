import { ConductiveComponent, ConductiveComponentElement } from "./component";

export class ConductiveHost {
    #listenRoot: EventTarget;
    #rootComponent: ConductiveComponent;

    constructor(rootElement: HTMLElement, listenRoot: EventTarget) {
        this.#rootComponent = new ConductiveComponent(rootElement, this);
        this.#listenRoot = listenRoot;

        // Capture clicks
        this.#listenRoot.addEventListener("click", this.#onClick.bind(this), { capture: true });
    }

    #onClick(event: MouseEvent) {
        if (!(event.target instanceof HTMLElement)) {
            return;
        }

        // Look for a conductive component above us, if none is found, use the root component.
        let component = this.#findComponent(event.target);

        // Give the zone the chance to handle the click
        if (component.willClick(event)) {
            event.preventDefault();
            component.didClick(event);
        }
    }

    #findComponent(element: HTMLElement) {
        let parent = element.closest("conductive-component");
        if (parent && parent instanceof ConductiveComponentElement) {
            return parent.component;
        }
        return this.#rootComponent;
    }
}