(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");

    return _classApplyDescriptorGet(receiver, descriptor);
  }

  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");

    _classApplyDescriptorSet(receiver, descriptor, value);

    return value;
  }

  function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }

    return privateMap.get(receiver);
  }

  function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }

    return descriptor.value;
  }

  function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }
  }

  function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }

    return fn;
  }

  function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }

  function _classPrivateFieldInitSpec(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);

    privateMap.set(obj, value);
  }

  function _classPrivateMethodInitSpec(obj, privateSet) {
    _checkPrivateRedeclaration(obj, privateSet);

    privateSet.add(obj);
  }

  var _element = /*#__PURE__*/new WeakMap();

  /**
   * Represents a Conductive Zone
   * 
   * A Conductive Zone is a DOM element that represents an independent fragment of the page that acts like a frame.
   * Clicking a link within a Conductive Zone will cause Conductive to request the link's href,
   * extract the matching Conductive Zone from the response,
   * and replace the current Conductive Zone with the new content.
   */
  class ConductiveZone {
    handleClick(event) {
      throw new Error("Method not implemented.");
    }

    shouldHandleClick(event) {
      throw new Error("Method not implemented.");
    }

    constructor(element) {
      _classPrivateFieldInitSpec(this, _element, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldSet(this, _element, element);
    }

    async navigate(href) {
      console.log("navigating to " + href);
      let resp = await fetch(href);

      if (resp.status != 200) {
        throw new Error("Yikes");
      }

      let html = await resp.text();
      let host = document.createElement("html");
      host.innerHTML = html; // Grab the body from the response

      let body = host.querySelector("body");

      if (!body) {
        // Can't replace!
        throw new Error("Yikes");
      } // Swaperoonie!


      document.body.parentElement.replaceChild(body, document.body);
      window.history.pushState({}, "", href);
    }

  }
  class ConductiveZoneElement extends HTMLElement {
    constructor() {
      super();

      _defineProperty(this, "zone", void 0);

      this.zone = new ConductiveZone(this);
    }

  }

  var _listenRoot = /*#__PURE__*/new WeakMap();

  var _rootZone = /*#__PURE__*/new WeakMap();

  var _onClick = /*#__PURE__*/new WeakSet();

  var _findZone = /*#__PURE__*/new WeakSet();

  class ConductiveHost {
    constructor(rootZone, listenRoot) {
      _classPrivateMethodInitSpec(this, _findZone);

      _classPrivateMethodInitSpec(this, _onClick);

      _classPrivateFieldInitSpec(this, _listenRoot, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec(this, _rootZone, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldSet(this, _rootZone, new ConductiveZone(rootZone));

      _classPrivateFieldSet(this, _listenRoot, listenRoot); // Capture clicks


      _classPrivateFieldGet(this, _listenRoot).addEventListener("click", _classPrivateMethodGet(this, _onClick, _onClick2).bind(this), {
        capture: true
      });
    }

    async navigate(href) {
      console.log("navigating to " + href);
      let resp = await fetch(href);

      if (resp.status != 200) {
        throw new Error("Yikes");
      }

      let html = await resp.text();
      let host = document.createElement("html");
      host.innerHTML = html; // Grab the body from the response

      let body = host.querySelector("body");

      if (!body) {
        // Can't replace!
        throw new Error("Yikes");
      } // Reattach listener
      // Swaperoonie!


      document.body.parentElement.replaceChild(body, document.body);
      window.history.pushState({}, "", href);
    }

  }

  function _onClick2(event) {
    if (!(event.target instanceof HTMLElement)) {
      return;
    } // Look for a conductive element above us, if none is found, use the body.


    let zone = _classPrivateMethodGet(this, _findZone, _findZone2).call(this, event.target); // Give the zone the chance to handle the click


    if (zone.shouldHandleClick(event)) {
      event.preventDefault();
      zone.handleClick(event);
    }
  }

  function _findZone2(element) {
    let parent = element.closest("conductive-zone");

    if (parent && parent instanceof ConductiveZoneElement) {
      return parent.zone;
    }

    return _classPrivateFieldGet(this, _rootZone);
  }

  function isModule() {
    return typeof define == "function" && define.amd || typeof exports == "object" && typeof module !== "undefined";
  }

  if (window && !isModule()) {
    // Auto load
    // TODO: Make it possible to disable this?
    document.addEventListener("DOMContentLoaded", () => {
      new ConductiveHost(document.body, window);
    });
    window.customElements.define("conductive-zone", ConductiveZoneElement);
  }

}));
//# sourceMappingURL=conductive.js.map
