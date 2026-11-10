// react-dom/server resolves to its browser build in the client-side bundle that
// vite-prerender-plugin drives. That build constructs a MessageChannel when it
// is imported, and in Node the open ports keep `vite build` alive after the
// prerender has finished. Capture the ports so they can be closed afterwards.
const OriginalMessageChannel = globalThis.MessageChannel
const ports: MessagePort[] = []

if (OriginalMessageChannel) {
  globalThis.MessageChannel = class extends OriginalMessageChannel {
    constructor() {
      super()
      ports.push(this.port1, this.port2)
    }
  }
}

export function closePrerenderChannel() {
  for (const port of ports) port.close()
  ports.length = 0

  if (OriginalMessageChannel) {
    globalThis.MessageChannel = OriginalMessageChannel
  }
}
