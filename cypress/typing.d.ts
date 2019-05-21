declare global {

  interface Window {
    demo: {
      features: {
        [hash: string]: boolean
      }
    }
  }

  // namespace Cypress {
  //   interface Chainable {
  //     visit(url: string, options?: Partial<VisitOptions & UcExperimentsToggle>): Chainable<Window>
  //
  //     visit(options: Partial<VisitOptions & UcExperimentsToggle> & { url: string }): Chainable<Window>
  //   }
  // }
}

export {}
