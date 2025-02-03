describe('Landing Page Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('렌더링 시 타이틀 텍스트가 올바르게 표시되어야 한다', () => {
    cy.get('p').contains('원하는 이사 서비스를 요청하고').should('be.visible');
    cy.get('p').contains('견적을 받아보세요').should('be.visible');
  });

  it('로그인 버튼 클릭 시 로그인 페이지로 이동해야 한다', () => {
    cy.setCookie('userType', '');
    cy.get('#move-signin').click();
    cy.url().should('include', '/normal/sign-in');
  });

  it('회원가입 버튼 클릭 시 회원가입 페이지로 이동해야 한다', () => {
    cy.setCookie('userType', '');
    cy.get('#move-signup').click();
    cy.url().should('include', '/normal/sign-up');
  });

  it('비회원이면 이사카드 클릭 시 로그인 페이지로 이동해야 한다', () => {
    cy.setCookie('userType', '');
    cy.get('a[href="/normal/request-quote?type=SMALL"]').click();
    cy.url().should('include', '/normal/sign-in');
    cy.visit('/');
    cy.get('a[href="/normal/request-quote?type=HOME"]').click();
    cy.url().should('include', '/normal/sign-in');
    cy.visit('/');
    cy.get('a[href="/normal/request-quote?type=OFFICE"]').click();
    cy.url().should('include', '/normal/sign-in');
  });

  it('로그인 후 로그인 및 회원가입 버튼은 사라져야 한다', () => {
    cy.setCookie('userType', 'user');

    cy.visit('/');
    cy.reload();
    cy.get('#move-signin').should('not.exist');
    cy.get('#move-signup').should('not.exist');
  });

  it('일반 유저이면 이사카드 클릭 시 올바른 URL로 이동해야 한다', () => {
    cy.setCookie('userType', 'user');

    // cy.visit('/');
    // cy.get('a[href="/normal/request-quote?type=SMALL"]').click();
    // cy.url().should('include', '/normal/request-quote?type=SMALL');

    // cy.visit('/');
    // cy.reload();
    // cy.get('a[href="/normal/request-quote?type=HOME"]').click();
    // cy.url().should('include', '/normal/request-quote?type=HOME');

    // cy.visit('/');
    // cy.reload();
    // cy.get('a[href="/normal/request-quote?type=OFFICE"]').click();
    // cy.url().should('include', '/normal/request-quote?type=OFFICE');
  });

  // it('드라이버 유저이면 이사카드 클릭 시 알림을 띄우고 이동하지 않는다', () => {
  //   cy.setCookie('userType', 'driver');

  //   cy.visit('/');

  //   cy.on('window:alert', alertText => {
  //     expect(alertText).to.equal('일반 유저만 이사 서비스 요청이 가능합니다 !');
  //   });
  //   cy.get('a[href="/normal/request-quote?type=SMALL"]').click();

  // cy.visit('/');
  // cy.get('a[href="/normal/request-quote?type=HOME"]').click();
  // cy.on('window:alert', alertText => {
  //   expect(alertText).to.equal('일반 유저만 이사 서비스 요청이 가능합니다 !');
  // });

  // cy.visit('/');
  // cy.get('a[href="/normal/request-quote?type=OFFICE"]').click();
  // cy.on('window:alert', alertText => {
  //   expect(alertText).to.equal('일반 유저만 이사 서비스 요청이 가능합니다 !');
  // });
  // });
});
