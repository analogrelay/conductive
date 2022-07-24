/**
 * Represents a Conductive Zone
 * 
 * A Conductive Zone is a DOM element that represents an independent fragment of the page that acts like a frame.
 * Clicking a link within a Conductive Zone will cause Conductive to request the link's href,
 * extract the matching Conductive Zone from the response,
 * and replace the current Conductive Zone with the new content.
 */
export class ConductiveComponent
{
    didClick(event: MouseEvent) {
        let target = this.resolveHref(event.target as HTMLElement);
        if (target) {
            this.navigate(target);
        }
    }

    willClick(event: MouseEvent): boolean {
        return true;
    }

    resolveHref(element: HTMLElement) {
        if (element.tagName === "A") {
            return (element as HTMLAnchorElement).href;
        } else if (element.tagName === "BUTTON") {
            throw new Error("Not yet implemented");
        }
    }

    #element: HTMLElement;
    constructor(element: HTMLElement) {
        this.#element = element;
    }
}

export class ConductiveComponentElement extends HTMLElement {
    component: ConductiveComponent;

    constructor() {
        super();
        this.component = new ConductiveComponent(this);
    }
}
