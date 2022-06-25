var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/registry.npmjs.org+@sveltejs+kit@1.0.0-next.354_svelte@3.48.0/node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var s, S, f, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/.pnpm/registry.npmjs.org+@sveltejs+kit@1.0.0-next.354_svelte@3.48.0/node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js"() {
    init_polyfills();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index: index4, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index4 === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index4++;
                break;
              } else if (index4 - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index4 = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index4 + 2]) {
                index4 = -2;
              }
              if (c === boundary[index4 + 2]) {
                index4++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index4 = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index4++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index4 === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index4;
              if (index4 === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index4 < boundary.length) {
                if (boundary[index4] === c) {
                  if (index4 === 0) {
                    dataCallback("onPartData", true);
                  }
                  index4++;
                } else {
                  index4 = 0;
                }
              } else if (index4 === boundary.length) {
                index4++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index4 = 0;
                }
              } else if (index4 - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index4 = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index4 = 0;
                  }
                } else {
                  index4 = 0;
                }
              }
              if (index4 > 0) {
                lookbehind[index4 - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index4;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/.pnpm/registry.npmjs.org+@sveltejs+kit@1.0.0-next.354_svelte@3.48.0/node_modules/@sveltejs/kit/dist/node/polyfills.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base642 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base642 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base642 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* toIterator(parts, clone2) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0, b = part;
      while (position !== b.size) {
        const chunk = b.slice(position, Math.min(b.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F2, B = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  const { body } = data;
  if (body === null) {
    return import_node_buffer.Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream.default)) {
    return import_node_buffer.Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return import_node_buffer.Buffer.from(accum.join(""));
      }
      return import_node_buffer.Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers2(headers.reduce((result, value, index4, array2) => {
    if (index4 % 2 === 0) {
      result.push(array2.slice(index4, index4 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_node_net.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url.host)) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request2(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https.default : import_node_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_node_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL.toString(), options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL(location, request.url);
        } catch {
          if (request.redirect !== "manual") {
            reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (!isDomainOrSubdomain(request.url, locationURL)) {
              for (const name of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOptions.headers.delete(name);
              }
            }
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch2(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream.pipeline)(response_, new import_node_stream.PassThrough(), (error2) => {
        if (error2) {
          reject(error2);
        }
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createGunzip(zlibOptions), (error2) => {
          if (error2) {
            reject(error2);
          }
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream.pipeline)(response_, new import_node_stream.PassThrough(), (error2) => {
          if (error2) {
            reject(error2);
          }
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createInflate(), (error2) => {
              if (error2) {
                reject(error2);
              }
            });
          } else {
            body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createInflateRaw(), (error2) => {
              if (error2) {
                reject(error2);
              }
            });
          }
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        raw.once("end", () => {
          if (!response) {
            response = new Response2(body, responseOptions);
            resolve2(response);
          }
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createBrotliDecompress(), (error2) => {
          if (error2) {
            reject(error2);
          }
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request).catch(reject);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = import_node_buffer.Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = import_node_buffer.Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = import_node_buffer.Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && import_node_buffer.Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}
function installPolyfills() {
  for (const name in globals) {
    Object.defineProperty(globalThis, name, {
      enumerable: true,
      configurable: true,
      value: globals[name]
    });
  }
}
var import_node_http, import_node_https, import_node_zlib, import_node_stream, import_node_buffer, import_node_util, import_node_url, import_node_net, import_crypto, commonjsGlobal, ponyfill_es2018, POOL_SIZE$1, POOL_SIZE, _Blob, Blob2, Blob$1, _File, File, t, i, h, r, m, f2, e, x, FormData, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, isDomainOrSubdomain, pipeline, INTERNALS$2, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers2, redirectStatus, isRedirect, INTERNALS$1, Response2, getSearch, ReferrerPolicy, DEFAULT_REFERRER_POLICY, INTERNALS, isRequest, doBadDataWarn, Request2, getNodeRequestOptions, AbortError, supportedSchemas, globals;
var init_polyfills = __esm({
  "node_modules/.pnpm/registry.npmjs.org+@sveltejs+kit@1.0.0-next.354_svelte@3.48.0/node_modules/@sveltejs/kit/dist/node/polyfills.js"() {
    import_node_http = __toESM(require("node:http"), 1);
    import_node_https = __toESM(require("node:https"), 1);
    import_node_zlib = __toESM(require("node:zlib"), 1);
    import_node_stream = __toESM(require("node:stream"), 1);
    import_node_buffer = require("node:buffer");
    import_node_util = require("node:util");
    import_node_url = require("node:url");
    import_node_net = require("node:net");
    import_crypto = require("crypto");
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    ponyfill_es2018 = { exports: {} };
    (function(module2, exports) {
      (function(global2, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
        function noop4() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else if (typeof commonjsGlobal !== "undefined") {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals2 = getGlobals();
        function typeIsObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        const rethrowAssertionErrorRejection = noop4;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
          return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask = (() => {
          const globalQueueMicrotask = globals2 && globals2.queueMicrotask;
          if (typeof globalQueueMicrotask === "function") {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F2, V, args) {
          if (typeof F2 !== "function") {
            throw new TypeError("Argument is not a function");
          }
          return Function.prototype.apply.call(F2, V, args);
        }
        function promiseCall(F2, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F2, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i2 = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i2 !== elements.length || node._next !== void 0) {
              if (i2 === elements.length) {
                node = node._next;
                elements = node._elements;
                i2 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i2]);
              ++i2;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream) {
          reader._ownerReadableStream = stream;
          stream._reader = reader;
          if (stream._state === "readable") {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream._state === "closed") {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream = reader._ownerReadableStream;
          return ReadableStreamCancel(stream, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === "readable") {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          } else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released reader");
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
        const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
        const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
        const PullSteps = SymbolPolyfill("[[PullSteps]]");
        const NumberIsFinite = Number.isFinite || function(x2) {
          return typeof x2 === "number" && isFinite(x2);
        };
        const MathTrunc = Math.trunc || function(v) {
          return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
        function isDictionary(x2) {
          return typeof x2 === "object" || typeof x2 === "function";
        }
        function assertDictionary(obj, context) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertFunction(x2, context) {
          if (typeof x2 !== "function") {
            throw new TypeError(`${context} is not a function.`);
          }
        }
        function isObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        function assertObject(x2, context) {
          if (!isObject(x2)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context) {
          if (x2 === void 0) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
          }
        }
        function assertRequiredField(x2, field, context) {
          if (x2 === void 0) {
            throw new TypeError(`${field} is required in '${context}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream) {
          return new ReadableStreamDefaultReader(stream);
        }
        function ReadableStreamAddReadRequest(stream, readRequest) {
          stream._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream) {
          return stream._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("read"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultReader",
            configurable: true
          });
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "closed") {
            readRequest._closeSteps();
          } else if (stream._state === "errored") {
            readRequest._errorSteps(stream._storedError);
          } else {
            stream._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
        }).prototype);
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("iterate"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("finish iterating"));
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
            }
            return this._asyncIteratorImpl.return(value);
          }
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
        }
        function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
            return false;
          }
          try {
            return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
          } catch (_a) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name) {
          return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
        }
        const NumberIsNaN = Number.isNaN || function(x2) {
          return x2 !== x2;
        };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
          new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
        }
        function TransferArrayBuffer(O) {
          return O;
        }
        function IsDetachedBuffer(O) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length = end - begin;
          const slice = new ArrayBuffer(length);
          CopyDataBlockBytes(slice, 0, buffer, begin, length);
          return slice;
        }
        function IsNonNegativeNumber(v) {
          if (typeof v !== "number") {
            return false;
          }
          if (NumberIsNaN(v)) {
            return false;
          }
          if (v < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O) {
          const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair = container._queue.shift();
          container._queueTotalSize -= pair.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair = container._queue.peek();
          return pair.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("view");
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respond");
            }
            assertRequiredArgument(bytesWritten, 1, "respond");
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(this._view.buffer))
              ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respondWithNewView");
            }
            assertRequiredArgument(view, 1, "respondWithNewView");
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError("You can only respond with array buffer views");
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBRequest",
            configurable: true
          });
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("byobRequest");
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("desiredSize");
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("close");
            }
            if (this._closeRequested) {
              throw new TypeError("The stream has already been closed; do not close it again!");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("enqueue");
            }
            assertRequiredArgument(chunk, 1, "enqueue");
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError("chunk must be an array buffer view");
            }
            if (chunk.byteLength === 0) {
              throw new TypeError("chunk must have non-zero byteLength");
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
              throw new TypeError("stream is closed or draining");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("error");
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry4 = this._queue.shift();
              this._queueTotalSize -= entry4.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(entry4.buffer, entry4.byteOffset, entry4.byteLength);
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableByteStreamController",
            configurable: true
          });
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableByteStreamControllerError(controller, e2);
          });
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
          let done = false;
          if (stream._state === "closed") {
            done = true;
          }
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          if (pullIntoDescriptor.readerType === "default") {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
          const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
          const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController = void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
          const stream = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: "byob"
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
          }
          if (stream._state === "closed") {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
          const stream = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
              const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer))
              ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
              ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (bytesWritten !== 0) {
              throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
              throw new RangeError("bytesWritten out of range");
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(controller, view) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (view.byteLength !== 0) {
              throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            }
          }
          if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError("The region specified by view does not match byobRequest");
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError("The buffer of view has different capacity than byobRequest");
          }
          if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError("The region specified by view is larger than byobRequest");
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
        }
        function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
          controller._controlledReadableByteStream = stream;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableByteStreamControllerError(controller, r2);
          });
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
          const controller = Object.create(ReadableByteStreamController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError("autoAllocateChunkSize must be greater than 0");
          }
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
        }
        function SetUpReadableStreamBYOBRequest(request, controller, view) {
          request._associatedReadableByteStreamController = controller;
          request._view = view;
        }
        function byobRequestBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
        }
        function byteStreamControllerBrandCheckException(name) {
          return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
        }
        function AcquireReadableStreamBYOBReader(stream) {
          return new ReadableStreamBYOBReader(stream);
        }
        function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
          stream._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream) {
          return stream._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
              throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("read"));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(new TypeError("view must be an array buffer view"));
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBReader",
            configurable: true
          });
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "errored") {
            readIntoRequest._errorSteps(stream._storedError);
          } else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
          }
        }
        function byobReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError("Invalid highWaterMark");
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
          return {
            highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
            size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
          };
        }
        function convertQueuingStrategySize(fn, context) {
          assertFunction(fn, context);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context) {
          assertDictionary(original, context);
          const abort = original === null || original === void 0 ? void 0 : original.abort;
          const close = original === null || original === void 0 ? void 0 : original.close;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          const write = original === null || original === void 0 ? void 0 : original.write;
          return {
            abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
            close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
            type
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context) {
          assertFunction(fn, context);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === "boolean";
          } catch (_a) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === "function";
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError("Invalid type is specified");
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("locked");
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("abort"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("close"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("getWriter");
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStream",
            configurable: true
          });
        }
        function AcquireWritableStreamDefaultWriter(stream) {
          return new WritableStreamDefaultWriter(stream);
        }
        function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(WritableStream.prototype);
          InitializeWritableStream(stream);
          const controller = Object.create(WritableStreamDefaultController.prototype);
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function InitializeWritableStream(stream) {
          stream._state = "writable";
          stream._storedError = void 0;
          stream._writer = void 0;
          stream._writableStreamController = void 0;
          stream._writeRequests = new SimpleQueue();
          stream._inFlightWriteRequest = void 0;
          stream._closeRequest = void 0;
          stream._inFlightCloseRequest = void 0;
          stream._pendingAbortRequest = void 0;
          stream._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
            return false;
          }
          return x2 instanceof WritableStream;
        }
        function IsWritableStreamLocked(stream) {
          if (stream._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream, reason) {
          var _a;
          if (stream._state === "closed" || stream._state === "errored") {
            return promiseResolvedWith(void 0);
          }
          stream._writableStreamController._abortReason = reason;
          (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseResolvedWith(void 0);
          }
          if (stream._pendingAbortRequest !== void 0) {
            return stream._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === "erroring") {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring
            };
          });
          stream._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream) {
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._closeRequest = closeRequest;
          });
          const writer = stream._writer;
          if (writer !== void 0 && stream._backpressure && state === "writable") {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(stream._writableStreamController);
          return promise;
        }
        function WritableStreamAddWriteRequest(stream) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream, error2) {
          const state = stream._state;
          if (state === "writable") {
            WritableStreamStartErroring(stream, error2);
            return;
          }
          WritableStreamFinishErroring(stream);
        }
        function WritableStreamStartErroring(stream, reason) {
          const controller = stream._writableStreamController;
          stream._state = "erroring";
          stream._storedError = reason;
          const writer = stream._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
          }
          if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
          }
        }
        function WritableStreamFinishErroring(stream) {
          stream._state = "errored";
          stream._writableStreamController[ErrorSteps]();
          const storedError = stream._storedError;
          stream._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream._writeRequests = new SimpleQueue();
          if (stream._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const abortRequest = stream._pendingAbortRequest;
          stream._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
          uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          });
        }
        function WritableStreamFinishInFlightWrite(stream) {
          stream._inFlightWriteRequest._resolve(void 0);
          stream._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream, error2) {
          stream._inFlightWriteRequest._reject(error2);
          stream._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamFinishInFlightClose(stream) {
          stream._inFlightCloseRequest._resolve(void 0);
          stream._inFlightCloseRequest = void 0;
          const state = stream._state;
          if (state === "erroring") {
            stream._storedError = void 0;
            if (stream._pendingAbortRequest !== void 0) {
              stream._pendingAbortRequest._resolve();
              stream._pendingAbortRequest = void 0;
            }
          }
          stream._state = "closed";
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream, error2) {
          stream._inFlightCloseRequest._reject(error2);
          stream._inFlightCloseRequest = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._reject(error2);
            stream._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamCloseQueuedOrInFlight(stream) {
          if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream) {
          if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream) {
          stream._inFlightCloseRequest = stream._closeRequest;
          stream._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream) {
          stream._inFlightWriteRequest = stream._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
          if (stream._closeRequest !== void 0) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = void 0;
          }
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream, backpressure) {
          const writer = stream._writer;
          if (writer !== void 0 && backpressure !== stream._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
            assertWritableStream(stream, "First parameter");
            if (IsWritableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive writing by another writer");
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === "writable") {
              if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "erroring") {
              defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "closed") {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("desiredSize");
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException("desiredSize");
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("abort"));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("close"));
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("close"));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("releaseLock");
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("write"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("write to"));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultWriter",
            configurable: true
          });
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream = writer._ownerWritableStream;
          return WritableStreamAbort(stream, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream = writer._ownerWritableStream;
          return WritableStreamClose(stream);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
          if (writer._closedPromiseState === "pending") {
            defaultWriterClosedPromiseReject(writer, error2);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
          if (writer._readyPromiseState === "pending") {
            defaultWriterReadyPromiseReject(writer, error2);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (state === "errored" || state === "erroring") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream = writer._ownerWritableStream;
          const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
          stream._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream = writer._ownerWritableStream;
          const controller = stream._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
          if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          const state = stream._state;
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
          }
          if (state === "erroring") {
            return promiseRejectedWith(stream._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("abortReason");
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("signal");
            }
            if (this._abortController === void 0) {
              throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("error");
            }
            const state = this._controlledWritableStream._state;
            if (state !== "writable") {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultController",
            configurable: true
          });
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledWritableStream = stream;
          stream._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (r2) => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r2);
          });
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(WritableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream = controller._controlledWritableStream;
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
          const stream = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream._state;
          if (state === "erroring") {
            WritableStreamFinishErroring(stream);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
          if (controller._controlledWritableStream._state === "writable") {
            WritableStreamDefaultControllerError(controller, error2);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
          }, (reason) => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
              const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
              WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (reason) => {
            if (stream._state === "writable") {
              WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error2) {
          const stream = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream, error2);
        }
        function streamBrandCheckException$2(name) {
          return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
        }
        function defaultControllerBrandCheckException$2(name) {
          return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
        }
        function defaultWriterBrandCheckException(name) {
          return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
        }
        function defaultWriterLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released writer");
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = "pending";
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "rejected";
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "resolved";
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = "pending";
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "rejected";
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "fulfilled";
        }
        const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === "function" || typeof ctor === "object")) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name) {
            this.message = message || "";
            this.name = name || "Error";
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error2 = new DOMException$1("Aborted", "AbortError");
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === "writable") {
                      return WritableStreamAbort(dest, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === "readable") {
                      return ReadableStreamCancel(source, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener("abort", abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop4);
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
              } else {
                shutdown();
              }
            });
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
              const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
            }
            function isOrBecomesErrored(stream, promise, action) {
              if (stream._state === "errored") {
                action(stream._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream, promise, action) {
              if (stream._state === "closed") {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              }
            }
            function shutdown(isError, error2) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
              } else {
                finalize(isError, error2);
              }
            }
            function finalize(isError, error2) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener("abort", abortAlgorithm);
              }
              if (isError) {
                reject(error2);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("desiredSize");
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("close");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits close");
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("enqueue");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits enqueue");
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("error");
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultController",
            configurable: true
          });
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableStreamDefaultControllerError(controller, e2);
          });
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream = controller._controlledReadableStream;
          if (stream._state !== "readable") {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === "readable") {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledReadableStream = stream;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableStreamDefaultControllerError(controller, r2);
          });
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function defaultControllerBrandCheckException$1(name) {
          return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
        }
        function ReadableStreamTee(stream, cloneForBranch2) {
          if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
          }
          return ReadableStreamDefaultTee(stream);
        }
        function ReadableStreamDefaultTee(stream, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
          }
          branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
          branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream) {
          let reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(branch1._readableStreamController, r2);
              ReadableByteStreamControllerError(branch2._readableStreamController, r2);
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
          branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context) {
          assertDictionary(source, context);
          const original = source;
          const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
          const cancel = original === null || original === void 0 ? void 0 : original.cancel;
          const pull = original === null || original === void 0 ? void 0 : original.pull;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context) {
          type = `${type}`;
          if (type !== "bytes") {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
          }
          return type;
        }
        function convertReaderOptions(options, context) {
          assertDictionary(options, context);
          const mode = options === null || options === void 0 ? void 0 : options.mode;
          return {
            mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
          };
        }
        function convertReadableStreamReaderMode(mode, context) {
          mode = `${mode}`;
          if (mode !== "byob") {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
          }
          return mode;
        }
        function convertIteratorOptions(options, context) {
          assertDictionary(options, context);
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options, context) {
          assertDictionary(options, context);
          const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
          const signal = options === null || options === void 0 ? void 0 : options.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
          };
        }
        function assertAbortSignal(signal, context) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair, context) {
          assertDictionary(pair, context);
          const readable2 = pair === null || pair === void 0 ? void 0 : pair.readable;
          assertRequiredField(readable2, "readable", "ReadableWritablePair");
          assertReadableStream(readable2, `${context} has member 'readable' that`);
          const writable3 = pair === null || pair === void 0 ? void 0 : pair.writable;
          assertRequiredField(writable3, "writable", "ReadableWritablePair");
          assertWritableStream(writable3, `${context} has member 'writable' that`);
          return { readable: readable2, writable: writable3 };
        }
        class ReadableStream2 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
            InitializeReadableStream(this);
            if (underlyingSource.type === "bytes") {
              if (strategy.size !== void 0) {
                throw new RangeError("The strategy for a byte stream cannot have a size function");
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("locked");
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("cancel"));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("getReader");
            }
            const options = convertReaderOptions(rawOptions, "First parameter");
            if (options.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("pipeThrough");
            }
            assertRequiredArgument(rawTransform, 1, "pipeThrough");
            const transform = convertReadableWritablePair(rawTransform, "First parameter");
            const options = convertPipeOptions(rawOptions, "Second parameter");
            if (IsReadableStreamLocked(this)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
            }
            if (destination === void 0) {
              return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options;
            try {
              options = convertPipeOptions(rawOptions, "Second parameter");
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("tee");
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("values");
            }
            const options = convertIteratorOptions(rawOptions, "First parameter");
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
          }
        }
        Object.defineProperties(ReadableStream2.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStream",
            configurable: true
          });
        }
        if (typeof SymbolPolyfill.asyncIterator === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream2.prototype.values,
            writable: true,
            configurable: true
          });
        }
        function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableByteStreamController.prototype);
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
          return stream;
        }
        function InitializeReadableStream(stream) {
          stream._state = "readable";
          stream._reader = void 0;
          stream._storedError = void 0;
          stream._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStream2;
        }
        function IsReadableStreamLocked(stream) {
          if (stream._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream, reason) {
          stream._disturbed = true;
          if (stream._state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (stream._state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          ReadableStreamClose(stream);
          const reader = stream._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop4);
        }
        function ReadableStreamClose(stream) {
          stream._state = "closed";
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream, e2) {
          stream._state = "errored";
          stream._storedError = e2;
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name) {
          return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
        }
        function convertQueuingStrategyInit(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        try {
          Object.defineProperty(byteLengthSizeFunction, "name", {
            value: "size",
            configurable: true
          });
        } catch (_a) {
        }
        class ByteLengthQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("highWaterMark");
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("size");
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "ByteLengthQueuingStrategy",
            configurable: true
          });
        }
        function byteLengthBrandCheckException(name) {
          return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        try {
          Object.defineProperty(countSizeFunction, "name", {
            value: "size",
            configurable: true
          });
        } catch (_a) {
        }
        class CountQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "CountQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("highWaterMark");
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("size");
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "CountQueuingStrategy",
            configurable: true
          });
        }
        function countBrandCheckException(name) {
          return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context) {
          assertDictionary(original, context);
          const flush = original === null || original === void 0 ? void 0 : original.flush;
          const readableType = original === null || original === void 0 ? void 0 : original.readableType;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const transform = original === null || original === void 0 ? void 0 : original.transform;
          const writableType = original === null || original === void 0 ? void 0 : original.writableType;
          return {
            flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
            readableType,
            start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
          };
        }
        function convertTransformerFlushCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream {
          constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
            const transformer = convertTransformer(rawTransformer, "First parameter");
            if (transformer.readableType !== void 0) {
              throw new RangeError("Invalid readableType specified");
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError("Invalid writableType specified");
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== void 0) {
              startPromise_resolve(transformer.start(this._transformStreamController));
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("readable");
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("writable");
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStream",
            configurable: true
          });
        }
        function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
          }
          stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(void 0);
          }
          stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          stream._backpressure = void 0;
          stream._backpressureChangePromise = void 0;
          stream._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream, true);
          stream._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
            return false;
          }
          return x2 instanceof TransformStream;
        }
        function TransformStreamError(stream, e2) {
          ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
          TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
          WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
          if (stream._backpressure) {
            TransformStreamSetBackpressure(stream, false);
          }
        }
        function TransformStreamSetBackpressure(stream, backpressure) {
          if (stream._backpressureChangePromise !== void 0) {
            stream._backpressureChangePromise_resolve();
          }
          stream._backpressureChangePromise = newPromise((resolve2) => {
            stream._backpressureChangePromise_resolve = resolve2;
          });
          stream._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("desiredSize");
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("enqueue");
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("error");
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("terminate");
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStreamDefaultController",
            configurable: true
          });
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
          controller._controlledTransformStream = stream;
          stream._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
          const controller = Object.create(TransformStreamDefaultController.prototype);
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError("Readable side is not in a state that permits enqueue");
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream, e2);
            throw stream._readable._storedError;
          }
          const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error2 = new TypeError("TransformStream terminated");
          TransformStreamErrorWritableAndUnblockWrite(stream, error2);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
          const controller = stream._transformStreamController;
          if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable3 = stream._writable;
              const state = writable3._state;
              if (state === "erroring") {
                throw writable3._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
          TransformStreamError(stream, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream) {
          const readable2 = stream._readable;
          const controller = stream._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(flushPromise, () => {
            if (readable2._state === "errored") {
              throw readable2._storedError;
            }
            ReadableStreamDefaultControllerClose(readable2._readableStreamController);
          }, (r2) => {
            TransformStreamError(stream, r2);
            throw readable2._storedError;
          });
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream) {
          TransformStreamSetBackpressure(stream, false);
          return stream._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name) {
          return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
        }
        function streamBrandCheckException(name) {
          return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream2;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream;
        exports2.TransformStreamDefaultController = TransformStreamDefaultController;
        exports2.WritableStream = WritableStream;
        exports2.WritableStreamDefaultController = WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("node:process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("node:stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error2) {
          process2.emitWarning = emitWarning;
          throw error2;
        }
      } catch (error2) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob3 } = require("buffer");
      if (Blob3 && !Blob3.prototype.stream) {
        Blob3.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error2) {
    }
    POOL_SIZE = 65536;
    _Blob = class Blob {
      #parts = [];
      #type = "";
      #size = 0;
      #endings = "transparent";
      constructor(blobParts = [], options = {}) {
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder2 = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof Blob) {
            part = element;
          } else {
            part = encoder2.encode(`${element}`);
          }
          const size = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (size) {
            this.#size += size;
            this.#parts.push(part);
          }
        }
        this.#endings = `${options.endings === void 0 ? "transparent" : options.endings}`;
        const type = options.type === void 0 ? "" : String(options.type);
        this.#type = /^[\x20-\x7E]*$/.test(type) ? type : "";
      }
      get size() {
        return this.#size;
      }
      get type() {
        return this.#type;
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(this.#parts, false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(this.#parts, false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(this.#parts, true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = this.#parts;
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new Blob([], { type: String(type).toLowerCase() });
        blob.#size = span;
        blob.#parts = blobParts;
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob2 = _Blob;
    Blob$1 = Blob2;
    _File = class File2 extends Blob$1 {
      #lastModified = 0;
      #name = "";
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          this.#lastModified = lastModified;
        }
        this.#name = String(fileName);
      }
      get name() {
        return this.#name;
      }
      get lastModified() {
        return this.#lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
      static [Symbol.hasInstance](object) {
        return !!object && object instanceof Blob$1 && /^(File)$/.test(object[Symbol.toStringTag]);
      }
    };
    File = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f2 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new File([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = class FormData2 {
      #d = [];
      constructor(...a) {
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        this.#d.push(f2(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        this.#d = this.#d.filter(([b]) => b !== a);
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = this.#d, l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        this.#d.forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return this.#d.some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f2(...a);
        this.#d.forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        this.#d = b;
      }
      *entries() {
        yield* this.#d;
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    };
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    isDomainOrSubdomain = (destination, original) => {
      const orig = new URL(original).hostname;
      const dest = new URL(destination).hostname;
      return orig === dest || orig.endsWith(`.${dest}`);
    };
    pipeline = (0, import_node_util.promisify)(import_node_stream.default.pipeline);
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = import_node_buffer.Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (import_node_buffer.Buffer.isBuffer(body))
          ;
        else if (import_node_util.types.isAnyArrayBuffer(body)) {
          body = import_node_buffer.Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = import_node_buffer.Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream.default)
          ;
        else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = import_node_buffer.Buffer.from(String(body));
        }
        let stream = body;
        if (import_node_buffer.Buffer.isBuffer(body)) {
          stream = import_node_stream.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream.default.Readable.from(body.stream());
        }
        this[INTERNALS$2] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream.default) {
          body.on("error", (error_) => {
            const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.arrayBuffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const text = await this.text();
        return JSON.parse(text);
      }
      async text() {
        const buffer = await consumeBody(this);
        return new TextDecoder().decode(buffer);
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true },
      data: { get: (0, import_node_util.deprecate)(() => {
      }, "data doesn't exist, use json(), text(), arrayBuffer(), or body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (response)") }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS$2];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream.PassThrough({ highWaterMark });
        p2 = new import_node_stream.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (import_node_buffer.Buffer.isBuffer(body) || import_node_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS$2];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (import_node_buffer.Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = async (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        await pipeline(body, dest);
      }
    };
    validateHeaderName = typeof import_node_http.default.validateHeaderName === "function" ? import_node_http.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error2;
      }
    };
    validateHeaderValue = typeof import_node_http.default.validateHeaderValue === "function" ? import_node_http.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
        throw error2;
      }
    };
    Headers2 = class extends URLSearchParams {
      constructor(init2) {
        let result = [];
        if (init2 instanceof Headers2) {
          const raw = init2.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init2 == null)
          ;
        else if (typeof init2 === "object" && !import_node_util.types.isBoxedPrimitive(init2)) {
          const method = init2[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init2));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init2].map((pair) => {
              if (typeof pair !== "object" || import_node_util.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key2) => {
          result[key2] = this.getAll(key2);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key2) => {
          const values = this.getAll(key2);
          if (key2 === "host") {
            result[key2] = values[0];
          } else {
            result[key2] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers2.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response2 = class extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers2(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS$1].type;
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response2(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response2(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response2(null, { status: 0, statusText: "" });
        response[INTERNALS$1].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response2.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    ReferrerPolicy = /* @__PURE__ */ new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    doBadDataWarn = (0, import_node_util.deprecate)(() => {
    }, ".data is not a valid RequestInit property, use .body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (request)");
    Request2 = class extends Body {
      constructor(input, init2 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
        }
        let method = init2.method || input.method || "GET";
        if (/^(delete|get|head|options|post|put)$/i.test(method)) {
          method = method.toUpperCase();
        }
        if ("data" in init2) {
          doBadDataWarn();
        }
        if ((init2.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init2.size || input.size || 0
        });
        const headers = new Headers2(init2.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init2) {
          signal = init2.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init2.referrer == null ? input.referrer : init2.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init2.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
        this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
        this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init2.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_node_url.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request2(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers2(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS].referrer = "no-referrer";
      }
      if (request[INTERNALS].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options
      };
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    if (!globalThis.DOMException) {
      try {
        const { MessageChannel } = require("worker_threads"), port = new MessageChannel().port1, ab = new ArrayBuffer();
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        err.constructor.name === "DOMException" && (globalThis.DOMException = err.constructor);
      }
    }
    supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
    globals = {
      crypto: import_crypto.webcrypto,
      fetch: fetch2,
      Response: Response2,
      Request: Request2,
      Headers: Headers2
    };
  }
});

// .svelte-kit/output/server/chunks/index-26ca9b1d.js
function noop2() {
}
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return tar;
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0)
    raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0)
    raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css6) => css6.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape_attribute_value(value.toString())}"`;
  return ` ${name}${assignment}`;
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key2) => style_object[key2]).map((key2) => `${key2}: ${style_object[key2]};`).join(" ");
}
function add_styles(style_object) {
  const styles = style_object_to_string(style_object);
  return styles ? ` style="${styles}"` : "";
}
var identity, is_client, now, raf, tasks, current_component, escaped, missing_component, on_destroy;
var init_index_26ca9b1d = __esm({
  ".svelte-kit/output/server/chunks/index-26ca9b1d.js"() {
    identity = (x2) => x2;
    is_client = typeof window !== "undefined";
    now = is_client ? () => window.performance.now() : () => Date.now();
    raf = is_client ? (cb) => requestAnimationFrame(cb) : noop2;
    tasks = /* @__PURE__ */ new Set();
    Promise.resolve();
    escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/hooks-1c45ba0b.js
var hooks_1c45ba0b_exports = {};
var init_hooks_1c45ba0b = __esm({
  ".svelte-kit/output/server/chunks/hooks-1c45ba0b.js"() {
  }
});

// .svelte-kit/output/server/chunks/store-6714e613.js
function writable2(value, start = noop2) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue2.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue2.length; i2 += 2) {
            subscriber_queue2[i2][0](subscriber_queue2[i2 + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var Navbar_logo, subscriber_queue2, isDark, isInternalWorkOpen;
var init_store_6714e613 = __esm({
  ".svelte-kit/output/server/chunks/store-6714e613.js"() {
    init_index_26ca9b1d();
    Navbar_logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<svg class="${"w-[160px]"}" fill="${"currentColor"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 208.3 27.7"}"><path d="${"M0,24.1h11.7c5.5,0,8.7-2.3,8.7-6.8c0-2.8-1.7-4.5-4.1-5.3c2-0.9,3.4-2.6,3.4-5.3c0-3.5-2.2-5.9-7.5-5.9H0V24.1z M13.1,7.9 c0,1.6-1,2.4-3.2,2.4H6.4V5.5h3.5C12.1,5.5,13.1,6.3,13.1,7.9z M13.8,16.9c0,1.7-1,2.4-3.3,2.4H6.4v-4.9h4.2 C12.8,14.4,13.8,15.2,13.8,16.9z"}"></path><path d="${"M38.2,24.1h6.7L36.8,0.7h-8.4l-8.1,23.4h6.5l1.2-3.8h9.1L38.2,24.1z M32.5,5.9l2.9,9.5h-5.9L32.5,5.9z"}"></path><path d="${"M55.1,24.5c6.3,0,10.3-3,10.3-7.7c0-3.8-2.5-5.8-6.5-6.6l-5.1-1c-2-0.4-2.6-1-2.6-2.1S52.4,5,54.5,5c2.4,0,4.1,1,4.2,3.1H65 c0-5.6-4.7-7.8-10.5-7.8c-5.6,0-9.7,2.8-9.7,7.3c0,3.8,2.5,5.8,6.5,6.6l5.1,1c2,0.4,2.6,1,2.6,2.1c0,1.5-1.4,2.3-3.7,2.3 c-2.6,0-4.5-1.3-4.6-3.8h-6.3C44.6,21.3,48.1,24.5,55.1,24.5z"}"></path><path d="${"M67.3,24.1h6.4V0.7h-6.4V24.1z"}"></path><path d="${"M82,12.4c0-3.9,2.1-6.8,5.6-6.8c2.9,0,4.7,1.7,5.1,3.7h6.7c-0.6-6.1-5.8-9.1-11.7-9.1C80,0.2,75.4,5,75.4,12.3 s4.5,12.1,12.3,12.1c6,0,11.2-2.9,11.8-9.1h-6.7c-0.4,2.1-2.1,3.7-5.1,3.7C84.1,19.2,82,16.3,82,12.4z"}"></path><path d="${"M113.7,0h-5.2l-10,27.7h5.2L113.7,0z"}"></path><path d="${"M137.8,12.4c0-6.6-3.6-11.7-12.8-11.7h-9.8v23.4h9.8C134.2,24.1,137.8,19,137.8,12.4z M131.2,12.4c0,4.6-2.6,6.3-6.2,6.3 h-3.3V6.1h3.3C128.6,6.1,131.2,7.8,131.2,12.4z"}"></path><path d="${"M139.5,24.1H158v-5.3h-12.2v-4h10.7V9.7h-10.7V6.1h11.9V0.7h-18.2V24.1z"}"></path><path d="${"M180,8.9c0-5.9-3.8-8.1-9.6-8.1h-10.1v23.4h6.4V17h3.8C176.2,17,180,14.8,180,8.9z M173.4,8.9c0,2.3-1.1,3.2-3.7,3.2h-3.1 V5.6h3.1C172.3,5.6,173.4,6.6,173.4,8.9z"}"></path><path d="${"M181,6.2h7.4v17.9h6.4V6.2h7.4V0.7H181V6.2z"}"></path><path d="${"M203.5,23.7c-2.6,0-4.8-2.1-4.8-4.8c0-2.6,2.1-4.8,4.8-4.8s4.8,2.1,4.8,4.8C208.3,21.5,206.1,23.7,203.5,23.7z M203.5,14.9 c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S205.7,14.9,203.5,14.9z"}"></path><path d="${"M204,17.2h-1.4v1.6h1.4c0.5,0,0.7-0.3,0.7-0.8C204.7,17.5,204.4,17.2,204,17.2z M203.9,16.4c1.2,0,1.8,0.5,1.8,1.6 c0,0.6-0.3,1.1-0.9,1.3l1.2,1.8h-1.2l-1.1-1.6h-1.2v1.6h-1.1v-4.7H203.9z"}"></path></svg>`;
    });
    subscriber_queue2 = [];
    isDark = writable2(false);
    isInternalWorkOpen = writable2(false);
  }
});

// .svelte-kit/output/server/entries/pages/__layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout
});
var Intro_logo, css$1, Intro, css, Navbar, _layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/__layout.svelte.js"() {
    init_index_26ca9b1d();
    init_store_6714e613();
    Intro_logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<svg class="${"w-[500px]"}" viewBox="${"0 0 427 200"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M175.678 144.948C175.678 121.228 162.729 102.953 129.81 102.953H94.5923V186.944H129.81C162.729 186.944 175.678 168.669 175.678 144.948ZM151.716 144.948C151.716 161.529 142.397 167.701 129.447 167.701H117.466V122.196H129.447C142.397 122.196 151.716 128.368 151.716 144.948Z"}"></path><path d="${"M181.156 186.944H247.72V167.822H204.03V153.42H242.395V135.267H204.03V122.075H246.63V102.953H181.156V186.944Z"}"></path><path d="${"M325.205 132.12C325.205 110.94 311.651 102.953 290.593 102.953H254.164V186.944H277.037V161.287H290.593C311.651 161.287 325.205 153.299 325.205 132.12ZM301.484 132.12C301.484 140.35 297.612 143.739 288.293 143.739H277.037V120.501H288.293C297.612 120.501 301.484 123.89 301.484 132.12Z"}"></path><path d="${"M327.701 122.559H354.206V186.944H377.079V122.559H403.583V102.953H327.701V122.559Z"}"></path><path d="${"M398.49 176.1C398.49 183.813 404.734 190.056 412.446 190.056C420.159 190.056 426.464 183.813 426.464 176.1C426.464 168.387 420.159 162.083 412.446 162.083C404.734 162.083 398.49 168.387 398.49 176.1ZM401.183 176.1C401.183 169.734 406.203 164.531 412.446 164.531C418.69 164.531 423.771 169.734 423.771 176.1C423.771 182.466 418.69 187.608 412.446 187.608C406.203 187.608 401.183 182.466 401.183 176.1ZM405.897 183.017H410.304V178.243H412.814L415.446 183.017H420.22L417.037 177.386C418.506 176.773 419.608 175.121 419.608 173.284C419.608 170.04 417.527 168.51 413.977 168.51H405.897V183.017ZM415.139 173.345C415.139 174.509 414.405 174.998 412.997 174.998H410.304V171.938H412.997C414.405 171.938 415.139 172.305 415.139 173.345Z"}"></path><path d="${"M4.49255 85.7227H46.504C66.2955 85.7227 77.8304 77.3447 77.8304 61.1958C77.8304 51.118 71.7594 44.9255 62.8957 42.0114C69.9381 38.6117 75.0378 32.6621 75.0378 22.827C75.0378 10.1993 67.024 1.45705 47.961 1.45705H4.49255V85.7227ZM51.6036 27.3196C51.6036 33.1477 47.961 35.9404 39.9473 35.9404H27.441V18.6987H39.9473C48.2039 18.6987 51.6036 21.4914 51.6036 27.3196ZM54.3963 59.7388C54.3963 65.6884 50.6323 68.4811 42.4971 68.4811H27.441V50.8751H42.4971C50.6323 50.8751 54.3963 53.6678 54.3963 59.7388ZM142.317 85.7227H166.358L137.096 1.45705H106.862L77.5998 85.7227H101.155L105.405 72.1237H138.067L142.317 85.7227ZM121.797 19.9129L132.36 54.032H111.112L121.797 19.9129ZM203.284 87.1798C226.111 87.1798 240.439 76.4948 240.439 59.4959C240.439 45.654 231.333 38.4902 217.126 35.5762L198.913 31.8121C191.628 30.3551 189.443 28.0481 189.443 24.2841C189.443 20.1558 193.692 16.756 201.342 16.756C209.841 16.756 216.034 20.3986 216.641 28.0481H239.225C239.225 7.89232 222.226 0 201.22 0C181.065 0 166.373 10.0779 166.373 26.4696C166.373 40.3115 175.479 47.4753 189.685 50.3894L207.898 54.1535C215.184 55.6105 217.369 57.9175 217.369 61.6815C217.369 67.024 212.148 70.0595 203.892 70.0595C194.542 70.0595 187.743 65.2027 187.257 56.4604H164.673C165.158 75.402 178.029 87.1798 203.284 87.1798ZM247.025 85.7227H269.973V1.45705H247.025V85.7227ZM300.115 43.5899C300.115 29.5051 307.765 19.1844 320.149 19.1844C330.713 19.1844 337.027 25.2554 338.362 32.6621H362.404C360.34 10.5636 341.641 0 320.149 0C292.223 0 275.952 17.3631 275.952 43.5899C275.952 69.8167 292.223 87.1798 320.149 87.1798C341.641 87.1798 360.461 76.6162 362.525 54.5177H338.362C337.027 61.9244 330.713 67.9954 320.149 67.9954C307.765 67.9954 300.115 57.6746 300.115 43.5899ZM54.6391 100.071H35.9404L0 200H18.5773L54.6391 100.071Z"}"></path></svg>`;
    });
    css$1 = {
      code: ".slide-out.svelte-q1t89g{overflow:hidden;animation:svelte-q1t89g-slide-out 0.5s ease-in-out;animation-fill-mode:forwards;animation-delay:var(--animation-delay, 0s)}@keyframes svelte-q1t89g-slide-out{from{height:var(--slide-height, 100%)}to{height:0px}}",
      map: null
    };
    Intro = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$1);
      return `<header class="${"slide-out noise-bg fixed top-0 left-0 z-[999] grid h-full w-full place-items-center text-3xl svelte-q1t89g"}"${add_styles({ "--animation-delay": `1s` })}><div class="${"slide-out svelte-q1t89g"}"${add_styles({
        "--slide-height": `243px`,
        "--animation-delay": `0s`
      })}>${validate_component(Intro_logo, "IntroLogo").$$render($$result, {}, {}, {})}</div>
</header>`;
    });
    css = {
      code: "a.svelte-13d5l9o.svelte-13d5l9o{@apply text-[14px] font-medium uppercase;;background-image:linear-gradient(white, white);background-position:left bottom;background-size:0% 1px;background-repeat:no-repeat;background-size:0% 1px;background-position:right bottom;transition:background-size 250ms ease-in-out}a.svelte-13d5l9o.svelte-13d5l9o:hover{background-size:100% 1px;background-position:left bottom}a.svelte-13d5l9o.svelte-13d5l9o::selection{@apply bg-white-full;}.scrolled-nav.svelte-13d5l9o.svelte-13d5l9o{@apply noise-bg text-black-full;}.dark .scrolled-nav.svelte-13d5l9o.svelte-13d5l9o{background:url(/noise.png?webp) theme('colors.black.300');@apply text-white-full;}.scrolled-nav.svelte-13d5l9o a.svelte-13d5l9o{background-image:linear-gradient(theme('colors.black.full'), theme('colors.black.full'))}",
      map: null
    };
    Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_isInternalWorkOpen;
      $$unsubscribe_isInternalWorkOpen = subscribe(isInternalWorkOpen, (value) => value);
      $$result.css.add(css);
      $$unsubscribe_isInternalWorkOpen();
      return `

${`<nav class="${[
        "fixed top-0 left-0 z-20 grid w-full grid-cols-[1fr,1fr] gap-[60px] px-5 py-6 text-white-full transition-colors duration-[250ms] md:grid-cols-[max-content,1fr,repeat(6,max-content),1fr] md:px-20 md:py-[50px] svelte-13d5l9o",
        ""
      ].join(" ").trim()}"><div style="display: contents; --width:${""}; --height:${""};">${validate_component(Navbar_logo, "NavbarLogo").$$render($$result, {}, {}, {})}</div>

		<a class="${"hidden justify-self-end md:block svelte-13d5l9o"}" href="${"/"}">Work</a>
		<a class="${"hidden md:block svelte-13d5l9o"}" href="${"/"}">About</a>
		<a class="${"hidden md:block svelte-13d5l9o"}" href="${"/"}">News</a>
		<a class="${"hidden md:block svelte-13d5l9o"}" href="${"/"}">Thinking</a>
		<a class="${"hidden md:block svelte-13d5l9o"}" href="${"/"}">Pledge</a>
		<a class="${"hidden md:block svelte-13d5l9o"}" href="${"/"}">Careers</a>
		<a class="${"hidden md:block svelte-13d5l9o"}" href="${"/"}">Contact</a>

		<button class="${"col-start-[-2] col-end-[-1] justify-self-end"}"><p class="${"uppercase md:hidden"}">menu</p>
			<svg class="${"hidden w-[22px] md:block"}" fill="${"currentColor"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 21 5"}"><circle cx="${"2.5"}" cy="${"2.5"}" r="${"2.5"}"></circle><circle cx="${"10.5"}" cy="${"2.5"}" r="${"2.5"}"></circle><circle cx="${"18.5"}" cy="${"2.5"}" r="${"2.5"}"></circle></svg></button></nav>`}`;
    });
    _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_isDark;
      $$unsubscribe_isDark = subscribe(isDark, (value) => value);
      $$unsubscribe_isDark();
      return `${$$result.head += `${$$result.title = `<title>BASIC | Digital Branding &amp; Experience Design Agency</title>`, ""}`, ""}

${validate_component(Intro, "Intro").$$render($$result, {}, {}, {})}
${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css2,
  entry: () => entry,
  index: () => index,
  js: () => js,
  module: () => layout_svelte_exports
});
var index, entry, js, css2;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_svelte();
    index = 0;
    entry = "pages/__layout.svelte-c3a5608b.js";
    js = ["pages/__layout.svelte-c3a5608b.js", "chunks/index-65d590a5.js", "chunks/store-3ad71f82.js", "chunks/index-6f304bd1.js"];
    css2 = ["assets/pages/__layout.svelte-bfa72a73.css"];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2,
  load: () => load
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_index_26ca9b1d();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css3,
  entry: () => entry2,
  index: () => index2,
  js: () => js2,
  module: () => error_svelte_exports
});
var index2, entry2, js2, css3;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    init_error_svelte();
    index2 = 1;
    entry2 = "error.svelte-d8b6887d.js";
    js2 = ["error.svelte-d8b6887d.js", "chunks/index-65d590a5.js"];
    css3 = [];
  }
});

// node_modules/.pnpm/registry.npmjs.org+svelte-embla@0.0.7/node_modules/svelte-embla/index.js
var init_svelte_embla = __esm({
  "node_modules/.pnpm/registry.npmjs.org+svelte-embla@0.0.7/node_modules/svelte-embla/index.js"() {
  }
});

// node_modules/.pnpm/registry.npmjs.org+luxon@2.4.0/node_modules/luxon/build/node/luxon.js
var require_luxon = __commonJS({
  "node_modules/.pnpm/registry.npmjs.org+luxon@2.4.0/node_modules/luxon/build/node/luxon.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LuxonError = class extends Error {
    };
    var InvalidDateTimeError = class extends LuxonError {
      constructor(reason) {
        super(`Invalid DateTime: ${reason.toMessage()}`);
      }
    };
    var InvalidIntervalError = class extends LuxonError {
      constructor(reason) {
        super(`Invalid Interval: ${reason.toMessage()}`);
      }
    };
    var InvalidDurationError = class extends LuxonError {
      constructor(reason) {
        super(`Invalid Duration: ${reason.toMessage()}`);
      }
    };
    var ConflictingSpecificationError = class extends LuxonError {
    };
    var InvalidUnitError = class extends LuxonError {
      constructor(unit) {
        super(`Invalid unit ${unit}`);
      }
    };
    var InvalidArgumentError = class extends LuxonError {
    };
    var ZoneIsAbstractError = class extends LuxonError {
      constructor() {
        super("Zone is an abstract class");
      }
    };
    var n = "numeric";
    var s3 = "short";
    var l = "long";
    var DATE_SHORT = {
      year: n,
      month: n,
      day: n
    };
    var DATE_MED = {
      year: n,
      month: s3,
      day: n
    };
    var DATE_MED_WITH_WEEKDAY = {
      year: n,
      month: s3,
      day: n,
      weekday: s3
    };
    var DATE_FULL = {
      year: n,
      month: l,
      day: n
    };
    var DATE_HUGE = {
      year: n,
      month: l,
      day: n,
      weekday: l
    };
    var TIME_SIMPLE = {
      hour: n,
      minute: n
    };
    var TIME_WITH_SECONDS = {
      hour: n,
      minute: n,
      second: n
    };
    var TIME_WITH_SHORT_OFFSET = {
      hour: n,
      minute: n,
      second: n,
      timeZoneName: s3
    };
    var TIME_WITH_LONG_OFFSET = {
      hour: n,
      minute: n,
      second: n,
      timeZoneName: l
    };
    var TIME_24_SIMPLE = {
      hour: n,
      minute: n,
      hourCycle: "h23"
    };
    var TIME_24_WITH_SECONDS = {
      hour: n,
      minute: n,
      second: n,
      hourCycle: "h23"
    };
    var TIME_24_WITH_SHORT_OFFSET = {
      hour: n,
      minute: n,
      second: n,
      hourCycle: "h23",
      timeZoneName: s3
    };
    var TIME_24_WITH_LONG_OFFSET = {
      hour: n,
      minute: n,
      second: n,
      hourCycle: "h23",
      timeZoneName: l
    };
    var DATETIME_SHORT = {
      year: n,
      month: n,
      day: n,
      hour: n,
      minute: n
    };
    var DATETIME_SHORT_WITH_SECONDS = {
      year: n,
      month: n,
      day: n,
      hour: n,
      minute: n,
      second: n
    };
    var DATETIME_MED = {
      year: n,
      month: s3,
      day: n,
      hour: n,
      minute: n
    };
    var DATETIME_MED_WITH_SECONDS = {
      year: n,
      month: s3,
      day: n,
      hour: n,
      minute: n,
      second: n
    };
    var DATETIME_MED_WITH_WEEKDAY = {
      year: n,
      month: s3,
      day: n,
      weekday: s3,
      hour: n,
      minute: n
    };
    var DATETIME_FULL = {
      year: n,
      month: l,
      day: n,
      hour: n,
      minute: n,
      timeZoneName: s3
    };
    var DATETIME_FULL_WITH_SECONDS = {
      year: n,
      month: l,
      day: n,
      hour: n,
      minute: n,
      second: n,
      timeZoneName: s3
    };
    var DATETIME_HUGE = {
      year: n,
      month: l,
      day: n,
      weekday: l,
      hour: n,
      minute: n,
      timeZoneName: l
    };
    var DATETIME_HUGE_WITH_SECONDS = {
      year: n,
      month: l,
      day: n,
      weekday: l,
      hour: n,
      minute: n,
      second: n,
      timeZoneName: l
    };
    function isUndefined(o) {
      return typeof o === "undefined";
    }
    function isNumber(o) {
      return typeof o === "number";
    }
    function isInteger(o) {
      return typeof o === "number" && o % 1 === 0;
    }
    function isString(o) {
      return typeof o === "string";
    }
    function isDate2(o) {
      return Object.prototype.toString.call(o) === "[object Date]";
    }
    function hasRelative() {
      try {
        return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
      } catch (e2) {
        return false;
      }
    }
    function maybeArray(thing) {
      return Array.isArray(thing) ? thing : [thing];
    }
    function bestBy(arr, by, compare) {
      if (arr.length === 0) {
        return void 0;
      }
      return arr.reduce((best, next) => {
        const pair = [by(next), next];
        if (!best) {
          return pair;
        } else if (compare(best[0], pair[0]) === best[0]) {
          return best;
        } else {
          return pair;
        }
      }, null)[1];
    }
    function pick(obj, keys) {
      return keys.reduce((a, k) => {
        a[k] = obj[k];
        return a;
      }, {});
    }
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    function integerBetween(thing, bottom, top) {
      return isInteger(thing) && thing >= bottom && thing <= top;
    }
    function floorMod(x2, n2) {
      return x2 - n2 * Math.floor(x2 / n2);
    }
    function padStart(input, n2 = 2) {
      const isNeg = input < 0;
      let padded;
      if (isNeg) {
        padded = "-" + ("" + -input).padStart(n2, "0");
      } else {
        padded = ("" + input).padStart(n2, "0");
      }
      return padded;
    }
    function parseInteger(string) {
      if (isUndefined(string) || string === null || string === "") {
        return void 0;
      } else {
        return parseInt(string, 10);
      }
    }
    function parseFloating(string) {
      if (isUndefined(string) || string === null || string === "") {
        return void 0;
      } else {
        return parseFloat(string);
      }
    }
    function parseMillis(fraction) {
      if (isUndefined(fraction) || fraction === null || fraction === "") {
        return void 0;
      } else {
        const f3 = parseFloat("0." + fraction) * 1e3;
        return Math.floor(f3);
      }
    }
    function roundTo(number, digits, towardZero = false) {
      const factor = 10 ** digits, rounder = towardZero ? Math.trunc : Math.round;
      return rounder(number * factor) / factor;
    }
    function isLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    function daysInYear(year) {
      return isLeapYear(year) ? 366 : 365;
    }
    function daysInMonth(year, month) {
      const modMonth = floorMod(month - 1, 12) + 1, modYear = year + (month - modMonth) / 12;
      if (modMonth === 2) {
        return isLeapYear(modYear) ? 29 : 28;
      } else {
        return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
      }
    }
    function objToLocalTS(obj) {
      let d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond);
      if (obj.year < 100 && obj.year >= 0) {
        d = new Date(d);
        d.setUTCFullYear(d.getUTCFullYear() - 1900);
      }
      return +d;
    }
    function weeksInWeekYear(weekYear) {
      const p1 = (weekYear + Math.floor(weekYear / 4) - Math.floor(weekYear / 100) + Math.floor(weekYear / 400)) % 7, last = weekYear - 1, p2 = (last + Math.floor(last / 4) - Math.floor(last / 100) + Math.floor(last / 400)) % 7;
      return p1 === 4 || p2 === 3 ? 53 : 52;
    }
    function untruncateYear(year) {
      if (year > 99) {
        return year;
      } else
        return year > 60 ? 1900 + year : 2e3 + year;
    }
    function parseZoneInfo(ts, offsetFormat, locale, timeZone = null) {
      const date = new Date(ts), intlOpts = {
        hourCycle: "h23",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      };
      if (timeZone) {
        intlOpts.timeZone = timeZone;
      }
      const modified = {
        timeZoneName: offsetFormat,
        ...intlOpts
      };
      const parsed = new Intl.DateTimeFormat(locale, modified).formatToParts(date).find((m2) => m2.type.toLowerCase() === "timezonename");
      return parsed ? parsed.value : null;
    }
    function signedOffset(offHourStr, offMinuteStr) {
      let offHour = parseInt(offHourStr, 10);
      if (Number.isNaN(offHour)) {
        offHour = 0;
      }
      const offMin = parseInt(offMinuteStr, 10) || 0, offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
      return offHour * 60 + offMinSigned;
    }
    function asNumber(value) {
      const numericValue = Number(value);
      if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue))
        throw new InvalidArgumentError(`Invalid unit value ${value}`);
      return numericValue;
    }
    function normalizeObject(obj, normalizer) {
      const normalized = {};
      for (const u in obj) {
        if (hasOwnProperty(obj, u)) {
          const v = obj[u];
          if (v === void 0 || v === null)
            continue;
          normalized[normalizer(u)] = asNumber(v);
        }
      }
      return normalized;
    }
    function formatOffset(offset2, format2) {
      const hours = Math.trunc(Math.abs(offset2 / 60)), minutes = Math.trunc(Math.abs(offset2 % 60)), sign = offset2 >= 0 ? "+" : "-";
      switch (format2) {
        case "short":
          return `${sign}${padStart(hours, 2)}:${padStart(minutes, 2)}`;
        case "narrow":
          return `${sign}${hours}${minutes > 0 ? `:${minutes}` : ""}`;
        case "techie":
          return `${sign}${padStart(hours, 2)}${padStart(minutes, 2)}`;
        default:
          throw new RangeError(`Value format ${format2} is out of range for property format`);
      }
    }
    function timeObject(obj) {
      return pick(obj, ["hour", "minute", "second", "millisecond"]);
    }
    var ianaRegex = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
    var monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
    function months(length) {
      switch (length) {
        case "narrow":
          return [...monthsNarrow];
        case "short":
          return [...monthsShort];
        case "long":
          return [...monthsLong];
        case "numeric":
          return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        case "2-digit":
          return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        default:
          return null;
      }
    }
    var weekdaysLong = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];
    function weekdays(length) {
      switch (length) {
        case "narrow":
          return [...weekdaysNarrow];
        case "short":
          return [...weekdaysShort];
        case "long":
          return [...weekdaysLong];
        case "numeric":
          return ["1", "2", "3", "4", "5", "6", "7"];
        default:
          return null;
      }
    }
    var meridiems = ["AM", "PM"];
    var erasLong = ["Before Christ", "Anno Domini"];
    var erasShort = ["BC", "AD"];
    var erasNarrow = ["B", "A"];
    function eras(length) {
      switch (length) {
        case "narrow":
          return [...erasNarrow];
        case "short":
          return [...erasShort];
        case "long":
          return [...erasLong];
        default:
          return null;
      }
    }
    function meridiemForDateTime(dt) {
      return meridiems[dt.hour < 12 ? 0 : 1];
    }
    function weekdayForDateTime(dt, length) {
      return weekdays(length)[dt.weekday - 1];
    }
    function monthForDateTime(dt, length) {
      return months(length)[dt.month - 1];
    }
    function eraForDateTime(dt, length) {
      return eras(length)[dt.year < 0 ? 0 : 1];
    }
    function formatRelativeTime(unit, count, numeric = "always", narrow = false) {
      const units = {
        years: ["year", "yr."],
        quarters: ["quarter", "qtr."],
        months: ["month", "mo."],
        weeks: ["week", "wk."],
        days: ["day", "day", "days"],
        hours: ["hour", "hr."],
        minutes: ["minute", "min."],
        seconds: ["second", "sec."]
      };
      const lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;
      if (numeric === "auto" && lastable) {
        const isDay = unit === "days";
        switch (count) {
          case 1:
            return isDay ? "tomorrow" : `next ${units[unit][0]}`;
          case -1:
            return isDay ? "yesterday" : `last ${units[unit][0]}`;
          case 0:
            return isDay ? "today" : `this ${units[unit][0]}`;
        }
      }
      const isInPast = Object.is(count, -0) || count < 0, fmtValue = Math.abs(count), singular = fmtValue === 1, lilUnits = units[unit], fmtUnit = narrow ? singular ? lilUnits[1] : lilUnits[2] || lilUnits[1] : singular ? units[unit][0] : unit;
      return isInPast ? `${fmtValue} ${fmtUnit} ago` : `in ${fmtValue} ${fmtUnit}`;
    }
    function stringifyTokens(splits, tokenToString) {
      let s4 = "";
      for (const token of splits) {
        if (token.literal) {
          s4 += token.val;
        } else {
          s4 += tokenToString(token.val);
        }
      }
      return s4;
    }
    var macroTokenToFormatOpts = {
      D: DATE_SHORT,
      DD: DATE_MED,
      DDD: DATE_FULL,
      DDDD: DATE_HUGE,
      t: TIME_SIMPLE,
      tt: TIME_WITH_SECONDS,
      ttt: TIME_WITH_SHORT_OFFSET,
      tttt: TIME_WITH_LONG_OFFSET,
      T: TIME_24_SIMPLE,
      TT: TIME_24_WITH_SECONDS,
      TTT: TIME_24_WITH_SHORT_OFFSET,
      TTTT: TIME_24_WITH_LONG_OFFSET,
      f: DATETIME_SHORT,
      ff: DATETIME_MED,
      fff: DATETIME_FULL,
      ffff: DATETIME_HUGE,
      F: DATETIME_SHORT_WITH_SECONDS,
      FF: DATETIME_MED_WITH_SECONDS,
      FFF: DATETIME_FULL_WITH_SECONDS,
      FFFF: DATETIME_HUGE_WITH_SECONDS
    };
    var Formatter = class {
      static create(locale, opts = {}) {
        return new Formatter(locale, opts);
      }
      static parseFormat(fmt) {
        let current = null, currentFull = "", bracketed = false;
        const splits = [];
        for (let i2 = 0; i2 < fmt.length; i2++) {
          const c = fmt.charAt(i2);
          if (c === "'") {
            if (currentFull.length > 0) {
              splits.push({
                literal: bracketed,
                val: currentFull
              });
            }
            current = null;
            currentFull = "";
            bracketed = !bracketed;
          } else if (bracketed) {
            currentFull += c;
          } else if (c === current) {
            currentFull += c;
          } else {
            if (currentFull.length > 0) {
              splits.push({
                literal: false,
                val: currentFull
              });
            }
            currentFull = c;
            current = c;
          }
        }
        if (currentFull.length > 0) {
          splits.push({
            literal: bracketed,
            val: currentFull
          });
        }
        return splits;
      }
      static macroTokenToFormatOpts(token) {
        return macroTokenToFormatOpts[token];
      }
      constructor(locale, formatOpts) {
        this.opts = formatOpts;
        this.loc = locale;
        this.systemLoc = null;
      }
      formatWithSystemDefault(dt, opts) {
        if (this.systemLoc === null) {
          this.systemLoc = this.loc.redefaultToSystem();
        }
        const df = this.systemLoc.dtFormatter(dt, {
          ...this.opts,
          ...opts
        });
        return df.format();
      }
      formatDateTime(dt, opts = {}) {
        const df = this.loc.dtFormatter(dt, {
          ...this.opts,
          ...opts
        });
        return df.format();
      }
      formatDateTimeParts(dt, opts = {}) {
        const df = this.loc.dtFormatter(dt, {
          ...this.opts,
          ...opts
        });
        return df.formatToParts();
      }
      resolvedOptions(dt, opts = {}) {
        const df = this.loc.dtFormatter(dt, {
          ...this.opts,
          ...opts
        });
        return df.resolvedOptions();
      }
      num(n2, p = 0) {
        if (this.opts.forceSimple) {
          return padStart(n2, p);
        }
        const opts = {
          ...this.opts
        };
        if (p > 0) {
          opts.padTo = p;
        }
        return this.loc.numberFormatter(opts).format(n2);
      }
      formatDateTimeFromString(dt, fmt) {
        const knownEnglish = this.loc.listingMode() === "en", useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", string = (opts, extract) => this.loc.extract(dt, opts, extract), formatOffset2 = (opts) => {
          if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
            return "Z";
          }
          return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
        }, meridiem = () => knownEnglish ? meridiemForDateTime(dt) : string({
          hour: "numeric",
          hourCycle: "h12"
        }, "dayperiod"), month = (length, standalone) => knownEnglish ? monthForDateTime(dt, length) : string(standalone ? {
          month: length
        } : {
          month: length,
          day: "numeric"
        }, "month"), weekday = (length, standalone) => knownEnglish ? weekdayForDateTime(dt, length) : string(standalone ? {
          weekday: length
        } : {
          weekday: length,
          month: "long",
          day: "numeric"
        }, "weekday"), maybeMacro = (token) => {
          const formatOpts = Formatter.macroTokenToFormatOpts(token);
          if (formatOpts) {
            return this.formatWithSystemDefault(dt, formatOpts);
          } else {
            return token;
          }
        }, era = (length) => knownEnglish ? eraForDateTime(dt, length) : string({
          era: length
        }, "era"), tokenToString = (token) => {
          switch (token) {
            case "S":
              return this.num(dt.millisecond);
            case "u":
            case "SSS":
              return this.num(dt.millisecond, 3);
            case "s":
              return this.num(dt.second);
            case "ss":
              return this.num(dt.second, 2);
            case "uu":
              return this.num(Math.floor(dt.millisecond / 10), 2);
            case "uuu":
              return this.num(Math.floor(dt.millisecond / 100));
            case "m":
              return this.num(dt.minute);
            case "mm":
              return this.num(dt.minute, 2);
            case "h":
              return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
            case "hh":
              return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
            case "H":
              return this.num(dt.hour);
            case "HH":
              return this.num(dt.hour, 2);
            case "Z":
              return formatOffset2({
                format: "narrow",
                allowZ: this.opts.allowZ
              });
            case "ZZ":
              return formatOffset2({
                format: "short",
                allowZ: this.opts.allowZ
              });
            case "ZZZ":
              return formatOffset2({
                format: "techie",
                allowZ: this.opts.allowZ
              });
            case "ZZZZ":
              return dt.zone.offsetName(dt.ts, {
                format: "short",
                locale: this.loc.locale
              });
            case "ZZZZZ":
              return dt.zone.offsetName(dt.ts, {
                format: "long",
                locale: this.loc.locale
              });
            case "z":
              return dt.zoneName;
            case "a":
              return meridiem();
            case "d":
              return useDateTimeFormatter ? string({
                day: "numeric"
              }, "day") : this.num(dt.day);
            case "dd":
              return useDateTimeFormatter ? string({
                day: "2-digit"
              }, "day") : this.num(dt.day, 2);
            case "c":
              return this.num(dt.weekday);
            case "ccc":
              return weekday("short", true);
            case "cccc":
              return weekday("long", true);
            case "ccccc":
              return weekday("narrow", true);
            case "E":
              return this.num(dt.weekday);
            case "EEE":
              return weekday("short", false);
            case "EEEE":
              return weekday("long", false);
            case "EEEEE":
              return weekday("narrow", false);
            case "L":
              return useDateTimeFormatter ? string({
                month: "numeric",
                day: "numeric"
              }, "month") : this.num(dt.month);
            case "LL":
              return useDateTimeFormatter ? string({
                month: "2-digit",
                day: "numeric"
              }, "month") : this.num(dt.month, 2);
            case "LLL":
              return month("short", true);
            case "LLLL":
              return month("long", true);
            case "LLLLL":
              return month("narrow", true);
            case "M":
              return useDateTimeFormatter ? string({
                month: "numeric"
              }, "month") : this.num(dt.month);
            case "MM":
              return useDateTimeFormatter ? string({
                month: "2-digit"
              }, "month") : this.num(dt.month, 2);
            case "MMM":
              return month("short", false);
            case "MMMM":
              return month("long", false);
            case "MMMMM":
              return month("narrow", false);
            case "y":
              return useDateTimeFormatter ? string({
                year: "numeric"
              }, "year") : this.num(dt.year);
            case "yy":
              return useDateTimeFormatter ? string({
                year: "2-digit"
              }, "year") : this.num(dt.year.toString().slice(-2), 2);
            case "yyyy":
              return useDateTimeFormatter ? string({
                year: "numeric"
              }, "year") : this.num(dt.year, 4);
            case "yyyyyy":
              return useDateTimeFormatter ? string({
                year: "numeric"
              }, "year") : this.num(dt.year, 6);
            case "G":
              return era("short");
            case "GG":
              return era("long");
            case "GGGGG":
              return era("narrow");
            case "kk":
              return this.num(dt.weekYear.toString().slice(-2), 2);
            case "kkkk":
              return this.num(dt.weekYear, 4);
            case "W":
              return this.num(dt.weekNumber);
            case "WW":
              return this.num(dt.weekNumber, 2);
            case "o":
              return this.num(dt.ordinal);
            case "ooo":
              return this.num(dt.ordinal, 3);
            case "q":
              return this.num(dt.quarter);
            case "qq":
              return this.num(dt.quarter, 2);
            case "X":
              return this.num(Math.floor(dt.ts / 1e3));
            case "x":
              return this.num(dt.ts);
            default:
              return maybeMacro(token);
          }
        };
        return stringifyTokens(Formatter.parseFormat(fmt), tokenToString);
      }
      formatDurationFromString(dur, fmt) {
        const tokenToField = (token) => {
          switch (token[0]) {
            case "S":
              return "millisecond";
            case "s":
              return "second";
            case "m":
              return "minute";
            case "h":
              return "hour";
            case "d":
              return "day";
            case "w":
              return "week";
            case "M":
              return "month";
            case "y":
              return "year";
            default:
              return null;
          }
        }, tokenToString = (lildur) => (token) => {
          const mapped = tokenToField(token);
          if (mapped) {
            return this.num(lildur.get(mapped), token.length);
          } else {
            return token;
          }
        }, tokens = Formatter.parseFormat(fmt), realTokens = tokens.reduce((found, {
          literal,
          val
        }) => literal ? found : found.concat(val), []), collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter((t2) => t2));
        return stringifyTokens(tokens, tokenToString(collapsed));
      }
    };
    var Invalid = class {
      constructor(reason, explanation) {
        this.reason = reason;
        this.explanation = explanation;
      }
      toMessage() {
        if (this.explanation) {
          return `${this.reason}: ${this.explanation}`;
        } else {
          return this.reason;
        }
      }
    };
    var Zone = class {
      get type() {
        throw new ZoneIsAbstractError();
      }
      get name() {
        throw new ZoneIsAbstractError();
      }
      get ianaName() {
        return this.name;
      }
      get isUniversal() {
        throw new ZoneIsAbstractError();
      }
      offsetName(ts, opts) {
        throw new ZoneIsAbstractError();
      }
      formatOffset(ts, format2) {
        throw new ZoneIsAbstractError();
      }
      offset(ts) {
        throw new ZoneIsAbstractError();
      }
      equals(otherZone) {
        throw new ZoneIsAbstractError();
      }
      get isValid() {
        throw new ZoneIsAbstractError();
      }
    };
    var singleton$1 = null;
    var SystemZone = class extends Zone {
      static get instance() {
        if (singleton$1 === null) {
          singleton$1 = new SystemZone();
        }
        return singleton$1;
      }
      get type() {
        return "system";
      }
      get name() {
        return new Intl.DateTimeFormat().resolvedOptions().timeZone;
      }
      get isUniversal() {
        return false;
      }
      offsetName(ts, {
        format: format2,
        locale
      }) {
        return parseZoneInfo(ts, format2, locale);
      }
      formatOffset(ts, format2) {
        return formatOffset(this.offset(ts), format2);
      }
      offset(ts) {
        return -new Date(ts).getTimezoneOffset();
      }
      equals(otherZone) {
        return otherZone.type === "system";
      }
      get isValid() {
        return true;
      }
    };
    var dtfCache = {};
    function makeDTF(zone) {
      if (!dtfCache[zone]) {
        dtfCache[zone] = new Intl.DateTimeFormat("en-US", {
          hour12: false,
          timeZone: zone,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          era: "short"
        });
      }
      return dtfCache[zone];
    }
    var typeToPos = {
      year: 0,
      month: 1,
      day: 2,
      era: 3,
      hour: 4,
      minute: 5,
      second: 6
    };
    function hackyOffset(dtf, date) {
      const formatted = dtf.format(date).replace(/\u200E/g, ""), parsed = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(formatted), [, fMonth, fDay, fYear, fadOrBc, fHour, fMinute, fSecond] = parsed;
      return [fYear, fMonth, fDay, fadOrBc, fHour, fMinute, fSecond];
    }
    function partsOffset(dtf, date) {
      const formatted = dtf.formatToParts(date);
      const filled = [];
      for (let i2 = 0; i2 < formatted.length; i2++) {
        const {
          type,
          value
        } = formatted[i2];
        const pos = typeToPos[type];
        if (type === "era") {
          filled[pos] = value;
        } else if (!isUndefined(pos)) {
          filled[pos] = parseInt(value, 10);
        }
      }
      return filled;
    }
    var ianaZoneCache = {};
    var IANAZone = class extends Zone {
      static create(name) {
        if (!ianaZoneCache[name]) {
          ianaZoneCache[name] = new IANAZone(name);
        }
        return ianaZoneCache[name];
      }
      static resetCache() {
        ianaZoneCache = {};
        dtfCache = {};
      }
      static isValidSpecifier(s4) {
        return this.isValidZone(s4);
      }
      static isValidZone(zone) {
        if (!zone) {
          return false;
        }
        try {
          new Intl.DateTimeFormat("en-US", {
            timeZone: zone
          }).format();
          return true;
        } catch (e2) {
          return false;
        }
      }
      constructor(name) {
        super();
        this.zoneName = name;
        this.valid = IANAZone.isValidZone(name);
      }
      get type() {
        return "iana";
      }
      get name() {
        return this.zoneName;
      }
      get isUniversal() {
        return false;
      }
      offsetName(ts, {
        format: format2,
        locale
      }) {
        return parseZoneInfo(ts, format2, locale, this.name);
      }
      formatOffset(ts, format2) {
        return formatOffset(this.offset(ts), format2);
      }
      offset(ts) {
        const date = new Date(ts);
        if (isNaN(date))
          return NaN;
        const dtf = makeDTF(this.name);
        let [year, month, day, adOrBc, hour, minute, second] = dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date);
        if (adOrBc === "BC") {
          year = -Math.abs(year) + 1;
        }
        const adjustedHour = hour === 24 ? 0 : hour;
        const asUTC = objToLocalTS({
          year,
          month,
          day,
          hour: adjustedHour,
          minute,
          second,
          millisecond: 0
        });
        let asTS = +date;
        const over = asTS % 1e3;
        asTS -= over >= 0 ? over : 1e3 + over;
        return (asUTC - asTS) / (60 * 1e3);
      }
      equals(otherZone) {
        return otherZone.type === "iana" && otherZone.name === this.name;
      }
      get isValid() {
        return this.valid;
      }
    };
    var singleton = null;
    var FixedOffsetZone = class extends Zone {
      static get utcInstance() {
        if (singleton === null) {
          singleton = new FixedOffsetZone(0);
        }
        return singleton;
      }
      static instance(offset2) {
        return offset2 === 0 ? FixedOffsetZone.utcInstance : new FixedOffsetZone(offset2);
      }
      static parseSpecifier(s4) {
        if (s4) {
          const r2 = s4.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
          if (r2) {
            return new FixedOffsetZone(signedOffset(r2[1], r2[2]));
          }
        }
        return null;
      }
      constructor(offset2) {
        super();
        this.fixed = offset2;
      }
      get type() {
        return "fixed";
      }
      get name() {
        return this.fixed === 0 ? "UTC" : `UTC${formatOffset(this.fixed, "narrow")}`;
      }
      get ianaName() {
        if (this.fixed === 0) {
          return "Etc/UTC";
        } else {
          return `Etc/GMT${formatOffset(-this.fixed, "narrow")}`;
        }
      }
      offsetName() {
        return this.name;
      }
      formatOffset(ts, format2) {
        return formatOffset(this.fixed, format2);
      }
      get isUniversal() {
        return true;
      }
      offset() {
        return this.fixed;
      }
      equals(otherZone) {
        return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
      }
      get isValid() {
        return true;
      }
    };
    var InvalidZone = class extends Zone {
      constructor(zoneName) {
        super();
        this.zoneName = zoneName;
      }
      get type() {
        return "invalid";
      }
      get name() {
        return this.zoneName;
      }
      get isUniversal() {
        return false;
      }
      offsetName() {
        return null;
      }
      formatOffset() {
        return "";
      }
      offset() {
        return NaN;
      }
      equals() {
        return false;
      }
      get isValid() {
        return false;
      }
    };
    function normalizeZone(input, defaultZone2) {
      if (isUndefined(input) || input === null) {
        return defaultZone2;
      } else if (input instanceof Zone) {
        return input;
      } else if (isString(input)) {
        const lowered = input.toLowerCase();
        if (lowered === "local" || lowered === "system")
          return defaultZone2;
        else if (lowered === "utc" || lowered === "gmt")
          return FixedOffsetZone.utcInstance;
        else
          return FixedOffsetZone.parseSpecifier(lowered) || IANAZone.create(input);
      } else if (isNumber(input)) {
        return FixedOffsetZone.instance(input);
      } else if (typeof input === "object" && input.offset && typeof input.offset === "number") {
        return input;
      } else {
        return new InvalidZone(input);
      }
    }
    var now2 = () => Date.now();
    var defaultZone = "system";
    var defaultLocale = null;
    var defaultNumberingSystem = null;
    var defaultOutputCalendar = null;
    var throwOnInvalid;
    var Settings = class {
      static get now() {
        return now2;
      }
      static set now(n2) {
        now2 = n2;
      }
      static set defaultZone(zone) {
        defaultZone = zone;
      }
      static get defaultZone() {
        return normalizeZone(defaultZone, SystemZone.instance);
      }
      static get defaultLocale() {
        return defaultLocale;
      }
      static set defaultLocale(locale) {
        defaultLocale = locale;
      }
      static get defaultNumberingSystem() {
        return defaultNumberingSystem;
      }
      static set defaultNumberingSystem(numberingSystem) {
        defaultNumberingSystem = numberingSystem;
      }
      static get defaultOutputCalendar() {
        return defaultOutputCalendar;
      }
      static set defaultOutputCalendar(outputCalendar) {
        defaultOutputCalendar = outputCalendar;
      }
      static get throwOnInvalid() {
        return throwOnInvalid;
      }
      static set throwOnInvalid(t2) {
        throwOnInvalid = t2;
      }
      static resetCaches() {
        Locale.resetCache();
        IANAZone.resetCache();
      }
    };
    var intlLFCache = {};
    function getCachedLF(locString, opts = {}) {
      const key2 = JSON.stringify([locString, opts]);
      let dtf = intlLFCache[key2];
      if (!dtf) {
        dtf = new Intl.ListFormat(locString, opts);
        intlLFCache[key2] = dtf;
      }
      return dtf;
    }
    var intlDTCache = {};
    function getCachedDTF(locString, opts = {}) {
      const key2 = JSON.stringify([locString, opts]);
      let dtf = intlDTCache[key2];
      if (!dtf) {
        dtf = new Intl.DateTimeFormat(locString, opts);
        intlDTCache[key2] = dtf;
      }
      return dtf;
    }
    var intlNumCache = {};
    function getCachedINF(locString, opts = {}) {
      const key2 = JSON.stringify([locString, opts]);
      let inf = intlNumCache[key2];
      if (!inf) {
        inf = new Intl.NumberFormat(locString, opts);
        intlNumCache[key2] = inf;
      }
      return inf;
    }
    var intlRelCache = {};
    function getCachedRTF(locString, opts = {}) {
      const {
        base: base2,
        ...cacheKeyOpts
      } = opts;
      const key2 = JSON.stringify([locString, cacheKeyOpts]);
      let inf = intlRelCache[key2];
      if (!inf) {
        inf = new Intl.RelativeTimeFormat(locString, opts);
        intlRelCache[key2] = inf;
      }
      return inf;
    }
    var sysLocaleCache = null;
    function systemLocale() {
      if (sysLocaleCache) {
        return sysLocaleCache;
      } else {
        sysLocaleCache = new Intl.DateTimeFormat().resolvedOptions().locale;
        return sysLocaleCache;
      }
    }
    function parseLocaleString(localeStr) {
      const uIndex = localeStr.indexOf("-u-");
      if (uIndex === -1) {
        return [localeStr];
      } else {
        let options;
        const smaller = localeStr.substring(0, uIndex);
        try {
          options = getCachedDTF(localeStr).resolvedOptions();
        } catch (e2) {
          options = getCachedDTF(smaller).resolvedOptions();
        }
        const {
          numberingSystem,
          calendar
        } = options;
        return [smaller, numberingSystem, calendar];
      }
    }
    function intlConfigString(localeStr, numberingSystem, outputCalendar) {
      if (outputCalendar || numberingSystem) {
        localeStr += "-u";
        if (outputCalendar) {
          localeStr += `-ca-${outputCalendar}`;
        }
        if (numberingSystem) {
          localeStr += `-nu-${numberingSystem}`;
        }
        return localeStr;
      } else {
        return localeStr;
      }
    }
    function mapMonths(f3) {
      const ms = [];
      for (let i2 = 1; i2 <= 12; i2++) {
        const dt = DateTime2.utc(2016, i2, 1);
        ms.push(f3(dt));
      }
      return ms;
    }
    function mapWeekdays(f3) {
      const ms = [];
      for (let i2 = 1; i2 <= 7; i2++) {
        const dt = DateTime2.utc(2016, 11, 13 + i2);
        ms.push(f3(dt));
      }
      return ms;
    }
    function listStuff(loc, length, defaultOK, englishFn, intlFn) {
      const mode = loc.listingMode(defaultOK);
      if (mode === "error") {
        return null;
      } else if (mode === "en") {
        return englishFn(length);
      } else {
        return intlFn(length);
      }
    }
    function supportsFastNumbers(loc) {
      if (loc.numberingSystem && loc.numberingSystem !== "latn") {
        return false;
      } else {
        return loc.numberingSystem === "latn" || !loc.locale || loc.locale.startsWith("en") || new Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem === "latn";
      }
    }
    var PolyNumberFormatter = class {
      constructor(intl, forceSimple, opts) {
        this.padTo = opts.padTo || 0;
        this.floor = opts.floor || false;
        const {
          padTo,
          floor,
          ...otherOpts
        } = opts;
        if (!forceSimple || Object.keys(otherOpts).length > 0) {
          const intlOpts = {
            useGrouping: false,
            ...opts
          };
          if (opts.padTo > 0)
            intlOpts.minimumIntegerDigits = opts.padTo;
          this.inf = getCachedINF(intl, intlOpts);
        }
      }
      format(i2) {
        if (this.inf) {
          const fixed = this.floor ? Math.floor(i2) : i2;
          return this.inf.format(fixed);
        } else {
          const fixed = this.floor ? Math.floor(i2) : roundTo(i2, 3);
          return padStart(fixed, this.padTo);
        }
      }
    };
    var PolyDateFormatter = class {
      constructor(dt, intl, opts) {
        this.opts = opts;
        let z;
        if (dt.zone.isUniversal) {
          const gmtOffset = -1 * (dt.offset / 60);
          const offsetZ = gmtOffset >= 0 ? `Etc/GMT+${gmtOffset}` : `Etc/GMT${gmtOffset}`;
          if (dt.offset !== 0 && IANAZone.create(offsetZ).valid) {
            z = offsetZ;
            this.dt = dt;
          } else {
            z = "UTC";
            if (opts.timeZoneName) {
              this.dt = dt;
            } else {
              this.dt = dt.offset === 0 ? dt : DateTime2.fromMillis(dt.ts + dt.offset * 60 * 1e3);
            }
          }
        } else if (dt.zone.type === "system") {
          this.dt = dt;
        } else {
          this.dt = dt;
          z = dt.zone.name;
        }
        const intlOpts = {
          ...this.opts
        };
        if (z) {
          intlOpts.timeZone = z;
        }
        this.dtf = getCachedDTF(intl, intlOpts);
      }
      format() {
        return this.dtf.format(this.dt.toJSDate());
      }
      formatToParts() {
        return this.dtf.formatToParts(this.dt.toJSDate());
      }
      resolvedOptions() {
        return this.dtf.resolvedOptions();
      }
    };
    var PolyRelFormatter = class {
      constructor(intl, isEnglish, opts) {
        this.opts = {
          style: "long",
          ...opts
        };
        if (!isEnglish && hasRelative()) {
          this.rtf = getCachedRTF(intl, opts);
        }
      }
      format(count, unit) {
        if (this.rtf) {
          return this.rtf.format(count, unit);
        } else {
          return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
        }
      }
      formatToParts(count, unit) {
        if (this.rtf) {
          return this.rtf.formatToParts(count, unit);
        } else {
          return [];
        }
      }
    };
    var Locale = class {
      static fromOpts(opts) {
        return Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.defaultToEN);
      }
      static create(locale, numberingSystem, outputCalendar, defaultToEN = false) {
        const specifiedLocale = locale || Settings.defaultLocale;
        const localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
        const numberingSystemR = numberingSystem || Settings.defaultNumberingSystem;
        const outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
        return new Locale(localeR, numberingSystemR, outputCalendarR, specifiedLocale);
      }
      static resetCache() {
        sysLocaleCache = null;
        intlDTCache = {};
        intlNumCache = {};
        intlRelCache = {};
      }
      static fromObject({
        locale,
        numberingSystem,
        outputCalendar
      } = {}) {
        return Locale.create(locale, numberingSystem, outputCalendar);
      }
      constructor(locale, numbering, outputCalendar, specifiedLocale) {
        const [parsedLocale, parsedNumberingSystem, parsedOutputCalendar] = parseLocaleString(locale);
        this.locale = parsedLocale;
        this.numberingSystem = numbering || parsedNumberingSystem || null;
        this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
        this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
        this.weekdaysCache = {
          format: {},
          standalone: {}
        };
        this.monthsCache = {
          format: {},
          standalone: {}
        };
        this.meridiemCache = null;
        this.eraCache = {};
        this.specifiedLocale = specifiedLocale;
        this.fastNumbersCached = null;
      }
      get fastNumbers() {
        if (this.fastNumbersCached == null) {
          this.fastNumbersCached = supportsFastNumbers(this);
        }
        return this.fastNumbersCached;
      }
      listingMode() {
        const isActuallyEn = this.isEnglish();
        const hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
        return isActuallyEn && hasNoWeirdness ? "en" : "intl";
      }
      clone(alts) {
        if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
          return this;
        } else {
          return Locale.create(alts.locale || this.specifiedLocale, alts.numberingSystem || this.numberingSystem, alts.outputCalendar || this.outputCalendar, alts.defaultToEN || false);
        }
      }
      redefaultToEN(alts = {}) {
        return this.clone({
          ...alts,
          defaultToEN: true
        });
      }
      redefaultToSystem(alts = {}) {
        return this.clone({
          ...alts,
          defaultToEN: false
        });
      }
      months(length, format2 = false, defaultOK = true) {
        return listStuff(this, length, defaultOK, months, () => {
          const intl = format2 ? {
            month: length,
            day: "numeric"
          } : {
            month: length
          }, formatStr = format2 ? "format" : "standalone";
          if (!this.monthsCache[formatStr][length]) {
            this.monthsCache[formatStr][length] = mapMonths((dt) => this.extract(dt, intl, "month"));
          }
          return this.monthsCache[formatStr][length];
        });
      }
      weekdays(length, format2 = false, defaultOK = true) {
        return listStuff(this, length, defaultOK, weekdays, () => {
          const intl = format2 ? {
            weekday: length,
            year: "numeric",
            month: "long",
            day: "numeric"
          } : {
            weekday: length
          }, formatStr = format2 ? "format" : "standalone";
          if (!this.weekdaysCache[formatStr][length]) {
            this.weekdaysCache[formatStr][length] = mapWeekdays((dt) => this.extract(dt, intl, "weekday"));
          }
          return this.weekdaysCache[formatStr][length];
        });
      }
      meridiems(defaultOK = true) {
        return listStuff(this, void 0, defaultOK, () => meridiems, () => {
          if (!this.meridiemCache) {
            const intl = {
              hour: "numeric",
              hourCycle: "h12"
            };
            this.meridiemCache = [DateTime2.utc(2016, 11, 13, 9), DateTime2.utc(2016, 11, 13, 19)].map((dt) => this.extract(dt, intl, "dayperiod"));
          }
          return this.meridiemCache;
        });
      }
      eras(length, defaultOK = true) {
        return listStuff(this, length, defaultOK, eras, () => {
          const intl = {
            era: length
          };
          if (!this.eraCache[length]) {
            this.eraCache[length] = [DateTime2.utc(-40, 1, 1), DateTime2.utc(2017, 1, 1)].map((dt) => this.extract(dt, intl, "era"));
          }
          return this.eraCache[length];
        });
      }
      extract(dt, intlOpts, field) {
        const df = this.dtFormatter(dt, intlOpts), results = df.formatToParts(), matching = results.find((m2) => m2.type.toLowerCase() === field);
        return matching ? matching.value : null;
      }
      numberFormatter(opts = {}) {
        return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
      }
      dtFormatter(dt, intlOpts = {}) {
        return new PolyDateFormatter(dt, this.intl, intlOpts);
      }
      relFormatter(opts = {}) {
        return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
      }
      listFormatter(opts = {}) {
        return getCachedLF(this.intl, opts);
      }
      isEnglish() {
        return this.locale === "en" || this.locale.toLowerCase() === "en-us" || new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
      }
      equals(other) {
        return this.locale === other.locale && this.numberingSystem === other.numberingSystem && this.outputCalendar === other.outputCalendar;
      }
    };
    function combineRegexes(...regexes) {
      const full = regexes.reduce((f3, r2) => f3 + r2.source, "");
      return RegExp(`^${full}$`);
    }
    function combineExtractors(...extractors) {
      return (m2) => extractors.reduce(([mergedVals, mergedZone, cursor], ex) => {
        const [val, zone, next] = ex(m2, cursor);
        return [{
          ...mergedVals,
          ...val
        }, zone || mergedZone, next];
      }, [{}, null, 1]).slice(0, 2);
    }
    function parse3(s4, ...patterns) {
      if (s4 == null) {
        return [null, null];
      }
      for (const [regex, extractor] of patterns) {
        const m2 = regex.exec(s4);
        if (m2) {
          return extractor(m2);
        }
      }
      return [null, null];
    }
    function simpleParse(...keys) {
      return (match2, cursor) => {
        const ret = {};
        let i2;
        for (i2 = 0; i2 < keys.length; i2++) {
          ret[keys[i2]] = parseInteger(match2[cursor + i2]);
        }
        return [ret, null, cursor + i2];
      };
    }
    var offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/;
    var isoExtendedZone = `(?:${offsetRegex.source}?(?:\\[(${ianaRegex.source})\\])?)?`;
    var isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/;
    var isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${isoExtendedZone}`);
    var isoTimeExtensionRegex = RegExp(`(?:T${isoTimeRegex.source})?`);
    var isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/;
    var isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/;
    var isoOrdinalRegex = /(\d{4})-?(\d{3})/;
    var extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay");
    var extractISOOrdinalData = simpleParse("year", "ordinal");
    var sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/;
    var sqlTimeRegex = RegExp(`${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|(${ianaRegex.source}))?`);
    var sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);
    function int(match2, pos, fallback) {
      const m2 = match2[pos];
      return isUndefined(m2) ? fallback : parseInteger(m2);
    }
    function extractISOYmd(match2, cursor) {
      const item = {
        year: int(match2, cursor),
        month: int(match2, cursor + 1, 1),
        day: int(match2, cursor + 2, 1)
      };
      return [item, null, cursor + 3];
    }
    function extractISOTime(match2, cursor) {
      const item = {
        hours: int(match2, cursor, 0),
        minutes: int(match2, cursor + 1, 0),
        seconds: int(match2, cursor + 2, 0),
        milliseconds: parseMillis(match2[cursor + 3])
      };
      return [item, null, cursor + 4];
    }
    function extractISOOffset(match2, cursor) {
      const local = !match2[cursor] && !match2[cursor + 1], fullOffset = signedOffset(match2[cursor + 1], match2[cursor + 2]), zone = local ? null : FixedOffsetZone.instance(fullOffset);
      return [{}, zone, cursor + 3];
    }
    function extractIANAZone(match2, cursor) {
      const zone = match2[cursor] ? IANAZone.create(match2[cursor]) : null;
      return [{}, zone, cursor + 1];
    }
    var isoTimeOnly = RegExp(`^T?${isoTimeBaseRegex.source}$`);
    var isoDuration = /^-?P(?:(?:(-?\d{1,9}(?:\.\d{1,9})?)Y)?(?:(-?\d{1,9}(?:\.\d{1,9})?)M)?(?:(-?\d{1,9}(?:\.\d{1,9})?)W)?(?:(-?\d{1,9}(?:\.\d{1,9})?)D)?(?:T(?:(-?\d{1,9}(?:\.\d{1,9})?)H)?(?:(-?\d{1,9}(?:\.\d{1,9})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,9}))?S)?)?)$/;
    function extractISODuration(match2) {
      const [s4, yearStr, monthStr, weekStr, dayStr, hourStr, minuteStr, secondStr, millisecondsStr] = match2;
      const hasNegativePrefix = s4[0] === "-";
      const negativeSeconds = secondStr && secondStr[0] === "-";
      const maybeNegate = (num, force = false) => num !== void 0 && (force || num && hasNegativePrefix) ? -num : num;
      return [{
        years: maybeNegate(parseFloating(yearStr)),
        months: maybeNegate(parseFloating(monthStr)),
        weeks: maybeNegate(parseFloating(weekStr)),
        days: maybeNegate(parseFloating(dayStr)),
        hours: maybeNegate(parseFloating(hourStr)),
        minutes: maybeNegate(parseFloating(minuteStr)),
        seconds: maybeNegate(parseFloating(secondStr), secondStr === "-0"),
        milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds)
      }];
    }
    var obsOffsets = {
      GMT: 0,
      EDT: -4 * 60,
      EST: -5 * 60,
      CDT: -5 * 60,
      CST: -6 * 60,
      MDT: -6 * 60,
      MST: -7 * 60,
      PDT: -7 * 60,
      PST: -8 * 60
    };
    function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
      const result = {
        year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
        month: monthsShort.indexOf(monthStr) + 1,
        day: parseInteger(dayStr),
        hour: parseInteger(hourStr),
        minute: parseInteger(minuteStr)
      };
      if (secondStr)
        result.second = parseInteger(secondStr);
      if (weekdayStr) {
        result.weekday = weekdayStr.length > 3 ? weekdaysLong.indexOf(weekdayStr) + 1 : weekdaysShort.indexOf(weekdayStr) + 1;
      }
      return result;
    }
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
    function extractRFC2822(match2) {
      const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr, obsOffset, milOffset, offHourStr, offMinuteStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
      let offset2;
      if (obsOffset) {
        offset2 = obsOffsets[obsOffset];
      } else if (milOffset) {
        offset2 = 0;
      } else {
        offset2 = signedOffset(offHourStr, offMinuteStr);
      }
      return [result, new FixedOffsetZone(offset2)];
    }
    function preprocessRFC2822(s4) {
      return s4.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
    }
    var rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/;
    var rfc850 = /^(Monday|Tuesday|Wedsday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/;
    var ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
    function extractRFC1123Or850(match2) {
      const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
      return [result, FixedOffsetZone.utcInstance];
    }
    function extractASCII(match2) {
      const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
      return [result, FixedOffsetZone.utcInstance];
    }
    var isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
    var isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
    var isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
    var isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
    var extractISOYmdTimeAndOffset = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset, extractIANAZone);
    var extractISOWeekTimeAndOffset = combineExtractors(extractISOWeekData, extractISOTime, extractISOOffset, extractIANAZone);
    var extractISOOrdinalDateAndTime = combineExtractors(extractISOOrdinalData, extractISOTime, extractISOOffset, extractIANAZone);
    var extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
    function parseISODate(s4) {
      return parse3(s4, [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset], [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime], [isoTimeCombinedRegex, extractISOTimeAndOffset]);
    }
    function parseRFC2822Date(s4) {
      return parse3(preprocessRFC2822(s4), [rfc2822, extractRFC2822]);
    }
    function parseHTTPDate(s4) {
      return parse3(s4, [rfc1123, extractRFC1123Or850], [rfc850, extractRFC1123Or850], [ascii, extractASCII]);
    }
    function parseISODuration(s4) {
      return parse3(s4, [isoDuration, extractISODuration]);
    }
    var extractISOTimeOnly = combineExtractors(extractISOTime);
    function parseISOTimeOnly(s4) {
      return parse3(s4, [isoTimeOnly, extractISOTimeOnly]);
    }
    var sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
    var sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
    var extractISOTimeOffsetAndIANAZone = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
    function parseSQL(s4) {
      return parse3(s4, [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]);
    }
    var INVALID$2 = "Invalid Duration";
    var lowOrderMatrix = {
      weeks: {
        days: 7,
        hours: 7 * 24,
        minutes: 7 * 24 * 60,
        seconds: 7 * 24 * 60 * 60,
        milliseconds: 7 * 24 * 60 * 60 * 1e3
      },
      days: {
        hours: 24,
        minutes: 24 * 60,
        seconds: 24 * 60 * 60,
        milliseconds: 24 * 60 * 60 * 1e3
      },
      hours: {
        minutes: 60,
        seconds: 60 * 60,
        milliseconds: 60 * 60 * 1e3
      },
      minutes: {
        seconds: 60,
        milliseconds: 60 * 1e3
      },
      seconds: {
        milliseconds: 1e3
      }
    };
    var casualMatrix = {
      years: {
        quarters: 4,
        months: 12,
        weeks: 52,
        days: 365,
        hours: 365 * 24,
        minutes: 365 * 24 * 60,
        seconds: 365 * 24 * 60 * 60,
        milliseconds: 365 * 24 * 60 * 60 * 1e3
      },
      quarters: {
        months: 3,
        weeks: 13,
        days: 91,
        hours: 91 * 24,
        minutes: 91 * 24 * 60,
        seconds: 91 * 24 * 60 * 60,
        milliseconds: 91 * 24 * 60 * 60 * 1e3
      },
      months: {
        weeks: 4,
        days: 30,
        hours: 30 * 24,
        minutes: 30 * 24 * 60,
        seconds: 30 * 24 * 60 * 60,
        milliseconds: 30 * 24 * 60 * 60 * 1e3
      },
      ...lowOrderMatrix
    };
    var daysInYearAccurate = 146097 / 400;
    var daysInMonthAccurate = 146097 / 4800;
    var accurateMatrix = {
      years: {
        quarters: 4,
        months: 12,
        weeks: daysInYearAccurate / 7,
        days: daysInYearAccurate,
        hours: daysInYearAccurate * 24,
        minutes: daysInYearAccurate * 24 * 60,
        seconds: daysInYearAccurate * 24 * 60 * 60,
        milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3
      },
      quarters: {
        months: 3,
        weeks: daysInYearAccurate / 28,
        days: daysInYearAccurate / 4,
        hours: daysInYearAccurate * 24 / 4,
        minutes: daysInYearAccurate * 24 * 60 / 4,
        seconds: daysInYearAccurate * 24 * 60 * 60 / 4,
        milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3 / 4
      },
      months: {
        weeks: daysInMonthAccurate / 7,
        days: daysInMonthAccurate,
        hours: daysInMonthAccurate * 24,
        minutes: daysInMonthAccurate * 24 * 60,
        seconds: daysInMonthAccurate * 24 * 60 * 60,
        milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1e3
      },
      ...lowOrderMatrix
    };
    var orderedUnits$1 = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"];
    var reverseUnits = orderedUnits$1.slice(0).reverse();
    function clone$1(dur, alts, clear = false) {
      const conf = {
        values: clear ? alts.values : {
          ...dur.values,
          ...alts.values || {}
        },
        loc: dur.loc.clone(alts.loc),
        conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy
      };
      return new Duration(conf);
    }
    function antiTrunc(n2) {
      return n2 < 0 ? Math.floor(n2) : Math.ceil(n2);
    }
    function convert(matrix, fromMap, fromUnit, toMap, toUnit) {
      const conv = matrix[toUnit][fromUnit], raw = fromMap[fromUnit] / conv, sameSign = Math.sign(raw) === Math.sign(toMap[toUnit]), added = !sameSign && toMap[toUnit] !== 0 && Math.abs(raw) <= 1 ? antiTrunc(raw) : Math.trunc(raw);
      toMap[toUnit] += added;
      fromMap[fromUnit] -= added * conv;
    }
    function normalizeValues(matrix, vals) {
      reverseUnits.reduce((previous, current) => {
        if (!isUndefined(vals[current])) {
          if (previous) {
            convert(matrix, vals, previous, vals, current);
          }
          return current;
        } else {
          return previous;
        }
      }, null);
    }
    var Duration = class {
      constructor(config) {
        const accurate = config.conversionAccuracy === "longterm" || false;
        this.values = config.values;
        this.loc = config.loc || Locale.create();
        this.conversionAccuracy = accurate ? "longterm" : "casual";
        this.invalid = config.invalid || null;
        this.matrix = accurate ? accurateMatrix : casualMatrix;
        this.isLuxonDuration = true;
      }
      static fromMillis(count, opts) {
        return Duration.fromObject({
          milliseconds: count
        }, opts);
      }
      static fromObject(obj, opts = {}) {
        if (obj == null || typeof obj !== "object") {
          throw new InvalidArgumentError(`Duration.fromObject: argument expected to be an object, got ${obj === null ? "null" : typeof obj}`);
        }
        return new Duration({
          values: normalizeObject(obj, Duration.normalizeUnit),
          loc: Locale.fromObject(opts),
          conversionAccuracy: opts.conversionAccuracy
        });
      }
      static fromDurationLike(durationLike) {
        if (isNumber(durationLike)) {
          return Duration.fromMillis(durationLike);
        } else if (Duration.isDuration(durationLike)) {
          return durationLike;
        } else if (typeof durationLike === "object") {
          return Duration.fromObject(durationLike);
        } else {
          throw new InvalidArgumentError(`Unknown duration argument ${durationLike} of type ${typeof durationLike}`);
        }
      }
      static fromISO(text, opts) {
        const [parsed] = parseISODuration(text);
        if (parsed) {
          return Duration.fromObject(parsed, opts);
        } else {
          return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
        }
      }
      static fromISOTime(text, opts) {
        const [parsed] = parseISOTimeOnly(text);
        if (parsed) {
          return Duration.fromObject(parsed, opts);
        } else {
          return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
        }
      }
      static invalid(reason, explanation = null) {
        if (!reason) {
          throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
        }
        const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) {
          throw new InvalidDurationError(invalid);
        } else {
          return new Duration({
            invalid
          });
        }
      }
      static normalizeUnit(unit) {
        const normalized = {
          year: "years",
          years: "years",
          quarter: "quarters",
          quarters: "quarters",
          month: "months",
          months: "months",
          week: "weeks",
          weeks: "weeks",
          day: "days",
          days: "days",
          hour: "hours",
          hours: "hours",
          minute: "minutes",
          minutes: "minutes",
          second: "seconds",
          seconds: "seconds",
          millisecond: "milliseconds",
          milliseconds: "milliseconds"
        }[unit ? unit.toLowerCase() : unit];
        if (!normalized)
          throw new InvalidUnitError(unit);
        return normalized;
      }
      static isDuration(o) {
        return o && o.isLuxonDuration || false;
      }
      get locale() {
        return this.isValid ? this.loc.locale : null;
      }
      get numberingSystem() {
        return this.isValid ? this.loc.numberingSystem : null;
      }
      toFormat(fmt, opts = {}) {
        const fmtOpts = {
          ...opts,
          floor: opts.round !== false && opts.floor !== false
        };
        return this.isValid ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt) : INVALID$2;
      }
      toHuman(opts = {}) {
        const l2 = orderedUnits$1.map((unit) => {
          const val = this.values[unit];
          if (isUndefined(val)) {
            return null;
          }
          return this.loc.numberFormatter({
            style: "unit",
            unitDisplay: "long",
            ...opts,
            unit: unit.slice(0, -1)
          }).format(val);
        }).filter((n2) => n2);
        return this.loc.listFormatter({
          type: "conjunction",
          style: opts.listStyle || "narrow",
          ...opts
        }).format(l2);
      }
      toObject() {
        if (!this.isValid)
          return {};
        return {
          ...this.values
        };
      }
      toISO() {
        if (!this.isValid)
          return null;
        let s4 = "P";
        if (this.years !== 0)
          s4 += this.years + "Y";
        if (this.months !== 0 || this.quarters !== 0)
          s4 += this.months + this.quarters * 3 + "M";
        if (this.weeks !== 0)
          s4 += this.weeks + "W";
        if (this.days !== 0)
          s4 += this.days + "D";
        if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0)
          s4 += "T";
        if (this.hours !== 0)
          s4 += this.hours + "H";
        if (this.minutes !== 0)
          s4 += this.minutes + "M";
        if (this.seconds !== 0 || this.milliseconds !== 0)
          s4 += roundTo(this.seconds + this.milliseconds / 1e3, 3) + "S";
        if (s4 === "P")
          s4 += "T0S";
        return s4;
      }
      toISOTime(opts = {}) {
        if (!this.isValid)
          return null;
        const millis = this.toMillis();
        if (millis < 0 || millis >= 864e5)
          return null;
        opts = {
          suppressMilliseconds: false,
          suppressSeconds: false,
          includePrefix: false,
          format: "extended",
          ...opts
        };
        const value = this.shiftTo("hours", "minutes", "seconds", "milliseconds");
        let fmt = opts.format === "basic" ? "hhmm" : "hh:mm";
        if (!opts.suppressSeconds || value.seconds !== 0 || value.milliseconds !== 0) {
          fmt += opts.format === "basic" ? "ss" : ":ss";
          if (!opts.suppressMilliseconds || value.milliseconds !== 0) {
            fmt += ".SSS";
          }
        }
        let str = value.toFormat(fmt);
        if (opts.includePrefix) {
          str = "T" + str;
        }
        return str;
      }
      toJSON() {
        return this.toISO();
      }
      toString() {
        return this.toISO();
      }
      toMillis() {
        return this.as("milliseconds");
      }
      valueOf() {
        return this.toMillis();
      }
      plus(duration) {
        if (!this.isValid)
          return this;
        const dur = Duration.fromDurationLike(duration), result = {};
        for (const k of orderedUnits$1) {
          if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
            result[k] = dur.get(k) + this.get(k);
          }
        }
        return clone$1(this, {
          values: result
        }, true);
      }
      minus(duration) {
        if (!this.isValid)
          return this;
        const dur = Duration.fromDurationLike(duration);
        return this.plus(dur.negate());
      }
      mapUnits(fn) {
        if (!this.isValid)
          return this;
        const result = {};
        for (const k of Object.keys(this.values)) {
          result[k] = asNumber(fn(this.values[k], k));
        }
        return clone$1(this, {
          values: result
        }, true);
      }
      get(unit) {
        return this[Duration.normalizeUnit(unit)];
      }
      set(values) {
        if (!this.isValid)
          return this;
        const mixed = {
          ...this.values,
          ...normalizeObject(values, Duration.normalizeUnit)
        };
        return clone$1(this, {
          values: mixed
        });
      }
      reconfigure({
        locale,
        numberingSystem,
        conversionAccuracy
      } = {}) {
        const loc = this.loc.clone({
          locale,
          numberingSystem
        }), opts = {
          loc
        };
        if (conversionAccuracy) {
          opts.conversionAccuracy = conversionAccuracy;
        }
        return clone$1(this, opts);
      }
      as(unit) {
        return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
      }
      normalize() {
        if (!this.isValid)
          return this;
        const vals = this.toObject();
        normalizeValues(this.matrix, vals);
        return clone$1(this, {
          values: vals
        }, true);
      }
      shiftTo(...units) {
        if (!this.isValid)
          return this;
        if (units.length === 0) {
          return this;
        }
        units = units.map((u) => Duration.normalizeUnit(u));
        const built = {}, accumulated = {}, vals = this.toObject();
        let lastUnit;
        for (const k of orderedUnits$1) {
          if (units.indexOf(k) >= 0) {
            lastUnit = k;
            let own = 0;
            for (const ak in accumulated) {
              own += this.matrix[ak][k] * accumulated[ak];
              accumulated[ak] = 0;
            }
            if (isNumber(vals[k])) {
              own += vals[k];
            }
            const i2 = Math.trunc(own);
            built[k] = i2;
            accumulated[k] = (own * 1e3 - i2 * 1e3) / 1e3;
            for (const down in vals) {
              if (orderedUnits$1.indexOf(down) > orderedUnits$1.indexOf(k)) {
                convert(this.matrix, vals, down, built, k);
              }
            }
          } else if (isNumber(vals[k])) {
            accumulated[k] = vals[k];
          }
        }
        for (const key2 in accumulated) {
          if (accumulated[key2] !== 0) {
            built[lastUnit] += key2 === lastUnit ? accumulated[key2] : accumulated[key2] / this.matrix[lastUnit][key2];
          }
        }
        return clone$1(this, {
          values: built
        }, true).normalize();
      }
      negate() {
        if (!this.isValid)
          return this;
        const negated = {};
        for (const k of Object.keys(this.values)) {
          negated[k] = this.values[k] === 0 ? 0 : -this.values[k];
        }
        return clone$1(this, {
          values: negated
        }, true);
      }
      get years() {
        return this.isValid ? this.values.years || 0 : NaN;
      }
      get quarters() {
        return this.isValid ? this.values.quarters || 0 : NaN;
      }
      get months() {
        return this.isValid ? this.values.months || 0 : NaN;
      }
      get weeks() {
        return this.isValid ? this.values.weeks || 0 : NaN;
      }
      get days() {
        return this.isValid ? this.values.days || 0 : NaN;
      }
      get hours() {
        return this.isValid ? this.values.hours || 0 : NaN;
      }
      get minutes() {
        return this.isValid ? this.values.minutes || 0 : NaN;
      }
      get seconds() {
        return this.isValid ? this.values.seconds || 0 : NaN;
      }
      get milliseconds() {
        return this.isValid ? this.values.milliseconds || 0 : NaN;
      }
      get isValid() {
        return this.invalid === null;
      }
      get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
      }
      get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
      }
      equals(other) {
        if (!this.isValid || !other.isValid) {
          return false;
        }
        if (!this.loc.equals(other.loc)) {
          return false;
        }
        function eq(v1, v2) {
          if (v1 === void 0 || v1 === 0)
            return v2 === void 0 || v2 === 0;
          return v1 === v2;
        }
        for (const u of orderedUnits$1) {
          if (!eq(this.values[u], other.values[u])) {
            return false;
          }
        }
        return true;
      }
    };
    var INVALID$1 = "Invalid Interval";
    function validateStartEnd(start, end) {
      if (!start || !start.isValid) {
        return Interval.invalid("missing or invalid start");
      } else if (!end || !end.isValid) {
        return Interval.invalid("missing or invalid end");
      } else if (end < start) {
        return Interval.invalid("end before start", `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`);
      } else {
        return null;
      }
    }
    var Interval = class {
      constructor(config) {
        this.s = config.start;
        this.e = config.end;
        this.invalid = config.invalid || null;
        this.isLuxonInterval = true;
      }
      static invalid(reason, explanation = null) {
        if (!reason) {
          throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
        }
        const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) {
          throw new InvalidIntervalError(invalid);
        } else {
          return new Interval({
            invalid
          });
        }
      }
      static fromDateTimes(start, end) {
        const builtStart = friendlyDateTime(start), builtEnd = friendlyDateTime(end);
        const validateError = validateStartEnd(builtStart, builtEnd);
        if (validateError == null) {
          return new Interval({
            start: builtStart,
            end: builtEnd
          });
        } else {
          return validateError;
        }
      }
      static after(start, duration) {
        const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(start);
        return Interval.fromDateTimes(dt, dt.plus(dur));
      }
      static before(end, duration) {
        const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(end);
        return Interval.fromDateTimes(dt.minus(dur), dt);
      }
      static fromISO(text, opts) {
        const [s4, e2] = (text || "").split("/", 2);
        if (s4 && e2) {
          let start, startIsValid;
          try {
            start = DateTime2.fromISO(s4, opts);
            startIsValid = start.isValid;
          } catch (e3) {
            startIsValid = false;
          }
          let end, endIsValid;
          try {
            end = DateTime2.fromISO(e2, opts);
            endIsValid = end.isValid;
          } catch (e3) {
            endIsValid = false;
          }
          if (startIsValid && endIsValid) {
            return Interval.fromDateTimes(start, end);
          }
          if (startIsValid) {
            const dur = Duration.fromISO(e2, opts);
            if (dur.isValid) {
              return Interval.after(start, dur);
            }
          } else if (endIsValid) {
            const dur = Duration.fromISO(s4, opts);
            if (dur.isValid) {
              return Interval.before(end, dur);
            }
          }
        }
        return Interval.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
      }
      static isInterval(o) {
        return o && o.isLuxonInterval || false;
      }
      get start() {
        return this.isValid ? this.s : null;
      }
      get end() {
        return this.isValid ? this.e : null;
      }
      get isValid() {
        return this.invalidReason === null;
      }
      get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
      }
      get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
      }
      length(unit = "milliseconds") {
        return this.isValid ? this.toDuration(...[unit]).get(unit) : NaN;
      }
      count(unit = "milliseconds") {
        if (!this.isValid)
          return NaN;
        const start = this.start.startOf(unit), end = this.end.startOf(unit);
        return Math.floor(end.diff(start, unit).get(unit)) + 1;
      }
      hasSame(unit) {
        return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
      }
      isEmpty() {
        return this.s.valueOf() === this.e.valueOf();
      }
      isAfter(dateTime) {
        if (!this.isValid)
          return false;
        return this.s > dateTime;
      }
      isBefore(dateTime) {
        if (!this.isValid)
          return false;
        return this.e <= dateTime;
      }
      contains(dateTime) {
        if (!this.isValid)
          return false;
        return this.s <= dateTime && this.e > dateTime;
      }
      set({
        start,
        end
      } = {}) {
        if (!this.isValid)
          return this;
        return Interval.fromDateTimes(start || this.s, end || this.e);
      }
      splitAt(...dateTimes) {
        if (!this.isValid)
          return [];
        const sorted = dateTimes.map(friendlyDateTime).filter((d) => this.contains(d)).sort(), results = [];
        let {
          s: s4
        } = this, i2 = 0;
        while (s4 < this.e) {
          const added = sorted[i2] || this.e, next = +added > +this.e ? this.e : added;
          results.push(Interval.fromDateTimes(s4, next));
          s4 = next;
          i2 += 1;
        }
        return results;
      }
      splitBy(duration) {
        const dur = Duration.fromDurationLike(duration);
        if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
          return [];
        }
        let {
          s: s4
        } = this, idx = 1, next;
        const results = [];
        while (s4 < this.e) {
          const added = this.start.plus(dur.mapUnits((x2) => x2 * idx));
          next = +added > +this.e ? this.e : added;
          results.push(Interval.fromDateTimes(s4, next));
          s4 = next;
          idx += 1;
        }
        return results;
      }
      divideEqually(numberOfParts) {
        if (!this.isValid)
          return [];
        return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
      }
      overlaps(other) {
        return this.e > other.s && this.s < other.e;
      }
      abutsStart(other) {
        if (!this.isValid)
          return false;
        return +this.e === +other.s;
      }
      abutsEnd(other) {
        if (!this.isValid)
          return false;
        return +other.e === +this.s;
      }
      engulfs(other) {
        if (!this.isValid)
          return false;
        return this.s <= other.s && this.e >= other.e;
      }
      equals(other) {
        if (!this.isValid || !other.isValid) {
          return false;
        }
        return this.s.equals(other.s) && this.e.equals(other.e);
      }
      intersection(other) {
        if (!this.isValid)
          return this;
        const s4 = this.s > other.s ? this.s : other.s, e2 = this.e < other.e ? this.e : other.e;
        if (s4 >= e2) {
          return null;
        } else {
          return Interval.fromDateTimes(s4, e2);
        }
      }
      union(other) {
        if (!this.isValid)
          return this;
        const s4 = this.s < other.s ? this.s : other.s, e2 = this.e > other.e ? this.e : other.e;
        return Interval.fromDateTimes(s4, e2);
      }
      static merge(intervals) {
        const [found, final] = intervals.sort((a, b) => a.s - b.s).reduce(([sofar, current], item) => {
          if (!current) {
            return [sofar, item];
          } else if (current.overlaps(item) || current.abutsStart(item)) {
            return [sofar, current.union(item)];
          } else {
            return [sofar.concat([current]), item];
          }
        }, [[], null]);
        if (final) {
          found.push(final);
        }
        return found;
      }
      static xor(intervals) {
        let start = null, currentCount = 0;
        const results = [], ends = intervals.map((i2) => [{
          time: i2.s,
          type: "s"
        }, {
          time: i2.e,
          type: "e"
        }]), flattened = Array.prototype.concat(...ends), arr = flattened.sort((a, b) => a.time - b.time);
        for (const i2 of arr) {
          currentCount += i2.type === "s" ? 1 : -1;
          if (currentCount === 1) {
            start = i2.time;
          } else {
            if (start && +start !== +i2.time) {
              results.push(Interval.fromDateTimes(start, i2.time));
            }
            start = null;
          }
        }
        return Interval.merge(results);
      }
      difference(...intervals) {
        return Interval.xor([this].concat(intervals)).map((i2) => this.intersection(i2)).filter((i2) => i2 && !i2.isEmpty());
      }
      toString() {
        if (!this.isValid)
          return INVALID$1;
        return `[${this.s.toISO()} \u2013 ${this.e.toISO()})`;
      }
      toISO(opts) {
        if (!this.isValid)
          return INVALID$1;
        return `${this.s.toISO(opts)}/${this.e.toISO(opts)}`;
      }
      toISODate() {
        if (!this.isValid)
          return INVALID$1;
        return `${this.s.toISODate()}/${this.e.toISODate()}`;
      }
      toISOTime(opts) {
        if (!this.isValid)
          return INVALID$1;
        return `${this.s.toISOTime(opts)}/${this.e.toISOTime(opts)}`;
      }
      toFormat(dateFormat, {
        separator = " \u2013 "
      } = {}) {
        if (!this.isValid)
          return INVALID$1;
        return `${this.s.toFormat(dateFormat)}${separator}${this.e.toFormat(dateFormat)}`;
      }
      toDuration(unit, opts) {
        if (!this.isValid) {
          return Duration.invalid(this.invalidReason);
        }
        return this.e.diff(this.s, unit, opts);
      }
      mapEndpoints(mapFn) {
        return Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
      }
    };
    var Info = class {
      static hasDST(zone = Settings.defaultZone) {
        const proto = DateTime2.now().setZone(zone).set({
          month: 12
        });
        return !zone.isUniversal && proto.offset !== proto.set({
          month: 6
        }).offset;
      }
      static isValidIANAZone(zone) {
        return IANAZone.isValidZone(zone);
      }
      static normalizeZone(input) {
        return normalizeZone(input, Settings.defaultZone);
      }
      static months(length = "long", {
        locale = null,
        numberingSystem = null,
        locObj = null,
        outputCalendar = "gregory"
      } = {}) {
        return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
      }
      static monthsFormat(length = "long", {
        locale = null,
        numberingSystem = null,
        locObj = null,
        outputCalendar = "gregory"
      } = {}) {
        return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
      }
      static weekdays(length = "long", {
        locale = null,
        numberingSystem = null,
        locObj = null
      } = {}) {
        return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length);
      }
      static weekdaysFormat(length = "long", {
        locale = null,
        numberingSystem = null,
        locObj = null
      } = {}) {
        return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length, true);
      }
      static meridiems({
        locale = null
      } = {}) {
        return Locale.create(locale).meridiems();
      }
      static eras(length = "short", {
        locale = null
      } = {}) {
        return Locale.create(locale, null, "gregory").eras(length);
      }
      static features() {
        return {
          relative: hasRelative()
        };
      }
    };
    function dayDiff(earlier, later) {
      const utcDayStart = (dt) => dt.toUTC(0, {
        keepLocalTime: true
      }).startOf("day").valueOf(), ms = utcDayStart(later) - utcDayStart(earlier);
      return Math.floor(Duration.fromMillis(ms).as("days"));
    }
    function highOrderDiffs(cursor, later, units) {
      const differs = [["years", (a, b) => b.year - a.year], ["quarters", (a, b) => b.quarter - a.quarter], ["months", (a, b) => b.month - a.month + (b.year - a.year) * 12], ["weeks", (a, b) => {
        const days = dayDiff(a, b);
        return (days - days % 7) / 7;
      }], ["days", dayDiff]];
      const results = {};
      let lowestOrder, highWater;
      for (const [unit, differ] of differs) {
        if (units.indexOf(unit) >= 0) {
          lowestOrder = unit;
          let delta = differ(cursor, later);
          highWater = cursor.plus({
            [unit]: delta
          });
          if (highWater > later) {
            cursor = cursor.plus({
              [unit]: delta - 1
            });
            delta -= 1;
          } else {
            cursor = highWater;
          }
          results[unit] = delta;
        }
      }
      return [cursor, results, highWater, lowestOrder];
    }
    function diff(earlier, later, units, opts) {
      let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);
      const remainingMillis = later - cursor;
      const lowerOrderUnits = units.filter((u) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0);
      if (lowerOrderUnits.length === 0) {
        if (highWater < later) {
          highWater = cursor.plus({
            [lowestOrder]: 1
          });
        }
        if (highWater !== cursor) {
          results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
        }
      }
      const duration = Duration.fromObject(results, opts);
      if (lowerOrderUnits.length > 0) {
        return Duration.fromMillis(remainingMillis, opts).shiftTo(...lowerOrderUnits).plus(duration);
      } else {
        return duration;
      }
    }
    var numberingSystems = {
      arab: "[\u0660-\u0669]",
      arabext: "[\u06F0-\u06F9]",
      bali: "[\u1B50-\u1B59]",
      beng: "[\u09E6-\u09EF]",
      deva: "[\u0966-\u096F]",
      fullwide: "[\uFF10-\uFF19]",
      gujr: "[\u0AE6-\u0AEF]",
      hanidec: "[\u3007|\u4E00|\u4E8C|\u4E09|\u56DB|\u4E94|\u516D|\u4E03|\u516B|\u4E5D]",
      khmr: "[\u17E0-\u17E9]",
      knda: "[\u0CE6-\u0CEF]",
      laoo: "[\u0ED0-\u0ED9]",
      limb: "[\u1946-\u194F]",
      mlym: "[\u0D66-\u0D6F]",
      mong: "[\u1810-\u1819]",
      mymr: "[\u1040-\u1049]",
      orya: "[\u0B66-\u0B6F]",
      tamldec: "[\u0BE6-\u0BEF]",
      telu: "[\u0C66-\u0C6F]",
      thai: "[\u0E50-\u0E59]",
      tibt: "[\u0F20-\u0F29]",
      latn: "\\d"
    };
    var numberingSystemsUTF16 = {
      arab: [1632, 1641],
      arabext: [1776, 1785],
      bali: [6992, 7001],
      beng: [2534, 2543],
      deva: [2406, 2415],
      fullwide: [65296, 65303],
      gujr: [2790, 2799],
      khmr: [6112, 6121],
      knda: [3302, 3311],
      laoo: [3792, 3801],
      limb: [6470, 6479],
      mlym: [3430, 3439],
      mong: [6160, 6169],
      mymr: [4160, 4169],
      orya: [2918, 2927],
      tamldec: [3046, 3055],
      telu: [3174, 3183],
      thai: [3664, 3673],
      tibt: [3872, 3881]
    };
    var hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");
    function parseDigits(str) {
      let value = parseInt(str, 10);
      if (isNaN(value)) {
        value = "";
        for (let i2 = 0; i2 < str.length; i2++) {
          const code = str.charCodeAt(i2);
          if (str[i2].search(numberingSystems.hanidec) !== -1) {
            value += hanidecChars.indexOf(str[i2]);
          } else {
            for (const key2 in numberingSystemsUTF16) {
              const [min, max] = numberingSystemsUTF16[key2];
              if (code >= min && code <= max) {
                value += code - min;
              }
            }
          }
        }
        return parseInt(value, 10);
      } else {
        return value;
      }
    }
    function digitRegex({
      numberingSystem
    }, append = "") {
      return new RegExp(`${numberingSystems[numberingSystem || "latn"]}${append}`);
    }
    var MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";
    function intUnit(regex, post = (i2) => i2) {
      return {
        regex,
        deser: ([s4]) => post(parseDigits(s4))
      };
    }
    var NBSP = String.fromCharCode(160);
    var spaceOrNBSP = `[ ${NBSP}]`;
    var spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");
    function fixListRegex(s4) {
      return s4.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
    }
    function stripInsensitivities(s4) {
      return s4.replace(/\./g, "").replace(spaceOrNBSPRegExp, " ").toLowerCase();
    }
    function oneOf(strings, startIndex) {
      if (strings === null) {
        return null;
      } else {
        return {
          regex: RegExp(strings.map(fixListRegex).join("|")),
          deser: ([s4]) => strings.findIndex((i2) => stripInsensitivities(s4) === stripInsensitivities(i2)) + startIndex
        };
      }
    }
    function offset(regex, groups) {
      return {
        regex,
        deser: ([, h2, m2]) => signedOffset(h2, m2),
        groups
      };
    }
    function simple(regex) {
      return {
        regex,
        deser: ([s4]) => s4
      };
    }
    function escapeToken(value) {
      return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    }
    function unitForToken(token, loc) {
      const one = digitRegex(loc), two = digitRegex(loc, "{2}"), three = digitRegex(loc, "{3}"), four = digitRegex(loc, "{4}"), six = digitRegex(loc, "{6}"), oneOrTwo = digitRegex(loc, "{1,2}"), oneToThree = digitRegex(loc, "{1,3}"), oneToSix = digitRegex(loc, "{1,6}"), oneToNine = digitRegex(loc, "{1,9}"), twoToFour = digitRegex(loc, "{2,4}"), fourToSix = digitRegex(loc, "{4,6}"), literal = (t2) => ({
        regex: RegExp(escapeToken(t2.val)),
        deser: ([s4]) => s4,
        literal: true
      }), unitate = (t2) => {
        if (token.literal) {
          return literal(t2);
        }
        switch (t2.val) {
          case "G":
            return oneOf(loc.eras("short", false), 0);
          case "GG":
            return oneOf(loc.eras("long", false), 0);
          case "y":
            return intUnit(oneToSix);
          case "yy":
            return intUnit(twoToFour, untruncateYear);
          case "yyyy":
            return intUnit(four);
          case "yyyyy":
            return intUnit(fourToSix);
          case "yyyyyy":
            return intUnit(six);
          case "M":
            return intUnit(oneOrTwo);
          case "MM":
            return intUnit(two);
          case "MMM":
            return oneOf(loc.months("short", true, false), 1);
          case "MMMM":
            return oneOf(loc.months("long", true, false), 1);
          case "L":
            return intUnit(oneOrTwo);
          case "LL":
            return intUnit(two);
          case "LLL":
            return oneOf(loc.months("short", false, false), 1);
          case "LLLL":
            return oneOf(loc.months("long", false, false), 1);
          case "d":
            return intUnit(oneOrTwo);
          case "dd":
            return intUnit(two);
          case "o":
            return intUnit(oneToThree);
          case "ooo":
            return intUnit(three);
          case "HH":
            return intUnit(two);
          case "H":
            return intUnit(oneOrTwo);
          case "hh":
            return intUnit(two);
          case "h":
            return intUnit(oneOrTwo);
          case "mm":
            return intUnit(two);
          case "m":
            return intUnit(oneOrTwo);
          case "q":
            return intUnit(oneOrTwo);
          case "qq":
            return intUnit(two);
          case "s":
            return intUnit(oneOrTwo);
          case "ss":
            return intUnit(two);
          case "S":
            return intUnit(oneToThree);
          case "SSS":
            return intUnit(three);
          case "u":
            return simple(oneToNine);
          case "uu":
            return simple(oneOrTwo);
          case "uuu":
            return intUnit(one);
          case "a":
            return oneOf(loc.meridiems(), 0);
          case "kkkk":
            return intUnit(four);
          case "kk":
            return intUnit(twoToFour, untruncateYear);
          case "W":
            return intUnit(oneOrTwo);
          case "WW":
            return intUnit(two);
          case "E":
          case "c":
            return intUnit(one);
          case "EEE":
            return oneOf(loc.weekdays("short", false, false), 1);
          case "EEEE":
            return oneOf(loc.weekdays("long", false, false), 1);
          case "ccc":
            return oneOf(loc.weekdays("short", true, false), 1);
          case "cccc":
            return oneOf(loc.weekdays("long", true, false), 1);
          case "Z":
          case "ZZ":
            return offset(new RegExp(`([+-]${oneOrTwo.source})(?::(${two.source}))?`), 2);
          case "ZZZ":
            return offset(new RegExp(`([+-]${oneOrTwo.source})(${two.source})?`), 2);
          case "z":
            return simple(/[a-z_+-/]{1,256}?/i);
          default:
            return literal(t2);
        }
      };
      const unit = unitate(token) || {
        invalidReason: MISSING_FTP
      };
      unit.token = token;
      return unit;
    }
    var partTypeStyleToTokenVal = {
      year: {
        "2-digit": "yy",
        numeric: "yyyyy"
      },
      month: {
        numeric: "M",
        "2-digit": "MM",
        short: "MMM",
        long: "MMMM"
      },
      day: {
        numeric: "d",
        "2-digit": "dd"
      },
      weekday: {
        short: "EEE",
        long: "EEEE"
      },
      dayperiod: "a",
      dayPeriod: "a",
      hour: {
        numeric: "h",
        "2-digit": "hh"
      },
      minute: {
        numeric: "m",
        "2-digit": "mm"
      },
      second: {
        numeric: "s",
        "2-digit": "ss"
      }
    };
    function tokenForPart(part, locale, formatOpts) {
      const {
        type,
        value
      } = part;
      if (type === "literal") {
        return {
          literal: true,
          val: value
        };
      }
      const style = formatOpts[type];
      let val = partTypeStyleToTokenVal[type];
      if (typeof val === "object") {
        val = val[style];
      }
      if (val) {
        return {
          literal: false,
          val
        };
      }
      return void 0;
    }
    function buildRegex(units) {
      const re = units.map((u) => u.regex).reduce((f3, r2) => `${f3}(${r2.source})`, "");
      return [`^${re}$`, units];
    }
    function match(input, regex, handlers) {
      const matches = input.match(regex);
      if (matches) {
        const all = {};
        let matchIndex = 1;
        for (const i2 in handlers) {
          if (hasOwnProperty(handlers, i2)) {
            const h2 = handlers[i2], groups = h2.groups ? h2.groups + 1 : 1;
            if (!h2.literal && h2.token) {
              all[h2.token.val[0]] = h2.deser(matches.slice(matchIndex, matchIndex + groups));
            }
            matchIndex += groups;
          }
        }
        return [matches, all];
      } else {
        return [matches, {}];
      }
    }
    function dateTimeFromMatches(matches) {
      const toField = (token) => {
        switch (token) {
          case "S":
            return "millisecond";
          case "s":
            return "second";
          case "m":
            return "minute";
          case "h":
          case "H":
            return "hour";
          case "d":
            return "day";
          case "o":
            return "ordinal";
          case "L":
          case "M":
            return "month";
          case "y":
            return "year";
          case "E":
          case "c":
            return "weekday";
          case "W":
            return "weekNumber";
          case "k":
            return "weekYear";
          case "q":
            return "quarter";
          default:
            return null;
        }
      };
      let zone = null;
      let specificOffset;
      if (!isUndefined(matches.z)) {
        zone = IANAZone.create(matches.z);
      }
      if (!isUndefined(matches.Z)) {
        if (!zone) {
          zone = new FixedOffsetZone(matches.Z);
        }
        specificOffset = matches.Z;
      }
      if (!isUndefined(matches.q)) {
        matches.M = (matches.q - 1) * 3 + 1;
      }
      if (!isUndefined(matches.h)) {
        if (matches.h < 12 && matches.a === 1) {
          matches.h += 12;
        } else if (matches.h === 12 && matches.a === 0) {
          matches.h = 0;
        }
      }
      if (matches.G === 0 && matches.y) {
        matches.y = -matches.y;
      }
      if (!isUndefined(matches.u)) {
        matches.S = parseMillis(matches.u);
      }
      const vals = Object.keys(matches).reduce((r2, k) => {
        const f3 = toField(k);
        if (f3) {
          r2[f3] = matches[k];
        }
        return r2;
      }, {});
      return [vals, zone, specificOffset];
    }
    var dummyDateTimeCache = null;
    function getDummyDateTime() {
      if (!dummyDateTimeCache) {
        dummyDateTimeCache = DateTime2.fromMillis(1555555555555);
      }
      return dummyDateTimeCache;
    }
    function maybeExpandMacroToken(token, locale) {
      if (token.literal) {
        return token;
      }
      const formatOpts = Formatter.macroTokenToFormatOpts(token.val);
      if (!formatOpts) {
        return token;
      }
      const formatter = Formatter.create(locale, formatOpts);
      const parts = formatter.formatDateTimeParts(getDummyDateTime());
      const tokens = parts.map((p) => tokenForPart(p, locale, formatOpts));
      if (tokens.includes(void 0)) {
        return token;
      }
      return tokens;
    }
    function expandMacroTokens(tokens, locale) {
      return Array.prototype.concat(...tokens.map((t2) => maybeExpandMacroToken(t2, locale)));
    }
    function explainFromTokens(locale, input, format2) {
      const tokens = expandMacroTokens(Formatter.parseFormat(format2), locale), units = tokens.map((t2) => unitForToken(t2, locale)), disqualifyingUnit = units.find((t2) => t2.invalidReason);
      if (disqualifyingUnit) {
        return {
          input,
          tokens,
          invalidReason: disqualifyingUnit.invalidReason
        };
      } else {
        const [regexString, handlers] = buildRegex(units), regex = RegExp(regexString, "i"), [rawMatches, matches] = match(input, regex, handlers), [result, zone, specificOffset] = matches ? dateTimeFromMatches(matches) : [null, null, void 0];
        if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
          throw new ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
        }
        return {
          input,
          tokens,
          regex,
          rawMatches,
          matches,
          result,
          zone,
          specificOffset
        };
      }
    }
    function parseFromTokens(locale, input, format2) {
      const {
        result,
        zone,
        specificOffset,
        invalidReason
      } = explainFromTokens(locale, input, format2);
      return [result, zone, specificOffset, invalidReason];
    }
    var nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
    function unitOutOfRange(unit, value) {
      return new Invalid("unit out of range", `you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`);
    }
    function dayOfWeek(year, month, day) {
      const d = new Date(Date.UTC(year, month - 1, day));
      if (year < 100 && year >= 0) {
        d.setUTCFullYear(d.getUTCFullYear() - 1900);
      }
      const js4 = d.getUTCDay();
      return js4 === 0 ? 7 : js4;
    }
    function computeOrdinal(year, month, day) {
      return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
    }
    function uncomputeOrdinal(year, ordinal) {
      const table = isLeapYear(year) ? leapLadder : nonLeapLadder, month0 = table.findIndex((i2) => i2 < ordinal), day = ordinal - table[month0];
      return {
        month: month0 + 1,
        day
      };
    }
    function gregorianToWeek(gregObj) {
      const {
        year,
        month,
        day
      } = gregObj, ordinal = computeOrdinal(year, month, day), weekday = dayOfWeek(year, month, day);
      let weekNumber = Math.floor((ordinal - weekday + 10) / 7), weekYear;
      if (weekNumber < 1) {
        weekYear = year - 1;
        weekNumber = weeksInWeekYear(weekYear);
      } else if (weekNumber > weeksInWeekYear(year)) {
        weekYear = year + 1;
        weekNumber = 1;
      } else {
        weekYear = year;
      }
      return {
        weekYear,
        weekNumber,
        weekday,
        ...timeObject(gregObj)
      };
    }
    function weekToGregorian(weekData) {
      const {
        weekYear,
        weekNumber,
        weekday
      } = weekData, weekdayOfJan4 = dayOfWeek(weekYear, 1, 4), yearInDays = daysInYear(weekYear);
      let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3, year;
      if (ordinal < 1) {
        year = weekYear - 1;
        ordinal += daysInYear(year);
      } else if (ordinal > yearInDays) {
        year = weekYear + 1;
        ordinal -= daysInYear(weekYear);
      } else {
        year = weekYear;
      }
      const {
        month,
        day
      } = uncomputeOrdinal(year, ordinal);
      return {
        year,
        month,
        day,
        ...timeObject(weekData)
      };
    }
    function gregorianToOrdinal(gregData) {
      const {
        year,
        month,
        day
      } = gregData;
      const ordinal = computeOrdinal(year, month, day);
      return {
        year,
        ordinal,
        ...timeObject(gregData)
      };
    }
    function ordinalToGregorian(ordinalData) {
      const {
        year,
        ordinal
      } = ordinalData;
      const {
        month,
        day
      } = uncomputeOrdinal(year, ordinal);
      return {
        year,
        month,
        day,
        ...timeObject(ordinalData)
      };
    }
    function hasInvalidWeekData(obj) {
      const validYear = isInteger(obj.weekYear), validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear)), validWeekday = integerBetween(obj.weekday, 1, 7);
      if (!validYear) {
        return unitOutOfRange("weekYear", obj.weekYear);
      } else if (!validWeek) {
        return unitOutOfRange("week", obj.week);
      } else if (!validWeekday) {
        return unitOutOfRange("weekday", obj.weekday);
      } else
        return false;
    }
    function hasInvalidOrdinalData(obj) {
      const validYear = isInteger(obj.year), validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));
      if (!validYear) {
        return unitOutOfRange("year", obj.year);
      } else if (!validOrdinal) {
        return unitOutOfRange("ordinal", obj.ordinal);
      } else
        return false;
    }
    function hasInvalidGregorianData(obj) {
      const validYear = isInteger(obj.year), validMonth = integerBetween(obj.month, 1, 12), validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));
      if (!validYear) {
        return unitOutOfRange("year", obj.year);
      } else if (!validMonth) {
        return unitOutOfRange("month", obj.month);
      } else if (!validDay) {
        return unitOutOfRange("day", obj.day);
      } else
        return false;
    }
    function hasInvalidTimeData(obj) {
      const {
        hour,
        minute,
        second,
        millisecond
      } = obj;
      const validHour = integerBetween(hour, 0, 23) || hour === 24 && minute === 0 && second === 0 && millisecond === 0, validMinute = integerBetween(minute, 0, 59), validSecond = integerBetween(second, 0, 59), validMillisecond = integerBetween(millisecond, 0, 999);
      if (!validHour) {
        return unitOutOfRange("hour", hour);
      } else if (!validMinute) {
        return unitOutOfRange("minute", minute);
      } else if (!validSecond) {
        return unitOutOfRange("second", second);
      } else if (!validMillisecond) {
        return unitOutOfRange("millisecond", millisecond);
      } else
        return false;
    }
    var INVALID = "Invalid DateTime";
    var MAX_DATE = 864e13;
    function unsupportedZone(zone) {
      return new Invalid("unsupported zone", `the zone "${zone.name}" is not supported`);
    }
    function possiblyCachedWeekData(dt) {
      if (dt.weekData === null) {
        dt.weekData = gregorianToWeek(dt.c);
      }
      return dt.weekData;
    }
    function clone2(inst, alts) {
      const current = {
        ts: inst.ts,
        zone: inst.zone,
        c: inst.c,
        o: inst.o,
        loc: inst.loc,
        invalid: inst.invalid
      };
      return new DateTime2({
        ...current,
        ...alts,
        old: current
      });
    }
    function fixOffset(localTS, o, tz) {
      let utcGuess = localTS - o * 60 * 1e3;
      const o2 = tz.offset(utcGuess);
      if (o === o2) {
        return [utcGuess, o];
      }
      utcGuess -= (o2 - o) * 60 * 1e3;
      const o3 = tz.offset(utcGuess);
      if (o2 === o3) {
        return [utcGuess, o2];
      }
      return [localTS - Math.min(o2, o3) * 60 * 1e3, Math.max(o2, o3)];
    }
    function tsToObj(ts, offset2) {
      ts += offset2 * 60 * 1e3;
      const d = new Date(ts);
      return {
        year: d.getUTCFullYear(),
        month: d.getUTCMonth() + 1,
        day: d.getUTCDate(),
        hour: d.getUTCHours(),
        minute: d.getUTCMinutes(),
        second: d.getUTCSeconds(),
        millisecond: d.getUTCMilliseconds()
      };
    }
    function objToTS(obj, offset2, zone) {
      return fixOffset(objToLocalTS(obj), offset2, zone);
    }
    function adjustTime(inst, dur) {
      const oPre = inst.o, year = inst.c.year + Math.trunc(dur.years), month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3, c = {
        ...inst.c,
        year,
        month,
        day: Math.min(inst.c.day, daysInMonth(year, month)) + Math.trunc(dur.days) + Math.trunc(dur.weeks) * 7
      }, millisToAdd = Duration.fromObject({
        years: dur.years - Math.trunc(dur.years),
        quarters: dur.quarters - Math.trunc(dur.quarters),
        months: dur.months - Math.trunc(dur.months),
        weeks: dur.weeks - Math.trunc(dur.weeks),
        days: dur.days - Math.trunc(dur.days),
        hours: dur.hours,
        minutes: dur.minutes,
        seconds: dur.seconds,
        milliseconds: dur.milliseconds
      }).as("milliseconds"), localTS = objToLocalTS(c);
      let [ts, o] = fixOffset(localTS, oPre, inst.zone);
      if (millisToAdd !== 0) {
        ts += millisToAdd;
        o = inst.zone.offset(ts);
      }
      return {
        ts,
        o
      };
    }
    function parseDataToDateTime(parsed, parsedZone, opts, format2, text, specificOffset) {
      const {
        setZone,
        zone
      } = opts;
      if (parsed && Object.keys(parsed).length !== 0) {
        const interpretationZone = parsedZone || zone, inst = DateTime2.fromObject(parsed, {
          ...opts,
          zone: interpretationZone,
          specificOffset
        });
        return setZone ? inst : inst.setZone(zone);
      } else {
        return DateTime2.invalid(new Invalid("unparsable", `the input "${text}" can't be parsed as ${format2}`));
      }
    }
    function toTechFormat(dt, format2, allowZ = true) {
      return dt.isValid ? Formatter.create(Locale.create("en-US"), {
        allowZ,
        forceSimple: true
      }).formatDateTimeFromString(dt, format2) : null;
    }
    function toISODate(o, extended) {
      const longFormat = o.c.year > 9999 || o.c.year < 0;
      let c = "";
      if (longFormat && o.c.year >= 0)
        c += "+";
      c += padStart(o.c.year, longFormat ? 6 : 4);
      if (extended) {
        c += "-";
        c += padStart(o.c.month);
        c += "-";
        c += padStart(o.c.day);
      } else {
        c += padStart(o.c.month);
        c += padStart(o.c.day);
      }
      return c;
    }
    function toISOTime(o, extended, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone) {
      let c = padStart(o.c.hour);
      if (extended) {
        c += ":";
        c += padStart(o.c.minute);
        if (o.c.second !== 0 || !suppressSeconds) {
          c += ":";
        }
      } else {
        c += padStart(o.c.minute);
      }
      if (o.c.second !== 0 || !suppressSeconds) {
        c += padStart(o.c.second);
        if (o.c.millisecond !== 0 || !suppressMilliseconds) {
          c += ".";
          c += padStart(o.c.millisecond, 3);
        }
      }
      if (includeOffset) {
        if (o.isOffsetFixed && o.offset === 0 && !extendedZone) {
          c += "Z";
        } else if (o.o < 0) {
          c += "-";
          c += padStart(Math.trunc(-o.o / 60));
          c += ":";
          c += padStart(Math.trunc(-o.o % 60));
        } else {
          c += "+";
          c += padStart(Math.trunc(o.o / 60));
          c += ":";
          c += padStart(Math.trunc(o.o % 60));
        }
      }
      if (extendedZone) {
        c += "[" + o.zone.ianaName + "]";
      }
      return c;
    }
    var defaultUnitValues = {
      month: 1,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    };
    var defaultWeekUnitValues = {
      weekNumber: 1,
      weekday: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    };
    var defaultOrdinalUnitValues = {
      ordinal: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    };
    var orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"];
    var orderedWeekUnits = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"];
    var orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
    function normalizeUnit(unit) {
      const normalized = {
        year: "year",
        years: "year",
        month: "month",
        months: "month",
        day: "day",
        days: "day",
        hour: "hour",
        hours: "hour",
        minute: "minute",
        minutes: "minute",
        quarter: "quarter",
        quarters: "quarter",
        second: "second",
        seconds: "second",
        millisecond: "millisecond",
        milliseconds: "millisecond",
        weekday: "weekday",
        weekdays: "weekday",
        weeknumber: "weekNumber",
        weeksnumber: "weekNumber",
        weeknumbers: "weekNumber",
        weekyear: "weekYear",
        weekyears: "weekYear",
        ordinal: "ordinal"
      }[unit.toLowerCase()];
      if (!normalized)
        throw new InvalidUnitError(unit);
      return normalized;
    }
    function quickDT(obj, opts) {
      const zone = normalizeZone(opts.zone, Settings.defaultZone), loc = Locale.fromObject(opts), tsNow = Settings.now();
      let ts, o;
      if (!isUndefined(obj.year)) {
        for (const u of orderedUnits) {
          if (isUndefined(obj[u])) {
            obj[u] = defaultUnitValues[u];
          }
        }
        const invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
        if (invalid) {
          return DateTime2.invalid(invalid);
        }
        const offsetProvis = zone.offset(tsNow);
        [ts, o] = objToTS(obj, offsetProvis, zone);
      } else {
        ts = tsNow;
      }
      return new DateTime2({
        ts,
        zone,
        loc,
        o
      });
    }
    function diffRelative(start, end, opts) {
      const round = isUndefined(opts.round) ? true : opts.round, format2 = (c, unit) => {
        c = roundTo(c, round || opts.calendary ? 0 : 2, true);
        const formatter = end.loc.clone(opts).relFormatter(opts);
        return formatter.format(c, unit);
      }, differ = (unit) => {
        if (opts.calendary) {
          if (!end.hasSame(start, unit)) {
            return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
          } else
            return 0;
        } else {
          return end.diff(start, unit).get(unit);
        }
      };
      if (opts.unit) {
        return format2(differ(opts.unit), opts.unit);
      }
      for (const unit of opts.units) {
        const count = differ(unit);
        if (Math.abs(count) >= 1) {
          return format2(count, unit);
        }
      }
      return format2(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
    }
    function lastOpts(argList) {
      let opts = {}, args;
      if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
        opts = argList[argList.length - 1];
        args = Array.from(argList).slice(0, argList.length - 1);
      } else {
        args = Array.from(argList);
      }
      return [opts, args];
    }
    var DateTime2 = class {
      constructor(config) {
        const zone = config.zone || Settings.defaultZone;
        let invalid = config.invalid || (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) || (!zone.isValid ? unsupportedZone(zone) : null);
        this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;
        let c = null, o = null;
        if (!invalid) {
          const unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);
          if (unchanged) {
            [c, o] = [config.old.c, config.old.o];
          } else {
            const ot = zone.offset(this.ts);
            c = tsToObj(this.ts, ot);
            invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
            c = invalid ? null : c;
            o = invalid ? null : ot;
          }
        }
        this._zone = zone;
        this.loc = config.loc || Locale.create();
        this.invalid = invalid;
        this.weekData = null;
        this.c = c;
        this.o = o;
        this.isLuxonDateTime = true;
      }
      static now() {
        return new DateTime2({});
      }
      static local() {
        const [opts, args] = lastOpts(arguments), [year, month, day, hour, minute, second, millisecond] = args;
        return quickDT({
          year,
          month,
          day,
          hour,
          minute,
          second,
          millisecond
        }, opts);
      }
      static utc() {
        const [opts, args] = lastOpts(arguments), [year, month, day, hour, minute, second, millisecond] = args;
        opts.zone = FixedOffsetZone.utcInstance;
        return quickDT({
          year,
          month,
          day,
          hour,
          minute,
          second,
          millisecond
        }, opts);
      }
      static fromJSDate(date, options = {}) {
        const ts = isDate2(date) ? date.valueOf() : NaN;
        if (Number.isNaN(ts)) {
          return DateTime2.invalid("invalid input");
        }
        const zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
        if (!zoneToUse.isValid) {
          return DateTime2.invalid(unsupportedZone(zoneToUse));
        }
        return new DateTime2({
          ts,
          zone: zoneToUse,
          loc: Locale.fromObject(options)
        });
      }
      static fromMillis(milliseconds, options = {}) {
        if (!isNumber(milliseconds)) {
          throw new InvalidArgumentError(`fromMillis requires a numerical input, but received a ${typeof milliseconds} with value ${milliseconds}`);
        } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
          return DateTime2.invalid("Timestamp out of range");
        } else {
          return new DateTime2({
            ts: milliseconds,
            zone: normalizeZone(options.zone, Settings.defaultZone),
            loc: Locale.fromObject(options)
          });
        }
      }
      static fromSeconds(seconds, options = {}) {
        if (!isNumber(seconds)) {
          throw new InvalidArgumentError("fromSeconds requires a numerical input");
        } else {
          return new DateTime2({
            ts: seconds * 1e3,
            zone: normalizeZone(options.zone, Settings.defaultZone),
            loc: Locale.fromObject(options)
          });
        }
      }
      static fromObject(obj, opts = {}) {
        obj = obj || {};
        const zoneToUse = normalizeZone(opts.zone, Settings.defaultZone);
        if (!zoneToUse.isValid) {
          return DateTime2.invalid(unsupportedZone(zoneToUse));
        }
        const tsNow = Settings.now(), offsetProvis = !isUndefined(opts.specificOffset) ? opts.specificOffset : zoneToUse.offset(tsNow), normalized = normalizeObject(obj, normalizeUnit), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber, loc = Locale.fromObject(opts);
        if ((containsGregor || containsOrdinal) && definiteWeekDef) {
          throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
        }
        if (containsGregorMD && containsOrdinal) {
          throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
        }
        const useWeekData = definiteWeekDef || normalized.weekday && !containsGregor;
        let units, defaultValues, objNow = tsToObj(tsNow, offsetProvis);
        if (useWeekData) {
          units = orderedWeekUnits;
          defaultValues = defaultWeekUnitValues;
          objNow = gregorianToWeek(objNow);
        } else if (containsOrdinal) {
          units = orderedOrdinalUnits;
          defaultValues = defaultOrdinalUnitValues;
          objNow = gregorianToOrdinal(objNow);
        } else {
          units = orderedUnits;
          defaultValues = defaultUnitValues;
        }
        let foundFirst = false;
        for (const u of units) {
          const v = normalized[u];
          if (!isUndefined(v)) {
            foundFirst = true;
          } else if (foundFirst) {
            normalized[u] = defaultValues[u];
          } else {
            normalized[u] = objNow[u];
          }
        }
        const higherOrderInvalid = useWeekData ? hasInvalidWeekData(normalized) : containsOrdinal ? hasInvalidOrdinalData(normalized) : hasInvalidGregorianData(normalized), invalid = higherOrderInvalid || hasInvalidTimeData(normalized);
        if (invalid) {
          return DateTime2.invalid(invalid);
        }
        const gregorian = useWeekData ? weekToGregorian(normalized) : containsOrdinal ? ordinalToGregorian(normalized) : normalized, [tsFinal, offsetFinal] = objToTS(gregorian, offsetProvis, zoneToUse), inst = new DateTime2({
          ts: tsFinal,
          zone: zoneToUse,
          o: offsetFinal,
          loc
        });
        if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
          return DateTime2.invalid("mismatched weekday", `you can't specify both a weekday of ${normalized.weekday} and a date of ${inst.toISO()}`);
        }
        return inst;
      }
      static fromISO(text, opts = {}) {
        const [vals, parsedZone] = parseISODate(text);
        return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
      }
      static fromRFC2822(text, opts = {}) {
        const [vals, parsedZone] = parseRFC2822Date(text);
        return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
      }
      static fromHTTP(text, opts = {}) {
        const [vals, parsedZone] = parseHTTPDate(text);
        return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
      }
      static fromFormat(text, fmt, opts = {}) {
        if (isUndefined(text) || isUndefined(fmt)) {
          throw new InvalidArgumentError("fromFormat requires an input string and a format");
        }
        const {
          locale = null,
          numberingSystem = null
        } = opts, localeToUse = Locale.fromOpts({
          locale,
          numberingSystem,
          defaultToEN: true
        }), [vals, parsedZone, specificOffset, invalid] = parseFromTokens(localeToUse, text, fmt);
        if (invalid) {
          return DateTime2.invalid(invalid);
        } else {
          return parseDataToDateTime(vals, parsedZone, opts, `format ${fmt}`, text, specificOffset);
        }
      }
      static fromString(text, fmt, opts = {}) {
        return DateTime2.fromFormat(text, fmt, opts);
      }
      static fromSQL(text, opts = {}) {
        const [vals, parsedZone] = parseSQL(text);
        return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
      }
      static invalid(reason, explanation = null) {
        if (!reason) {
          throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
        }
        const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) {
          throw new InvalidDateTimeError(invalid);
        } else {
          return new DateTime2({
            invalid
          });
        }
      }
      static isDateTime(o) {
        return o && o.isLuxonDateTime || false;
      }
      get(unit) {
        return this[unit];
      }
      get isValid() {
        return this.invalid === null;
      }
      get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
      }
      get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
      }
      get locale() {
        return this.isValid ? this.loc.locale : null;
      }
      get numberingSystem() {
        return this.isValid ? this.loc.numberingSystem : null;
      }
      get outputCalendar() {
        return this.isValid ? this.loc.outputCalendar : null;
      }
      get zone() {
        return this._zone;
      }
      get zoneName() {
        return this.isValid ? this.zone.name : null;
      }
      get year() {
        return this.isValid ? this.c.year : NaN;
      }
      get quarter() {
        return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
      }
      get month() {
        return this.isValid ? this.c.month : NaN;
      }
      get day() {
        return this.isValid ? this.c.day : NaN;
      }
      get hour() {
        return this.isValid ? this.c.hour : NaN;
      }
      get minute() {
        return this.isValid ? this.c.minute : NaN;
      }
      get second() {
        return this.isValid ? this.c.second : NaN;
      }
      get millisecond() {
        return this.isValid ? this.c.millisecond : NaN;
      }
      get weekYear() {
        return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
      }
      get weekNumber() {
        return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
      }
      get weekday() {
        return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
      }
      get ordinal() {
        return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
      }
      get monthShort() {
        return this.isValid ? Info.months("short", {
          locObj: this.loc
        })[this.month - 1] : null;
      }
      get monthLong() {
        return this.isValid ? Info.months("long", {
          locObj: this.loc
        })[this.month - 1] : null;
      }
      get weekdayShort() {
        return this.isValid ? Info.weekdays("short", {
          locObj: this.loc
        })[this.weekday - 1] : null;
      }
      get weekdayLong() {
        return this.isValid ? Info.weekdays("long", {
          locObj: this.loc
        })[this.weekday - 1] : null;
      }
      get offset() {
        return this.isValid ? +this.o : NaN;
      }
      get offsetNameShort() {
        if (this.isValid) {
          return this.zone.offsetName(this.ts, {
            format: "short",
            locale: this.locale
          });
        } else {
          return null;
        }
      }
      get offsetNameLong() {
        if (this.isValid) {
          return this.zone.offsetName(this.ts, {
            format: "long",
            locale: this.locale
          });
        } else {
          return null;
        }
      }
      get isOffsetFixed() {
        return this.isValid ? this.zone.isUniversal : null;
      }
      get isInDST() {
        if (this.isOffsetFixed) {
          return false;
        } else {
          return this.offset > this.set({
            month: 1,
            day: 1
          }).offset || this.offset > this.set({
            month: 5
          }).offset;
        }
      }
      get isInLeapYear() {
        return isLeapYear(this.year);
      }
      get daysInMonth() {
        return daysInMonth(this.year, this.month);
      }
      get daysInYear() {
        return this.isValid ? daysInYear(this.year) : NaN;
      }
      get weeksInWeekYear() {
        return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
      }
      resolvedLocaleOptions(opts = {}) {
        const {
          locale,
          numberingSystem,
          calendar
        } = Formatter.create(this.loc.clone(opts), opts).resolvedOptions(this);
        return {
          locale,
          numberingSystem,
          outputCalendar: calendar
        };
      }
      toUTC(offset2 = 0, opts = {}) {
        return this.setZone(FixedOffsetZone.instance(offset2), opts);
      }
      toLocal() {
        return this.setZone(Settings.defaultZone);
      }
      setZone(zone, {
        keepLocalTime = false,
        keepCalendarTime = false
      } = {}) {
        zone = normalizeZone(zone, Settings.defaultZone);
        if (zone.equals(this.zone)) {
          return this;
        } else if (!zone.isValid) {
          return DateTime2.invalid(unsupportedZone(zone));
        } else {
          let newTS = this.ts;
          if (keepLocalTime || keepCalendarTime) {
            const offsetGuess = zone.offset(this.ts);
            const asObj = this.toObject();
            [newTS] = objToTS(asObj, offsetGuess, zone);
          }
          return clone2(this, {
            ts: newTS,
            zone
          });
        }
      }
      reconfigure({
        locale,
        numberingSystem,
        outputCalendar
      } = {}) {
        const loc = this.loc.clone({
          locale,
          numberingSystem,
          outputCalendar
        });
        return clone2(this, {
          loc
        });
      }
      setLocale(locale) {
        return this.reconfigure({
          locale
        });
      }
      set(values) {
        if (!this.isValid)
          return this;
        const normalized = normalizeObject(values, normalizeUnit), settingWeekStuff = !isUndefined(normalized.weekYear) || !isUndefined(normalized.weekNumber) || !isUndefined(normalized.weekday), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
        if ((containsGregor || containsOrdinal) && definiteWeekDef) {
          throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
        }
        if (containsGregorMD && containsOrdinal) {
          throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
        }
        let mixed;
        if (settingWeekStuff) {
          mixed = weekToGregorian({
            ...gregorianToWeek(this.c),
            ...normalized
          });
        } else if (!isUndefined(normalized.ordinal)) {
          mixed = ordinalToGregorian({
            ...gregorianToOrdinal(this.c),
            ...normalized
          });
        } else {
          mixed = {
            ...this.toObject(),
            ...normalized
          };
          if (isUndefined(normalized.day)) {
            mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
          }
        }
        const [ts, o] = objToTS(mixed, this.o, this.zone);
        return clone2(this, {
          ts,
          o
        });
      }
      plus(duration) {
        if (!this.isValid)
          return this;
        const dur = Duration.fromDurationLike(duration);
        return clone2(this, adjustTime(this, dur));
      }
      minus(duration) {
        if (!this.isValid)
          return this;
        const dur = Duration.fromDurationLike(duration).negate();
        return clone2(this, adjustTime(this, dur));
      }
      startOf(unit) {
        if (!this.isValid)
          return this;
        const o = {}, normalizedUnit = Duration.normalizeUnit(unit);
        switch (normalizedUnit) {
          case "years":
            o.month = 1;
          case "quarters":
          case "months":
            o.day = 1;
          case "weeks":
          case "days":
            o.hour = 0;
          case "hours":
            o.minute = 0;
          case "minutes":
            o.second = 0;
          case "seconds":
            o.millisecond = 0;
            break;
        }
        if (normalizedUnit === "weeks") {
          o.weekday = 1;
        }
        if (normalizedUnit === "quarters") {
          const q = Math.ceil(this.month / 3);
          o.month = (q - 1) * 3 + 1;
        }
        return this.set(o);
      }
      endOf(unit) {
        return this.isValid ? this.plus({
          [unit]: 1
        }).startOf(unit).minus(1) : this;
      }
      toFormat(fmt, opts = {}) {
        return this.isValid ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt) : INVALID;
      }
      toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
        return this.isValid ? Formatter.create(this.loc.clone(opts), formatOpts).formatDateTime(this) : INVALID;
      }
      toLocaleParts(opts = {}) {
        return this.isValid ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this) : [];
      }
      toISO({
        format: format2 = "extended",
        suppressSeconds = false,
        suppressMilliseconds = false,
        includeOffset = true,
        extendedZone = false
      } = {}) {
        if (!this.isValid) {
          return null;
        }
        const ext = format2 === "extended";
        let c = toISODate(this, ext);
        c += "T";
        c += toISOTime(this, ext, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone);
        return c;
      }
      toISODate({
        format: format2 = "extended"
      } = {}) {
        if (!this.isValid) {
          return null;
        }
        return toISODate(this, format2 === "extended");
      }
      toISOWeekDate() {
        return toTechFormat(this, "kkkk-'W'WW-c");
      }
      toISOTime({
        suppressMilliseconds = false,
        suppressSeconds = false,
        includeOffset = true,
        includePrefix = false,
        extendedZone = false,
        format: format2 = "extended"
      } = {}) {
        if (!this.isValid) {
          return null;
        }
        let c = includePrefix ? "T" : "";
        return c + toISOTime(this, format2 === "extended", suppressSeconds, suppressMilliseconds, includeOffset, extendedZone);
      }
      toRFC2822() {
        return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
      }
      toHTTP() {
        return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
      }
      toSQLDate() {
        if (!this.isValid) {
          return null;
        }
        return toISODate(this, true);
      }
      toSQLTime({
        includeOffset = true,
        includeZone = false,
        includeOffsetSpace = true
      } = {}) {
        let fmt = "HH:mm:ss.SSS";
        if (includeZone || includeOffset) {
          if (includeOffsetSpace) {
            fmt += " ";
          }
          if (includeZone) {
            fmt += "z";
          } else if (includeOffset) {
            fmt += "ZZ";
          }
        }
        return toTechFormat(this, fmt, true);
      }
      toSQL(opts = {}) {
        if (!this.isValid) {
          return null;
        }
        return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
      }
      toString() {
        return this.isValid ? this.toISO() : INVALID;
      }
      valueOf() {
        return this.toMillis();
      }
      toMillis() {
        return this.isValid ? this.ts : NaN;
      }
      toSeconds() {
        return this.isValid ? this.ts / 1e3 : NaN;
      }
      toUnixInteger() {
        return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
      }
      toJSON() {
        return this.toISO();
      }
      toBSON() {
        return this.toJSDate();
      }
      toObject(opts = {}) {
        if (!this.isValid)
          return {};
        const base2 = {
          ...this.c
        };
        if (opts.includeConfig) {
          base2.outputCalendar = this.outputCalendar;
          base2.numberingSystem = this.loc.numberingSystem;
          base2.locale = this.loc.locale;
        }
        return base2;
      }
      toJSDate() {
        return new Date(this.isValid ? this.ts : NaN);
      }
      diff(otherDateTime, unit = "milliseconds", opts = {}) {
        if (!this.isValid || !otherDateTime.isValid) {
          return Duration.invalid("created by diffing an invalid DateTime");
        }
        const durOpts = {
          locale: this.locale,
          numberingSystem: this.numberingSystem,
          ...opts
        };
        const units = maybeArray(unit).map(Duration.normalizeUnit), otherIsLater = otherDateTime.valueOf() > this.valueOf(), earlier = otherIsLater ? this : otherDateTime, later = otherIsLater ? otherDateTime : this, diffed = diff(earlier, later, units, durOpts);
        return otherIsLater ? diffed.negate() : diffed;
      }
      diffNow(unit = "milliseconds", opts = {}) {
        return this.diff(DateTime2.now(), unit, opts);
      }
      until(otherDateTime) {
        return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
      }
      hasSame(otherDateTime, unit) {
        if (!this.isValid)
          return false;
        const inputMs = otherDateTime.valueOf();
        const adjustedToZone = this.setZone(otherDateTime.zone, {
          keepLocalTime: true
        });
        return adjustedToZone.startOf(unit) <= inputMs && inputMs <= adjustedToZone.endOf(unit);
      }
      equals(other) {
        return this.isValid && other.isValid && this.valueOf() === other.valueOf() && this.zone.equals(other.zone) && this.loc.equals(other.loc);
      }
      toRelative(options = {}) {
        if (!this.isValid)
          return null;
        const base2 = options.base || DateTime2.fromObject({}, {
          zone: this.zone
        }), padding = options.padding ? this < base2 ? -options.padding : options.padding : 0;
        let units = ["years", "months", "days", "hours", "minutes", "seconds"];
        let unit = options.unit;
        if (Array.isArray(options.unit)) {
          units = options.unit;
          unit = void 0;
        }
        return diffRelative(base2, this.plus(padding), {
          ...options,
          numeric: "always",
          units,
          unit
        });
      }
      toRelativeCalendar(options = {}) {
        if (!this.isValid)
          return null;
        return diffRelative(options.base || DateTime2.fromObject({}, {
          zone: this.zone
        }), this, {
          ...options,
          numeric: "auto",
          units: ["years", "months", "days"],
          calendary: true
        });
      }
      static min(...dateTimes) {
        if (!dateTimes.every(DateTime2.isDateTime)) {
          throw new InvalidArgumentError("min requires all arguments be DateTimes");
        }
        return bestBy(dateTimes, (i2) => i2.valueOf(), Math.min);
      }
      static max(...dateTimes) {
        if (!dateTimes.every(DateTime2.isDateTime)) {
          throw new InvalidArgumentError("max requires all arguments be DateTimes");
        }
        return bestBy(dateTimes, (i2) => i2.valueOf(), Math.max);
      }
      static fromFormatExplain(text, fmt, options = {}) {
        const {
          locale = null,
          numberingSystem = null
        } = options, localeToUse = Locale.fromOpts({
          locale,
          numberingSystem,
          defaultToEN: true
        });
        return explainFromTokens(localeToUse, text, fmt);
      }
      static fromStringExplain(text, fmt, options = {}) {
        return DateTime2.fromFormatExplain(text, fmt, options);
      }
      static get DATE_SHORT() {
        return DATE_SHORT;
      }
      static get DATE_MED() {
        return DATE_MED;
      }
      static get DATE_MED_WITH_WEEKDAY() {
        return DATE_MED_WITH_WEEKDAY;
      }
      static get DATE_FULL() {
        return DATE_FULL;
      }
      static get DATE_HUGE() {
        return DATE_HUGE;
      }
      static get TIME_SIMPLE() {
        return TIME_SIMPLE;
      }
      static get TIME_WITH_SECONDS() {
        return TIME_WITH_SECONDS;
      }
      static get TIME_WITH_SHORT_OFFSET() {
        return TIME_WITH_SHORT_OFFSET;
      }
      static get TIME_WITH_LONG_OFFSET() {
        return TIME_WITH_LONG_OFFSET;
      }
      static get TIME_24_SIMPLE() {
        return TIME_24_SIMPLE;
      }
      static get TIME_24_WITH_SECONDS() {
        return TIME_24_WITH_SECONDS;
      }
      static get TIME_24_WITH_SHORT_OFFSET() {
        return TIME_24_WITH_SHORT_OFFSET;
      }
      static get TIME_24_WITH_LONG_OFFSET() {
        return TIME_24_WITH_LONG_OFFSET;
      }
      static get DATETIME_SHORT() {
        return DATETIME_SHORT;
      }
      static get DATETIME_SHORT_WITH_SECONDS() {
        return DATETIME_SHORT_WITH_SECONDS;
      }
      static get DATETIME_MED() {
        return DATETIME_MED;
      }
      static get DATETIME_MED_WITH_SECONDS() {
        return DATETIME_MED_WITH_SECONDS;
      }
      static get DATETIME_MED_WITH_WEEKDAY() {
        return DATETIME_MED_WITH_WEEKDAY;
      }
      static get DATETIME_FULL() {
        return DATETIME_FULL;
      }
      static get DATETIME_FULL_WITH_SECONDS() {
        return DATETIME_FULL_WITH_SECONDS;
      }
      static get DATETIME_HUGE() {
        return DATETIME_HUGE;
      }
      static get DATETIME_HUGE_WITH_SECONDS() {
        return DATETIME_HUGE_WITH_SECONDS;
      }
    };
    function friendlyDateTime(dateTimeish) {
      if (DateTime2.isDateTime(dateTimeish)) {
        return dateTimeish;
      } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
        return DateTime2.fromJSDate(dateTimeish);
      } else if (dateTimeish && typeof dateTimeish === "object") {
        return DateTime2.fromObject(dateTimeish);
      } else {
        throw new InvalidArgumentError(`Unknown datetime argument: ${dateTimeish}, of type ${typeof dateTimeish}`);
      }
    }
    var VERSION = "2.4.0";
    exports.DateTime = DateTime2;
    exports.Duration = Duration;
    exports.FixedOffsetZone = FixedOffsetZone;
    exports.IANAZone = IANAZone;
    exports.Info = Info;
    exports.Interval = Interval;
    exports.InvalidZone = InvalidZone;
    exports.Settings = Settings;
    exports.SystemZone = SystemZone;
    exports.VERSION = VERSION;
    exports.Zone = Zone;
  }
});

