/**
 * @vitest-environment jsdom
 */

//Creating News as Admin Testing
//To Test: only admin are allowed, is required fields required (except for image)

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import NewsSubmission from "./newsSubmission";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// type FakeUser = { id: string; email: string; steamId?: string | null };

const GoodTitle = "This is a Good Title";
const GoodDescription = "This is a good starting description. In this TedTalk, I will ...";

afterEach(() => {
  cleanup();
});

describe("NewsSubmission", () => {
    it("denies everyone who's not an admin", () => {
        render(<NewsSubmission isAdmin={false} />);

        expect(
            screen.getByText("Access Denied: Only admin users have access to perform this action.")
        ).toBeInTheDocument();
    });

    it("shows for admins", () => {
        render(<NewsSubmission isAdmin={true} />);

        expect(
            screen.getByLabelText(/title/i)
        ).toBeInTheDocument();
    })
});

describe("NewsSubmission", () => {
    it("submits when the title and description are not empty", async () => {
        const user = userEvent.setup();

        const consoleSpy = vi
            .spyOn(console, "log")
            .mockImplementation(() => {});
        
        render(<NewsSubmission isAdmin={true}/>);

        await user.type(
            screen.getByLabelText(/title/i),
            GoodTitle
        );

        await user.type(
            screen.getByLabelText(/description/i),
            GoodDescription
        );

        await user.click(
            screen.getByRole("button", {name: "Submit"})
        );

        expect(consoleSpy).toHaveBeenCalledWith("Submitted:", {
            title: "This is a Good Title",
            description: "This is a good starting description. In this TedTalk, I will ...",
            image: null,
        });

        expect(
            screen.getByText("News submitted successfully!")
        ).toBeInTheDocument();

        consoleSpy.mockRestore();
    });

    it("will not submit if the title and description is empty", async () => {
        const user = userEvent.setup();
        
        render(<NewsSubmission isAdmin={true}/>);

        await user.click(
            screen.getByRole("button", {name: "Submit"})
        );

        expect(
            screen.getByText("Title and description are required.")
        ).toBeInTheDocument();
    });

    it("will not submit if only the title is empty", async () => {
        const user = userEvent.setup();
        
        render(<NewsSubmission isAdmin={true}/>);

        await user.type(
            screen.getByLabelText(/description/i),
            "This is a good description."
        );

        await user.click(
            screen.getByRole("button", {name: "Submit"})
        );

        expect(
            screen.getByText("Title and description are required.")
        ).toBeInTheDocument();
    })
    
    it("will not submit if only the description is empty", async () => {
        const user = userEvent.setup();
        
        render(<NewsSubmission isAdmin={true}/>);

        await user.type(
            screen.getByLabelText(/title/i),
            "This is a Good Title"
        );

        await user.click(
            screen.getByRole("button", {name: "Submit"})
        );

        expect(
            screen.getByText("Title and description are required.")
        ).toBeInTheDocument();
    })

    //other possible empty titles/descriptions
    it("will not submit if the title and description are only a single empty space", async () => {
        const user = userEvent.setup();

        render(<NewsSubmission isAdmin={true}/>);

        await user.type(
            screen.getByLabelText(/title/i),
            " "
        );

        await user.type(
            screen.getByLabelText(/description/i),
            " "
        );

        await user.click(
            screen.getByRole("button", {name: "Submit"})
        );

        expect(
            screen.getByText("Title and description are required.")
        ).toBeInTheDocument();
    });

    it("will not submit if the title and description are only a next line", async () => {
        const user = userEvent.setup();
        
        render(<NewsSubmission isAdmin={true}/>);

        await user.type(
            screen.getByLabelText(/title/i),
            "\n"
        );

        await user.type(
            screen.getByLabelText(/description/i),
            "\n"
        );

        await user.click(
            screen.getByRole("button", {name: "Submit"})
        );

        expect(
            screen.getByText("Title and description are required.")
        ).toBeInTheDocument();
    })
})
