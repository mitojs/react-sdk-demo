/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var bfcacheRestoreTime = -1
var getBFCacheRestoreTime = function getBFCacheRestoreTime() {
  return bfcacheRestoreTime
}
var onBFCacheRestore = function onBFCacheRestore(cb) {
  addEventListener(
    'pageshow',
    function (event) {
      if (event.persisted) {
        bfcacheRestoreTime = event.timeStamp
        cb(event)
      }
    },
    true
  )
}

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Performantly generate a unique, 30-char string by combining a version
 * number, the current timestamp with a 13-digit number integer.
 * @return {string}
 */
var generateUniqueID = function generateUniqueID() {
  return 'v3-'.concat(Date.now(), '-').concat(Math.floor(Math.random() * (9e12 - 1)) + 1e12)
}

/*
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var getNavigationEntry = function getNavigationEntry() {
  {
    return window.performance && performance.getEntriesByType && performance.getEntriesByType('navigation')[0]
  }
}

/*
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var getActivationStart = function getActivationStart() {
  var navEntry = getNavigationEntry()
  return (navEntry && navEntry.activationStart) || 0
}

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var initMetric = function initMetric(name, value) {
  var navEntry = getNavigationEntry()
  var navigationType = 'navigate'

  if (getBFCacheRestoreTime() >= 0) {
    navigationType = 'back-forward-cache'
  } else if (navEntry) {
    if (document.prerendering || getActivationStart() > 0) {
      navigationType = 'prerender'
    } else {
      navigationType = navEntry.type.replace(/_/g, '-')
    }
  }

  return {
    name: name,
    value: typeof value === 'undefined' ? -1 : value,
    rating: 'good',
    delta: 0,
    entries: [],
    id: generateUniqueID(),
    navigationType: navigationType,
  }
}

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Takes a performance entry type and a callback function, and creates a
 * `PerformanceObserver` instance that will observe the specified entry type
 * with buffering enabled and call the callback _for each entry_.
 *
 * This function also feature-detects entry support and wraps the logic in a
 * try/catch to avoid errors in unsupporting browsers.
 */
var observe = function observe(type, callback, opts) {
  try {
    if (PerformanceObserver.supportedEntryTypes.includes(type)) {
      var po = new PerformanceObserver(function (list) {
        callback(list.getEntries())
      })
      po.observe(
        Object.assign(
          {
            type: type,
            buffered: true,
          },
          opts || {}
        )
      )
      return po
    }
  } catch (e) {
    // Do nothing.
  }

  return
}

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var onHidden = function onHidden(cb, once) {
  var onHiddenOrPageHide = function onHiddenOrPageHide(event) {
    if (event.type === 'pagehide' || document.visibilityState === 'hidden') {
      cb(event)

      if (once) {
        removeEventListener('visibilitychange', onHiddenOrPageHide, true)
        removeEventListener('pagehide', onHiddenOrPageHide, true)
      }
    }
  }

  addEventListener('visibilitychange', onHiddenOrPageHide, true) // Some browsers have buggy implementations of visibilitychange,
  // so we use pagehide in addition, just to be safe.

  addEventListener('pagehide', onHiddenOrPageHide, true)
}

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var getRating = function getRating(value, thresholds) {
  if (value > thresholds[1]) {
    return 'poor'
  }

  if (value > thresholds[0]) {
    return 'needs-improvement'
  }

  return 'good'
}

var bindReporter = function bindReporter(callback, metric, thresholds, reportAllChanges) {
  var prevValue
  var delta
  return function (forceReport) {
    if (metric.value >= 0) {
      if (forceReport || reportAllChanges) {
        delta = metric.value - (prevValue || 0) // Report the metric if there's a non-zero delta or if no previous
        // value exists (which can happen in the case of the document becoming
        // hidden when the metric value is 0).
        // See: https://github.com/GoogleChrome/web-vitals/issues/14

        if (delta || prevValue === undefined) {
          prevValue = metric.value
          metric.delta = delta
          metric.rating = getRating(metric.value, thresholds)
          callback(metric)
        }
      }
    }
  }
}

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var firstHiddenTime = -1