// .svelte-kit/output/server/entries/pages/index.svelte.js
var index_svelte_exports = {};
__export(index_svelte_exports, {
  default: () => Routes
});
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map((_, i2) => tick_spring(ctx, last_value[i2], current_value[i2], target_value[i2]));
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = writable2(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = value;
  let target_value = value;
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = now();
      cancel_task = false;
      task = loop((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: (now2 - last_time) * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = value;
        store.set(value = next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token)
          fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(target_value, value), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
function get_interpolator(a, b) {
  if (a === b || a !== a)
    return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i2) => {
      return get_interpolator(a[i2], bi);
    });
    return (t2) => arr.map((fn) => fn(t2));
  }
  if (type === "object") {
    if (!a || !b)
      throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t2) => new Date(a + t2 * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key2) => {
      interpolators[key2] = get_interpolator(a[key2], b[key2]);
    });
    return (t2) => {
      const result = {};
      keys.forEach((key2) => {
        result[key2] = interpolators[key2](t2);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t2) => a + t2 * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable2(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start)
        return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function")
          duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
var import_luxon, css$7, Button, Agency_spotlight, Feature_card, css$6, Drag_cursor, Featured, Footer_email_input, css$5, Footer_list, css$4, Footer, css$3, Header, Internal_work_xicon, css$2, Internal_mobile, css$12, Internal_work, News_card, news1, news2, news3, news4, news5, news6, news7, News, css4, Work_cards, Work_hr, Work, Routes;
var init_index_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/index.svelte.js"() {
    init_index_26ca9b1d();
    init_store_6714e613();
    init_svelte_embla();
    import_luxon = __toESM(require_luxon(), 1);
    css$7 = {
      code: "button.svelte-14kmpd1{background-image:linear-gradient(\n			var(--color, theme('colors.black.full')),\n			var(--color, theme('colors.black.full'))\n		);background-size:100% 0%;background-repeat:no-repeat;background-position:left bottom;transition:background-size 250ms ease-in-out, color 250ms ease-in-out;color:var(--color, theme('colors.black.full'))}button.svelte-14kmpd1:hover{background-size:100% 100%;color:var(--hover-color, var(--color, white))}",
      map: null
    };
    Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$7);
      return `<button class="${"rounded-[16px] border border-[color:var(--color)] px-[30px] py-2 text-[11px] font-medium uppercase " + escape($$props.class ?? "") + " svelte-14kmpd1"}">${slots.default ? slots.default({}) : ``}
</button>`;
    });
    Agency_spotlight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $isDark, $$unsubscribe_isDark;
      $$unsubscribe_isDark = subscribe(isDark, (value) => $isDark = value);
      $$unsubscribe_isDark();
      return `<section class="${"mt-[60px] grid grid-cols-1 grid-rows-[repeat(2,max-content)] gap-y-[50px] md:mt-[180px] md:grid-cols-2 md:grid-rows-[1181px]"}"><h1 class="${"sr-only"}">BASIC/DEPT\xAE HELPS BRANDS \u25CFCONNECT W/ CULTURE</h1>

	<div class="${"relative h-full w-full dark:text-pink-300"}"><div class="${"flex w-full flex-col items-start gap-2 md:sticky md:top-[120px] md:left-0"}"><h1 class="${"text-[6.25vw] font-bold leading-[1.01]"}">BASIC/DEPT\xAE HELPS BRANDS \u25CFCONNECT W/ CULTURE
			</h1>

			<p>ADWEEK <span class="${"font-medium"}">(AGENCY SPOTLIGHT)</span></p>
			<div style="display: contents; --color:${escape($isDark ? "#f9cdcd" : "black")}; --hover-color:${"white"};">${validate_component(Button, "Button").$$render($$result, { class: "mt-5 md:mt-20" }, {}, {
        default: () => {
          return `About Us`;
        }
      })}</div></div></div>

	<video class="${"row-start-1 h-full object-cover md:row-start-auto"}" autoplay muted loop><source src="${"/Culture-Loop_v1.mp4"}" type="${"video/mp4"}"></video></section>`;
    });
    Feature_card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { src } = $$props;
      let { company } = $$props;
      let { imgWidth = void 0 } = $$props;
      if ($$props.src === void 0 && $$bindings.src && src !== void 0)
        $$bindings.src(src);
      if ($$props.company === void 0 && $$bindings.company && company !== void 0)
        $$bindings.company(company);
      if ($$props.imgWidth === void 0 && $$bindings.imgWidth && imgWidth !== void 0)
        $$bindings.imgWidth(imgWidth);
      return `<div class="${"transition-colors"}"><img loading="${"lazy"}" class="${"w-[var(--img-width)]"}"${add_attribute("src", src, 0)} alt="${""}"${add_styles({ "--img-width": imgWidth ?? "auto" })}>
	<hr class="${"mt-5 max-w-[20px] border-y-[1px] border-black-300 text-black-300"}">

	<h2 class="${"mt-[50px] text-[18px] font-bold uppercase tracking-tight text-black-300 ![overflow-y:inherit] dark:text-pink-300 md:mt-[100px] md:text-[22px]"}">${escape(company)}</h2>

	<p class="${"mt-5 text-[14px] font-normal dark:text-pink-300 md:text-[16px]"}">${slots.default ? slots.default({}) : ``}</p></div>`;
    });
    css$6 = {
      code: "div.svelte-rxrbu7{transform:translate3d(calc(var(--x, 0) - 50%), calc(var(--y, 0) - 50%), 0)\n			scale(var(--scale, 1))}",
      map: null
    };
    Drag_cursor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $pos, $$unsubscribe_pos;
      let $scale, $$unsubscribe_scale;
      let $opacity, $$unsubscribe_opacity;
      let { pos } = $$props;
      $$unsubscribe_pos = subscribe(pos, (value) => $pos = value);
      let { opacity } = $$props;
      $$unsubscribe_opacity = subscribe(opacity, (value) => $opacity = value);
      let { scale } = $$props;
      $$unsubscribe_scale = subscribe(scale, (value) => $scale = value);
      let { zIndex = 1 } = $$props;
      if ($$props.pos === void 0 && $$bindings.pos && pos !== void 0)
        $$bindings.pos(pos);
      if ($$props.opacity === void 0 && $$bindings.opacity && opacity !== void 0)
        $$bindings.opacity(opacity);
      if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0)
        $$bindings.scale(scale);
      if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0)
        $$bindings.zIndex(zIndex);
      $$result.css.add(css$6);
      $$unsubscribe_pos();
      $$unsubscribe_scale();
      $$unsubscribe_opacity();
      return `<div class="${"pointer-events-none absolute top-0 left-0 z-[var(--z-index,1)] hidden h-[120px] w-[120px] scale-[var(--scale,1)] place-items-center rounded-full bg-pink-300/[var(--opacitiy,1)] will-change-transform md:grid svelte-rxrbu7"}"${add_styles({
        "--x": `${$pos.x}px`,
        "--y": `${$pos.y}px`,
        "--scale": $scale,
        "--opacitiy": $opacity,
        "--z-index": zIndex
      })}>${$scale === 1 && $opacity === 1 ? `<p class="${"text-[14px] font-medium uppercase tracking-tighter"}">drag
		</p>` : ``}
</div>`;
    });
    Featured = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $pos, $$unsubscribe_pos;
      let $isMouseOver, $$unsubscribe_isMouseOver;
      let $$unsubscribe_scale;
      let $$unsubscribe_scroll;
      let $$unsubscribe_opacity;
      let resting = { x: 0, y: 0 };
      let carousel;
      const pos = spring(resting, { damping: 1, stiffness: 0.4 });
      $$unsubscribe_pos = subscribe(pos, (value) => $pos = value);
      const scale = tweened(1, { duration: 100 });
      $$unsubscribe_scale = subscribe(scale, (value) => value);
      const opacity = tweened(1, { duration: 100 });
      $$unsubscribe_opacity = subscribe(opacity, (value) => value);
      const isMouseOver = writable2(false);
      $$unsubscribe_isMouseOver = subscribe(isMouseOver, (value) => $isMouseOver = value);
      const scroll = writable2();
      $$unsubscribe_scroll = subscribe(scroll, (value) => value);
      let scrollprogress = 0;
      let scrollbar = { width: 0 };
      {
        if (!$isMouseOver) {
          set_store_value(pos, $pos = resting, $pos);
        }
      }
      $$unsubscribe_pos();
      $$unsubscribe_isMouseOver();
      $$unsubscribe_scale();
      $$unsubscribe_scroll();
      $$unsubscribe_opacity();
      return `

<section class="${"mt-[50px] md:mt-[188px]"}"><h1 class="${"max-w-[8ch] text-[24px] font-bold uppercase leading-[1.1] tracking-tighter text-black-300 md:text-[42px]"}">Featured Engagements
	</h1>

	<div class="${"w-full overflow-hidden pt-[90px] pb-10 md:cursor-none md:pt-[180px] md:pb-[120px]"}"${add_attribute("this", carousel, 0)}><div class="${"height-[445px] grid auto-cols-[310px] grid-flow-col gap-24 pl-[144px] md:auto-cols-[432px] md:gap-[144px]"}">${validate_component(Feature_card, "FeatureCard").$$render($$result, {
        company: "google",
        src: "/google.svg",
        imgWidth: "120px"
      }, {}, {
        default: () => {
          return `Our embedded partnership with Google is as deep as it gets. We\u2019re the lead creative agency
				for Google Store and provide strategy, design, and prototyping to other divisions. Learn
				more about our partnership
				<a class="${"cursor-none underline"}" href="${"/"}">here</a>.
			`;
        }
      })}

			${validate_component(Feature_card, "FeatureCard").$$render($$result, {
        company: "KFC",
        src: "/kfc.svg",
        imgWidth: "120px"
      }, {}, {
        default: () => {
          return `An award-winning global, digital transformation engagement spanning eCommerce, mobile app,
				and new drive thru experiences. Bringing KFC\u2019s brand story to life while making it easier
				for customers to buy chicken. Learn more about our partnership
				<a class="${"underline"}" href="${"/"}">here</a>.
			`;
        }
      })}

			${validate_component(Feature_card, "FeatureCard").$$render($$result, {
        company: "wilson",
        src: "/wilson.svg",
        imgWidth: "162px"
      }, {}, {
        default: () => {
          return `A reimagining of Wilson\u2019s brand visual identity, and brand campaign, to support a new
				product drop and the launch of the first brick and mortar retail location in the brand\u2019s
				108-year history. Read our full case study
				<a class="${"cursor-none underline"}" href="${"/"}">here</a>.
			`;
        }
      })}

			${validate_component(Feature_card, "FeatureCard").$$render($$result, {
        company: "at&t",
        src: "/at.svg",
        imgWidth: "40px"
      }, {}, {
        default: () => {
          return `Redesigning the digital flagship for the largest telecommunications company in the world.
				Creating frictionless paths to purchase for a wide range of consumers across a vast
				portfolio of products and services.
				<a class="${"cursor-none underline"}" href="${"/"}">here</a>.
			`;
        }
      })}

			${validate_component(Feature_card, "FeatureCard").$$render($$result, {
        company: "patagonia",
        src: "/patagonia.svg",
        imgWidth: "180px"
      }, {}, {
        default: () => {
          return `Our embedded partnership with Google is as deep as it gets. We\u2019re the lead creative agency
				for Google Store and provide strategy, design, and prototyping to other divisions. Learn
				more about our partnership
				<a class="${"cursor-none underline"}" href="${"/"}">here</a>.
			`;
        }
      })}</div></div>

	${validate_component(Drag_cursor, "DragCursor").$$render($$result, { pos, opacity, scale }, {}, {})}

	<div class="${"h-[2px] w-full overflow-hidden bg-[#b1b1b1]"}"><div class="${"h-full w-[var(--scroll-width,0px)] translate-x-[var(--scroll-progress,0)] bg-black-full dark:bg-pink-300"}"${add_styles({
        "--scroll-width": `${scrollbar.width}px`,
        "--scroll-progress": `${scrollprogress * ((carousel == null ? void 0 : carousel.clientWidth) - scrollbar.width)}px`
      })}></div></div></section>`;
    });
    Footer_email_input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="${"grid grid-cols-[1fr,max-content]"}"><input class="${"col-start-1 col-end-[-1] row-start-1 row-end-2 w-full border-b border-white-full bg-[transparent] pb-4 text-[18px] font-normal text-white-300 caret-white-full outline-none placeholder:text-white-300"}" placeholder="${"Email Address"}" type="${"email"}">

	<img loading="${"lazy"}" class="${"col-start-2 row-start-1 row-end-2 h-[18px] w-[18px] translate-y-[5px]"}" src="${"/light-right-arrow.svg"}" alt="${""}"></div>`;
    });
    css$5 = {
      code: "div.svelte-hk501m>a,div.svelte-hk501m address{@apply text-[14px] font-normal not-italic text-white-300;}@media(min-width: 768px){div.svelte-hk501m>a,div.svelte-hk501m address{font-size:16px}}div.svelte-hk501m>a:hover{@apply underline;}",
      map: null
    };
    Footer_list = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { title } = $$props;
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      $$result.css.add(css$5);
      return `<div class="${"flex flex-col svelte-hk501m"}"><h2 class="${"mb-4 flex items-center gap-2 text-[14px] md:text-[18px] font-medium uppercase text-white-300 before:h-[14px] before:w-[14px] before:rounded-full before:bg-white-300 before:content-['']"}">${escape(title)}</h2>
	${slots.default ? slots.default({}) : ``}
