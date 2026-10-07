import { test, expect } from "@playwright/test";
//needs to have localhost:3000 on, in another terminal
//pnpm exec playwright test --ui

const testEmail = "justin_case@fordummies.com";
const testPassword = "justin4daW1N";
const testUsername = "Justin Case - The Just";
const testRealName = "Justin";

test.describe("Account Page", () => {
    test("go to login if you're not a user", async ({ page }) => {
        await page.goto("http://localhost:3000/account");

        await expect(page).toHaveURL(/login/);
    });

    test("go to account after log in", async ({ page }) => {
        await page.goto("http://localhost:3000/login");

        await page.getByPlaceholder("email").fill(testEmail);
        await page.getByPlaceholder("password").fill(testPassword);

        await page.getByRole("button", {
            name: /sign in/i
        }).click();

        await page.waitForTimeout(2000); //give it a second for smooth navigation to the account page
        
        await expect(page).toHaveURL(/account/);
        await expect(page.getByText("Welcome Back")).toBeVisible();
    });

    test.describe("shows the expected components in an account page", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("http://localhost:3000/login");

            await page.getByPlaceholder("email").fill("justin_case@fordummies.com");
            await page.getByPlaceholder("password").fill("justin4daW1N");

            await page.getByRole("button", {
                name: /sign in/i
            }).click();

            await page.waitForTimeout(2000); //give it a second for smooth navigation to the account page

            await page.goto("http://localhost:3000/account");
        });

        test("shows navbar and footer", async ({ page }) => {
            //header
            await expect(page.getByRole("img", {
                name: "Rapture Logo"
            })).toBeVisible();
            await expect(page.getByRole("img", {
                name: "Account Profile"
            })).toBeVisible();
            await expect(page.getByRole("link", {
                name: "Home"
            })).toBeVisible();

            //footer
            await expect(page.getByText("SOCIAL MEDIA")).toBeVisible();
            await expect(page.getByText("CONTACT: contact@studiorapture.com")).toBeVisible();
            await expect(page.getByRole("img", {
                name: "Steam"
            }).first()).toBeVisible();
        });

        test("shows the expected UI of the account page", async ({ page }) => {
            await expect(page.getByText("Welcome Back"));
            await expect(page.getByTestId("glowing-header")).toHaveCount(5);
            await expect(page.getByTestId("glowing-header").first()).toBeVisible();
        });

        //Profile tab - also to test if it starts at the profile tab
        test("shows the expected profile tab components", async ({ page }) => {
            //top part
            await expect(page.getByText(testEmail).first()).toBeVisible(); //a user may or may not have a username
            await expect(page.getByText(testUsername).first()).toBeVisible();
            await expect(page.getByRole("button", {
                name: "Update Detail"
            })).toBeVisible();
            await expect(page.getByRole("button", {
                name: "Log Out"
            })).toBeVisible();

            //left side
            await expect(page.getByText("Username")).toBeVisible();

            //right side
            await expect(page.getByText("Show Information")).toBeVisible();
            await expect(page.getByText("Change Password")).toBeVisible();
        });

        //Profile tab - does an updated detail stay/not as expected?
        test("doesn't save details", async ({ page }) => {
            await page.getByLabel("Real Name").fill("Not a Real Person");

            await page.reload();

            await expect(page.getByLabel("Real Name")).toHaveValue(testRealName);
        });
        test("does save details", async ({ page }) => {
            await page.getByLabel("Real Name").fill("Not a Real Person");
            await page.getByRole("button", {
                name: "Update Detail"
            }).click();

            await expect(page.getByText("Profile updated successfully.")).toBeVisible();
            await page.reload();

            await expect(page.getByLabel("Real Name")).toHaveValue("Not a Real Person");
            
            //turns the real name back
            await page.getByLabel("Real Name").fill(testRealName);
            await page.getByRole("button", {
                name: "Update Detail"
            }).click();
            await expect(page.getByText("Profile updated successfully.")).toBeVisible();
            await expect(page.getByLabel("Real Name")).toHaveValue(testRealName);
        });

        //Rank tab
        test("shows the expected rank tab components", async ({ page }) => {
            await page.getByRole("tab", { name: "Rank" }).click();

            await expect(page.getByText("Rank", {
                exact: true
            })).toBeVisible();
            await expect(page.getByRole("img", {
                name: "Vitriol Rank Text",
            })).toBeVisible();
            await expect(page.getByText("#001")).toBeVisible();
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