var initHiddenTime = function initHiddenTime() {
  // If the document is hidden and not prerendering, assume it was always
  // hidden and the page was loaded in the background.
  return document.visibilityState === 'hidden' && !document.prerendering ? 0 : Infinity
}

var trackChanges = function trackChanges() {
  // Update the time if/when the document becomes hidden.
  onHidden(function (_ref) {
    var timeStamp = _ref.timeStamp
    firstHiddenTime = timeStamp
  }, true)
}

var getVisibilityWatcher = function getVisibilityWatcher() {
  if (firstHiddenTime < 0) {
    // If the document is hidden when this code runs, assume it was hidden
    // since navigation start. This isn't a perfect heuristic, but it's the
    // best we can do until an API is available to support querying past
    // visibilityState.
    {
      firstHiddenTime = initHiddenTime()
      trackChanges()
    } // Reset the time on bfcache restores.

    onBFCacheRestore(function () {
      // Schedule a task in order to track the `visibilityState` once it's
      // had an opportunity to change to visible in all browsers.
      // https://bugs.chromium.org/p/chromium/issues/detail?id=1133363
      setTimeout(function () {
        firstHiddenTime = initHiddenTime()
        trackChanges()
      }, 0)
    })
  }

  return {
    get firstHiddenTime() {
      return firstHiddenTime
    },
  }
}

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Calculates the [FCP](https://web.dev/fcp/) value for the current page and
 * calls the `callback` function once the value is ready, along with the
 * relevant `paint` performance entry used to determine the value. The reported
 * value is a `DOMHighResTimeStamp`.
 */

var onFCP = function onFCP(onReport, opts) {
  // Set defaults
  opts = opts || {} // https://web.dev/fcp/#what-is-a-good-fcp-score

  var thresholds = [1800, 3000]
  var visibilityWatcher = getVisibilityWatcher()
  var metric = initMetric('FCP')
  var report

  var handleEntries = function handleEntries(entries) {
    entries.forEach(function (entry) {
      if (entry.name === 'first-contentful-paint') {
        if (po) {
          po.disconnect()
        } // Only report if the page wasn't hidden prior to the first paint.

        if (entry.startTime < visibilityWatcher.firstHiddenTime) {
          // The activationStart reference is used because FCP should be
          // relative to page activation rather than navigation start if the
          // page was prerendered.
          metric.value = entry.startTime - getActivationStart()
          metric.entries.push(entry)
          report(true)
        }
      }
    })
  } // TODO(philipwalton): remove the use of `fcpEntry` once this bug is fixed.
  // https://bugs.webkit.org/show_bug.cgi?id=225305
  // The check for `getEntriesByName` is needed to support Opera:
  // https://github.com/GoogleChrome/web-vitals/issues/159
  // The check for `window.performance` is needed to support Opera mini:
  // https://github.com/GoogleChrome/web-vitals/issues/185

  var fcpEntry = window.performance && window.performance.getEntriesByName && window.performance.getEntriesByName('first-contentful-paint')[0]
  var po = fcpEntry ? null : observe('paint', handleEntries)

  if (fcpEntry || po) {
    report = bindReporter(onReport, metric, thresholds, opts.reportAllChanges)

    if (fcpEntry) {
      handleEntries([fcpEntry])
    } // Only report after a bfcache restore if the `PerformanceObserver`
    // successfully registered or the `paint` entry exists.

    onBFCacheRestore(function (event) {
      metric = initMetric('FCP')
      report = bindReporter(onReport, metric, thresholds, opts.reportAllChanges)
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          metric.value = performance.now() - event.timeStamp
          report(true)
        })
      })
    })
  }
}

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var isMonitoringFCP = false
var fcpValue = -1
/**
 * Calculates the [CLS](https://web.dev/cls/) value for the current page and
 * calls the `callback` function once the value is ready to be reported, along
 * with all `layout-shift` performance entries that were used in the metric
 * value calculation. The reported value is a `double` (corresponding to a
 * [layout shift score](https://web.dev/cls/#layout-shift-score)).
 *
 * If the `reportAllChanges` configuration option is set to `true`, the
 * `callback` function will be called as soon as the value is initially
 * determined as well as any time the value changes throughout the page
 * lifespan.
 *
 * _**Important:** CLS should be continually monitored for changes throughout
 * the entire lifespan of a page—including if the user returns to the page after
 * it's been hidden/backgrounded. However, since browsers often [will not fire
 * additional callbacks once the user has backgrounded a
 * page](https://developer.chrome.com/blog/page-lifecycle-api/#advice-hidden),
 * `callback` is always called when the page's visibility state changes to
 * hidden. As a result, the `callback` function might be called multiple times
 * during the same page load._
 */