</div>`;
    });
    css$4 = {
      code: ".dark-footer-noisebg.svelte-1jmmsv7.svelte-1jmmsv7{@apply noise-bg;;background:url('/noise.png') #191918}#address.svelte-1jmmsv7.svelte-1jmmsv7:hover{@apply no-underline;}#address.svelte-1jmmsv7>address.svelte-1jmmsv7:hover{@apply underline;}",
      map: null
    };
    Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$4);
      return `<footer class="${"dark noise-bg grid w-full grid-cols-1 grid-rows-[max-content,1fr,max-content] md:grid-cols-[1fr,1.2fr] md:grid-rows-[1fr,60px] gap-x-40 gap-y-[60px] md:gap-y-[120px] px-5 md:px-20 pt-[60px] md:pt-[120px]"}"><form class="${"w-full"}"><h1 class="${"mb-[60px] md:mb-[120px] text-[32px] font-bold tracking-tight text-white-full"}">B/D\xAE</h1>

		<h1 class="${"md:hidden text-white-300 mb-4"}">We collaborate with ambitious brands and people. Let&#39;s build.
			<a class="${"underline"}" href="${"mailto:biz@basicagency.com"}">biz@basicagency.com</a></h1>

		<fieldset class="${"w-full"}"><h2 class="${"mb-2 text-[18px] font-medium uppercase tracking-tighter text-white-300"}"><span class="${"mr-[6px] text-[1.6em]"}">\u25CF</span> STAY IN THE KNOW
			</h2>
			${validate_component(Footer_email_input, "FooterEmailInput").$$render($$result, {}, {}, {})}</fieldset></form>

	<section class="${"h-full"}"><h1 class="${"hidden max-w-[30ch] text-[32px] font-normal leading-[1.1] tracking-tight text-white-300 md:block"}">We collaborate with ambitious brands and people. Let&#39;s build.
			<a class="${"underline"}" href="${"mailto:biz@basicagency.com"}">biz@basicagency.com</a></h1>

		<div class="${"md:mt-[calc(72px+28px)] grid w-full grid-flow-row gap-[3.125rem] md:gap-0 md:grid-cols-3"}">${validate_component(Footer_list, "FooterList").$$render($$result, { title: "social" }, {}, {
        default: () => {
          return `<a href="${"/"}">Instagram</a>
				<a href="${"/"}">Twitter</a>
				<a href="${"/"}">LinkedIn</a>
				<a href="${"/"}">Facebook</a>`;
        }
      })}

			${validate_component(Footer_list, "FooterList").$$render($$result, { title: "initatives" }, {}, {
        default: () => {
          return `<a href="${"/"}">Crafted</a>
				<a href="${"/"}">Culture Manual</a>
				<a href="${"/"}">Applied</a>
				<a href="${"/"}">Brandbeats</a>
				<a href="${"/"}">Moves</a>
				<a href="${"/"}">B\xAE/Good</a>`;
        }
      })}

			${validate_component(Footer_list, "FooterList").$$render($$result, { title: "Offices" }, {}, {
        default: () => {
          return `<a id="${"address"}" href="${"/"}" class="${"svelte-1jmmsv7"}"><address class="${"svelte-1jmmsv7"}">San Diego - CA</address>
					<address class="${"svelte-1jmmsv7"}">New York - NY</address>
					<address class="${"svelte-1jmmsv7"}">Bay Area - CA</address>
					<address class="${"svelte-1jmmsv7"}">St. Louis - MO</address>
					<address class="${"svelte-1jmmsv7"}">Amersterdan - NL</address>
					<address class="${"svelte-1jmmsv7"}">London - EN</address>
					<address class="${"svelte-1jmmsv7"}">Berlin - GE</address>
					<address class="${"svelte-1jmmsv7"}">Argentina - AR</address></a>`;
        }
      })}</div></section>

	<section class="${"dark-footer-noisebg justify-items-center md:justify-items-start md:col-span-2 -mx-5 md:-mx-20 grid grid-cols-[repeat(2,minmax(max-content,1fr))] md:grid-cols-[max-content,1fr,repeat(3,max-content)] md:grid-rows-1 items-center py-5 md:py-0 px-5 md:px-20 text-[11px] font-medium uppercase tracking-tight text-[#5e5e5e] svelte-1jmmsv7"}"><p class="${"col-span-2 md:col-auto"}">BASIC/DEPT\xAE, INC 10 - 22\xA9</p>
		<h1 class="${"md:justify-self-center col-span-2 md:col-auto text-center"}">EASY TO UNDERSTAND, IMPOSSIBLE TO IGNORE.\u2122</h1>
		<a class="${"row-start-4 md:row-start-auto"}" href="${"/"}">terms</a>,
		<a class="${"row-start-4 md:row-start-auto"}" href="${"/"}">privacy policy</a></section>
</footer>`;
    });
    css$3 = {
      code: ".cursor.svelte-191e788.svelte-191e788{@apply pointer-events-none absolute top-0 left-0 z-20 grid gap-2 will-change-transform;;transform:translate3d(\n			calc(var(--pos-x, 0) - 50%),\n			calc(var(--pos-y, 0) - (var(--dim) / 2)),\n			0\n		)}.cursor.svelte-191e788 .circle.svelte-191e788{@apply grid h-[var(--dim)] w-[var(--dim)] scale-[var(--scale,1)] place-items-center rounded-full bg-white-full;}",
      map: null
    };
    Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $scale, $$unsubscribe_scale;
      let $pos, $$unsubscribe_pos;
      let $isMouseOver, $$unsubscribe_isMouseOver;
      let resting = { x: 0, y: 0 };
      const pos = spring(resting, { damping: 1, stiffness: 0.4 });
      $$unsubscribe_pos = subscribe(pos, (value) => $pos = value);
      const scale = tweened(1, { duration: 100 });
      $$unsubscribe_scale = subscribe(scale, (value) => $scale = value);
      const isMouseOver = writable2(false);
      $$unsubscribe_isMouseOver = subscribe(isMouseOver, (value) => $isMouseOver = value);
      let container;
      $$result.css.add(css$3);
      {
        if (!$isMouseOver) {
          set_store_value(pos, $pos = resting, $pos);
          set_store_value(scale, $scale = 1, $scale);
        }
      }
      $$unsubscribe_scale();
      $$unsubscribe_pos();
      $$unsubscribe_isMouseOver();
      return `

<header class="${"relative z-10 h-screen w-full cursor-none overflow-hidden"}"${add_styles({
        "--pos-x": `${$pos.x}px`,
        "--pos-y": `${$pos.y}px`,
        "--scale": $scale,
        "--dim": `120px`
      })}${add_attribute("this", container, 0)}><div class="${"cursor svelte-191e788"}"><div class="${"circle svelte-191e788"}">${$scale === 1 ? `<p class="${"max-w-[4ch] text-center text-[14px] font-medium uppercase leading-[1.1] tracking-tight"}">Play Reel
				</p>` : ``}</div>
		<p class="${"max-w-[11ch] text-center text-[14px] font-medium uppercase leading-[1.1] tracking-tight"}">basic/depts 2010-22
		</p></div>
	<video class="${"z-10 h-full w-full object-cover"}" loop preload="${"auto"}" autoplay muted><source src="${"/header.webm"}" type="${"video/webm"}"><track kind="${"captions"}"></video>
</header>`;
    });
    Internal_work_xicon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<svg class="${"h-4 w-4"}" fill="${"currentColor"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 11.7 11.7"}"><path d="${"M0,10.6L10.6,0l1.1,1.1L1.1,11.7L0,10.6z"}"></path><path d="${"M10.6,11.7L0,1.1L1.1,0l10.6,10.6L10.6,11.7z"}"></path></svg>`;
    });
    css$2 = {
      code: "div.svelte-15dat8h a.svelte-15dat8h{@apply text-[1.4rem] font-bold uppercase tracking-tighter;}",
      map: null
    };
    Internal_mobile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$2);
      return `<nav class="${"flex items-center justify-between px-5 py-5"}">${validate_component(Navbar_logo, "NavbarLogo").$$render($$result, {}, {}, {})}
	<button class="${"grid place-content-center rounded-full border border-pink-300 p-2"}">${validate_component(Internal_work_xicon, "InternalWorkXicon").$$render($$result, {}, {}, {})}</button></nav>

<div class="${"mt-1 flex flex-col gap-4 px-5 svelte-15dat8h"}"><a href="${"/"}" class="${"svelte-15dat8h"}">work</a>
	<a href="${"/"}" class="${"svelte-15dat8h"}">about</a>
	<a href="${"/"}" class="${"svelte-15dat8h"}">news</a>
	<a href="${"/"}" class="${"svelte-15dat8h"}">thinking</a>
	<a href="${"/"}" class="${"svelte-15dat8h"}">pledge</a>
	<a href="${"/"}" class="${"svelte-15dat8h"}">careers</a>
	<a href="${"/"}" class="${"svelte-15dat8h"}">contact</a></div>

<footer class="${"flex w-full justify-between px-5 py-5 text-[14px] font-medium tracking-tight text-[#5e5e5e]"}"><h1>BASIC/DEPT\xAE, inc</h1>
	<p>10 - 22\xA9</p>
</footer>`;
    });
    css$12 = {
      code: "section.svelte-dblo6e::before{content:'';animation:svelte-dblo6e-slide-x-out 500ms ease-in-out 300ms forwards;@apply fixed top-0 left-0 z-30 hidden h-full w-full bg-black-300;}@media(min-width: 768px){section.svelte-dblo6e::before{display:block}}@keyframes svelte-dblo6e-slide-x-out{from{transform:translateX(0%)}to{transform:translateX(-100%)}}",
      map: null
    };
    Internal_work = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $isInternalWorkOpen, $$unsubscribe_isInternalWorkOpen;
      $$unsubscribe_isInternalWorkOpen = subscribe(isInternalWorkOpen, (value) => $isInternalWorkOpen = value);
      let pos;
      let scale;
      let opacity;
      let shouldShowCursor = false;
      $$result.css.add(css$12);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        {
          if ($isInternalWorkOpen) {
            setTimeout(() => {
              shouldShowCursor = true;
            }, 800);
          } else {
            shouldShowCursor = false;
          }
        }
        $$rendered = `

${$isInternalWorkOpen ? `${shouldShowCursor && pos && opacity && scale ? `${validate_component(Drag_cursor, "DragCursor").$$render($$result, { zIndex: 30, pos, opacity, scale }, {}, {})}` : ``}

	<section class="${"fixed top-0 left-0 z-20 grid h-full w-full grid-rows-[max-content,1fr,max-content] gap-8 overflow-y-auto bg-black-300 text-pink-300 md:grid-rows-[max-content,1fr,50px] svelte-dblo6e"}">${`${validate_component(Internal_mobile, "InternalMobile").$$render($$result, {}, {}, {})}`}</section>` : ``}`;
      } while (!$$settled);
      $$unsubscribe_isInternalWorkOpen();
      return $$rendered;
    });
    News_card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { href = "/" } = $$props;
      let { src } = $$props;
      let { title } = $$props;
      let { tag } = $$props;
      let { date } = $$props;
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.src === void 0 && $$bindings.src && src !== void 0)
        $$bindings.src(src);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
        $$bindings.tag(tag);
      if ($$props.date === void 0 && $$bindings.date && date !== void 0)
        $$bindings.date(date);
      return `<a${add_attribute("href", href, 0)} class="${"group grid w-full grid-cols-[1fr,max-content] grid-rows-[1fr,repeat(2,max-content)] md:grid-cols-[588px,1fr,max-content] md:grid-rows-[1fr,max-content] justify-items-start gap-x-5 border-t border-black-300 pt-5 text-black-300 dark:text-pink-300"}"><div class="${"col-span-2 md:col-auto md:row-span-2 overflow-hidden"}"><img loading="${"lazy"}" class="${"scale-105 transition-transform duration-[250ms] group-hover:scale-100"}"${add_attribute("src", src, 0)} alt="${""}"></div>

	<h2 class="${"col-span-2 md:col-auto h-auto w-full max-w-[842px] self-start text-[24px] mt-5 md:mt-0 md:text-[42px] font-medium uppercase leading-[1.1] group-hover:underline"}">${escape(title)}</h2>
	<p class="${"md:col-start-2 md:row-start-2 text-[14px] self-end md:self-auto"}"><span class="${"font-bold uppercase tracking-tight"}">${escape(tag)}</span>
		<span class="${"ml-2 text-[14px] font-medium"}">${escape(import_luxon.DateTime.fromJSDate(date).toFormat("dd.LL.yyyy"))}</span></p>
	<img loading="${"lazy"}" class="${"mt-5 md:mt-0 self-center md:self-auto md:row-span-2 h-[30px] w-[30px]"}" src="${"/right-arrow.svg"}" alt="${""}"></a>`;
    });
    news1 = "/_app/immutable/assets/news-1-a9a53437.webp";
    news2 = "/_app/immutable/assets/news-2-6dc6eba9.webp";
    news3 = "/_app/immutable/assets/news-3-ea152871.webp";
    news4 = "/_app/immutable/assets/news-4-7542d25d.webp";
    news5 = "/_app/immutable/assets/news-5-ce220ba9.webp";
    news6 = "/_app/immutable/assets/news-6-708f64d1.webp";
    news7 = "/_app/immutable/assets/news-7-bc682cd0.webp";
    News = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<section class="${"mt-[180px] flex flex-col gap-4 md:gap-20"}"><h1 class="${"sr-only"}">Featured News</h1>

	<div class="${"grid grid-cols-2"}"><h1 class="${"max-w-[6ch] text-[42px] font-bold uppercase leading-[1.1] tracking-tight text-black-300 dark:text-pink-300"}">Featured News
		</h1>
		${validate_component(Button, "Button").$$render($$result, {
        class: "self-center justify-self-end dark:text-pink-300"
      }, {}, {
        default: () => {
          return `View All`;
        }
      })}</div>

	${validate_component(News_card, "NewsCard").$$render($$result, {
        src: news1,
        title: "a fresh collab with brixton just in time for spring",
        tag: "work",
        date: new Date(Date.now())
      }, {}, {})}

	${validate_component(News_card, "NewsCard").$$render($$result, {
        src: news2,
        title: "BASIC\xAE Earns 12 Nominations in 26th Annual Webby Awards",
        tag: "awards",
        date: new Date(Date.now())
      }, {}, {})}

	${validate_component(News_card, "NewsCard").$$render($$result, {
        src: news3,
        title: "Patagonia Recognized for Environmental Impact at The Inaugural Anthem Awards",
        tag: "awards",
        date: new Date(Date.now())
      }, {}, {})}

	${validate_component(News_card, "NewsCard").$$render($$result, {
        src: news4,
        title: "Cowboy and BASIC\xAE Recognized Across 8 Categories",
        tag: "awards",
        date: new Date(Date.now())
      }, {}, {})}

	${validate_component(News_card, "NewsCard").$$render($$result, {
        src: news5,
        title: "FAST CO.: BASIC\xAE and KFC Team Up for a Digital Overhaul",
        tag: "press",
        date: new Date(Date.now())
      }, {}, {})}

	${validate_component(News_card, "NewsCard").$$render($$result, {
        src: news6,
        title: "BASIC\xAE and Webex Champion \u201CHybrid Collaboration\u201D As Next Evolution of Workplace Culture",
        tag: "press",
        date: new Date(Date.now())
      }, {}, {})}

	${validate_component(News_card, "NewsCard").$$render($$result, {
        src: news7,
        title: "BASIC recognized with 2020 Star Award for Technology by KFC",
        tag: "awards",
        date: new Date(Date.now())
      }, {}, {})}</section>`;
    });
    css4 = {
      code: "a.svelte-1abfwvb h1.svelte-1abfwvb{background-image:linear-gradient(theme('colors.black.full'), theme('colors.black.full'));background-repeat:no-repeat;background-position:right bottom;background-size:0% 1px;transition:background-size 250ms ease-in-out}a.svelte-1abfwvb:hover h1.svelte-1abfwvb{background-size:100% 1px;background-position:left bottom}",
      map: null
    };
    Work_cards = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { title } = $$props;
      let { description } = $$props;
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.description === void 0 && $$bindings.description && description !== void 0)
        $$bindings.description(description);
      $$result.css.add(css4);
      return `<a href="${"/"}" class="${"group svelte-1abfwvb"}"><div class="${"overflow-hidden"}"><div class="${"scale-105 transition-transform duration-500 group-hover:scale-100"}">${slots.default ? slots.default({}) : ``}</div></div>
	<h1 class="${"m-5 max-w-max text-[22px] font-medium uppercase tracking-tighter text-black-full svelte-1abfwvb"}">${escape(title)}</h1>
	<p class="${"m-5 -mt-4 max-w-[268px] text-[14px] font-medium uppercase leading-[1.1] tracking-tight text-black-300"}">${escape(description)}</p>
