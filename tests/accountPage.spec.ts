import { test, expect } from "@playwright/test";
//needs to have localhost:3000 on, in another terminal
//pnpm exec playwright test --ui

test.describe("Account Page", () => {
    test("go to login if you're not a user", async ({ page }) => {
        await page.goto("http://localhost:3000/account");

        await expect(page).toHaveURL(/login/);
    });

    test("go to account after log in", async ({ page }) => {
        await page.goto("http://localhost:3000/login");

        await page.getByPlaceholder("email").fill("justin_case@fordummies.com");
        await page.getByPlaceholder("password").fill("justin4daW1N");

        await page.getByRole("button", { name: /sign in/i }).click();

        await page.waitForTimeout(2000); //give it a second for smooth navigation to the account page
        
        await expect(page).toHaveURL(/account/);
        await expect(page.getByText("Welcome Back")).toBeVisible();
    });

    test.describe("shows the expected components in an account page", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("http://localhost:3000/login");

            await page.getByPlaceholder("email").fill("justin_case@fordummies.com");
            await page.getByPlaceholder("password").fill("justin4daW1N");

            await page.getByRole("button", { name: /sign in/i }).click();

            await page.waitForTimeout(2000); //give it a second for smooth navigation to the account page

            await page.goto("http://localhost:3000/account");
        })

        //Profile tab
        test("shows the expected profile tab components", async ({ page }) => {
            await expect(page.getByText("Welcome Back")).toBeVisible();
            await expect(page.getByText("Username")).toBeVisible();
            await expect(page.getByText("Change Password")).toBeVisible();
            await expect(page.getByRole("button", { name: "Log Out" })).toBeVisible();
        })

        //Rank tab
        test("shows the expected rank tab components", async ({ page }) => {
            await page.getByRole("tab", { name: "Rank" }).click();

            await expect(page.getByText("Rank", { exact: true })).toBeVisible();
            await expect(page.getByText("#001")).toBeVisible();
            await expect(page.getByRole("img", {
                name: "Vitriol Rank Text",
            })).toBeVisible();
            await expect(page.getByText("Player One")).toBeVisible();
        });
        
        //Orders tab
        test("shows the expected order tab components", async ({ page }) => {
            await page.getByRole("tab", { name: "Orders " }).click();

            await expect(page.getByText("Order History")).toBeVisible();
            await expect(page.getByText("No orders found.")).toBeVisible(); //the account i used did not have any orders
        })
    })
})