var onCLS = function onCLS(onReport, opts) {
  // Set defaults
  opts = opts || {} // https://web.dev/cls/#what-is-a-good-cls-score

  var thresholds = [0.1, 0.25] // Start monitoring FCP so we can only report CLS if FCP is also reported.
  // Note: this is done to match the current behavior of CrUX.

  if (!isMonitoringFCP) {
    onFCP(function (metric) {
      fcpValue = metric.value
    })
    isMonitoringFCP = true
  }

  var onReportWrapped = function onReportWrapped(arg) {
    if (fcpValue > -1) {
      onReport(arg)
    }
  }

  var metric = initMetric('CLS', 0)
  var report
  var sessionValue = 0
  var sessionEntries = [] // const handleEntries = (entries: Metric['entries']) => {

  var handleEntries = function handleEntries(entries) {
    entries.forEach(function (entry) {
      // Only count layout shifts without recent user input.
      if (!entry.hadRecentInput) {
        var firstSessionEntry = sessionEntries[0]
        var lastSessionEntry = sessionEntries[sessionEntries.length - 1] // If the entry occurred less than 1 second after the previous entry and
        // less than 5 seconds after the first entry in the session, include the
        // entry in the current session. Otherwise, start a new session.

        if (sessionValue && entry.startTime - lastSessionEntry.startTime < 1000 && entry.startTime - firstSessionEntry.startTime < 5000) {
          sessionValue += entry.value
          sessionEntries.push(entry)
        } else {
          sessionValue = entry.value
          sessionEntries = [entry]
        } // If the current session value is larger than the current CLS value,
        // update CLS and the entries contributing to it.

        if (sessionValue > metric.value) {
          metric.value = sessionValue
          metric.entries = sessionEntries
          report()
        }
      }
    })
  }

  var po = observe('layout-shift', handleEntries)

  if (po) {
    report = bindReporter(onReportWrapped, metric, thresholds, opts.reportAllChanges)
    onHidden(function () {
      handleEntries(po.takeRecords())
      report(true)
    }) // Only report after a bfcache restore if the `PerformanceObserver`
    // successfully registered.

    onBFCacheRestore(function () {
      sessionValue = 0
      fcpValue = -1
      metric = initMetric('CLS', 0)
      report = bindReporter(onReportWrapped, metric, thresholds, opts.reportAllChanges)
    })

    // 是否应该在切换路由后结算当前路由以及重新计算
  }
}

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var firstInputEvent
var firstInputDelay
var firstInputTimeStamp
var callbacks
var listenerOpts = {
  passive: true,
  capture: true,
}
var startTimeStamp = new Date()
/**
 * Accepts a callback to be invoked once the first input delay and event
 * are known.
 */

var firstInputPolyfill = function firstInputPolyfill(onFirstInput) {
  callbacks.push(onFirstInput)
  reportFirstInputDelayIfRecordedAndValid()
}
var resetFirstInputPolyfill = function resetFirstInputPolyfill() {
  callbacks = []
  firstInputDelay = -1
  firstInputEvent = null
  eachEventType(addEventListener)
}
/**
 * Records the first input delay and event, so subsequent events can be
 * ignored. All added event listeners are then removed.
 */