</a>`;
    });
    Work_hr = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="${"mt-8 grid w-full grid-cols-[33%,1fr] grid-rows-2 text-[14px] font-medium uppercase md:mt-[188px]"}"><hr class="${"col-span-3"}">
	<p>01</p>
	<p>/05</p>
	<p class="${"justfy-end"}">\u25CF</p></div>`;
    });
    Work = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<section class="${"grid grid-cols-1 grid-rows-[repeat(2,max-content)] gap-y-8 py-10 md:grid-cols-[1fr,max-content] md:grid-rows-1 md:py-32"}"><div class="${"flex max-w-[75ch] flex-col items-start gap-10"}"><p class="${"text-[22px] font-medium leading-[1] tracking-tighter text-black-300 md:text-[38px]"}">BASIC/DEPT\xAE is a global branding and digital design agency building products, services, and
			eCommerce experiences that turn cultural values into company value.
		</p>
		<div style="display: contents; --color:${"rgb(37,36,34)"}; --hover-color:${"white"};">${validate_component(Button, "Button").$$render($$result, {}, {}, {
        default: () => {
          return `See the work`;
        }
      })}</div></div>

	<img loading="${"lazy"}" class="${"w-[296px] justify-self-end md:w-[685px] md:justify-self-auto"}" src="${"/bd.svg"}" alt="${""}"></section>

