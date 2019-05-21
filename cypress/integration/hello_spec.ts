import stubDemoFeatures from '../helpers/stubDemoFeatures';

describe('cypress', () => {

  it('should stub specified feature toggles', () => {
    cy.visit({
      url: 'public/index.html',
      onBeforeLoad(win: Window): void {
        stubDemoFeatures(win, {
          on: ['111', '333'],
          off: ['222', '444']
        })
      },
    })
    cy.window().then(win => {
      expect(win.demo.features).to.deep.equal({
        '111': true,
        '333': true,
        '222': false,
        '444': false,
      })
    })
  })

  it('should stub specified feature toggles and still available when win.demo is set to new value', () => {
    cy.visit({
      url: 'public/index.html',
      onBeforeLoad(win: Window): void {
        console.log("### onBeforeLoad")
        stubDemoFeatures(win, {
          on: ['111', '333'],
          off: ['222', '444']
        })
        win.demo = {
          features: {
            '999': true
          }
        }
        console.log('### init end')
      },
    })
    cy.window().then(win => {
      expect(win.demo.features).to.deep.equal({
        '111': true,
        '333': true,
        '222': false,
        '444': false,
        '999': true
      })
    })
  })

  it('should stub specified feature toggles and still available when win.demo.features is set to new value', () => {
    cy.visit({
      url: 'public/index.html',
      onBeforeLoad(win: Window): void {
        stubDemoFeatures(win, {
          on: ['111', '333'],
          off: ['222', '444']
        })
        win.demo.features = {
          '999': true
        }
      },
    })
    cy.window().then(win => {
      expect(win.demo.features).to.deep.equal({
        '111': true,
        '333': true,
        '222': false,
        '444': false,
        '999': true
      })
    })
  })

  it('should stub specified feature toggles unchanged even if toggle is modified', () => {
    cy.visit({
      url: 'public/index.html',
      onBeforeLoad(win: Window): void {
        stubDemoFeatures(win, {
          on: ['111', '333'],
          off: ['222', '444']
        })
        win.demo.features['111'] = false
      },
    })
    cy.window().then(win => {
      expect(win.demo.features).to.deep.equal({
        '111': true,
        '333': true,
        '222': false,
        '444': false,
      })
    })
  })

})