var recordFirstInputDelay = function recordFirstInputDelay(delay, event) {
  if (!firstInputEvent) {
    firstInputEvent = event
    firstInputDelay = delay
    firstInputTimeStamp = new Date()
    eachEventType(removeEventListener)
    reportFirstInputDelayIfRecordedAndValid()
  }
}
/**
 * Reports the first input delay and event (if they're recorded and valid)
 * by running the array of callback functions.
 */

var reportFirstInputDelayIfRecordedAndValid = function reportFirstInputDelayIfRecordedAndValid() {
  // In some cases the recorded delay is clearly wrong, e.g. it's negative
  // or it's larger than the delta between now and initialization.
  // - https://github.com/GoogleChromeLabs/first-input-delay/issues/4
  // - https://github.com/GoogleChromeLabs/first-input-delay/issues/6
  // - https://github.com/GoogleChromeLabs/first-input-delay/issues/7
  if (
    firstInputDelay >= 0 && // @ts-ignore (subtracting two dates always returns a number)
    firstInputDelay < firstInputTimeStamp - startTimeStamp
  ) {
    var entry = {
      entryType: 'first-input',
      name: firstInputEvent.type,
      target: firstInputEvent.target,
      cancelable: firstInputEvent.cancelable,
      startTime: firstInputEvent.timeStamp,
      processingStart: firstInputEvent.timeStamp + firstInputDelay,
    }
    callbacks.forEach(function (callback) {
      callback(entry)
    })
    callbacks = []
  }
}
/**
 * Handles pointer down events, which are a special case.
 * Pointer events can trigger main or compositor thread behavior.
 * We differentiate these cases based on whether or not we see a
 * 'pointercancel' event, which are fired when we scroll. If we're scrolling
 * we don't need to report input delay since FID excludes scrolling and
 * pinch/zooming.
 */

var onPointerDown = function onPointerDown(delay, event) {
  /**
   * Responds to 'pointerup' events and records a delay. If a pointer up event
   * is the next event after a pointerdown event, then it's not a scroll or
   * a pinch/zoom.
   */
  var onPointerUp = function onPointerUp() {
    recordFirstInputDelay(delay, event)
    removePointerEventListeners()
  }
  /**
   * Responds to 'pointercancel' events and removes pointer listeners.
   * If a 'pointercancel' is the next event to fire after a pointerdown event,
   * it means this is a scroll or pinch/zoom interaction.
   */

  var onPointerCancel = function onPointerCancel() {
    removePointerEventListeners()
  }
  /**
   * Removes added pointer event listeners.
   */

  var removePointerEventListeners = function removePointerEventListeners() {
    removeEventListener('pointerup', onPointerUp, listenerOpts)
    removeEventListener('pointercancel', onPointerCancel, listenerOpts)
  }

  addEventListener('pointerup', onPointerUp, listenerOpts)
  addEventListener('pointercancel', onPointerCancel, listenerOpts)
}
/**
 * Handles all input events and records the time between when the event
 * was received by the operating system and when it's JavaScript listeners
 * were able to run.
 */

var onInput = function onInput(event) {
  // Only count cancelable events, which should trigger behavior
  // important to the user.
  if (event.cancelable) {
    // In some browsers `event.timeStamp` returns a `DOMTimeStamp` value
    // (epoch time) instead of the newer `DOMHighResTimeStamp`
    // (document-origin time). To check for that we assume any timestamp
    // greater than 1 trillion is a `DOMTimeStamp`, and compare it using
    // the `Date` object rather than `performance.now()`.
    // - https://github.com/GoogleChromeLabs/first-input-delay/issues/4
    var isEpochTime = event.timeStamp > 1e12
    var now = isEpochTime ? new Date() : performance.now() // Input delay is the delta between when the system received the event
    // (e.g. event.timeStamp) and when it could run the callback (e.g. `now`).

    var delay = now - event.timeStamp

    if (event.type == 'pointerdown') {
      onPointerDown(delay, event)
    } else {
      recordFirstInputDelay(delay, event)
    }
  }
}
/**
 * Invokes the passed callback const for =  each event type with t =>he
 * `onInput` const and =  `listenerOpts =>`.
 */