<section class="${"h-full w-full overflow-hidden"}"><div class="${"grid grid-cols-[repeat(3,minmax(287px,1fr))] gap-5"}">${validate_component(Work_cards, "WorkCards").$$render($$result, {
        title: "patagonia",
        description: "An eCommerce experience driven by Patagonia\u2019s brand mission"
      }, {}, {
        default: () => {
          return `<img loading="${"lazy"}" src="${"/work-card-1.jpg"}" alt="${""}">`;
        }
      })}

		${validate_component(Work_cards, "WorkCards").$$render($$result, {
        title: "wilson",
        description: "A century-old sports brand finding its place in culture"
      }, {}, {
        default: () => {
          return `<img loading="${"lazy"}" src="${"/work-card-2.jpg"}" alt="${""}">`;
        }
      })}

		${validate_component(Work_cards, "WorkCards").$$render($$result, {
        title: "google store",
        description: "An eCommerce experience helping Google bring its hardware to people across the globe"
      }, {}, {
        default: () => {
          return `<video autoplay loop muted><source src="${"/Google-Store-Web-Design-Case-Study-Thumbnail-02.webm"}" type="${"video/webm"}"></video>`;
        }
      })}</div></section>

${validate_component(Work_hr, "WorkHr").$$render($$result, {}, {}, {})}`;
    });
    Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
<main class="${"w-full px-5 mb-20 md:pb-[188px] md:px-20"}">${validate_component(Work, "Work").$$render($$result, {}, {}, {})}
	${validate_component(Featured, "Featured").$$render($$result, {}, {}, {})}
	${validate_component(Agency_spotlight, "AgencySpotlight").$$render($$result, {}, {}, {})}
	${validate_component(News, "News").$$render($$result, {}, {}, {})}
	${validate_component(Internal_work, "InternalWork").$$render($$result, {}, {}, {})}</main>

${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  css: () => css5,
  entry: () => entry3,
  index: () => index3,
  js: () => js3,
  module: () => index_svelte_exports
});
var index3, entry3, js3, css5;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_index_svelte();
    index3 = 2;
    entry3 = "pages/index.svelte-43d433f7.js";
    js3 = ["pages/index.svelte-43d433f7.js", "chunks/index-65d590a5.js", "chunks/store-3ad71f82.js", "chunks/index-6f304bd1.js"];
    css5 = ["assets/pages/index.svelte-000361e7.css"];
  }
});

// .svelte-kit/vercel-tmp/serverless.js
var serverless_exports = {};
__export(serverless_exports, {
  default: () => serverless_default
});
module.exports = __toCommonJS(serverless_exports);
init_polyfills();

// node_modules/.pnpm/registry.npmjs.org+@sveltejs+kit@1.0.0-next.354_svelte@3.48.0/node_modules/@sveltejs/kit/dist/node.js
var import_stream = require("stream");
var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValue = parts.shift().split("=");
  var name = nameValue.shift();
  var value = nameValue.join("=");
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  try {
    value = options.decodeValues ? decodeURIComponent(value) : value;
  } catch (e2) {
    console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e2);
  }
  var cookie = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key2 === "expires") {
      cookie.expires = new Date(value2);
    } else if (key2 === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value2;
    } else {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
function parse(input, options) {
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers && input.headers["set-cookie"]) {
    input = input.headers["set-cookie"];
  } else if (input.headers) {
    var sch = input.headers[Object.keys(input.headers).find(function(key2) {
      return key2.toLowerCase() === "set-cookie";
    })];
    if (!sch && input.headers.cookie && !options.silent) {
      console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
    }
    input = sch;
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!options.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie = parseString(str, options);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse;
setCookie.exports.parse = parse;
setCookie.exports.parseString = parseString;
var splitCookiesString_1 = setCookie.exports.splitCookiesString = splitCookiesString;
function get_raw_body(req) {
  return new Promise((fulfil, reject) => {
    const h2 = req.headers;
    if (!h2["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h2["content-length"]);
    if (isNaN(length) && h2["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}
async function getRequest(base2, req) {
  let headers = req.headers;
  if (req.httpVersionMajor === 2) {
    headers = Object.assign({}, headers);
    delete headers[":method"];
    delete headers[":path"];
    delete headers[":authority"];
    delete headers[":scheme"];
  }
  return new Request(base2 + req.url, {
    method: req.method,
    headers,
    body: await get_raw_body(req)
  });
}
async function setResponse(res, response) {
  const headers = Object.fromEntries(response.headers);
  if (response.headers.has("set-cookie")) {
    const header = response.headers.get("set-cookie");
    const split = splitCookiesString_1(header);
    headers["set-cookie"] = split;
  }
  res.writeHead(response.status, headers);
  if (response.body instanceof import_stream.Readable) {
    response.body.pipe(res);
  } else {
    if (response.body) {
      res.write(new Uint8Array(await response.arrayBuffer()));
    }
    res.end();
  }
}

// .svelte-kit/output/server/index.js
init_index_26ca9b1d();
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  {
    stores.page.set(page);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => {
      return `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
        default: () => {
          return `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}`;
        }
      })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`;
    }
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {})}`}

