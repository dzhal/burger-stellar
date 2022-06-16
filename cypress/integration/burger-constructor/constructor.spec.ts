describe("routing", () => {
  //check main
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("should open constructor page by default", function () {
    cy.contains("Соберите бургер").should("exist");
  });

  //open modal ingredient details
  it("should open modal with ingredient details on click", function () {
    cy.get("li").contains("Краторная булка").click();
    cy.contains("Детали ингредиента").should("exist");
    cy.get('*[class^="ingredient-details_name"')
      .contains("Краторная булка")
      .should("exist");
  });
  //check ingredient URL
  it("should open ingredient URL", () => {
    cy.url().should(
      "eq",
      "http://localhost:3000/ingredients/60d3b41abdacab0026a733c6"
    );
  });
  //close modal with button
  it("should close modal on press close button", () => {
    cy.get('*[class^="modal_container__"]').within(() => {
      cy.get('*[class^="modal_close"]').click();
    });
    cy.contains("Детали ингредиента").should("not.exist");
  });
  //drag and drop bun
  it("should add bun ingredient to constructor on drag and drop", () => {
    const dataTransfer = new DataTransfer();
    cy.get("li").contains("Краторная булка").trigger("dragstart", dataTransfer);
    cy.get('*[class^="burger-constructor_ingredient_list"]').trigger(
      "drop",
      dataTransfer
    );
    cy.get('*[class^="burger-constructor_ingredient_list"]').contains(
      "Краторная булка"
    );
    cy.get("button").contains("Оформить заказ").should("be.disabled");
  });
  //check on click tab scroll main
  it("should scroll to ingredients main category", () => {
    cy.get('*[class^="tab_tab"]').contains("Начинки").click();
    cy.get("#main", { timeout: 3000 }).should("be.visible");
  });
  //drag and drop main
  it("should add main ingredient to constructor on drag and drop", () => {
    const dataTransfer = new DataTransfer();
    cy.get("li")
      .contains("Филе Люминесцентного тетраодонтимформа")
      .trigger("dragstart", dataTransfer);
    cy.get('*[class^="burger-constructor_ingredient_list"]').trigger(
      "drop",
      dataTransfer
    );
    cy.get('*[class^="burger-constructor_ingredient_list"]').contains(
      "Филе Люминесцентного тетраодонтимформа"
    );
    cy.get("button").contains("Оформить заказ").should("not.be.disabled");
  });
  //check on click tab scroll sauce
  it("should scroll to ingredients sauce category", () => {
    cy.get('*[class^="tab_tab"]').contains("Соусы").click();
    cy.get("#sauce", { timeout: 1000 }).should("be.visible");
  });
  //drag and drop sauce
  it("should add sauce ingredient to constructor on drag and drop", () => {
    const dataTransfer = new DataTransfer();
    cy.get("li")
      .contains("Соус традиционный галактический")
      .trigger("dragstart", dataTransfer);
    cy.get('*[class^="burger-constructor_ingredient_list"]').trigger(
      "drop",
      dataTransfer
    );
    cy.get('*[class^="burger-constructor_ingredient_list"]').contains(
      "Соус традиционный галактический"
    );
    cy.get("button").contains("Оформить заказ").should("not.be.disabled");
  });
  //check on click tab scroll bun
  it("should scroll to ingredients bun category", () => {
    cy.get('*[class^="tab_tab"]').contains("Булки").click();
    cy.get("#bun", { timeout: 1000 }).should("be.visible");
  });
  //change order of ingredients
  it("should change order of ingredient with drag and drop", () => {
    const dataTransfer = new DataTransfer();
    cy.get('*[class^="constructor-item_ingredient_item_"]')
      .contains("Соус традиционный галактический")
      .parent()
      .trigger("dragstart", dataTransfer);
    cy.get('*[class^="constructor-item_ingredient_item_"]')
      .contains("Филе Люминесцентного тетраодонтимформа")
      .parent()
      .parent()
      .trigger("dragover", dataTransfer);
    cy.get('*[class^="constructor-item_ingredient_item_"]')
      .contains("Филе Люминесцентного тетраодонтимформа")
      .parent()
      .parent()
      .trigger("drop", dataTransfer);
    cy.get('*[class^="constructor-item_ingredient_item_"]');
    cy.get('*[class^="burger-constructor_ingredient_list"]').within(() => {
      cy.get("ul > :nth-child(1)")
        .contains("Соус традиционный галактический")
        .should("exist");
      cy.get("ul > :nth-child(2)")
        .contains("Филе Люминесцентного тетраодонтимформа")
        .should("exist");
    });
  });
  //remove item "Соус традиционный галактический"
  it("should remove ingredient from constructor list", () => {
    cy.get('*[class^="constructor-item_ingredient_item_"]')
      .contains("Соус традиционный галактический")
      .parent()
      .within(() => {
        cy.get('*[class^="constructor-element__action"]').click();
      });
    cy.get('*[class^="burger-constructor_ingredient_list"]')
      .contains("Соус традиционный галактический")
      .should("not.exist");
  });
  //order burger
  it("should create order", () => {
    cy.intercept("/search*", [{ item: "Book 1" }, { item: "Book 2" }]).as(
      "getSearch"
    );

    cy.get("button").contains("Оформить заказ").click();
    cy.contains("Вход");
    cy.get(":nth-child(1) > .input").type("djal.amninov@gmail.com");
    cy.get(":nth-child(2) > .input").type("Qwe123");
    cy.get("button").contains("Войти").click();

    cy.get("button").contains("Оформить заказ").click();
    cy.get('*[class^="order-success_container"]', { timeout: 3000 })
      .should("be.visible")
      .and("contain", "Загрузка");
    cy.get('*[class^="order-success_container"]', { timeout: 20000 })
      .should("be.visible")
      .and("contain", "идентификатор заказа");
  });
  //close order success modal with button
  it("should close order success modal on press close button", () => {
    cy.get('*[class^="modal_container__"]').within(() => {
      cy.get('*[class^="modal_close"]').click();
    });
    cy.get('*[class^="order-success_container"]', { timeout: 3000 }).should(
      "not.be.visible"
    );
    cy.contains("Соберите бургер").should("exist");
  });
});