var eachEventType = function eachEventType(callback) {
  var eventTypes = ['mousedown', 'keydown', 'touchstart', 'pointerdown']
  eventTypes.forEach(function (type) {
    return callback(type, onInput, listenerOpts)
  })
}

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Calculates the [FID](https://web.dev/fid/) value for the current page and
 * calls the `callback` function once the value is ready, along with the
 * relevant `first-input` performance entry used to determine the value. The
 * reported value is a `DOMHighResTimeStamp`.
 *
 * _**Important:** since FID is only reported after the user interacts with the
 * page, it's possible that it will not be reported for some page loads._
 */

var onFID = function onFID(onReport, opts) {
  // Set defaults
  opts = opts || {} // https://web.dev/fid/#what-is-a-good-fid-score

  var thresholds = [100, 300]
  var visibilityWatcher = getVisibilityWatcher()
  var metric = initMetric('FID')
  var report

  var handleEntry = function handleEntry(entry) {
    // Only report if the page wasn't hidden prior to the first input.
    if (entry.startTime < visibilityWatcher.firstHiddenTime) {
      metric.value = entry.processingStart - entry.startTime
      metric.entries.push(entry)
      report(true)
    }
  }

  var handleEntries = function handleEntries(entries) {
    entries.forEach(handleEntry)
  }

  var po = observe('first-input', handleEntries)
  report = bindReporter(onReport, metric, thresholds, opts.reportAllChanges)

  if (po) {
    onHidden(function () {
      handleEntries(po.takeRecords())
      po.disconnect()
    }, true)
  }

  {
    // Only monitor bfcache restores if the browser supports FID natively.
    if (po) {
      onBFCacheRestore(function () {
        metric = initMetric('FID')
        report = bindReporter(onReport, metric, thresholds, opts.reportAllChanges)
        resetFirstInputPolyfill()
        firstInputPolyfill(handleEntry)
      })
    }
  }
}

/*
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var interactionCountEstimate = 0
var minKnownInteractionId = Infinity
var maxKnownInteractionId = 0

var updateEstimate = function updateEstimate(entries) {
  entries.forEach(function (e) {
    if (e.interactionId) {
      minKnownInteractionId = Math.min(minKnownInteractionId, e.interactionId)
      maxKnownInteractionId = Math.max(maxKnownInteractionId, e.interactionId)
      interactionCountEstimate = maxKnownInteractionId ? (maxKnownInteractionId - minKnownInteractionId) / 7 + 1 : 0
    }
  })
}

var po
/**
 * Returns the `interactionCount` value using the native API (if available)
 * or the polyfill estimate in this module.
 */

var getInteractionCount = function getInteractionCount() {
  return po ? interactionCountEstimate : performance.interactionCount || 0
}
/**
 * Feature detects native support or initializes the polyfill if needed.
 */

var initInteractionCountPolyfill = function initInteractionCountPolyfill() {
  if ('interactionCount' in performance || po) return
  po = observe('event', updateEstimate, {
    type: 'event',
    buffered: true,
    durationThreshold: 0,
  })
}

/*
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// interaction latencies should only consider the current navigation.

var prevInteractionCount = 0
/**
 * Returns the interaction count since the last bfcache restore (or for the
 * full page lifecycle if there were no bfcache restores).
 */

var getInteractionCountForNavigation = function getInteractionCountForNavigation() {
  return getInteractionCount() - prevInteractionCount
} // To prevent unnecessary memory usage on pages with lots of interactions,
// store at most 10 of the longest interactions to consider as INP candidates.

var MAX_INTERACTIONS_TO_CONSIDER = 10 // A list of longest interactions on the page (by latency) sorted so the
// longest one is first. The list is as most MAX_INTERACTIONS_TO_CONSIDER long.

var longestInteractionList = [] // A mapping of longest interactions by their interaction ID.
// This is used for faster lookup.

var longestInteractionMap = {}
/**
 * Takes a performance entry and adds it to the list of worst interactions
 * if its duration is long enough to make it among the worst. If the
 * entry is part of an existing interaction, it is merged and the latency
 * and entries list is updated as needed.
 */

var processEntry = function processEntry(entry) {
  // The least-long of the 10 longest interactions.
  var minLongestInteraction = longestInteractionList[longestInteractionList.length - 1]
  var existingInteraction = longestInteractionMap[entry.interactionId] // Only process the entry if it's possibly one of the ten longest,
  // or if it's part of an existing interaction.

  if (existingInteraction || longestInteractionList.length < MAX_INTERACTIONS_TO_CONSIDER || entry.duration > minLongestInteraction.latency) {
    // If the interaction already exists, update it. Otherwise create one.
    if (existingInteraction) {
      existingInteraction.entries.push(entry)
      existingInteraction.latency = Math.max(existingInteraction.latency, entry.duration)
    } else {
      var interaction = {
        id: entry.interactionId,
        latency: entry.duration,
        entries: [entry],
      }
      longestInteractionMap[interaction.id] = interaction
      longestInteractionList.push(interaction)
    } // Sort the entries by latency (descending) and keep only the top ten.

    longestInteractionList.sort(function (a, b) {
      return b.latency - a.latency
    })
    longestInteractionList.splice(MAX_INTERACTIONS_TO_CONSIDER).forEach(function (i) {
      delete longestInteractionMap[i.id]
    })
  }
}
/**
 * Returns the estimated p98 longest interaction based on the stored
 * interaction candidates and the interaction count for the current page.
 */

var estimateP98LongestInteraction = function estimateP98LongestInteraction() {
  var candidateInteractionIndex = Math.min(longestInteractionList.length - 1, Math.floor(getInteractionCountForNavigation() / 50))
  return longestInteractionList[candidateInteractionIndex]
}
/**
 * Calculates the [INP](https://web.dev/responsiveness/) value for the current
 * page and calls the `callback` function once the value is ready, along with
 * the `event` performance entries reported for that interaction. The reported
 * value is a `DOMHighResTimeStamp`.
 *
 * A custom `durationThreshold` configuration option can optionally be passed to
 * control what `event-timing` entries are considered for INP reporting. The
 * default threshold is `40`, which means INP scores of less than 40 are
 * reported as 0. Note that this will not affect your 75th percentile INP value
 * unless that value is also less than 40 (well below the recommended
 * [good](https://web.dev/inp/#what-is-a-good-inp-score) threshold).
 *
 * If the `reportAllChanges` configuration option is set to `true`, the
 * `callback` function will be called as soon as the value is initially
 * determined as well as any time the value changes throughout the page
 * lifespan.
 *
 * _**Important:** INP should be continually monitored for changes throughout
 * the entire lifespan of a page—including if the user returns to the page after
 * it's been hidden/backgrounded. However, since browsers often [will not fire
 * additional callbacks once the user has backgrounded a
 * page](https://developer.chrome.com/blog/page-lifecycle-api/#advice-hidden),
 * `callback` is always called when the page's visibility state changes to
 * hidden. As a result, the `callback` function might be called multiple times
 * during the same page load._
 */

var onINP = function onINP(onReport, opts) {
  // Set defaults
  opts = opts || {} // https://web.dev/inp/#what's-a-%22good%22-inp-value

  var thresholds = [200, 500] // TODO(philipwalton): remove once the polyfill is no longer needed.

  initInteractionCountPolyfill()
  var metric = initMetric('INP')
  var report

  var handleEntries = function handleEntries(entries) {
    entries.forEach(function (entry) {
      if (entry.interactionId) {
        processEntry(entry)
      } // Entries of type `first-input` don't currently have an `interactionId`,
      // so to consider them in INP we have to first check that an existing
      // entry doesn't match the `duration` and `startTime`.
      // Note that this logic assumes that `event` entries are dispatched
      // before `first-input` entries. This is true in Chrome but it is not
      // true in Firefox; however, Firefox doesn't support interactionId, so
      // it's not an issue at the moment.
      // TODO(philipwalton): remove once crbug.com/1325826 is fixed.

      if (entry.entryType === 'first-input') {
        var noMatchingEntry = !longestInteractionList.some(function (interaction) {
          return interaction.entries.some(function (prevEntry) {
            return entry.duration === prevEntry.duration && entry.startTime === prevEntry.startTime
          })
        })

        if (noMatchingEntry) {
          processEntry(entry)
        }
      }
    })
    var inp = estimateP98LongestInteraction()

    if (inp && inp.latency !== metric.value) {
      metric.value = inp.latency
      metric.entries = inp.entries
      report()
    }
  }

  var po = observe('event', handleEntries, {
    // Event Timing entries have their durations rounded to the nearest 8ms,
    // so a duration of 40ms would be any event that spans 2.5 or more frames
    // at 60Hz. This threshold is chosen to strike a balance between usefulness
    // and performance. Running this callback for any interaction that spans
    // just one or two frames is likely not worth the insight that could be
    // gained.
    durationThreshold: opts.durationThreshold || 40,
  })
  report = bindReporter(onReport, metric, thresholds, opts.reportAllChanges)

  if (po) {
    // Also observe entries of type `first-input`. This is useful in cases
    // where the first interaction is less than the `durationThreshold`.
    po.observe({
      type: 'first-input',
      buffered: true,
    })
    onHidden(function () {
      handleEntries(po.takeRecords()) // If the interaction count shows that there were interactions but
      // none were captured by the PerformanceObserver, report a latency of 0.

      if (metric.value < 0 && getInteractionCountForNavigation() > 0) {
        metric.value = 0
        metric.entries = []
      }

      report(true)
    }) // Only report after a bfcache restore if the `PerformanceObserver`
    // successfully registered.

    onBFCacheRestore(function () {
      longestInteractionList = [] // Important, we want the count for the full page here,
      // not just for the current navigation.

      prevInteractionCount = getInteractionCount()
      metric = initMetric('INP')
      report = bindReporter(onReport, metric, thresholds, opts.reportAllChanges)
    })
  }
}

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var reportedMetricIDs = {}
/**
 * Calculates the [LCP](https://web.dev/lcp/) value for the current page and
 * calls the `callback` function once the value is ready (along with the
 * relevant `largest-contentful-paint` performance entry used to determine the
 * value). The reported value is a `DOMHighResTimeStamp`.
 *
 * If the `reportAllChanges` configuration option is set to `true`, the
 * `callback` function will be called any time a new `largest-contentful-paint`
 * performance entry is dispatched, or once the final value of the metric has
 * been determined.
 */

var onLCP = function onLCP(onReport, opts) {
  // Set defaults
  opts = opts || {} // https://web.dev/lcp/#what-is-a-good-lcp-score

  var thresholds = [2500, 4000]
  var visibilityWatcher = getVisibilityWatcher()
  var metric = initMetric('LCP')
  var report

  var handleEntries = function handleEntries(entries) {
    var lastEntry = entries[entries.length - 1]

    if (lastEntry) {
      // The startTime attribute returns the value of the renderTime if it is
      // not 0, and the value of the loadTime otherwise. The activationStart
      // reference is used because LCP should be relative to page activation
      // rather than navigation start if the page was prerendered.
      var value = lastEntry.startTime - getActivationStart() // Only report if the page wasn't hidden prior to LCP.

      if (value < visibilityWatcher.firstHiddenTime) {
        metric.value = value
        metric.entries = [lastEntry]
        report()
      }
    }
  }

  var po = observe('largest-contentful-paint', handleEntries)

  if (po) {
    report = bindReporter(onReport, metric, thresholds, opts.reportAllChanges)

    var stopListening = function stopListening() {
      if (!reportedMetricIDs[metric.id]) {
        handleEntries(po.takeRecords())
        po.disconnect()
        reportedMetricIDs[metric.id] = true
        report(true)
      }
    } // Stop listening after input. Note: while scrolling is an input that
    // stop LCP observation, it's unreliable since it can be programmatically
    // generated. See: https://github.com/GoogleChrome/web-vitals/issues/75

    ;['keydown', 'click'].forEach(function (type) {
      addEventListener(type, stopListening, {
        once: true,
        capture: true,
      })
    })
    onHidden(stopListening, true) // Only report after a bfcache restore if the `PerformanceObserver`
    // successfully registered.

    onBFCacheRestore(function (event) {
      metric = initMetric('LCP')
      report = bindReporter(onReport, metric, thresholds, opts.reportAllChanges)
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          metric.value = performance.now() - event.timeStamp
          reportedMetricIDs[metric.id] = true
          report(true)
        })
      })
    })
  }
}

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Runs in the next task after the page is done loading and/or prerendering.
 * @param callback
 */