${``}`;
});
function to_headers(object) {
  const headers = new Headers();
  if (object) {
    for (const key2 in object) {
      const value = object[key2];
      if (!value)
        continue;
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          headers.append(key2, value2);
        });
      } else {
        headers.set(key2, value);
      }
    }
  }
  return headers;
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === "string") {
    while (i2)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
  } else {
    while (i2)
      hash2 = hash2 * 33 ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key2 in obj) {
    clone2[key2.toLowerCase()] = obj[key2];
  }
  return clone2;
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = params[key2].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
function is_pojo(body) {
  if (typeof body !== "object")
    return false;
  if (body) {
    if (body instanceof Uint8Array)
      return false;
    if (body._readableState && typeof body.pipe === "function")
      return false;
    if (typeof ReadableStream !== "undefined" && body instanceof ReadableStream)
      return false;
  }
  return true;
}
function normalize_request_method(event) {
  const method = event.request.method.toLowerCase();
  return method === "delete" ? "del" : method;
}
function error(body) {
  return new Response(body, {
    status: 500
  });
}
function is_string(s22) {
  return typeof s22 === "string" || s22 instanceof String;
}
var text_types = /* @__PURE__ */ new Set([
  "application/xml",
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data"
]);
function is_text(content_type) {
  if (!content_type)
    return true;
  const type = content_type.split(";")[0].toLowerCase();
  return type.startsWith("text/") || type.endsWith("+xml") || text_types.has(type);
}
async function render_endpoint(event, mod) {
  const method = normalize_request_method(event);
  let handler = mod[method];
  if (!handler && method === "head") {
    handler = mod.get;
  }
  if (!handler) {
    const allowed = [];
    for (const method2 in ["get", "post", "put", "patch"]) {
      if (mod[method2])
        allowed.push(method2.toUpperCase());
    }
    if (mod.del)
      allowed.push("DELETE");
    if (mod.get || mod.head)
      allowed.push("HEAD");
    return event.request.headers.get("x-sveltekit-load") ? new Response(void 0, {
      status: 204
    }) : new Response(`${event.request.method} method not allowed`, {
      status: 405,
      headers: {
        allow: allowed.join(", ")
      }
    });
  }
  const response = await handler(event);
  const preface = `Invalid response from route ${event.url.pathname}`;
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  if (response.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  const { status = 200, body = {} } = response;
  const headers = response.headers instanceof Headers ? new Headers(response.headers) : to_headers(response.headers);
  const type = headers.get("content-type");
  if (!is_text(type) && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if (is_pojo(body) && (!type || type.startsWith("application/json"))) {
    headers.set("content-type", "application/json; charset=utf-8");
    normalized_body = JSON.stringify(body);
  } else {
    normalized_body = body;
  }
  if ((typeof normalized_body === "string" || normalized_body instanceof Uint8Array) && !headers.has("etag")) {
    const cache_control = headers.get("cache-control");
    if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
      headers.set("etag", `"${hash(normalized_body)}"`);
    }
  }
  return new Response(method !== "head" ? normalized_body : void 0, {
    status,
    headers
  });
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key2) {
            return walk(thing[key2]);
          });
      }
    }
  }
  walk(value);
  var names = /* @__PURE__ */ new Map();
  Array.from(counts).filter(function(entry4) {
    return entry4[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry4, i2) {
    names.set(entry4[0], getName(i2));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i2) {
          return i2 in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key2) {
          return safeKey(key2) + ":" + stringify(thing[key2]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i2) {
            statements_1.push(name + "[" + i2 + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key2) {
            statements_1.push("" + name + safeProp(key2) + "=" + stringify(thing[key2]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escapeUnsafeChars(JSON.stringify(key2));
}
function safeProp(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? "." + key2 : "[" + escapeUnsafeChars(JSON.stringify(key2)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i2];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop3() {
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop3) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop3) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop3;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
var render_json_payload_script_dict = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var render_json_payload_script_regex = new RegExp(`[${Object.keys(render_json_payload_script_dict).join("")}]`, "g");
function render_json_payload_script(attrs, payload) {
  const safe_payload = JSON.stringify(payload).replace(render_json_payload_script_regex, (match) => render_json_payload_script_dict[match]);
  let safe_attrs = "";
  for (const [key2, value] of Object.entries(attrs)) {
    if (value === void 0)
      continue;
    safe_attrs += ` sveltekit:data-${key2}=${escape_html_attr(value)}`;
  }
  return `<script type="application/json"${safe_attrs}>${safe_payload}<\/script>`;
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(`[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`, "g");
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var s2 = JSON.stringify;
function create_prerendering_url_proxy(url) {
  return new Proxy(url, {
    get: (target, prop, receiver) => {
      if (prop === "search" || prop === "searchParams") {
        throw new Error(`Cannot access url.${prop} on a page with prerendering enabled`);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
var encoder = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode$1(data);
  for (let i2 = 0; i2 < array2.length; i2 += 16) {
    const w = array2.subarray(i2, i2 + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w[i22];
      } else {
        a = w[i22 + 1 & 15];
        b = w[i22 + 14 & 15];
        tmp = w[i22 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i22 & 15] + w[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a = bytes[i2 + 0];
    const b = bytes[i2 + 1];
    const c = bytes[i2 + 2];
    const d = bytes[i2 + 3];
    bytes[i2 + 0] = d;
    bytes[i2 + 1] = c;
    bytes[i2 + 2] = b;
    bytes[i2 + 3] = a;
  }
}
function encode$1(str) {
  const encoded = encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i2;
  for (i2 = 2; i2 < l; i2 += 3) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2 | bytes[i2] >> 6];
    result += chars[bytes[i2] & 63];
  }
  if (i2 === l + 1) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4];
    result += "==";
  }
  if (i2 === l) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var csp_ready;
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var Csp = class {
  #use_hashes;
  #dev;
  #script_needs_csp;
  #style_needs_csp;
  #directives;
  #script_src;
  #style_src;
  constructor({ mode, directives }, { dev, prerender, needs_nonce }) {
    this.#use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.#directives = dev ? { ...directives } : directives;
    this.#dev = dev;
    const d = this.#directives;
    if (dev) {
      const effective_style_src2 = d["style-src"] || d["default-src"];
      if (effective_style_src2 && !effective_style_src2.includes("unsafe-inline")) {
        d["style-src"] = [...effective_style_src2, "unsafe-inline"];
      }
    }
    this.#script_src = [];
    this.#style_src = [];
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    this.#script_needs_csp = !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.#style_needs_csp = !dev && !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    if (this.script_needs_nonce || this.style_needs_nonce || needs_nonce) {
      this.nonce = generate_nonce();
    }
  }
  add_script(content) {
    if (this.#script_needs_csp) {
      if (this.#use_hashes) {
        this.#script_src.push(`sha256-${sha256(content)}`);
      } else if (this.#script_src.length === 0) {
        this.#script_src.push(`nonce-${this.nonce}`);
      }
    }
  }
  add_style(content) {
    if (this.#style_needs_csp) {
      if (this.#use_hashes) {
        this.#style_src.push(`sha256-${sha256(content)}`);
      } else if (this.#style_src.length === 0) {
        this.#style_src.push(`nonce-${this.nonce}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...this.#directives };
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = directives[key2];
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
var updated = {
  ...readable(false),
  check: () => false
};
async function render_response({
  branch,
  options,
  state,
  $session,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  stuff
}) {
  if (state.prerendering) {
    if (options.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options.template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const stylesheets = new Set(options.manifest._.entry.css);
  const modulepreloads = new Set(options.manifest._.entry.js);
  const styles = /* @__PURE__ */ new Map();
  const serialized_data = [];
  let shadow_props;
  let rendered;
  let is_private = false;
  let cache;
  if (error2) {
    error2.stack = options.get_stack(error2);
  }
  if (resolve_opts.ssr) {
    branch.forEach(({ node, props: props2, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => stylesheets.add(url));
      if (node.js)
        node.js.forEach((url) => modulepreloads.add(url));
      if (node.styles)
        Object.entries(node.styles).forEach(([k, v]) => styles.set(k, v));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (props2)
        shadow_props = props2;
      cache = loaded == null ? void 0 : loaded.cache;
      is_private = (cache == null ? void 0 : cache.private) ?? uses_credentials;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session: {
          ...session,
          subscribe: (fn) => {
            is_private = (cache == null ? void 0 : cache.private) ?? true;
            return session.subscribe(fn);
          }
        },
        updated
      },
      page: {
        error: error2,
        params: event.params,
        routeId: event.routeId,
        status,
        stuff,
        url: state.prerendering ? create_prerendering_url_proxy(event.url) : event.url
      },
      components: branch.map(({ node }) => node.module.default)
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    rendered = options.root.render(props);
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let { head, html: body } = rendered;
  const inlined_style = Array.from(styles.values()).join("\n");
  await csp_ready;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerendering,
    needs_nonce: options.template_contains_nonce
  });
  const target = hash(body);
  const init_app = `
		import { start } from ${s2(options.prefix + options.manifest._.entry.file)};
		start({
			target: document.querySelector('[data-sveltekit-hydrate="${target}"]').parentNode,
			paths: ${s2(options.paths)},
			session: ${try_serialize($session, (error3) => {
    throw new Error(`Failed to serialize session data: ${error3.message}`);
  })},
			route: ${!!page_config.router},
			spa: ${!resolve_opts.ssr},
			trailing_slash: ${s2(options.trailing_slash)},
			hydrate: ${resolve_opts.ssr && page_config.hydrate ? `{
				status: ${status},
				error: ${serialize_error(error2)},
				nodes: [${branch.map(({ node }) => node.index).join(", ")}],
				params: ${devalue(event.params)},
				routeId: ${s2(event.routeId)}
			}` : "null"}
		});
	`;
  const init_service_worker = `
		if ('serviceWorker' in navigator) {
			addEventListener('load', () => {
				navigator.serviceWorker.register('${options.service_worker}');
			});
		}
	`;
  if (inlined_style) {
    const attributes = [];
    if (options.dev)
      attributes.push(" data-sveltekit");
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(inlined_style);
    head += `
	<style${attributes.join("")}>${inlined_style}</style>`;
  }
  head += Array.from(stylesheets).map((dep) => {
    const attributes = [
      'rel="stylesheet"',
      `href="${options.prefix + dep}"`
    ];
    if (csp.style_needs_nonce) {
      attributes.push(`nonce="${csp.nonce}"`);
    }
    if (styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    }
    return `
	<link ${attributes.join(" ")}>`;
  }).join("");
  if (page_config.router || page_config.hydrate) {
    head += Array.from(modulepreloads).map((dep) => `
	<link rel="modulepreload" href="${options.prefix + dep}">`).join("");
    const attributes = ['type="module"', `data-sveltekit-hydrate="${target}"`];
    csp.add_script(init_app);
    if (csp.script_needs_nonce) {
      attributes.push(`nonce="${csp.nonce}"`);
    }
    body += `
		<script ${attributes.join(" ")}>${init_app}<\/script>`;
    body += serialized_data.map(({ url, body: body2, response }) => render_json_payload_script({ type: "data", url, body: typeof body2 === "string" ? hash(body2) : void 0 }, response)).join("\n	");
    if (shadow_props) {
      body += render_json_payload_script({ type: "props" }, shadow_props);
    }
  }
  if (options.service_worker) {
    csp.add_script(init_service_worker);
    head += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
  }
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="max-age=${cache.maxage}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  const segments = event.url.pathname.slice(options.paths.base.length).split("/").slice(2);
  const assets2 = options.paths.assets || (segments.length > 0 ? segments.map(() => "..").join("/") : ".");
  const html = await resolve_opts.transformPage({
    html: options.template({ head, body, assets: assets2, nonce: csp.nonce })
  });
  const headers = new Headers({
    "content-type": "text/html",
    etag: `"${hash(html)}"`
  });
  if (cache) {
    headers.set("cache-control", `${is_private ? "private" : "public"}, max-age=${cache.maxage}`);
  }
  if (!options.floc) {
    headers.set("permissions-policy", "interest-cohort=()");
  }
  if (!state.prerendering) {
    const csp_header = csp.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
  }
  return new Response(html, {
    status,
    headers
  });
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ ...error2, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
var parse_1 = parse$1;
var serialize_1 = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode;
  var index4 = 0;
  while (index4 < str.length) {
    var eqIdx = str.indexOf("=", index4);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index4);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index4 = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key2 = str.slice(index4, eqIdx).trim();
    if (obj[key2] === void 0) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key2] = tryDecode(val, dec);
    }
    index4 = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value;
  if (opt.maxAge != null) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e2) {
    return str;
  }
}
var setCookie2 = { exports: {} };
var defaultParseOptions2 = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString2(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString2(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString2);
  var nameValue = parts.shift().split("=");
  var name = nameValue.shift();
  var value = nameValue.join("=");
  options = options ? Object.assign({}, defaultParseOptions2, options) : defaultParseOptions2;
  try {
    value = options.decodeValues ? decodeURIComponent(value) : value;
  } catch (e2) {
    console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e2);
  }
  var cookie = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key2 === "expires") {
      cookie.expires = new Date(value2);
    } else if (key2 === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value2;
    } else {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
function parse2(input, options) {
  options = options ? Object.assign({}, defaultParseOptions2, options) : defaultParseOptions2;
  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers && input.headers["set-cookie"]) {
    input = input.headers["set-cookie"];
  } else if (input.headers) {
    var sch = input.headers[Object.keys(input.headers).find(function(key2) {
      return key2.toLowerCase() === "set-cookie";
    })];
    if (!sch && input.headers.cookie && !options.silent) {
      console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
    }
    input = sch;
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options = options ? Object.assign({}, defaultParseOptions2, options) : defaultParseOptions2;
  if (!options.map) {
    return input.filter(isNonEmptyString2).map(function(str) {
      return parseString2(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString2).reduce(function(cookies2, str) {
      var cookie = parseString2(str, options);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString2(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie2.exports = parse2;
setCookie2.exports.parse = parse2;
var parseString_1 = setCookie2.exports.parseString = parseString2;
var splitCookiesString_12 = setCookie2.exports.splitCookiesString = splitCookiesString2;
function normalize(loaded) {
  if (loaded.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  if ("maxage" in loaded) {
    throw new Error("maxage should be replaced with cache: { maxage }");
  }
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return { status: status || 500, error: new Error() };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      throw new Error('"redirect" property returned from load() must be accompanied by a 3xx status code');
    }
    if (typeof loaded.redirect !== "string") {
      throw new Error('"redirect" property returned from load() must be a string');
    }
  }
  if (loaded.dependencies) {
    if (!Array.isArray(loaded.dependencies) || loaded.dependencies.some((dep) => typeof dep !== "string")) {
      throw new Error('"dependencies" property returned from load() must be of type string[]');
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path) {
  if (scheme.test(path))
    return path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function is_root_relative(path) {
  return path[0] === "/" && path[1] !== "/";
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
var LoadURL = class extends URL {
  get hash() {
    throw new Error("url.hash is inaccessible from load. Consider accessing hash from the page store within the script tag of your component.");
  }
};
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
async function load_node({
  event,
  options,
  state,
  route,
  node,
  $session,
  stuff,
  is_error,
  is_leaf,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  const cookies = parse_1(event.request.headers.get("cookie") || "");
  const new_cookies = [];
  let loaded;
  const should_prerender = node.module.prerender ?? options.prerender.default;
  const shadow = is_leaf ? await load_shadow_data(route, event, options, should_prerender) : {};
  if (shadow.cookies) {
    shadow.cookies.forEach((header) => {
      new_cookies.push(parseString_1(header));
    });
  }
  if (shadow.error) {
    loaded = {
      status: shadow.status,
      error: shadow.error
    };
  } else if (shadow.redirect) {
    loaded = {
      status: shadow.status,
      redirect: shadow.redirect
    };
  } else if (module2.load) {
    const load_input = {
      url: state.prerendering ? create_prerendering_url_proxy(event.url) : new LoadURL(event.url),
      params: event.params,
      props: shadow.body || {},
      routeId: event.routeId,
      get session() {
        if (node.module.prerender ?? options.prerender.default) {
          throw Error("Attempted to access session from a prerendered page. Session would never be populated.");
        }
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === "string") {
          requested = resource;
        } else {
          requested = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        opts.headers = new Headers(opts.headers);
        for (const [key2, value] of event.request.headers) {
          if (key2 !== "authorization" && key2 !== "cookie" && key2 !== "host" && key2 !== "if-none-match" && !opts.headers.has(key2)) {
            opts.headers.set(key2, value);
          }
        }
        const resolved = resolve(event.url.pathname, requested.split("?")[0]);
        let response;
        let dependency;
        const prefix = options.paths.assets || options.paths.base;
        const filename = decodeURIComponent(resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            response = new Response(options.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else {
            response = await fetch(`${event.url.origin}/${file}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            const authorization = event.request.headers.get("authorization");
            const combined_cookies = { ...cookies };
            for (const cookie2 of new_cookies) {
              if (!domain_matches(event.url.hostname, cookie2.domain))
                continue;
              if (!path_matches(resolved, cookie2.path))
                continue;
              combined_cookies[cookie2.name] = cookie2.value;
            }
            const cookie = Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
            if (cookie) {
              opts.headers.set("cookie", cookie);
            }
            if (authorization && !opts.headers.has("authorization")) {
              opts.headers.set("authorization", authorization);
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          response = await respond(new Request(new URL(requested, event.url).href, { ...opts }), options, {
            ...state,
            initiator: route
          });
          if (state.prerendering) {
            dependency = { response, body: null };
            state.prerendering.dependencies.set(resolved, dependency);
          }
        } else {
          if (resolved.startsWith("//")) {
            requested = event.url.protocol + requested;
          }
          if (`.${new URL(requested).hostname}`.endsWith(`.${event.url.hostname}`) && opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie = event.request.headers.get("cookie");
            if (cookie)
              opts.headers.set("cookie", cookie);
          }
          const external_request = new Request(requested, opts);
          response = await options.hooks.externalFetch.call(null, external_request);
        }
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          new_cookies.push(...splitCookiesString_12(set_cookie).map((str) => parseString_1(str)));
        }
        const proxy = new Proxy(response, {
          get(response2, key2, _receiver) {
            async function text() {
              const body = await response2.text();
              const headers = {};
              for (const [key3, value] of response2.headers) {
                if (key3 !== "set-cookie" && key3 !== "etag") {
                  headers[key3] = value;
                }
              }
              if (!opts.body || typeof opts.body === "string") {
                const status_number = Number(response2.status);
                if (isNaN(status_number)) {
                  throw new Error(`response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`);
                }
                fetched.push({
                  url: requested,
                  body: opts.body,
                  response: {
                    status: status_number,
                    statusText: response2.statusText,
                    headers,
                    body
                  }
                });
              }
              if (dependency) {
                dependency.body = body;
              }
              return body;
            }
            if (key2 === "arrayBuffer") {
              return async () => {
                const buffer = await response2.arrayBuffer();
                if (dependency) {
                  dependency.body = new Uint8Array(buffer);
                }
                return buffer;
              };
            }
            if (key2 === "text") {
              return text;
            }
            if (key2 === "json") {
              return async () => {
                return JSON.parse(await text());
              };
            }
            return Reflect.get(response2, key2, response2);
          }
        });
        return proxy;
      },
      stuff: { ...stuff },
      status: is_error ? status ?? null : null,
      error: is_error ? error2 ?? null : null
    };
    if (options.dev) {
      Object.defineProperty(load_input, "page", {
        get: () => {
          throw new Error("`page` in `load` functions has been replaced by `url` and `params`");
        }
      });
    }
    loaded = await module2.load.call(null, load_input);
    if (!loaded) {
      throw new Error(`load function must return a value${options.dev ? ` (${node.entry})` : ""}`);
    }
  } else if (shadow.body) {
    loaded = {
      props: shadow.body
    };
  } else {
    loaded = {};
  }
  if (shadow.body && state.prerendering) {
    const pathname = `${event.url.pathname.replace(/\/$/, "")}/__data.json`;
    const dependency = {
      response: new Response(void 0),
      body: JSON.stringify(shadow.body)
    };
    state.prerendering.dependencies.set(pathname, dependency);
  }
  return {
    node,
    props: shadow.body,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers: new_cookies.map((new_cookie) => {
      const { name, value, ...options2 } = new_cookie;
      return serialize_1(name, value, options2);
    }),
    uses_credentials
  };
}
async function load_shadow_data(route, event, options, prerender) {
  if (!route.shadow)
    return {};
  try {
    const mod = await route.shadow();
    if (prerender && (mod.post || mod.put || mod.del || mod.patch)) {
      throw new Error("Cannot prerender pages that have endpoints with mutative methods");
    }
    const method = normalize_request_method(event);
    const is_get = method === "head" || method === "get";
    const handler = method === "head" ? mod.head || mod.get : mod[method];
    if (!handler && !is_get) {
      return {
        status: 405,
        error: new Error(`${method} method not allowed`)
      };
    }
    const data = {
      status: 200,
      cookies: [],
      body: {}
    };
    if (!is_get) {
      const result = await handler(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers, body } = validate_shadow_output(result);
      data.status = status;
      add_cookies(data.cookies, headers);
      if (status >= 300 && status < 400) {
        data.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data;
      }
      data.body = body;
    }
    const get = method === "head" && mod.head || mod.get;
    if (get) {
      const result = await get(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers, body } = validate_shadow_output(result);
      add_cookies(data.cookies, headers);
      data.status = status;
      if (status >= 400) {
        data.error = new Error("Failed to load data");
        return data;
      }
      if (status >= 300) {
        data.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data;
      }
      data.body = { ...body, ...data.body };
    }
    return data;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    return {
      status: 500,
      error: error2
    };
  }
}
function add_cookies(target, headers) {
  const cookies = headers["set-cookie"];
  if (cookies) {
    if (Array.isArray(cookies)) {
      target.push(...cookies);
    } else {
      target.push(cookies);
    }
  }
}
function validate_shadow_output(result) {
  const { status = 200, body = {} } = result;
  let headers = result.headers || {};
  if (headers instanceof Headers) {
    if (headers.has("set-cookie")) {
      throw new Error("Endpoint request handler cannot use Headers interface with Set-Cookie headers");
    }
  } else {
    headers = lowercase_keys(headers);
  }
  if (!is_pojo(body)) {
    throw new Error("Body returned from endpoint request handler must be a plain object");
  }
  return { status, headers, body };
}
async function respond_with_error({
  event,
  options,
  state,
  $session,
  status,
  error: error2,
  resolve_opts
}) {
  try {
    const branch = [];
    let stuff = {};
    if (resolve_opts.ssr) {
      const default_layout = await options.manifest._.nodes[0]();
      const default_error = await options.manifest._.nodes[1]();
      const layout_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_layout,
        $session,
        stuff: {},
        is_error: false,
        is_leaf: false
      });
      const error_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_error,
        $session,
        stuff: layout_loaded ? layout_loaded.stuff : {},
        is_error: true,
        is_leaf: false,
        status,
        error: error2
      });
      branch.push(layout_loaded, error_loaded);
      stuff = error_loaded.stuff;
    }
    return await render_response({
      options,
      state,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router
      },
      stuff,
      status,
      error: error2,
      branch,
      event,
      resolve_opts
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return new Response(error3.stack, {
      status: 500
    });
  }
}
async function respond$1(opts) {
  const { event, options, state, $session, route, resolve_opts } = opts;
  let nodes;
  if (!resolve_opts.ssr) {
    return await render_response({
      ...opts,
      branch: [],
      page_config: {
        hydrate: true,
        router: true
      },
      status: 200,
      error: null,
      event,
      stuff: {}
    });
  }
  try {
    nodes = await Promise.all(route.a.map((n) => n == void 0 ? n : options.manifest._.nodes[n]()));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return await respond_with_error({
      event,
      options,
      state,
      $session,
      status: 500,
      error: error3,
      resolve_opts
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options);
  if (state.prerendering) {
    const should_prerender = leaf.prerender ?? options.prerender.default;
    if (!should_prerender) {
      return new Response(void 0, {
        status: 204
      });
    }
  }
  let branch = [];
  let status = 200;
  let error2 = null;
  let set_cookie_headers = [];
  let stuff = {};
  ssr: {
    for (let i2 = 0; i2 < nodes.length; i2 += 1) {
      const node = nodes[i2];
      let loaded;
      if (node) {
        try {
          loaded = await load_node({
            ...opts,
            node,
            stuff,
            is_error: false,
            is_leaf: i2 === nodes.length - 1
          });
          set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
          if (loaded.loaded.redirect) {
            return with_cookies(new Response(void 0, {
              status: loaded.loaded.status,
              headers: {
                location: loaded.loaded.redirect
              }
            }), set_cookie_headers);
          }
          if (loaded.loaded.error) {
            ({ status, error: error2 } = loaded.loaded);
          }
        } catch (err) {
          const e2 = coalesce_to_error(err);
          options.handle_error(e2, event);
          status = 500;
          error2 = e2;
        }
        if (loaded && !error2) {
          branch.push(loaded);
        }
        if (error2) {
          while (i2--) {
            if (route.b[i2]) {
              const index4 = route.b[i2];
              const error_node = await options.manifest._.nodes[index4]();
              let node_loaded;
              let j = i2;
              while (!(node_loaded = branch[j])) {
                j -= 1;
              }
              try {
                const error_loaded = await load_node({
                  ...opts,
                  node: error_node,
                  stuff: node_loaded.stuff,
                  is_error: true,
                  is_leaf: false,
                  status,
                  error: error2
                });
                if (error_loaded.loaded.error) {
                  continue;
                }
                page_config = get_page_config(error_node.module, options);
                branch = branch.slice(0, j + 1).concat(error_loaded);
                stuff = { ...node_loaded.stuff, ...error_loaded.stuff };
                break ssr;
              } catch (err) {
                const e2 = coalesce_to_error(err);
                options.handle_error(e2, event);
                continue;
              }
            }
          }
          return with_cookies(await respond_with_error({
            event,
            options,
            state,
            $session,
            status,
            error: error2,
            resolve_opts
          }), set_cookie_headers);
        }
      }
      if (loaded && loaded.loaded.stuff) {
        stuff = {
          ...stuff,
          ...loaded.loaded.stuff
        };
      }
    }
  }
  try {
    return with_cookies(await render_response({
      ...opts,
      stuff,
      event,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    }), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return with_cookies(await respond_with_error({
      ...opts,
      status: 500,
      error: error3
    }), set_cookie_headers);
  }
}
function get_page_config(leaf, options) {
  if ("ssr" in leaf) {
    throw new Error("`export const ssr` has been removed \u2014 use the handle hook instead: https://kit.svelte.dev/docs/hooks#handle");
  }
  return {
    router: "router" in leaf ? !!leaf.router : options.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    set_cookie_headers.forEach((value) => {
      response.headers.append("set-cookie", value);
    });
  }
  return response;
}
async function render_page(event, route, options, state, resolve_opts) {
  if (state.initiator === route) {
    return new Response(`Not found: ${event.url.pathname}`, {
      status: 404
    });
  }
  if (route.shadow) {
    const type = negotiate(event.request.headers.get("accept") || "text/html", [
      "text/html",
      "application/json"
    ]);
    if (type === "application/json") {
      return render_endpoint(event, await route.shadow());
    }
  }
  const $session = await options.hooks.getSession(event);
  return respond$1({
    event,
    options,
    state,
    $session,
    resolve_opts,
    route
  });
}
function negotiate(accept, types2) {
  const parts = accept.split(",").map((str, i2) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      return { type, subtype, q: +q, i: i2 };
    }
    throw new Error(`Invalid Accept header: ${accept}`);
  }).sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types2) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex((part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*"));
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function exec(match, names, types2, matchers) {
  const params = {};
  for (let i2 = 0; i2 < names.length; i2 += 1) {
    const name = names[i2];
    const type = types2[i2];
    const value = match[i2 + 1] || "";
    if (type) {
      const matcher = matchers[type];
      if (!matcher)
        throw new Error(`Missing "${type}" param matcher`);
      if (!matcher(value))
        return;
    }
    params[name] = value;
  }
  return params;
}
var DATA_SUFFIX = "/__data.json";
var default_transform = ({ html }) => html;
async function respond(request, options, state) {
  var _a, _b, _c, _d;
  let url = new URL(request.url);
  const { parameter, allowed } = options.method_override;
  const method_override = (_a = url.searchParams.get(parameter)) == null ? void 0 : _a.toUpperCase();
  if (method_override) {
    if (request.method === "POST") {
      if (allowed.includes(method_override)) {
        request = new Proxy(request, {
          get: (target, property, _receiver) => {
            if (property === "method")
              return method_override;
            return Reflect.get(target, property, target);
          }
        });
      } else {
        const verb = allowed.length === 0 ? "enabled" : "allowed";
        const body = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs/configuration#methodoverride`;
        return new Response(body, {
          status: 400
        });
      }
    } else {
      throw new Error(`${parameter}=${method_override} is only allowed with POST requests`);
    }
  }
  let decoded = decodeURI(url.pathname);
  let route = null;
  let params = {};
  if (options.paths.base && !((_b = state.prerendering) == null ? void 0 : _b.fallback)) {
    if (!decoded.startsWith(options.paths.base)) {
      return new Response(void 0, { status: 404 });
    }
    decoded = decoded.slice(options.paths.base.length) || "/";
  }
  const is_data_request = decoded.endsWith(DATA_SUFFIX);
  if (is_data_request) {
    const data_suffix_length = DATA_SUFFIX.length - (options.trailing_slash === "always" ? 1 : 0);
    decoded = decoded.slice(0, -data_suffix_length) || "/";
    url = new URL(url.origin + url.pathname.slice(0, -data_suffix_length) + url.search);
  }
  if (!((_c = state.prerendering) == null ? void 0 : _c.fallback)) {
    const matchers = await options.manifest._.matchers();
    for (const candidate of options.manifest._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.names, candidate.types, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  if (route) {
    if (route.type === "page") {
      const normalized = normalize_path(url.pathname, options.trailing_slash);
      if (normalized !== url.pathname && !((_d = state.prerendering) == null ? void 0 : _d.fallback)) {
        return new Response(void 0, {
          status: 301,
          headers: {
            "x-sveltekit-normalize": "1",
            location: (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
          }
        });
      }
    } else if (is_data_request) {
      return new Response(void 0, {
        status: 404
      });
    }
  }
  const event = {
    get clientAddress() {
      if (!state.getClientAddress) {
        throw new Error(`${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`);
      }
      Object.defineProperty(event, "clientAddress", {
        value: state.getClientAddress()
      });
      return event.clientAddress;
    },
    locals: {},
    params,
    platform: state.platform,
    request,
    routeId: route && route.id,
    url
  };
  const removed = (property, replacement, suffix = "") => ({
    get: () => {
      throw new Error(`event.${property} has been replaced by event.${replacement}` + suffix);
    }
  });
  const details = ". See https://github.com/sveltejs/kit/pull/3384 for details";
  const body_getter = {
    get: () => {
      throw new Error("To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`" + details);
    }
  };
  Object.defineProperties(event, {
    method: removed("method", "request.method", details),
    headers: removed("headers", "request.headers", details),
    origin: removed("origin", "url.origin"),
    path: removed("path", "url.pathname"),
    query: removed("query", "url.searchParams"),
    body: body_getter,
    rawBody: body_getter
  });
  let resolve_opts = {
    ssr: true,
    transformPage: default_transform
  };
  try {
    const response = await options.hooks.handle({
      event,
      resolve: async (event2, opts) => {
        var _a2;
        if (opts) {
          resolve_opts = {
            ssr: opts.ssr !== false,
            transformPage: opts.transformPage || default_transform
          };
        }
        if ((_a2 = state.prerendering) == null ? void 0 : _a2.fallback) {
          return await render_response({
            event: event2,
            options,
            state,
            $session: await options.hooks.getSession(event2),
            page_config: { router: true, hydrate: true },
            stuff: {},
            status: 200,
            error: null,
            branch: [],
            resolve_opts: {
              ...resolve_opts,
              ssr: false
            }
          });
        }
        if (route) {
          let response2;
          if (is_data_request && route.type === "page" && route.shadow) {
            response2 = await render_endpoint(event2, await route.shadow());
            if (request.headers.has("x-sveltekit-load")) {
              if (response2.status >= 300 && response2.status < 400) {
                const location = response2.headers.get("location");
                if (location) {
                  const headers = new Headers(response2.headers);
                  headers.set("x-sveltekit-location", location);
                  response2 = new Response(void 0, {
                    status: 204,
                    headers
                  });
                }
              }
            }
          } else {
            response2 = route.type === "endpoint" ? await render_endpoint(event2, await route.load()) : await render_page(event2, route, options, state, resolve_opts);
          }
          if (response2) {
            if (response2.status === 200 && response2.headers.has("etag")) {
              let if_none_match_value = request.headers.get("if-none-match");
              if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
                if_none_match_value = if_none_match_value.substring(2);
              }
              const etag = response2.headers.get("etag");
              if (if_none_match_value === etag) {
                const headers = new Headers({ etag });
                for (const key2 of [
                  "cache-control",
                  "content-location",
                  "date",
                  "expires",
                  "vary"
                ]) {
                  const value = response2.headers.get(key2);
                  if (value)
                    headers.set(key2, value);
                }
                return new Response(void 0, {
                  status: 304,
                  headers
                });
              }
            }
            return response2;
          }
        }
        if (!state.initiator) {
          const $session = await options.hooks.getSession(event2);
          return await respond_with_error({
            event: event2,
            options,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${event2.url.pathname}`),
            resolve_opts
          });
        }
        if (state.prerendering) {
          return new Response("not found", { status: 404 });
        }
        return await fetch(request);
      },
      get request() {
        throw new Error("request in handle has been replaced with event" + details);
      }
    });
    if (response && !(response instanceof Response)) {
      throw new Error("handle must return a Response object" + details);
    }
    return response;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    try {
      const $session = await options.hooks.getSession(event);
      return await respond_with_error({
        event,
        options,
        state,
        $session,
        status: 500,
        error: error2,
        resolve_opts
      });
    } catch (e22) {
      const error3 = coalesce_to_error(e22);
      return new Response(options.dev ? error3.stack : error3.message, {
        status: 500
      });
    }
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var template = ({ head, body, assets: assets2, nonce }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.ico" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		<meta name="description" content="We design digital products, services, and eCommerce experiences for brands like Google, Airbnb, Patagonia, Apple, Beats by Dre and other category leaders.">\n		' + head + "\n	</head>\n	<body>\n		" + body + "\n	</body>\n</html>\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var Server = class {
  constructor(manifest2) {
    this.options = {
      csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
      dev: false,
      floc: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, event) => {
        this.options.hooks.handleError({
          error: error2,
          event,
          get request() {
            throw new Error("request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details");
          }
        });
        error2.stack = this.options.get_stack(error2);
      },
      hooks: null,
      hydrate: true,
      manifest: manifest2,
      method_override: { "parameter": "_method", "allowed": [] },
      paths: { base, assets },
      prefix: assets + "/_app/immutable/",
      prerender: {
        default: false,
        enabled: true
      },
      read,
      root: Root,
      service_worker: null,
      router: true,
      template,
      template_contains_nonce: false,
      trailing_slash: "never"
    };
  }
  async respond(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error("The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details");
    }
    if (!this.options.hooks) {
      const module2 = await Promise.resolve().then(() => (init_hooks_1c45ba0b(), hooks_1c45ba0b_exports));
      this.options.hooks = {
        getSession: module2.getSession || (() => ({})),
        handle: module2.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
        handleError: module2.handleError || (({ error: error2 }) => console.error(error2.stack)),
        externalFetch: module2.externalFetch || fetch
      };
    }
    return respond(request, this.options, options);
  }
};

// .svelte-kit/vercel-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["104625.webp", "Culture-Loop_v1.mp4", "Google-Store-Web-Design-Case-Study-Thumbnail-02.mp4", "Google-Store-Web-Design-Case-Study-Thumbnail-02.webm", "at.svg", "bd.svg", "favicon.ico", "favicon.png", "google.svg", "header.mp4", "header.webm", "internal-applied.png", "internal-brandbeats.png", "internal-crafted.png", "internal-culture.png", "internal-moves.png", "kfc.svg", "light-right-arrow.svg", "noise.png", "patagonia.svg", "right-arrow.svg", "wilson.svg", "work-card-1.jpg", "work-card-2.jpg"]),
  mimeTypes: { ".webp": "image/webp", ".mp4": "video/mp4", ".webm": "video/webm", ".svg": "image/svg+xml", ".ico": "image/vnd.microsoft.icon", ".png": "image/png", ".jpg": "image/jpeg" },
  _: {
    entry: { "file": "start-44e89372.js", "js": ["start-44e89372.js", "chunks/index-65d590a5.js", "chunks/index-6f304bd1.js"], "css": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3))
    ],
    routes: [
      {
        type: "page",
        id: "",
        pattern: /^\/$/,
        names: [],
        types: [],
        path: "/",
        shadow: null,
        a: [0, 2],
        b: [1]
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};

// .svelte-kit/vercel-tmp/serverless.js
installPolyfills();
var server = new Server(manifest);
var serverless_default = async (req, res) => {
  let request;
  try {
    request = await getRequest(`https://${req.headers.host}`, req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  setResponse(res, await server.respond(request, {
    getClientAddress() {
      return request.headers.get("x-forwarded-for");
    }
  }));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
//# sourceMappingURL=index.js.map
