export interface NavigationContext {
    method?: string,
    componentId?: string;
}

export class Navigator {
    async navigate(href: string, context: NavigationContext) {
        let headers = {
            "Conductive": "true",
        };
        if (context.componentId) {
            headers["Conductive-ComponentId"] = context.componentId;
        }

        let req: RequestInit = {
            method: context.method || "GET",
            headers,
        }
        console.log("navigating to " + href);
        let resp = await fetch(href);
        if (resp.status != 200) {
            throw new Error("Yikes");
        }

        let html = await resp.text();
        let host = document.createElement("html");
        host.innerHTML = html;

        // Grab the body from the response
        let body = host.querySelector("body");
        if (!body) {
            // Can't replace!
            throw new Error("Yikes");
        }

        // Swaperoonie!
        document.body.parentElement.replaceChild(body, document.body);
        window.history.pushState({}, "", href);
    }
}