describe('Landing Page Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('렌더링 시 타이틀 텍스트가 올바르게 표시되어야 한다', () => {
    cy.get('p').contains('원하는 이사 서비스를 요청하고').should('be.visible');
    cy.get('p').contains('견적을 받아보세요').should('be.visible');
  });

  // it('소형이사 링크 클릭 시 로그인하지 않으면 로그인 페이지로 이동해야 한다', () => {
  //   cy.setCookie('userType', '');
  //   cy.get('a[href="/normal/request-quote?type=SMALL"]').click();
  //   cy.url().should('include', '/normal/sign-in');
  //   cy.get('body').should('contain', '로그인을 진행해 주세요');
  // });

  // it('소형이사 링크 클릭 시 driver userType이면 서비스 요청 불가 알림을 보여준다', () => {
  //   cy.setCookie('userType', 'driver');
  //   cy.get('a[href="/normal/request-quote?type=SMALL"]').click();
  //   cy.get('body').should('contain', '일반 유저만 이사 서비스 요청이 가능합니다');
  // });

  // it('소형이사 링크 클릭 시 올바른 URL로 이동해야 한다', () => {
  //   cy.setCookie('userType', 'user');
  //   cy.get('a[href="/normal/request-quote?type=SMALL"]').click();
  //   cy.url().should('include', '/normal/request-quote?type=SMALL');
  // });

  // it('가정이사 링크 클릭 시 올바른 URL로 이동해야 한다', () => {
  //   cy.setCookie('userType', 'user');
  //   cy.get('a[href="/normal/request-quote?type=HOME"]').click();
  //   cy.url().should('include', '/normal/request-quote?type=HOME');
  // });

  // it('기업, 사무실 이사 링크 클릭 시 올바른 URL로 이동해야 한다', () => {
  //   cy.setCookie('userType', 'user');
  //   cy.get('a[href="/normal/request-quote?type=OFFICE"]').click();
  //   cy.url().should('include', '/normal/request-quote?type=OFFICE');
  // });

  // it('로그인 버튼은 로그인하지 않은 상태에서만 보여야 한다', () => {
  //   cy.setCookie('userType', '');
  //   cy.get('button[id="move-signin"]').should('be.visible');
  //   cy.get('button[id="move-signup"]').should('be.visible');
  // });

  // it('로그인 버튼 클릭 시 로그인 페이지로 이동해야 한다', () => {
  //   cy.setCookie('userType', '');
  //   cy.get('button[id="move-signin"]').click();
  //   cy.url().should('include', '/normal/sign-in');
  // });

  // it('회원가입 버튼 클릭 시 회원가입 페이지로 이동해야 한다', () => {
  //   cy.setCookie('userType', '');
  //   cy.get('button[id="move-signup"]').click();
  //   cy.url().should('include', '/normal/sign-up');
  // });

  // it('로그인 후 로그인 버튼은 사라져야 한다', () => {
  //   cy.setCookie('userType', 'user');
  //   cy.get('button[id="move-signin"]').should('not.exist');
  //   cy.get('button[id="move-signup"]').should('not.exist');
  // });
});