var whenReady = function whenReady(callback) {
  if (document.prerendering) {
    addEventListener(
      'prerenderingchange',
      function () {
        return whenReady(callback)
      },
      true
    )
  } else if (document.readyState !== 'complete') {
    addEventListener(
      'load',
      function () {
        return whenReady(callback)
      },
      true
    )
  } else {
    // Queue a task so the callback runs after `loadEventEnd`.
    setTimeout(callback, 0)
  }
}
/**
 * Calculates the [TTFB](https://web.dev/time-to-first-byte/) value for the
 * current page and calls the `callback` function once the page has loaded,
 * along with the relevant `navigation` performance entry used to determine the
 * value. The reported value is a `DOMHighResTimeStamp`.
 *
 * Note, this function waits until after the page is loaded to call `callback`
 * in order to ensure all properties of the `navigation` entry are populated.
 * This is useful if you want to report on other metrics exposed by the
 * [Navigation Timing API](https://w3c.github.io/navigation-timing/). For
 * example, the TTFB metric starts from the page's [time
 * origin](https://www.w3.org/TR/hr-time-2/#sec-time-origin), which means it
 * includes time spent on DNS lookup, connection negotiation, network latency,
 * and server processing time.
 */

var onTTFB = function onTTFB(onReport, opts) {
  // Set defaults
  opts = opts || {} // https://web.dev/ttfb/#what-is-a-good-ttfb-score

  var thresholds = [800, 1800]
  var metric = initMetric('TTFB')
  var report = bindReporter(onReport, metric, thresholds, opts.reportAllChanges)
  whenReady(function () {
    var navEntry = getNavigationEntry()

    if (navEntry) {
      // The activationStart reference is used because TTFB should be
      // relative to page activation rather than navigation start if the
      // page was prerendered. But in cases where `activationStart` occurs
      // after the first byte is received, this time should be clamped at 0.
      metric.value = Math.max(navEntry.responseStart - getActivationStart(), 0) // In some cases the value reported is negative or is larger
      // than the current page time. Ignore these cases:
      // https://github.com/GoogleChrome/web-vitals/issues/137
      // https://github.com/GoogleChrome/web-vitals/issues/162

      if (metric.value < 0 || metric.value > performance.now()) return
      metric.entries = [navEntry]
      report(true) // Only report TTFB after bfcache restores if a `navigation` entry
      // was reported for the initial load.

      onBFCacheRestore(function () {
        metric = initMetric('TTFB', 0)
        report = bindReporter(onReport, metric, thresholds, opts.reportAllChanges)
        report(true)
      })
    }
  })
}

export { onCLS as getCLS, onFCP as getFCP, onFID as getFID, onINP as getINP, onLCP as getLCP, onTTFB as getTTFB, onCLS, onFCP, onFID, onINP, onLCP, onTTFB }
