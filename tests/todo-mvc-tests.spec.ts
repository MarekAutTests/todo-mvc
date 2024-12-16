import {expect, test} from "@playwright/test";
import {TodoPage} from "./pages/todo-page";
import exp = require("node:constants");

let todoPage: TodoPage

test.beforeEach(async ({page}) => {
    todoPage = new TodoPage(page)
    await todoPage.openToDoPage()
})

test('Has title', async ({page}) => {
    await expect(todoPage.pageLogo).toBeVisible()
});

test('create new ToDo task', async ({page}) => {
    await todoPage.inputField.fill('newTask')
    await todoPage.inputField.press('Enter')
    expect(await todoPage.counterToDoItems()).toBe(1)
});

test('delete ToDo task by name', async ({page}) => {
    await todoPage.inputField.fill('newTask')
    await todoPage.inputField.press('Enter')
    await todoPage.deleteToDoTaskByName('newTask')
    expect(await todoPage.counterToDoItems()).toBe(0)
});

test('complete ToDo task by name', async ({page}) => {
    await todoPage.inputField.fill('newTask')
    await todoPage.inputField.press('Enter')
    await todoPage.completeToDoTaskByName('newTask')
    await todoPage.checkCompletedToDoTaskByName('newTask')
});

test('buttons All, Active, Completed, Clear are visible ', async ({page}) => {
    await todoPage.inputField.fill('newTask')
    await todoPage.inputField.press('Enter')
    await expect.soft(todoPage.filterAll).toBeVisible()
    await expect.soft(todoPage.filterActive).toBeVisible()
    await expect.soft(todoPage.filterCompleted).toBeVisible()
    await expect.soft(todoPage.buttonClearCompletedTasks).toBeVisible()
});


/*test('verify language at order page', async ({page}) => {
    const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
    await orderCreationPage.statusButton.click()
    await orderCreationPage.statusSearchInput.fill('1947')
    await orderCreationPage.statusSearchButton.click()
    const orderFoundPage = new OrderFoundPage(page)
    await expect(orderFoundPage.uselessInput).toBeVisible()
})*/